import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
    comments: [],
    addedComment: {},
    text: '',
}

export const getTicketComments = createAsyncThunk('comments/getTicketComments', async(ticket_id, thunkAPI)=>{
    try {
        const response = await axios.get(`/comments/${ticket_id}`, {
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
})

export const addComment = createAsyncThunk('comments/addComment', async ({text, comment_author_id, ticket_id}, thunkAPI)=>{
    try {
        const response = await axios.post(
          "/comments",
          {
            text,
            comment_author_id,
            ticket_id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
            },
          }
        );
        console.log(response);
        thunkAPI.dispatch(getTicketComments(ticket_id));
        return response.data
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
})

export const editComment = createAsyncThunk('comments/editComment', async({text, comment_id,ticket_id}, thunkAPI)=>{
    try {
        const response = await axios.patch(`comment/${comment_id}`, {
          text
        }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
        )
    
        const updatedComment = response.data
        thunkAPI.dispatch(getTicketComments(ticket_id));
        return updatedComment
      } catch (error) {
        console.log(error);
          return thunkAPI.rejectWithValue(error.response.data);
      }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async({ comment_id, ticket_id}, thunkAPI)=>{
    try {
        const response = await axios.delete(`comment/${comment_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer ACCESSTOKEN
          }
        })
        console.log(response);
        thunkAPI.dispatch(getTicketComments(ticket_id));
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }

})


const commentsSlice = createSlice({
    name: "comments", 
    initialState,
    reducers: {
        changeTextValue: (state, action)=>{
            state.text = action.payload
        }
    },
     extraReducers: (builder)=>{
        builder
      .addCase(getTicketComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTicketComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(getTicketComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.payload);
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addedComment = action.payload
        state.comments.push(action.payload);
        state.status = true;
        toast.success('Comment successfully added')
      }).addCase(addComment.rejected, (state, action)=>{
        state.status = false
        state.error = action.error.message;
        toast.error(action.payload);
      }).addCase(editComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.status = "succeeded";
       toast.success(' comment successfully edited')
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload);
      }).addCase(deleteComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
       toast.success(' comment successfully deleted')
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload);
      })
     }
})

export const { changeTextValue} = commentsSlice.actions
 export default commentsSlice.reducer