import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ add
import { requestPasswordReset } from '../services/api';
import { useToast } from '../hooks/useToast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // ⬅️ add

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await requestPasswordReset(email);

      // friendly toast (don’t expose token in production)
      toast.success(
        res?.message || 'If that email exists, a reset link has been sent.'
      );

      // ⬇️ Auto-redirect to /reset-password?token=... when backend returns test URL
      if (res?.resetURL) {
        // Option 1: use the URL as-is
        const url = new URL(res.resetURL);
        navigate(`${url.pathname}${url.search}`);
      } else if (res?.token) {
        // Option 2: build the URL from the token (fallback)
        navigate(`/reset-password?token=${encodeURIComponent(res.token)}`);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Request failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white rounded py-2"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
    </div>
  );
}
