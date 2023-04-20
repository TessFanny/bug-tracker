import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userSlice } from '../src/features/user/userSlice';
const loginPersistConfig = {
    key: 'login',
    storage,
    whitelist: ['user']  // only saving user state on the redux toolkit store
}
const persistedLoginReducer = persistReducer(loginPersistConfig, userSlice.reducer);

export { persistedLoginReducer };