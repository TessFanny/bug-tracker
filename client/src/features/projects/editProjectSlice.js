import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
const initialState = {
  title: "",
  description: "",
};

export const editProject = createAsyncThunk('projects/editProject', async({title, description, project_id}, thunkAPI)=>{
    console.log(thunkAPI.getState());
    try {
      const response = await axios.patch(`project/${project_id}`, {
        title, description
      }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      )
      const updatedProject = response.data
      return updatedProject
    } catch (error) {
      console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
  })

const editProjectSlice = createSlice({
  name: "editProject",
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
        state.title = action.payload;
      },
      changeDescriptionValue: (state, action) => {
        state.description = action.payload;
      },
  },
  extraReducers: (builder)=>{
    builder.addCase(editProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.status = "succeeded";
       toast.success(' project successfully edited')
      })
      .addCase(editProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      })
  }
});

export const { changeDescriptionValue, changeTitleValue} = editProjectSlice.actions

export default editProjectSlice.reducer
