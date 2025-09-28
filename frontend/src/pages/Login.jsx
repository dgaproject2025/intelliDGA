// frontend/src/pages/Login.jsx
import { useEffect, useRef, useState, useMemo } from 'react';
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from 'react-router-dom';
import { loginUser } from '../services/api';
import { useToast } from '../hooks/useToast';
import Logo from '../assets/logo.svg';
import { motion } from 'framer-motion';
import PasswordExpiryModal from '../components/PasswordExpiryModal';
//import ExpiryWatcher from './components/ExpiryWatcher';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const toast = useToast();
  const warnedRef = useRef(false);

  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [expireOpen, setExpireOpen] = useState(false); // controls modal

  // show “login required” exactly once after redirect
  useEffect(() => {
    if (location.state?.reason === 'auth-required' && !warnedRef.current) {
      warnedRef.current = true;
      toast.error('You must be logged in to access that page.');
      // clear state so refresh doesn’t retrigger
      window.history.replaceState({}, '');
    }
  }, [location.state, toast]);

  // open modal if redirected due to password expiry (via state or query param)
  useEffect(() => {
    const stateReason = location.state?.reason;
    const queryReason = params.get('reason');

    if (
      stateReason === 'password-expired' ||
      queryReason === 'password-expired'
    ) {
      setExpireOpen(true);

      // clean the query param so refresh doesn't reopen
      if (queryReason) {
        const url = new URL(window.location.href);
        url.searchParams.delete('reason');
        window.history.replaceState({}, '', url.toString());
      }
      // clear router state as well
      if (stateReason) {
        window.history.replaceState({}, '');
      }
    }
  }, [location.state, params]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const payload = useMemo(() => {
    const { emailOrUsername, password } = form;
    return emailOrUsername.includes('@')
      ? { email: emailOrUsername, password }
      : { username: emailOrUsername, password };
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await loginUser(payload);
      toast.success(res?.message || 'Login successful!');
      window.dispatchEvent(new Event('auth:changed'));

      // navigate to intended destination (if any), else home
      const dest = location.state?.from || '/';
      setTimeout(() => navigate(dest), 150);
    } catch (err) {
      const status = err?.response?.status;
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message || err.message || 'Login failed';

      // Backend signals expired password with 403 + code
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
      {/* Expired modal for logged-out login attempt */}
      <PasswordExpiryModal
        open={expireOpen}
        variant="expired"
        onClose={() => setExpireOpen(false)}
        onReset={() => navigate('/forgot-password', { replace: true })}
      />
      {/* Auth canvas */}
      <div className=" w-full pt-8  flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
        <div className="w-full h-full max-w-5xl flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden border-2 border-gray-500 dark:border-slate-700">
          {/* Left panel with animated logo */}
          <div className="relative flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 overflow-hidden">
            {/* animated aurora */}
            <div className="aurora-wrap">
              <div className="aurora-layer" />
            </div>

            {/* content above aurora */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.img
                src={Logo}
                alt="IntelliDGA logo"
                className="w-40 h-40"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <h1 className="mt-6 text-3xl font-bold text-white">
                Welcome Back
              </h1>
              <p className="text-gray-300 mt-2 text-center">
                Log in to continue exploring{' '}
                <span className="text-amber-400 font-semibold">IntelliDGA</span>
              </p>
            </div>
          </div>

          {/* Right panel form */}
          <div className="flex-1 bg-white dark:bg-slate-800 p-8 flex items-center justify-center">
            <form
              onSubmit={onSubmit}
              className="w-full max-w-md space-y-4 text-slate-900 dark:text-white"
            >
              <h2 className="text-2xl font-semibold">Sign in</h2>

              <input
                name="emailOrUsername"
                value={form.emailOrUsername}
                onChange={onChange}
                placeholder="Email or Username"
                autoComplete="username"
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                required
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                required
              />

              <p className="text-right text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 dark:text-amber-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </p>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 disabled:opacity-50"
                disabled={loading || !form.emailOrUsername || !form.password}
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-amber-400 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
