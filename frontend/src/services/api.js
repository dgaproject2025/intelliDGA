// frontend/src/services/api.js
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:6500';
const api = axios.create({ baseURL, withCredentials: true }); // default false

// 🔒 Response interceptor: catch password-expired responses globally
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const code = error?.response?.data?.code;
    if (status === 403 && code === 'PASSWORD_EXPIRED') {
      try {
        await api.post('/api/auth/logout'); // kill cookie if still present
      } catch {}
      // Signal the app that auth state changed
      window.dispatchEvent(new Event('auth:changed'));
      // Redirect to login with reason
      const from = window.location.pathname;
      window.location.assign(
        `/login?reason=password-expired&from=${encodeURIComponent(from)}`
      );
      // Stop normal promise rejection flow (we navigated)
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);

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

// --- keep existing imports and base api instance ---

/** Token-based reset: { token, password } */
export async function resetPassword(payload) {
  // payload = { token, password }
  const { data } = await api.post('/api/auth/reset-password', payload, {
    withCredentials: true,
  });
  return data;
}

/** Identifier-based reset: { username?, email?, mobile?, oldPassword, newPassword }
 *  Backend expects at least ANY TWO of (username, email, mobile) + oldPassword + newPassword
 */
export async function resetWithIdentifiers(payload) {
  const { data } = await api.post('/api/auth/reset-with-identifiers', payload, {
    withCredentials: true,
  });
  return data;
}

/** Request reset link by email (optional helper already present) */
export async function requestPasswordReset(payload) {
  // payload = { email }
  const { data } = await api.post('/api/auth/request-reset', payload, {
    withCredentials: true,
  });
  return data;
}

export default api;
