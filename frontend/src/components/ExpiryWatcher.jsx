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
  const bcRef = useRef(null);

  // Set up a cross-tab channel so other tabs react immediately
  useEffect(() => {
    // BroadcastChannel is widely supported in modern browsers
    try {
      bcRef.current = new BroadcastChannel('intelliDGA-auth');
      const onMsg = (ev) => {
        if (ev?.data?.type === 'auth:changed') {
          refresh();
        }
      };
      bcRef.current.addEventListener('message', onMsg);
      return () => bcRef.current?.removeEventListener('message', onMsg);
    } catch {
      // no-op if not supported
    }
  }, [refresh]);

  // Poll every 60s when logged in
  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => refresh(), 60_000);
    return () => clearInterval(id);
  }, [user, refresh]);

  // Refresh on tab focus/visibility
  useEffect(() => {
    const onFocusOrVisible = () => refresh();
    window.addEventListener('focus', onFocusOrVisible);
    document.addEventListener('visibilitychange', onFocusOrVisible);
    return () => {
      window.removeEventListener('focus', onFocusOrVisible);
      document.removeEventListener('visibilitychange', onFocusOrVisible);
    };
  }, [refresh]);

  // Auto-logout & redirect once when password is expired
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
        } catch {
          // ignore network error; we still clear client state
        }

        // Tell the rest of the app/tabs
        window.dispatchEvent(new Event('auth:changed'));
        try {
          bcRef.current?.postMessage({ type: 'auth:changed' });
        } catch {}

        // Hard redirect to login with a clear reason; Login.jsx will open the modal
        const from = encodeURIComponent(location.pathname + location.search);
        navigate(`/login?reason=password-expired&from=${from}`, {
          replace: true,
        });
      })();
    }
  }, [user, isExpired, navigate, location.pathname, location.search]);

  return null;
}
