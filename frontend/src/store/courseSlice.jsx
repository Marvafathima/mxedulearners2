
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
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userInstance.get('/coursemanagement/courses_fetchall/');
     console.log("fetched dataas:",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
export const fetchPurchasedCourses=createAsyncThunk(
  'courses.fetchPurchasedCourses',
  async (_,{rejectWithValue})=>{
    try {
      console.log("trying to send data to backend")
      const response=await userInstance.get('/coursemanagement/courses_fetch_purchased/');
      console.log("fetched courses",response.data)
      return response.data;
    }catch (error){
      return rejectWithValue(error.response? error.response.data: {message:error.message});
    }
  }
);
export const fetchTutorCourses = createAsyncThunk(
  'courses/fetchTutorCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const accessToken = localStorage.getItem(`${user.email}_access_token`);
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await userInstance.get('/coursemanagement/tutor-courses/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
export const orderStatusChange=createAsyncThunk(
'courses/orderStatusChange',
async(courseId,{getState,rejectWithValue})=>{
  try{
    console.log("orderstatuschange is being sending data")
    const { user } = getState().auth;
    const accessToken = localStorage.getItem(`${user.email}_access_token`);
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const response = await userInstance.patch(`/coursemanagement/orderstatuschange/${courseId}/`,
    { isstart: true }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
   
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: error.message });
  }  
  }

)
export const fetchCourseDetail = createAsyncThunk(
  'courses/fetchCourseDetail',
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const accessToken = localStorage.getItem(`${user.email}_access_token`);
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await userInstance.get(`/coursemanagement/courses/${courseId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      console.log("the response data we get from course detail is",response.data,)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);


const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    purchasedCourses:[],
    currentCourse:null,
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
      })
      .addCase(orderStatusChange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(orderStatusChange.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(orderStatusChange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchPurchasedCourses.fulfilled,(state,action)=>{
        state.status='succeeded';
        state.purchasedCourses=action.payload;
      })
      .addCase(fetchPurchasedCourses.pending,(state)=>{
        state.status="loading";
      })
      .addCase(fetchPurchasedCourses.rejected,(state,action)=>{
        state.status="failed";
        state.error = action.payload?.message || "An error occurred";
      })
      .addCase(fetchTutorCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTutorCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchTutorCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCourseDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCourse = action.payload;
        // state.lessons = action.payload.lessons;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;