import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice'
import userManagementReducer from './userManagementSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    userManagement: userManagementReducer,
  },
});