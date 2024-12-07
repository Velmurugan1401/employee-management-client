import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Set Bearer token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message == "Invalid or expired token" && error.response.status === 403) {
      localStorage.clear() // Logout user
    }
    return Promise.reject(error);
  }
);

export default apiClient