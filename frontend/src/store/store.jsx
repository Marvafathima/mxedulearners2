


// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
// import adminAuthReducer from './adminAuthSlice'
// import userManagementReducer from './userManagementSlice';
// import coursesReducer from './courseSlice';
// import tutorsReducer from './adminTutorSlice';
// import studentsReducer from './adminStudentSlice';
// import quizReducer from './quizSlice';
// import cartReducer from './cartSlice';



// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     adminAuth: adminAuthReducer,
//     userManagement: userManagementReducer,
//     courses:coursesReducer,
//     tutors:tutorsReducer,
//     students:studentsReducer,
//     quizzes: quizReducer,
//     cart:cartReducer
//   },
// });
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice';
import userManagementReducer from './userManagementSlice';
import coursesReducer from './courseSlice';
import tutorsReducer from './adminTutorSlice';
import studentsReducer from './adminStudentSlice';
import quizReducer from './quizSlice';
import cartReducer from './cartSlice';

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
  cart: cartReducer
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
});

export const persistor = persistStore(store);