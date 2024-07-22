import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance as axios } from '../api/axios'
axios.defaults.withCredentials = true;


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/verify-otp', otpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const submitTutorApplication = createAsyncThunk(
  'auth/submitTutorApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/tutor_application', applicationData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      // .addCase(verifyOTP.fulfilled, (state, action) => {
      //   state.loading = false;
      
      //   state.user = {
      //     id: action.payload.user_id,
      //     email: action.payload.email,
      //   };
      //   state.role = action.payload.role;
       
      // })
      // .addCase(verifyOTP.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.role = action.payload.user.role;
      // })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.non_field_errors?.[0] || action.payload || 'An error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail || 'Login failed';
    })
    .addCase(submitTutorApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(submitTutorApplication.fulfilled, (state, action) => {
      state.loading = false;
      // You can update the user state here if needed
    })
    .addCase(submitTutorApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to submit tutor application';
    });




  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

