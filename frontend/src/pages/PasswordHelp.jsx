// frontend/src/pages/PasswordHelp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, resetWithIdentifiers } from '../services/api';
import { useToast } from '../hooks/useToast';
import Logo from '../assets/logo.svg';
import { motion } from 'framer-motion';

export default function PasswordHelp() {
  const toast = useToast();
  const navigate = useNavigate();

  // tabs: "email" (classic) | "ids" (two identifiers + old pwd)
  const [tab, setTab] = useState('email');

  // Email flow
  const [email, setEmail] = useState('');

  // Identifier flow
  const [ids, setIds] = useState({
    username: '',
    email: '',
    mobile: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const canSubmitIds =
    ids.oldPassword &&
    ids.newPassword &&
    ids.confirmPassword &&
    // at least two identifiers provided among username/email/mobile
    [
      Boolean(ids.username.trim()),
      Boolean(ids.email.trim()),
      Boolean(ids.mobile.trim()),
    ].filter(Boolean).length >= 2;

  async function onSendEmailLink(e) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email.');
      return;
    }
    try {
      const res = await requestPasswordReset({ email: email.trim() });
      toast.success(
        res?.message ||
          'If that email exists, a password reset link has been sent.'
      );
    } catch (err) {
      const m = err?.response?.data?.message || err.message;
      toast.error(m);
    }
  }

  async function onResetWithIds(e) {
    e.preventDefault();
    if (!canSubmitIds) {
      toast.error('Provide any two of username/email/mobile + old password.');
      return;
    }
    if (ids.newPassword !== ids.confirmPassword) {
      toast.error('New password and confirm password must match.');
      return;
    }
    try {
      const payload = {
        username: ids.username || undefined,
        email: ids.email || undefined,
        mobile: ids.mobile || undefined,
        oldPassword: ids.oldPassword,
        newPassword: ids.newPassword,
      };
      const res = await resetWithIdentifiers(payload);
      toast.success(res?.message || 'Password updated. Please log in.');
      // force re-login
      window.dispatchEvent(new Event('auth:changed'));
      navigate('/login', { replace: true });
    } catch (err) {
      const m = err?.response?.data?.message || err.message;
      toast.error(m);
    }
  }

  return (
    <div className=" w-full pt-8 flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="w-full h-full max-w-5xl flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden border-2 border-gray-500">
        {/* Left panel with animated logo + tagline */}
        <div className="relative flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 overflow-hidden">
          <div className="aurora-wrap">
            <div className="aurora-layer" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.img
              src={Logo}
              alt="IntelliDGA logo"
              className="w-40 h-40"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <h1 className="mt-6 text-3xl font-bold text-white">
              Password Assistance
            </h1>
            <p className="text-gray-300 mt-2 text-center max-w-sm">
              Stay secure and keep exploring{' '}
              <span className="text-amber-400 font-semibold">IntelliDGA</span>.
              Use an email link, or verify with your identifiers.
            </p>
          </div>
        </div>

        {/* Right panel — Tabs + Forms */}
        <div className="flex-1 bg-white dark:bg-slate-800 p-6 md:p-8 flex items-start justify-center">
          <div className="w-full max-w-md text-slate-900 dark:text-white">
            {/* Tabs */}
            <div className="mb-4 flex rounded-lg overflow-hidden border dark:border-slate-700">
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  tab === 'email'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-200'
                }`}
                onClick={() => setTab('email')}
              >
                Email Link
              </button>
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  tab === 'ids'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-200'
                }`}
                onClick={() => setTab('ids')}
              >
                Use Identifiers
              </button>
            </div>

            {/* Email flow */}
            {tab === 'email' && (
              <form className="space-y-4" onSubmit={onSendEmailLink}>
                <label className="block text-sm">
                  Email
                  <input
                    type="email"
                    className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
                  Send reset link
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We’ll send a time-limited link to your email.
                </p>
              </form>
            )}

            {/* Identifier flow */}
            {tab === 'ids' && (
              <form className="space-y-3" onSubmit={onResetWithIds}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block text-sm">
                    Username
                    <input
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.username}
                      onChange={(e) =>
                        setIds((s) => ({ ...s, username: e.target.value }))
                      }
                      placeholder="your username"
                    />
                  </label>
                  <label className="block text-sm">
                    Email
                    <input
                      type="email"
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.email}
                      onChange={(e) =>
                        setIds((s) => ({ ...s, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block text-sm md:col-span-2">
                    Mobile
                    <input
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.mobile}
                      onChange={(e) =>
                        setIds((s) => ({ ...s, mobile: e.target.value }))
                      }
                      placeholder="10-digit mobile number"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <label className="block text-sm">
                    Old Password
                    <input
                      type="password"
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.oldPassword}
                      onChange={(e) =>
                        setIds((s) => ({ ...s, oldPassword: e.target.value }))
                      }
                      placeholder="current password"
                      required
                    />
                  </label>
                  <label className="block text-sm">
                    New Password
                    <input
                      type="password"
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.newPassword}
                      onChange={(e) =>
                        setIds((s) => ({ ...s, newPassword: e.target.value }))
                      }
                      placeholder="new password"
                      required
                    />
                  </label>
                  <label className="block text-sm md:col-span-2">
                    Confirm New Password
                    <input
                      type="password"
                      className="mt-1 w-full border rounded px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
                      value={ids.confirmPassword}
                      onChange={(e) =>
                        setIds((s) => ({
                          ...s,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="confirm new password"
                      required
                    />
                  </label>
                </div>

                <button
                  className="w-full bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 disabled:opacity-50"
                  disabled={!canSubmitIds}
                >
                  Update Password
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide any two of Username, Email, Mobile (plus old password)
                  to verify identity.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* subtle animated background for left panel */}
      <style>{`
        .aurora-wrap {
          position: absolute;
          inset: -20%;
          filter: blur(40px);
          opacity: .6;
          pointer-events: none;
        }
        .aurora-layer {
          width: 140%;
          height: 140%;
          background: radial-gradient(600px 200px at 20% 30%, #1e3a8a55, transparent 60%),
                      radial-gradient(500px 200px at 80% 70%, #4f46e555, transparent 60%),
                      radial-gradient(600px 200px at 50% 60%, #06b6d455, transparent 60%);
          animation: aurora 8s ease-in-out infinite alternate;
        }
        @keyframes aurora {
          from { transform: translate(-5%, -3%) rotate(-1deg); }
          to   { transform: translate(4%, 3%) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}
