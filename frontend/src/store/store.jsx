import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice'
import userManagementReducer from './userManagementSlice';
import coursesReducer from './courseSlice';
import tutorsReducer from './adminTutorSlice';
import studentsReducer from './adminStudentSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    userManagement: userManagementReducer,
    courses:coursesReducer,
    tutors:tutorsReducer,
    students:studentsReducer,
  },
});