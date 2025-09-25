import { useEffect, useState, useCallback } from 'react';
import { getMe } from '../services/api';

export default function useAuthStatus() {
  const [user, setUser] = useState(null);
  const [mustReset, setMustReset] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [passwordLastChanged, setPasswordLastChanged] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await getMe();
      setUser(res?.user || null);
      setMustReset(Boolean(res?.mustReset));
      setIsExpired(Boolean(res?.isExpired));
      setShowWarning(Boolean(res?.showWarning));
      setDaysLeft(res?.daysLeft ?? null);
      //setPasswordLastChanged(res?.passwordLastChanged || null);
      setPasswordLastChanged(res?.user?.passwordLastChanged || null);
    } catch {
      setUser(null);
      setMustReset(false);
      setIsExpired(false);
      setShowWarning(false);
      setDaysLeft(null);
      setPasswordLastChanged(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('auth:changed', handler);
    return () => window.removeEventListener('auth:changed', handler);
  }, [refresh]);

  return {
    user,
    mustReset,
    isExpired,
    showWarning,
    daysLeft,
    passwordLastChanged,
    loading,
    refresh,
  };
}
