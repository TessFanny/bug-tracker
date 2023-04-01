import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
const initialState = {
  user: null,
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
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post("/login", userData);
        
        console.log( 'response:', response);
        const user = response.data.loggedUser;
        const token = response.data.token
        localStorage.setItem('token', token)
        console.log('user in slice:', user);
        console.log('token:', token);
        return {user};
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        // const { user } = payload;
        // state.user = user;
        toast.success(`you're successfully registered`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "failed";
        toast.error(payload);
      }).addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        const { user } = payload;
        state.user = user;
        toast.success(`login successful`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        toast.error(payload);
      })
  },
});

export default userSlice.reducer;
