// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer/Footer';

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
import PasswordHelp from './pages/PasswordHelp';

import useAuthStatus from './hooks/useAuthStatus';
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
  // (kept to preserve existing behavior if you use these elsewhere)
  const { mustReset, isExpired, showWarning, daysLeft } = useAuthStatus();

  return (
    /**
     * Layout:
     * - Header is fixed at top (assumed h-20).
     * - Main takes remaining space (flex-1) so Footer sits at bottom after content.
     * - We now use 'page-offset' class for padding when required.
     */
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors">
      {/* Auto-logout/watchdog */}
      <ExpiryWatcher />

      {/* Fixed header (make sure your Header has h-20 for 80px height) */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          {/* Global page-level padding is removed from here. */}
          <Routes>
            {/* Public */}
            <Route
              path="/"
              element={
                <div className="pt-20 px-0 py-0">
                  <Home />
                </div>
              }
            />{' '}
            <Route
              path="/login"
              element={
                <div className="pt-20 px-0 py-8">
                  <Login />
                </div>
              }
            />{' '}
            <Route
              path="/signup"
              element={
                <div className="pt-20 px-0 py-8">
                  <Signup />
                </div>
              }
            />{' '}
            {/* Single page handles both reset + forgot flows */}
            <Route
              path="/forgot-password"
              element={
                <div className="pt-20 px-0 py-8">
                  <PasswordHelp />
                </div>
              }
            />{' '}
            <Route
              path="/reset-password"
              element={
                <div className="pt-20 px-0 py-8">
                  <PasswordHelp />
                </div>
              }
            />{' '}
            {/* Protected (blocked if expired) */}
            <Route
              path="/equipment"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <Equipment />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <Analysis />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <History />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <Report />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentation"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <Documentation />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-input"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <DataInputPortal />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="pt-20 px-0 py-8">
                    <UserProfile />
                  </div>{' '}
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer always directly after content */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
