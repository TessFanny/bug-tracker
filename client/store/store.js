import { combineReducers, configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import userReducer from '../src/features/user/userSlice'
import projectReducer from '../src/features/projects/projectSlice'
import ticketReducer from '../src/features/tickets/ticketsSlice'
import usersReducer from '../src/features/users/usersSlice'
import { persistedLoginReducer } from "./persistconfig";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import editProjectReducer from "../src/features/projects/editProjectSlice";
const rootReducer = combineReducers({
  user: persistedLoginReducer,
    projects: projectReducer,
    tickets: ticketReducer,
    users: usersReducer,
    editProject: editProjectReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
}



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

const persistor = persistStore(store);

export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     projects: projectReducer,
//     tickets: ticketReducer,
//     users: usersReducer
//   },
// });
