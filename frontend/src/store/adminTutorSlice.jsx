import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAxiosInstance as axios}  from '../../src/api/axios'

export const fetchApprovedTutors = createAsyncThunk(
  'tutors/fetchApproved',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admintutor/approved-tutors/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






const tutorSlice = createSlice({
  name: 'tutors',
  initialState: {
    tutors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedTutors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApprovedTutors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tutors = action.payload;
      })
      .addCase(fetchApprovedTutors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default tutorSlice.reducer;