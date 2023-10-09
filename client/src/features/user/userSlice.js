import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";



export const getUserFromLocalStorage = ()=>{
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
}


const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
  registeredUser: {},
  statusCode: "",
  isRegisteredFulfill : false
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/register", userData);
      const user = response.data.savedUser;
      console.log(response);
      console.log(user);
      localStorage.setItem("token", response.data.token);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/login", userData);
    //console.log("response:", response);
    const user = response.data.loggedUser;
    console.log(user);
    const token = response.data.token;
    localStorage.setItem("token", token);
    window.localStorage.setItem("isLoggedIn", true);
    return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    
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
    logout: (state,  { payload }) => {    
      state.user = null;
      state.isSideBarOpen = false;
      localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn")
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
         const { savedUser} = payload
         state.isLoading = false;
         state.isRegisteredFulfill = true
         state.registeredUser = savedUser;
         console.log('payload in slice : ', payload );
         toast.success(` Votre compte a été crée avec succès ${payload.firstname}!`)
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
        // state.error = action.error.message;
        // state.statusCode = action.error.code;
        
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        toast.success(`Bienvenue ${user.firstname}`);
      })
      .addCase(loginUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })// Reducer for handling the rejected state of the modify request
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      // Reducer for handling the fulfilled state of the modify request
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.modifiedUser;
        state.isLoading = false;
        state.status = true;
        toast.success("utilisateur mise à jour avec success");
      })
      // Reducer for handling the rejected state of the modify request
      .addCase(updateUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
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
