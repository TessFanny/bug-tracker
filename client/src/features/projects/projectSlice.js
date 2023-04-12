import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  projects: [],
  contributors: []
};

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/projects", {
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

export const getAllContributors = createAsyncThunk(
  "projects/getAllContributors",
  async (project_id, thunkAPI) => {
    try {
      const response = await axios.get(`project/${project_id}/users`, {
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

export const addProject = createAsyncThunk(
  "projects/addProject",
  async ({ title, description, user_id },thunkAPI) => {
    try {
      const response = await axios.post(
        "/projects",
        {
          title,
          description,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
   
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
      state.title = action.payload;
    },
    changeDescriptionValue: (state, action) => {
      state.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      })
      .addCase(addProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state) => {
        state.projects = {
          title: "",
          description: "",
        };
        state.status = true;
        toast.success('project successfully added')
      }).addCase(addProject.rejected, (state, action)=>{
        state.status = false
        state.error = action.error.message;
        toast.error(state.error);
      }).addCase(getAllContributors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllContributors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contributors = action.payload;
      })
      .addCase(getAllContributors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      })
  },
});
export const { changeTitleValue, changeDescriptionValue} = projectSlice.actions
export default projectSlice.reducer;
