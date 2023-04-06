import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
const initialState = {
  loading: false,
  user: '',
  error: "",
  statusCode: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/register", user);
      console.log(user);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await axios.post("/login", userData);
    //console.log("response:", response);
    const user = response.data.loggedUser;
    //console.log(user);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return { user };
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ user }) => {
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
      const user = {
        email: "",
        password: "",
      };
      state.user = user;
      state.status = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        // const { user } = payload;
        // state.user = user;
        toast.success(`you're successfully registered`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.statusCode = action.error.code;
        console.log(state.error);
        if (state.error === "Rejected"  ) {
          toast.error("cet email existe déjà");
        } else if (state.statusCode === "ERR_BAD_RESPONSE") {
          //toast.error("le mot de passe ");
        }
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
