// userProgressSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userInstance as axios} from '../api/axios'

export const fetchUserProgress = createAsyncThunk(
  'userProgress/fetchUserProgress',
  async (courseId, { rejectWithValue }) => {
    try{
        const response = await axios.get(`/coursemanagement/user-progress/${courseId}/`);
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response ? error.response.data : { message: error.message });
    } 
   
  }
  
);

export const updateUserProgress = createAsyncThunk(
  'userProgress/updateUserProgress',
  async ({ courseId, lessonId, progress }, { rejectWithValue }) => {
    try{
        const response = await axios.put(`/coursemanagement/user-progress/${courseId}/`, {
            lesson_id: lessonId,
            progress,
          });
          return response.data;
    }
    catch(error){
        return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
   
  }
);

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState: {
    userProgress: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProgress = action.payload;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProgress.fulfilled, (state, action) => {
        const { lesson, last_watched_position, is_completed } = action.payload;
        state.userProgress[lesson] = { last_watched_position, is_completed };
      });
  },
});

export default userProgressSlice.reducer;