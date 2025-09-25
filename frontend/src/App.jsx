// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Equipment from './pages/Equipment';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Report from './pages/Report';
import Documentation from './pages/Documentation';
import DataInputPortal from './pages/DataInputPortal';
import UserProfile from './pages/UserProfile';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import useAuthStatus from './hooks/useAuthStatus';
//import PasswordExpiryBanner from './components/PasswordExpiryBanner';
import ProtectedRoute from './router/ProtectedRoute';

import ExpiryWatcher from './components/ExpiryWatcher';

function App() {
  return (
    <Router>
      <PasswordGuardedApp />
    </Router>
  );
}

function PasswordGuardedApp() {
  //const { mustReset, isExpired } = useAuthStatus();
  const { mustReset, isExpired, showWarning, daysLeft } = useAuthStatus();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 👇 auto-logout watcher */}
      <ExpiryWatcher />
      <Header />
      <main className="flex-grow bg-gray-50 px-4 py-8">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected (blocked if expired) */}
          <Route
            path="/equipment"
            element={
              <ProtectedRoute>
                <Equipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documentation"
            element={
              <ProtectedRoute>
                <Documentation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-input"
            element={
              <ProtectedRoute>
                <DataInputPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
