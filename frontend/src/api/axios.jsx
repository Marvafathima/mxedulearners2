import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/users',
});
const authInstance = axios.create({
  baseURL: 'http://localhost:8000/api/users',
});

authInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export { instance, authInstance };
