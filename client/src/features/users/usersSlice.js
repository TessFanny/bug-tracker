import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  users: [],
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (thunkAPI) => {
  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
      },
    });
   // console.log(response);
      //console.log(response.data);
      return response.data;
  } catch (error) {
    console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      });
  }
});

export default usersSlice.reducer;
