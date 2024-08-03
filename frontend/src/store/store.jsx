import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice'
import userManagementReducer from './userManagementSlice';
import coursesReducer from './courseSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    userManagement: userManagementReducer,
    courses:coursesReducer
  },
});