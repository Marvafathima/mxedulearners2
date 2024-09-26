
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import userProgressReducer from './userProgressSlice'
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice';
import userManagementReducer from './userManagementSlice';
import coursesReducer from './courseSlice';
import tutorsReducer from './adminTutorSlice';
import studentsReducer from './adminStudentSlice';
import quizReducer from './quizSlice';
import cartReducer from './cartSlice';
import quizareaReducer from './quizareaSlice'
import tutorQuizReducer from './tutorQuizSlice';
const encryptor = encryptTransform({
  secretKey: 'your-secret-key',
  onError: function(error) {
    // Handle the error.
  }
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
  whitelist: ['cart'] // only cart will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  userManagement: userManagementReducer,
  courses: coursesReducer,
  tutors: tutorsReducer,
  students: studentsReducer,
  quizzes: quizReducer,
  cart: cartReducer,
  userProgress: userProgressReducer,
  quizarea:quizareaReducer,
  tutorquiz:tutorQuizReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
    devTools:true,
    
});

export const persistor = persistStore(store);