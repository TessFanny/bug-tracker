import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const initialState = {
  tickets: [],
  members: [],
  addedTicket: {},
  title: "",
  description: "",
  ticket_status: "",
  priority: "",
  color: "",
  type: "",
};

export const getAllTicketsProject = createAsyncThunk(
  "tickets/getAllTicketsProject",
  async ({ project_id }, thunkAPI) => {
    try {
      const response = await axios.get(`/tickets/${project_id}`, {
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

export const getAllMembersTicket = createAsyncThunk(
  "tickets/getAllMembersTicket",
  async (ticket_id, thunkAPI) => {
    try {
      const response = await axios.get(`ticket/${ticket_id}/users`, {
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
// create a new ticket and assign user to the tickect
export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (
    {
      title,
      description,
      ticket_status,
      priority,
      color,
      type,
      ticket_author_id,
      project_id,
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "/tickets",
        {
          title,
          description,
          ticket_status,
          priority,
          color,
          type,
          ticket_author_id,
          project_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      console.log(response);
      thunkAPI.dispatch(getAllTicketsProject({ project_id }));
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addMemberToTicket = createAsyncThunk(
  "tickets/addMemberToTicket",
  async ({ user_id, ticketId }, thunkAPI) => {
    console.log(thunkAPI.getState());
    try {
      const ticket_id = await thunkAPI.getState().tickets.addedTicket.id || ticketId;
      const response = await axios.post(
        `/ticket/${ticket_id}/users`,
        {
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          },
        }
      );
      console.log(response);
      thunkAPI.dispatch(getAllMembersTicket(ticket_id));

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// edit ticket
export const editTicket = createAsyncThunk(
  "tickets/editTicket",
  async (
    {
      title,
      description,
      ticket_status,
      priority,
      color,
      type,
      ticket_author_id,
      project_id,
      ticket_id,
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `ticket/${ticket_id}`,
        {
          title,
          description,
          ticket_status,
          priority,
          color,
          type,
          ticket_author_id,
          project_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedTicket = response.data;
      thunkAPI.dispatch(getAllTicketsProject({ project_id }));
      return updatedTicket;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete ticket
export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async ({ ticket_id, project_id }, thunkAPI) => {
    try {
      const response = await axios.delete(`ticket/${ticket_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
        },
      });
      console.log(response);
      thunkAPI.dispatch(getAllTicketsProject({ project_id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
      state.title = action.payload;
    },
    changeDescriptionValue: (state, action) => {
      state.description = action.payload;
    },
    changeStatusValue: (state, action) => {
      state.ticket_status = action.payload;
    },
    changePriorityValue: (state, action) => {
      state.priority = action.payload;
    },
    changeColorValue: (state, action) => {
      state.color = action.payload;
    },
    changeTypeValue: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTicketsProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllTicketsProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(getAllTicketsProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      })
      .addCase(addTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.addedTicket = action.payload;
        state.tickets.push(state.addedTicket);
        state.status = true;
        toast.success("ticket successfully added");
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        toast.error(action.payload);
      })
      .addCase(editTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTicket.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("ticket successfully edited");
      })
      .addCase(editTicket.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        toast.error(action.payload);
      })
      .addCase(addMemberToTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMemberToTicket.fulfilled, (state, action) => {
        state.status = true;
        state.members.push(action.payload);
        // toast.success('member successfully added')
      })
      .addCase(addMemberToTicket.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
        console.log("action:", action);
        toast.error(state.error);
      })
      .addCase(getAllMembersTicket.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllMembersTicket.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(getAllMembersTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.payload);
      });
  },
});

export const {
  changeTitleValue,
  changeDescriptionValue,
  changeStatusValue,
  changePriorityValue,
  changeColorValue,
  changeTypeValue,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
