import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const initialState = {
    tickets : []
}


export const getAllTickets = createAsyncThunk(
    "tickets/getAllTickets",
    async (thunkAPI) => {
      try {
        const response = await axios.get("/tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        });
      //console.log(response);
      //console.log(response.data);
      return response.data;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllTickets.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(getAllTickets.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.tickets = action.payload;
          })
          .addCase(getAllTickets.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            toast.error(state.error);
          });
      },
})

export default ticketsSlice.reducer