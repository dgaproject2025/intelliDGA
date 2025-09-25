import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMe } from '../services/api';
import { useToast } from './useToast';

export default function usePasswordExpiryGuard() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    async function checkExpiry() {
      try {
        const res = await getMe();
        if (!cancelled && res?.mustReset) {
          // Avoid looping if you're already on reset or forgot pages
          const path = location.pathname || '';
          const onResetPages =
            path.startsWith('/reset-password') ||
            path.startsWith('/forgot-password');

          if (!onResetPages) {
            toast.error(
              'Your password has expired. Please reset it to continue.'
            );
            navigate('/forgot-password', { replace: true });
          }
        }
      } catch {
        // not logged in or /me failed → ignore
      }
    }

    checkExpiry();

    // re-check when auth changes
    const handler = () => checkExpiry();
    window.addEventListener('auth:changed', handler);

    return () => {
      cancelled = true;
      window.removeEventListener('auth:changed', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
}
