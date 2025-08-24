import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style.css';
import axios from 'axios';

// ===== Axios JWT Setup =====

// Set base URL
axios.defaults.baseURL = 'http://localhost:3000/api';

// Add request interceptor to include JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 401/403 globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      store.commit('setUser', null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Restore user from localStorage into Vuex
try {
  const savedUser = localStorage.getItem('user');
  if (savedUser && savedUser !== 'undefined') {
    const user = JSON.parse(savedUser);
    store.commit('setUser', user);
  }
} catch (err) {
  console.error('Failed to restore user from localStorage', err);
}

createApp(App).use(store).use(router).mount('#app');
