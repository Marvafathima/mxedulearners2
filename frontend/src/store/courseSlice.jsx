
// export const addCourse = createAsyncThunk(
//   'courses/addCourse',
//   async (courseData, { getState, rejectWithValue }) => {
//     try {
//       const { user } = getState().auth;
//       const accessToken = localStorage.getItem(`${user.email}_access_token`);
//       if (!accessToken) {
//         throw new Error('No access token available');
//       }

//       // Parse the lessons JSON string back into an object
//       const parsedData = {
//         ...Object.fromEntries(courseData),
//         lessons: JSON.parse(courseData.get('lessons'))
//       };
      
//       console.log("Data being sent to backend:", parsedData);

//       const response = await userInstance.post(`/coursemanagement/courses/`, parsedData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       // Error handling remains the same
//     }
//   }
// );



// export const addCourse = createAsyncThunk(
//   'courses/addCourse',
//   async (courseData, { getState,rejectWithValue }) => {
//     try {
//       console.log("add course cllleddd")
//       const { user }=getState().auth;
//       const accessToken = localStorage.getItem(`${user.email}_access_token`);
//       console.log("access token is")
//       console.log(user.email)
//       console.log(accessToken)
//       if (!accessToken){
//         throw new Error('No access token available');
//       }
     
    
      
//       const response = await userInstance.post(`/coursemanagement/courses/`, courseData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${accessToken}`,
//         },
        
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         return rejectWithValue({ message: 'No response received from server' });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         return rejectWithValue({ message: error.message });
//       }
//     }
//   }
// );


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userInstance } from '../api/axios';
import { getCurrentUserTokens, BASE_URL } from '../utils/auth';



export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const accessToken = localStorage.getItem(`${user.email}_access_token`);
      if (!accessToken) {
        throw new Error('No access token available');
      }

      console.log("Access Token:", accessToken);

      const response = await userInstance.post(`/coursemanagement/courses/`, courseData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;