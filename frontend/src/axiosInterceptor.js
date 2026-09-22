import axios from 'axios';

const publicPaths = new Set(['/auth/login', '/auth/register']);

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const requestPath = config.url?.split('?')[0];

  if (token && !publicPaths.has(requestPath)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;