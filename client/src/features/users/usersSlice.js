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

export const editUser =  createAsyncThunk('users/editUser', async ({user_id, role}, thunkAPI)=>{
  try {
    const response = await axios.patch(
      `user/${user_id}`,
      {
         role
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    thunkAPI.dispatch(getAllUsers());
    return response.data;
  } catch (error) {
    console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    
  },
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
        // toast.error(state.error);
      }).addCase(editUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("user successfully edited");
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // toast.error(state.error);
      })
  }
});

export default usersSlice.reducer;
