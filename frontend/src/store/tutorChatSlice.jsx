import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userInstance } from '../api/axios';


export const fetchMyStudents = createAsyncThunk(
    'chat/fetchMyStudents',
    async (tutorId, { getState, rejectWithValue }) => {
      try {
        const { user } = getState().auth;
        const accessToken = localStorage.getItem(`${user.email}_access_token`);
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const response = await userInstance.get(`chat/tutor/${tutorId}/students/`, {
          headers: { 
            Authorization: `Bearer ${accessToken}`
          }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  )
  const tutorChatSlice = createSlice({
    name: 'chats',
    initialState: {
      students: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMyStudents.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMyStudents.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.students = action.payload.students;
        })
        .addCase(fetchMyStudents.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    },
    });

    export default tutorChatSlice.reducer;