// frontend/src/pages/Login.jsx
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // ⬅️ add Link here
import { loginUser } from '../services/api';
import { useToast } from '../hooks/useToast';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const warnedRef = useRef(false); // prevents duplicate toast

  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [loading, setLoading] = useState(false);

  // show “login required” exactly once after redirect
  useEffect(() => {
    if (location.state?.reason === 'auth-required' && !warnedRef.current) {
      warnedRef.current = true;
      toast.error('You must be logged in to access that page.');
      window.history.replaceState({}, '');
    }
  }, [location.state, toast]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const payload = form.emailOrUsername.includes('@')
        ? { email: form.emailOrUsername, password: form.password }
        : { username: form.emailOrUsername, password: form.password };

      const res = await loginUser(payload);
      toast.success(res?.message || 'Login successful!');
      window.dispatchEvent(new Event('auth:changed'));
      const dest = location.state?.from || '/';
      setTimeout(() => navigate(dest), 200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="emailOrUsername"
          value={form.emailOrUsername}
          onChange={onChange}
          placeholder="email or username"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="password"
          className="w-full border rounded px-3 py-2"
          required
        />

        <p className="text-right text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </p>

        <button
          className="w-full bg-blue-600 text-white rounded py-2"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
