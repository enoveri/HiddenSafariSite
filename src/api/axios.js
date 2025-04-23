import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "../utils/apiConfig";

// Base API configuration with environment variable
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    const token = API_TOKEN || localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Handle token refresh logic here if needed
      // const refreshToken = localStorage.getItem('refreshToken');
      // try {
      //   const rs = await axios.post('/auth/refresh-token', { refreshToken });
      //   const newToken = rs.data.token;
      //   localStorage.setItem('authToken', newToken);
      //   api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      //   return api(originalRequest);
      // } catch (_error) {
      //   // Redirect to login or handle error
      //   return Promise.reject(_error);
      // }
    }

    return Promise.reject(error);
  }
);

export default api;
