// frontend/src/components/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../services/api';

export default function RequireAuth() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await getMe();
        setUser(res?.user || null);
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) return <div className="p-6 text-center">Loading...</div>;

  if (!user) {
    // pass redirect info; let Login page show a toast once
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, reason: 'auth-required' }}
      />
    );
  }

  return <Outlet context={{ user }} />;
}
