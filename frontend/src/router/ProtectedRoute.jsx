import { Navigate, useLocation } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

const OPEN_WHEN_EXPIRED = new Set([
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
]);

export default function ProtectedRoute({ children }) {
  const { user, isExpired, loading } = useAuthStatus();
  const location = useLocation();

  if (loading) return null; // or a spinner

  // Not logged in → redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, reason: 'auth-required' }}
      />
    );
  }

  // Logged in but expired → block everything except whitelist
  if (isExpired && !OPEN_WHEN_EXPIRED.has(location.pathname)) {
    return (
      <Navigate
        to="/forgot-password"
        replace
        state={{ reason: 'password-expired' }}
      />
    );
  }

  return children;
}
