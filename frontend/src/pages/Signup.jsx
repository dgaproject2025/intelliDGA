// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { signupUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ add Link here
import { useToast } from '../hooks/useToast';

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    organization: '',
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await signupUser(form);
      toast.success(res?.message || 'Signup successful!');
      window.dispatchEvent(new Event('auth:changed'));
      setTimeout(() => navigate('/'), 300);
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || 'Signup failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        {['fullName', 'email', 'mobile', 'username', 'organization'].map(
          (name) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={onChange}
              placeholder={name}
              className="w-full border rounded px-3 py-2"
              required
            />
          )
        )}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="password"
          className="w-full border rounded px-3 py-2"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded py-2"
        >
          {loading ? 'Creating...' : 'Sign up'}
        </button>
      </form>

      {/* ⬇️ Add this helper line below the form */}
      <p className="text-sm mt-2 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
