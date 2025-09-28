// frontend/src/components/ExpiryWatcher.jsx
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { logoutUser } from '../services/api';

export default function ExpiryWatcher() {
  const { user, isExpired, refresh } = useAuthStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const actedRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => refresh(), 60_000);
    return () => clearInterval(id);
  }, [user, refresh]);

  useEffect(() => {
    const onFocus = () => refresh();
    window.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
    };
  }, [refresh]);

  useEffect(() => {
    if (!user) return;
    if (!isExpired) {
      actedRef.current = false;
      return;
    }
    if (isExpired && !actedRef.current) {
      actedRef.current = true;
      (async () => {
        try {
          await logoutUser();
        } catch {}
        // 🔔 tell the app auth changed (Header/useAuthStatus will clear user)
        window.dispatchEvent(new Event('auth:changed'));
        // 👇 also clear UI immediately in case a component cached user
        try {
          // quick localStorage/sessionStorage cleanup if you store anything (optional)
          // localStorage.removeItem("authUser");
        } catch {}
        // redirect to login with a clear reason + where they were
        navigate('/login', {
          replace: true,
          state: { reason: 'password-expired', from: location.pathname },
        });
      })();
    }
  }, [user, isExpired, navigate, location.pathname]);

  return null;
}
