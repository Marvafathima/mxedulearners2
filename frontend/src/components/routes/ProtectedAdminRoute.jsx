// // src/components/ProtectedAdminRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedAdminRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.adminAuth);
// console.log("in protected route checking for authentication")
//   if (!isAuthenticated) {
//     console.log("not authenticated")
//     alert("not authenticated")
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;

// components/ProtectedRoute.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { adminAxiosInstance } from '../../api/axios';
// import { setAdmin } from '../../store/adminAuthSlice';
// const ProtectedAdminRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.adminAuth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await adminAxiosInstance.get('admin/me/');
//         dispatch(setAdmin(response.data));
//       } catch (error) {
//         console.error('Authentication check failed', error);
//       }
//     };

//     if (!isAuthenticated && localStorage.getItem('adminToken')) {
//       checkAuth();
//     }
//   }, [dispatch, isAuthenticated]);

//   if (!isAuthenticated && !localStorage.getItem('adminToken')) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAdminMe } from '../../store/adminAuthSlice';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, admin } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin && localStorage.getItem('adminToken')) {
      dispatch(fetchAdminMe());
    }
  }, [dispatch, admin]);

  if (!isAuthenticated && !localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;