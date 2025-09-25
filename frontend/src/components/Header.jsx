import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import useAuthStatus from '../hooks/useAuthStatus';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const Header = () => {
  const { showWarning, daysLeft, passwordLastChanged } = useAuthStatus();
  const linkBase =
    'px-2 py-1 rounded text-sm text-slate-200 hover:text-white hover:bg-slate-700/50';
  const active = 'px-2 py-1 rounded text-sm text-white bg-slate-700';

  return (
    <header className="bg-black/95 backdrop-blur sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo (left) */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="IntelliDGA logo" className="h-12 w-auto" />
        </Link>

        {/* Nav links (center/right) */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Home
          </NavLink>
          <NavLink
            to="/equipment"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Equipment
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Analysis
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            History
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Report
          </NavLink>
          <NavLink
            to="/documentation"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Docs
          </NavLink>
          <NavLink
            to="/data-input"
            className={({ isActive }) => (isActive ? active : linkBase)}
          >
            Data Input
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* 🔔 Bell left of user icon */}
          <NotificationBell
            showWarning={showWarning}
            daysLeft={daysLeft}
            passwordLastChanged={passwordLastChanged}
          />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
