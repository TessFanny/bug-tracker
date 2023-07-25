import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  projects: [],
  contributors: [],
  addedProject: {},
  title: '', 
  description: '',
  assignedProjectsToUser: []
};
//  all projects
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
 //  all the projects that are assigned to one user
export const getAllAssignedProjectsToUser = createAsyncThunk(
  "projects/getAllAssignedProjectsToUser",
  async ({user_id}, thunkAPI) => {
    try {
      const response = await axios.get(`/projects/${user_id}`, {
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
// users working on a single project
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
// create a new project 
export const addProject = createAsyncThunk(
  "projects/addProject",
  async ({ title, description, project_author_id },thunkAPI) => {
    try {
      const response = await axios.post(
        "/projects",
        {
          title,
          description,
          project_author_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      console.log(response);
      thunkAPI.dispatch(getAllProjects());
      return response.data
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
   
  }
);
 // add member when adding a new project
export const addMember = createAsyncThunk(
  "projects/addMember",
  async ( {user_id, projectId}, thunkAPI) => {
    console.log(thunkAPI.getState());
    try {
      
      const project_id =   thunkAPI.getState().projects.addedProject.id  || projectId
      const response = await axios.post(
        `/project/${project_id}/users`,
        {
          user_id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      console.log(response);
      thunkAPI.dispatch(getAllContributors(project_id));
      return response.data
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
   
  }
);

// delete project
export const deleteProject = createAsyncThunk('projects/deleteProject', async(project_id, thunkAPI)=>{
  try {
    const response = await axios.delete(`project/${project_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
      }
    })
    console.log(response);
    thunkAPI.dispatch(getAllProjects());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
// edit a project

export const editProject = createAsyncThunk('projects/editProject', async({title, description, project_id}, thunkAPI)=>{
 
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
    thunkAPI.dispatch(getAllProjects());
    return updatedProject
  } catch (error) {
    console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
  }
})


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
        
      }).addCase(getAllAssignedProjectsToUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllAssignedProjectsToUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignedProjectsToUser = action.payload;
      })
      .addCase(getAllAssignedProjectsToUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        
      })
      .addCase(addProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.addedProject = action.payload
        state.projects.push(action.payload);
        state.status = true;
        toast.success('project successfully added')
      }).addCase(addProject.rejected, (state, action)=>{
        state.status = false
        state.error = action.error.message;
        
      })
      .addCase(addMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = true;
        state.contributors.push(action.payload)
       // toast.success('member successfully added')
      }).addCase(addMember.rejected, (state, action)=>{
        state.status = false
        state.error = action.payload;
        console.log ("action:",action);
        
      })
      .addCase(getAllContributors.pending, (state) => {
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
        toast.error(action.payload);
      }).addCase(editProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.status = "succeeded";
       toast.success(' project successfully edited')
      })
      .addCase(editProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        
      })
  },
});
export const { changeTitleValue, changeDescriptionValue} = projectSlice.actions
export default projectSlice.reducer;
