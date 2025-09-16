import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component with navigation links.
 * Includes a placeholder for the application logo and user profile/logout actions.
 */
const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Application logo or name */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        intelliDGA
      </Link>

      {/* Navigation links */}
      <nav className="flex items-center gap-4 text-sm">
        <Link to="/" className="text-gray-700 hover:underline">Home</Link>
        <Link to="/equipment" className="text-gray-700 hover:underline">Equipment</Link>
        <Link to="/analysis" className="text-gray-700 hover:underline">Analysis</Link>
        <Link to="/history" className="text-gray-700 hover:underline">History</Link>
        <Link to="/report" className="text-gray-700 hover:underline">Report</Link>
        <Link to="/documentation" className="text-gray-700 hover:underline">Docs</Link>
        <Link to="/data-input" className="text-gray-700 hover:underline">Data Input</Link>
        <Link to="/profile" className="text-gray-700 hover:underline">Profile</Link>
        {/* Logout simply redirects to login for now */}
        <Link to="/login" className="text-gray-700 hover:underline">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;