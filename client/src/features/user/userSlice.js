import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";



export const getUserFromLocalStorage = ()=>{
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
}


const initialState = {
  loading: false,
  user: getUserFromLocalStorage(),
  userRegistered: "",
  statusCode: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/register", user);
      console.log(user);
      console.log(response);
      return response.data.savedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    const response = await axios.post("/login", userData);
    //console.log("response:", response);
    const user = response.data.loggedUser;
    //console.log(user);
    const token = response.data.token;
    localStorage.setItem("token", token);
    window.localStorage.setItem("isLoggedIn", true);
    return { user };
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ user }, thunkAPI) => {
    const { id, firstname, lastname, email, role } = user;
    const response = await axios.patch(
      `/user/${id}`,
      {
        firstname,
        lastname,
        email,
        role,
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const modifiedUser = response.data;
    return { modifiedUser };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer for changing the email value in state
    changeEmailValue: (state, action) => {
      state.user.email = action.payload;
    },
    // Reducer for changing the password value in state
    changeRoleValue: (state, action) => {
      state.user.role = action.payload;
    },
    changeFirstnameValue: (state, action) => {
      state.user.firstname = action.payload;
    },
    changeLastnameValue: (state, action) => {
      state.user.lastname = action.payload;
    },

    // Reducer for logging out the user
    logout: (state) => {    
      state.user = null;
      state.status = null;
      localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
         state.userRegistered = action.payload;
         console.log('userRegistered in slice : ',  state.userRegistered);
        toast.success(`you're successfully registered`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.statusCode = action.error.code;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const { user } = payload;
        state.user = user;
        toast.success(`login successful`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        state.statusCode = action.error.code;
        console.log(action.error);
        if (state.statusCode === "ERR_BAD_REQUEST" || "ERR_BAD_RESPONSE" ) {
          toast.error("email ou mot de passe incorrect");
        } else if (state.statusCode === "ERR_BAD_RESPONSE") {
          //toast.error("le mot de passe ");
        }
       
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the modify request
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.modifiedUser;
        state.status = true;
        toast.success("User updated");
      })
      // Reducer for handling the rejected state of the modify request
      .addCase(updateUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export const {
  changeEmailValue,
  changeLastnameValue,
  changeFirstnameValue,
  changeRoleValue,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
