import React from 'react';

const StickyTitledPanel = ({ title, children, maxHeight = '75vh' }) => {
  return (
    <div
      className="shadow-lg dark:shadow-blue-900/20 ring-1 ring-sky-200 dark:ring-sky-900 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ maxHeight }}
    >
      {/* Make THIS the scroll container */}
      <div className="relative overflow-y-auto h-full">
        {/* Sticky Title Bar */}
        <div className="sticky top-0 z-10">
          <div className="bg-blue-300/90 dark:bg-blue-100/90 backdrop-blur px-8 pt-8 pb-4 border-b border-sky-200/70 dark:border-sky-900/40">
            <h1 className="text-center dark:text-slate-800 text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-700 dark:from-blue-400 dark:to-sky-00 text-transparent bg-clip-text">
              {title}
            </h1>
          </div>
        </div>

        {/* Body (same look as your original div) */}
        <div className="bg-blue-300 dark:bg-blue-100 h-full p-8 text-slate-600 dark:text-slate-800 text-lg space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StickyTitledPanel;
