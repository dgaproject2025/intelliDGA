// frontend/src/components/ModalShell.jsx
export default function ModalShell({
  open,
  onClose,
  title,
  children,
  className = '',
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-end p-4 sm:p-6
                 bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        // close only if clicked on the overlay
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={`w-full max-w-md sm:max-w-lg bg-white dark:bg-slate-900
                    text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl
                    border border-slate-200/70 dark:border-slate-700/60
                    animate-[slideIn_.25s_ease-out] ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {title ? (
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close"
              title="Close"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="2" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        ) : null}

        <div className="px-5 py-4">{children}</div>
      </div>

      {/* slide-in keyframes */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(12px); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }
      `}</style>
    </div>
  );
}
