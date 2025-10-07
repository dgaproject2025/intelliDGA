// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Home,
  Cpu,
  BarChart2,
  Clock,
  FileText,
  BookOpen,
  Database,
} from 'lucide-react'; // install via: npm install lucide-react
import Logo from '../assets/logo.svg';
import useAuthStatus from '../hooks/useAuthStatus';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';
import AuthChoiceModal from './AuthChoiceModal';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="inline-flex items-center justify-center h-9 w-9 rounded-full
                 border border-white/20 text-white bg-white/20
                 hover:bg-white/30 transition
                 dark:border-slate-700 dark:text-amber-300 dark:bg-slate-800 dark:hover:bg-slate-700"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        // ☀️ Sun
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zM19.66 19.78l-1.8-1.79 1.42-1.42 1.79 1.8-1.41 1.41zM12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        // 🌙 Moon
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

const Header = () => {
  const { user, showWarning, daysLeft, passwordLastChanged } = useAuthStatus();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const linkBase =
    'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium text-white/90 hover:text-white hover:bg-white/20 transition';
  const active =
    'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-semibold text-white bg-white/30';

  return (
    <header className="bg-[#1f75fe] h-20 dark:bg-slate-900 fixed top-0 left-0 inset-x-0 z-50 shadow-md border-b border-blue-700/40 dark:border-slate-700 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo (left) */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="IntelliDGA logo" className="h-14 w-auto" />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <Home className="h-4 w-4" /> Home
          </NavLink>
          <NavLink
            to="/equipment"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <Cpu className="h-4 w-4" /> Equipment
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <BarChart2 className="h-4 w-4" /> Analysis
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <Clock className="h-4 w-4" /> History
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <FileText className="h-4 w-4" /> Report
          </NavLink>
          <NavLink
            to="/documentation"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <BookOpen className="h-4 w-4" /> Docs
          </NavLink>
          <NavLink
            to="/data-input"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            <Database className="h-4 w-4" /> Data Input
          </NavLink>
        </nav>

        {/* Actions (right side) */}
        <div className="flex items-center gap-7">
          <ThemeToggle />
          {!user ? (
            <>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition"
              >
                Sign In / Sign Up
              </button>
              <AuthChoiceModal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
              />
            </>
          ) : (
            <>
              <NotificationBell
                show={showWarning}
                daysLeft={daysLeft}
                lastChanged={passwordLastChanged}
              />
              <UserMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
