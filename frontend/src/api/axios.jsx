import axios from 'axios';
import { getCurrentUserTokens } from '../utils/auth';





export const adminAxiosInstance = axios.create({
  baseURL:'http://localhost:8000/api/users/admin',
  withCredentials: true,
});

// Interceptor for admin instance
adminAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token function
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('adminRefreshToken');
    const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
    return response.data.access;
  } catch (error) {
    throw error;
  }
};

// Interceptor for handling token expiration
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        localStorage.setItem('adminToken', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return adminAxiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await axios.post('http://localhost:8000/api/users/token/refresh', { refresh: refreshToken });
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          console.log(access,"this is access token")
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., logout user)
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('isAdmin');
          // window.location.href = 'admin/login'; // Redirect to login page
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};




const userInstance = axios.create({
  baseURL: 'http://localhost:8000/api/users',
});

userInstance.interceptors.request.use((config) => {
  const tokens = getCurrentUserTokens();
  console.log("token in the axios fetvching check for authorization**********",tokens)
  if (tokens && tokens.accessToken) {
    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Implement refresh token logic here

export { userInstance };

export const instance = createAxiosInstance('http://localhost:8000/api/users');
export const authInstance = createAxiosInstance('http://localhost:8000/api/users');
export const userManagementInstance = createAxiosInstance('http://localhost:8000/user_management');
export const authUserManagementInstance = createAxiosInstance('http://localhost:8000/user_management');
