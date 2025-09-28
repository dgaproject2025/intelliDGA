// frontend/src/components/AuthChoiceModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthChoiceModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-end bg-black/40 backdrop-blur-sm">
      <div
        className="m-6 w-full max-w-sm rounded-xl shadow-2xl 
                   bg-white dark:bg-slate-900 
                   text-slate-900 dark:text-slate-100
                   animate-slide-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold">Welcome to IntelliDGA</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6 space-y-4">
          <p className="text-sm leading-relaxed">
            Do you already have an IntelliDGA account?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white 
                         hover:bg-blue-700 transition font-medium shadow-md"
            >
              Yes, Sign In
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/signup');
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white 
                         hover:bg-green-700 transition font-medium shadow-md"
            >
              No, Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
