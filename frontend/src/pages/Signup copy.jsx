// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { signupUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import Logo from '../assets/logo.svg'; // ⬅️ import your logo
import { motion } from 'framer-motion';

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
    organization: '',
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
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
    <div
      className="w-full pt-8 
                 flex-1 flex items-center justify-center
                 bg-gray-50 dark:bg-slate-900 transition-colors"
    >
      <div
        className="w-full max-w-5xl flex flex-col md:flex-row 
                   rounded-xl shadow-2xl overflow-hidden border-2 border-gray-500
                   my-6 h-[calc(100%-3rem)]" // responsive height with margins
      >
        {/* Left panel (animated aurora & pulsing logo) */}
        <div className="relative flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 overflow-hidden">
          {/* animated aurora */}
          <div className="aurora-wrap">
            <div className="aurora-layer"></div>
          </div>

          {/* content above aurora */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.img
              src={Logo}
              alt="IntelliDGA logo"
              className="w-40 h-40"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Title + Tagline */}
            <h1 className="text-3xl font-extrabold mb-4 text-white tracking-wide">
              Welcome to IntelliDGA
            </h1>
            <p className="text-lg text-center leading-relaxed text-slate-100 max-w-md">
              Smart Insights for Transformer Health ⚡
              <br />
              Join us and explore cutting-edge Dissolved Gas Analysis.
            </p>
          </div>
        </div>

        {/* Right Panel – Signup Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">
            Create intelliDGA Account
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            {['fullName', 'email', 'mobile', 'username', 'organization'].map(
              (name) => (
                <input
                  key={name}
                  name={name}
                  value={form[name]}
                  onChange={onChange}
                  placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                  className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                  required
                />
              )
            )}

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 font-semibold transition"
            >
              {loading ? 'Creating...' : 'Sign up'}
            </button>

            <p className="text-center text-sm mt-2 text-slate-600 dark:text-slate-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
