import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getMe, logoutUser } from '../services/api';
import Toast from './Toast';

function useClickOutside(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [onClose]);
  return ref;
}

export default function UserMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const panelRef = useClickOutside(() => setOpen(false));
  const [toast, setToast] = useState('');

  const refreshUser = async () => {
    try {
      const res = await getMe();
      setUser(res?.user || null);
    } catch {
      setUser(null);
    }
  };

  // 1) Initial fetch
  useEffect(() => {
    refreshUser();
  }, []);

  // 2) Refetch on route change (e.g., after navigate("/"))
  useEffect(() => {
    refreshUser();
  }, [location.pathname]);

  // 3) Refetch when we open the menu
  useEffect(() => {
    if (open) refreshUser();
  }, [open]);

  // 4) Refetch when auth state changes (from Login/Signup)
  useEffect(() => {
    const handler = () => refreshUser();
    window.addEventListener('auth:changed', handler);
    return () => window.removeEventListener('auth:changed', handler);
  }, []);

  const initial = user?.fullName?.trim()?.[0]?.toUpperCase() || null;

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setOpen(false);
    setToast('Logout Successful !');
    navigate('/'); // go to Home (your router uses "/" as Home)
  };

  // The icon button (left: default, right: initial when logged in)
  const Icon = () => (
    <button
      aria-label="User menu"
      onClick={() => setOpen((v) => !v)}
      className="relative inline-flex items-center justify-center h-9 w-9 rounded-full 
                 bg-slate-700 text-white hover:bg-slate-600 transition"
    >
      {initial ? (
        <span className="font-semibold">{initial}</span>
      ) : (
        // default silhouette
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-90"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.91-8 6.5V22h16v-1.5C20 16.91 16.418 14 12 14z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="relative">
      <Icon />

      {/* Top-right panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-700 bg-black/95 text-slate-100 shadow-xl z-50"
          role="menu"
          aria-label="User menu"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-3 border-b border-slate-800">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold">
              {initial || '?'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {user ? user.fullName : 'Guest'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user ? user.email : 'Not signed in'}
              </p>
            </div>
          </div>

          {/* Actions */}
          {!user ? (
            <div className="p-2">
              <Link
                to="/signup"
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                Log in
              </Link>
            </div>
          ) : (
            <div className="p-2">
              <Link
                to="/profile"
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                onClick={handleLogout}
                role="menuitem"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Logout toast (bottom-left) */}
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
