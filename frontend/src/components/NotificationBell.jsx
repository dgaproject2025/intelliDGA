import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell({
  showWarning,
  daysLeft,
  passwordLastChanged,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Render nothing unless in warning window
  if (!showWarning || !daysLeft || daysLeft <= 0) return null;

  const dateStr = passwordLastChanged
    ? new Date(passwordLastChanged).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="relative">
      <button
        aria-label="Password expiry notification"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex items-center justify-center h-9 w-9 rounded-full
                   bg-red-600 text-white hover:bg-red-500 transition"
      >
        {/* Bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                   6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 
                   8 7.388 8 8.75V14.158c0 .538-.214 1.055-.595 
                   1.437L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full px-1">
          {daysLeft}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-700 bg-white text-slate-900 shadow-xl z-50">
          <div className="p-4">
            <h4 className="font-semibold text-red-600 mb-2">
              Password expiring soon
            </h4>
            <p className="text-sm mb-2">
              Your password will expire in <b>{daysLeft}</b> day
              {daysLeft === 1 ? '' : 's'}.
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Last changed on {dateStr}
            </p>

            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full bg-red-600 text-white text-sm py-1.5 rounded-lg"
            >
              Reset password now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
