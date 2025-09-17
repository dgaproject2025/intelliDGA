import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:6500';

const api = axios.create({
  baseURL,
  withCredentials: false, // we'll enable later when adding auth
});

export const getHealth = async () => {
  const { data } = await api.get('/api/health');
  return data;
};

export const getAuthPing = async () => {
  const { data } = await api.get('/api/auth/ping');
  return data;
};

export default api;
