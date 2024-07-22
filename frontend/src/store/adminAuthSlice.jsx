// // src/store/adminAuthSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { instance } from '../api/axios';
// export const adminLogin = createAsyncThunk(
//   'adminAuth/login',
//   async (credentials, { rejectWithValue }) => {
    
//     try {
//       console.log('Credentials sent to backend:', credentials);
//       const response = await instance.post('/admin/login', credentials);
//       const { access, refresh, isAdmin } = response.data;

//       // Store tokens and isAdmin in localStorage
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       localStorage.setItem('isAdmin', isAdmin);
//       localStorage.setItem('isAuthenticated', true);
//       return response.data;
//     } catch (error) {
//       console.error('Error from backend:', error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // src/store/adminAuthSlice.js

// export const refreshAdminToken = createAsyncThunk(
//   'adminAuth/refreshToken',
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = localStorage.getItem('refresh_token');
//       const response = await instance.post('token/refresh', { refresh: refreshToken });
//       const { access } = response.data;
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('isAuthenticated',true);
     


//       console.log(access,"access token form reject with value")
//       return response.data;
//     } catch (error) {
//       console.log(access,"error form reject with value")
//       return rejectWithValue(error.response.data);
//     }
//   }
// );








// const adminAuthSlice = createSlice({
//   name: 'adminAuth',
//   initialState: {
//     isAuthenticated: false,
//     isAdmin: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     adminLogout: (state) => {
//       state.isAuthenticated = false;
//       state.isAdmin = false;
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       localStorage.removeItem('isAdmin');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(adminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.isAdmin = action.payload.isAdmin;
//         console.log("fulfilled is the response")
//       })
//       .addCase(adminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.detail;
        
//       })
//       .addCase(refreshAdminToken.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.isAdmin = true;
//         localStorage.setItem('access_token', access);
//       localStorage.setItem('isAuthenticated',true);
     
//         console.log("fulfilled the responseeee")
//       })
//       .addCase(refreshAdminToken.rejected, (state) => {
//         state.isAuthenticated = false;
//         state.isAdmin = false;
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('isAdmin');
//         console.log("rejected the responseeee")
//       });
      
//   },
// });

// export const { adminLogout } = adminAuthSlice.actions;
// export default adminAuthSlice.reducer;



// slices/adminAuthSlice.js
// src/store/adminAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAxiosInstance } from '../api/axios';

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email,password,"before the try to check is passed")
    try {
      console.log(email,password)

      const response = await adminAxiosInstance.post('/login', { email, password });
      if (response.data.isAdmin) {
        localStorage.setItem('adminToken', response.data.access);
        localStorage.setItem('adminRefreshToken', response.data.refresh);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        return response.data;
      } else {
        return rejectWithValue('Not an admin user');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

export const refreshAdminToken = createAsyncThunk(
  'adminAuth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('adminRefreshToken');
      const response = await adminAxiosInstance.post('/token/refresh', { refresh: refreshToken });
      localStorage.setItem('adminToken', response.data.access);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Token refresh failed');
    }
  }
);

export const fetchAdminMe = createAsyncThunk(
  'adminAuth/fetchAdminMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAxiosInstance.get('/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch admin data');
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: JSON.parse(localStorage.getItem('adminUser')) || null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      localStorage.removeItem('adminUser');
      state.admin = null;
      state.isAuthenticated = false;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('adminUser', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.user;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(refreshAdminToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(refreshAdminToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminUser');
      })
      .addCase(fetchAdminMe.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('adminUser', JSON.stringify(action.payload));
      })
      .addCase(fetchAdminMe.rejected, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('adminUser');
      });
  },
});

export const { logout, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;