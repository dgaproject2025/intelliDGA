// frontend/src/pages/Login.jsx
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useToast } from '../hooks/useToast';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const warnedRef = useRef(false);

  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [loading, setLoading] = useState(false);

  // NEW: controls the expired-password modal
  const [expireOpen, setExpireOpen] = useState(false);

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
      const status = err?.response?.status;
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message || err.message || 'Login failed';

      // If backend returned PASSWORD_EXPIRED, open the modal
      if (status === 403 && code === 'PASSWORD_EXPIRED') {
        setExpireOpen(true);
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
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

      {/* Expired-password modal */}
      {expireOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-5 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Password expired
            </h3>
            <p className="text-sm mb-4">
              Your password has expired. Please reset it to access IntelliDGA.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setExpireOpen(false);
                  navigate('/forgot-password', { replace: true });
                }}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm"
              >
                Reset password
              </button>
              <button
                onClick={() => setExpireOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-900 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
