import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { logoutUser } from '../services/api';

export default function ExpiryWatcher() {
  const { user, isExpired, refresh } = useAuthStatus();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && isExpired) setOpen(true);
  }, [user, isExpired]);

  // refresh every 2 minutes to catch expiration
  useEffect(() => {
    const id = setInterval(() => refresh(), 120000);
    return () => clearInterval(id);
  }, [refresh]);

  async function handleProceed() {
    try {
      await logoutUser();
    } catch {}
    setOpen(false);
    navigate('/login', {
      replace: true,
      state: { reason: 'password-expired', from: location.pathname },
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-5 text-slate-900 shadow-2xl">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          Password expired
        </h3>
        <p className="text-sm mb-4">
          Your password has reached the 90-day limit. Please reset it to
          continue using IntelliDGA.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate('/forgot-password')}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm"
          >
            Reset password
          </button>
          <button
            onClick={handleProceed}
            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-900 text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
