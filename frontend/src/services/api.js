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
  try {
    const { data } = await api.get('/api/auth/me', { withCredentials: true });
    return data; // { user: {...} }
  } catch (err) {
    if (err?.response?.status === 401) {
      // not authenticated: return a benign value and DON'T throw
      return { user: null };
    }
    throw err;
  }
};

export const requestPasswordReset = async (email) => {
  const { data } = await api.post('/api/auth/request-reset', { email });
  return data;
};

export const resetPassword = async ({ token, password }) => {
  const { data } = await api.post('/api/auth/reset-password', {
    token,
    password,
  });
  return data;
};

export default api;
