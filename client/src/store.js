import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import projectReducer from './features/projects/projectSlice'
import ticketReducer from './features/tickets/ticketsSlice'
import usersReducer from './features/users/usersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    tickets: ticketReducer,
    users: usersReducer
  },
});
