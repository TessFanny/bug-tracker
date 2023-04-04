import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import projectReducer from './features/projects/projectSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer
  },
});
