// Utility to attach JWT token to all axios requests if present in Redux store
import axios from 'axios';
import store from './store';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
