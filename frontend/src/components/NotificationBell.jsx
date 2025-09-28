// frontend/src/components/NotificationBell.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalShell from './ModalShell';

function ExpiryDialog({ open, onClose, daysLeft, lastChanged }) {
  const navigate = useNavigate();
  if (!open) return null;

  const goReset = (e) => {
    e.preventDefault();
    onClose?.(); // close first (match Signin/Signup behavior)
    navigate('/forgot-password', { replace: false });
  };

  const titleTone =
    daysLeft >= 4 && daysLeft <= 7
      ? 'text-amber-600'
      : daysLeft <= 1
      ? 'text-red-600'
      : 'text-orange-600';

  return (
    <ModalShell open={open} onClose={onClose} title="Password reminder">
      <div className="space-y-3">
        <p className={`text-sm font-medium ${titleTone}`}>
          Your password will expire in{' '}
          <span className="font-bold">
            {Math.max(0, daysLeft)} day{daysLeft === 1 ? '' : 's'}
          </span>
          .
        </p>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Last changed on:{' '}
          <span className="font-semibold">
            {lastChanged
              ? new Date(lastChanged).toLocaleDateString()
              : 'Unknown'}
          </span>
          .
        </p>

        <div className="pt-2 flex justify-end gap-2">
          <button
            onClick={goReset}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600
                       text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export default function NotificationBell({ show, daysLeft, lastChanged }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!show && open) setOpen(false);
  }, [show, open]);

  if (!show) return null;

  // red bell + pulsing badge (unchanged)
  return (
    <div className="relative">
      <button
        aria-label="Password expiry notifications"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-full
                   text-red-600 hover:text-red-700 transition hover:scale-110 hover:drop-shadow-md"
        title={`Password expires in ${Math.max(0, daysLeft)} day${
          daysLeft === 1 ? '' : 's'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" />
        </svg>

        <span
          className="absolute -top-1 -right-2 bg-red-600 text-white 
                     text-[11px] font-bold rounded-full px-1.5 py-0.5
                     animate-pulse ring-2 ring-white dark:ring-slate-900"
        >
          {Math.max(0, daysLeft)}
        </span>
      </button>

      <ExpiryDialog
        open={open}
        onClose={() => setOpen(false)}
        daysLeft={daysLeft}
        lastChanged={lastChanged}
      />
    </div>
  );
}
