// frontend/src/pages/ResetPassword.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { resetPassword, logoutUser } from '../services/api'; // ⬅️ add logoutUser
import { useToast } from '../hooks/useToast';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const toast = useToast();

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qs = new URLSearchParams(search);
    setToken(qs.get('token') || '');
  }, [search]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!token) return toast.error('Missing or invalid token.');
    if (password.length < 8)
      return toast.error('Password must be at least 8 characters.');
    if (password !== confirm) return toast.error('Passwords do not match.');

    setLoading(true);
    try {
      const res = await resetPassword({ token, password });
      // best-effort: clear any existing session cookie
      try {
        await logoutUser();
      } catch {}
      window.dispatchEvent(new Event('auth:changed'));
      toast.success(res?.message || 'Password updated. Please log in again.');
      setTimeout(() => navigate('/login'), 600);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Reset failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      {!token ? (
        <div className="space-y-3">
          <p className="text-red-600">Invalid or missing token.</p>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Request a new reset link
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="New password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border rounded px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <p className="text-xs text-slate-500">
            Use at least 8 characters, including a number and a symbol.
          </p>

          <button
            className="w-full bg-blue-600 text-white rounded py-2"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )}
    </div>
  );
}
