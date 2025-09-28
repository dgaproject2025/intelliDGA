// frontend/src/components/PasswordHelp.jsx
import { Link } from 'react-router-dom';

export default function PasswordHelp() {
  return (
    <div className="fixed right-4 bottom-4 z-[900]">
      <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 shadow-lg">
        <p className="text-sm text-slate-700 dark:text-slate-200">
          Trouble signing in?{' '}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Reset password
          </Link>
        </p>
      </div>
    </div>
  );
}
