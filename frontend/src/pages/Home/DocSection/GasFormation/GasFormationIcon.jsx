import React from 'react';

const GasFormationIcon = () => {
  return (
    <div className="w-8 h-full flex items-center justify-center">
      {/* This component uses two different SVG designs.
        Tailwind's dark mode classes are used to automatically
        show the correct icon based on the user's theme.
      */}

      {/* --- Light Theme Icon --- */}
      <svg
        className="w-full h-full block dark:hidden"
        viewBox="0 0 32 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Beaker Outline */}
        <path
          d="M25 195H7a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v186a2 2 0 01-2 2z"
          stroke="#94a3b8" // slate-400
          strokeWidth="2"
        />
        {/* Liquid inside beaker */}
        <rect x="7" y="100" width="18" height="93" fill="#e0f2fe" />
        {/* Rising Bubbles */}
        <circle cx="12" cy="140" r="2" fill="#38bdf8" />
        <circle cx="20" cy="160" r="1.5" fill="#38bdf8" />
        <circle cx="15" cy="120" r="2.5" fill="#38bdf8" />
        <circle cx="18" cy="180" r="1" fill="#38bdf8" />
        <circle cx="11" cy="165" r="1.2" fill="#38bdf8" />
      </svg>

      {/* --- Dark Theme Icon --- */}
      <svg
        className="w-full h-full hidden dark:block"
        viewBox="0 0 32 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Beaker Outline */}
        <path
          d="M25 195H7a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v186a2 2 0 01-2 2z"
          stroke="#64748b" // slate-500
          strokeWidth="2"
        />
        {/* Liquid inside beaker */}
        <rect x="7" y="100" width="18" height="93" fill="#1e293b" />
        {/* Glowing Bubbles */}
        <circle cx="12" cy="140" r="2" fill="#7dd3fc" />
        <circle cx="20" cy="160" r="1.5" fill="#7dd3fc" />
        <circle cx="15" cy="120" r="2.5" fill="#7dd3fc" />
        <circle cx="18" cy="180" r="1" fill="#e0f2fe" />
        <circle cx="11" cy="165" r="1.2" fill="#e0f2fe" />
      </svg>
    </div>
  );
};

export default GasFormationIcon;
