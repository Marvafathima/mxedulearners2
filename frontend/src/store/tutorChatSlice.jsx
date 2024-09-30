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

  export const fetchMyTutors = createAsyncThunk(
    'chat/fetchMyTutors',
    async (studentId, { getState, rejectWithValue }) => {
      try {
        const { user } = getState().auth;
        const accessToken = localStorage.getItem(`${user.email}_access_token`);
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const response = await userInstance.get(`chat/student/${studentId}/tutors/`, {
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

  export const fetchChatHistory = createAsyncThunk(
    'chat/fetchChatHistory',
    async (roomName, { getState, rejectWithValue }) => {
      try {
        const { user } = getState().auth;
        const accessToken = localStorage.getItem(`${user.email}_access_token`);
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const response = await userInstance.get(`chat/messages/chat_history/?room_name=${roomName}`, {
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


  export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (messageData, { getState, rejectWithValue }) => {
      try {
        const { user } = getState().auth;
        const accessToken = localStorage.getItem(`${user.email}_access_token`);
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const response = await userInstance.post('chat/messages/send_message/', {
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




  // export const fetchChatHistory = createAsyncThunk(
  //   'chat/fetchChatHistory',
  //   async (roomName) => {
  //     const response = await userInstance.get(`chat/messages/chat_history/?room_name=${roomName}`,{
  //       headers: { 
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });
  //     return response.data;
  //   }
  // );
  
  // export const sendMessage = createAsyncThunk(
  //   'chat/sendMessage',
  //   async (messageData) => {
  //     const response = await userInstance.post('chat/messages/send_message/', messageData,{
  //       headers: { 
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });
  //     return response.data;
  //   }
  // );



  const tutorChatSlice = createSlice({
    name: 'chats',
    initialState: {
      students: [],
      messages:{},
      tutors:[],
      status: 'idle',
      error: null,
    },
    reducers: {
      addMessage: (state, action) => {
        const { roomName, message } = action.payload;
        if (!state.messages[roomName]) {
          state.messages[roomName] = [];
        }
        state.messages[roomName].push(message);
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.meta.arg] = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { room_name, ...message } = action.payload;
        if (!state.messages[room_name]) {
          state.messages[room_name] = [];
        }
        state.messages[room_name].push(message);
      })
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

        .addCase(fetchMyTutors.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchMyTutors.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tutors = action.payload.tutors;
          })
          .addCase(fetchMyTutors.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
  


    },
    });
 export const { addMessage } = tutorChatSlice.actions;
    export default tutorChatSlice.reducer;