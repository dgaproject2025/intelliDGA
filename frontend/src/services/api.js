// frontend/src/services/api.js
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:6500';
const api = axios.create({ baseURL, withCredentials: false }); // default false

// For auth routes you already do:
// api.post("/api/auth/login", payload, { withCredentials: true })

export const getHealth = async () => {
  const { data } = await api.get('/api/health');
  return data;
};

export const getAuthPing = async () => {
  const { data } = await api.get('/api/auth/ping');
  return data;
};

// Auth APIs
export const signupUser = async (payload) => {
  const { data } = await api.post('/api/auth/signup', payload, {
    withCredentials: true,
  });
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post('/api/auth/login', payload, {
    withCredentials: true,
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post(
    '/api/auth/logout',
    {},
    { withCredentials: true }
  );
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/api/auth/me', { withCredentials: true });
  return data;
};

export default api;
