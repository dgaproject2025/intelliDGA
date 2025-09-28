// frontend/src/components/PasswordExpiryModal.jsx
import React, { useEffect } from 'react';

/**
 * Unified Password Expiry Modal (bottom-right)
 *
 * Props:
 *  - open: boolean
 *  - variant: "warning" | "expired"
 *  - daysLeft?: number
 *  - lastChanged?: string (ISO)
 *  - onClose?: () => void
 *  - onReset?: () => void
 */
export default function PasswordExpiryModal({
  open,
  variant = 'warning',
  daysLeft,
  lastChanged,
  onClose,
  onReset,
}) {
  const isWarning = variant === 'warning';
  const title = isWarning ? 'Password expiry warning' : 'Password expired';

  const line1 = isWarning
    ? `Your password is about to expire in ${Math.max(
        0,
        Number(daysLeft ?? 0)
      )} day${Number(daysLeft) === 1 ? '' : 's'}.`
    : 'Your password has reached the 90-day limit and is now expired.';

  const line2 = isWarning
    ? 'For your security and to continue full access to IntelliDGA, please proceed to reset your password.'
    : 'Please reset it now to continue accessing IntelliDGA.';

  const lastChangedStr = lastChanged
    ? new Date(lastChanged).toLocaleDateString()
    : null;

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pw-exp-title"
      // ⬇️ Position the modal tray at bottom-right, keep the dim/backdrop
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm
                 flex items-end justify-end p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="w-[min(92vw,560px)] rounded-2xl shadow-2xl overflow-hidden
                   border border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-900 animate-[modalPop_.18s_ease-out]"
      >
        {/* Top gradient strip */}
        <div
          className={`h-1.5 bg-gradient-to-r ${
            isWarning
              ? 'from-amber-500 via-amber-600 to-amber-700'
              : 'from-red-500 via-red-600 to-red-700'
          }`}
        />

        {/* Header */}
        <div
          className={`px-5 py-3 flex items-center gap-3 ${
            isWarning ? 'bg-amber-600/90' : 'bg-red-600/90'
          } text-white`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            {isWarning ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" />
                <path d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 10V8a6 6 0 1 1 12 0v2" />
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M12 14v3" />
              </svg>
            )}
          </span>
          <h2 id="pw-exp-title" className="text-base font-semibold">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-slate-800 dark:text-slate-100">
          <p className="text-sm leading-relaxed">{line1}</p>
          <p className="text-sm leading-relaxed mt-1">{line2}</p>

          {lastChangedStr && (
            <div
              className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3
                         bg-slate-50 dark:bg-slate-800/50 text-sm"
            >
              <span className="text-slate-500 dark:text-slate-300">
                Last changed on:{' '}
              </span>
              <span className="font-medium">{lastChangedStr}</span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600
                         hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose?.();
                onReset?.();
              }}
              className={`px-4 py-2 rounded-lg text-white shadow-sm ${
                isWarning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes modalPop {
          from { transform: translateY(6px) scale(.98); opacity: 0 }
          to   { transform: translateY(0)   scale(1);    opacity: 1 }
        }
      `}</style>
    </div>
  );
}
