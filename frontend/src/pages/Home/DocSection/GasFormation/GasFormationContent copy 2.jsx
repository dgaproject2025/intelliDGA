import React, { useState } from 'react';

import StickyTitledPanel from './StickyTitledPanel';
import ChemistryOfGasFormation from './ChemistryOfGasFormation';
import GasFormationMechanism from './GasFormationMechanism';

// ====================================================================================
// ICON Component (Unchanged)
// ====================================================================================
const GasFormationIcon = () => {
  // ... SVG code for the beaker icon remains here, unchanged ...
  return (
    <div className="w-8 h-full flex items-center justify-center">
      {/* --- Light Theme Icon --- */}
      <svg
        className="w-full h-full block dark:hidden"
        viewBox="0 0 32 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M25 195H7a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v186a2 2 0 01-2 2z"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <rect x="7" y="100" width="18" height="93" fill="#e0f2fe" />
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
        <path
          d="M25 195H7a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v186a2 2 0 01-2 2z"
          stroke="#64748b"
          strokeWidth="2"
        />
        <rect x="7" y="100" width="18" height="93" fill="#1e293b" />
        <circle cx="12" cy="140" r="2" fill="#7dd3fc" />
        <circle cx="20" cy="160" r="1.5" fill="#7dd3fc" />
        <circle cx="15" cy="120" r="2.5" fill="#7dd3fc" />
        <circle cx="18" cy="180" r="1" fill="#e0f2fe" />
        <circle cx="11" cy="165" r="1.2" fill="#e0f2fe" />
      </svg>
    </div>
  );
};

// ====================================================================================
// CONTENT CARD AND DEFINITIONS (Unchanged)
// ====================================================================================
const ContentCard = ({ title, children }) => (
  // ADD h-full here to ensure the card takes up the full height of the main area
  <div className="bg-blue-300 dark:bg-blue-100 h-full p-8 shadow-lg dark:shadow-blue-900/20 ring-1 ring-sky-200 dark:ring-sky-900 transition-all duration-300">
    <h1 className="text-center dark:text-slate-800 text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-700 dark:from-blue-400 dark:to-sky-00 text-transparent bg-clip-text mb-6">
      {title}
    </h1>
    <div className="text-slate-600 dark:text-slate-800 text-lg space-y-4">
      {children}
    </div>
  </div>
);
const ChemistryContent = () => (
  <ContentCard title="The Chemistry of Gas Formation">
    <ChemistryOfGasFormation />
  </ContentCard>
);
const MechanismContent = () => (
  <ContentCard title="Gas Formation Mechanism">
    <GasFormationMechanism />
  </ContentCard>
);
const SourcesContent = () => (
  <ContentCard title="Primary Sources of Dissolved Gases">
    {/* ... content unchanged ... */}
  </ContentCard>
);
const TemperatureContent = () => (
  <ContentCard title="Relationship Between Gas & Temperature">
    {/* ... content unchanged ... */}
  </ContentCard>
);
const ConcentrationsContent = () => (
  <ContentCard title="Relative Gas Concentrations vs. Fault Types">
    {/* ... content unchanged ... */}
  </ContentCard>
);
const SpecificFaultsContent = () => (
  <ContentCard title="Gases Associated with Specific Faults">
    {/* ... content unchanged ... */}
  </ContentCard>
);

// ====================================================================================
// MAIN LAYOUT COMPONENT (Default Export) - UPDATED
// ====================================================================================
const DgaTopicsLayout = () => {
  const topics = [
    { id: 'chemistry', title: 'The Chemistry of Gas Formation' },
    { id: 'mechanism', title: 'Gas Formation Mechanism' },
    { id: 'sources', title: 'Primary Sources of Dissolved Gases' },
    { id: 'temperature', title: 'Relationship Between Gas & Temperature' },
    {
      id: 'concentrations',
      title: 'Relative Gas Concentrations vs. Fault Types',
    },
    { id: 'specificFaults', title: 'Gases Associated with Specific Faults' },
  ];

  const [activeTopic, setActiveTopic] = useState(topics[0].id);

  const renderContent = () => {
    switch (activeTopic) {
      case 'chemistry':
        return <ChemistryContent />;
      case 'mechanism':
        return <MechanismContent />;
      case 'sources':
        return <SourcesContent />;
      case 'temperature':
        return <TemperatureContent />;
      case 'concentrations':
        return <ConcentrationsContent />;
      case 'specificFaults':
        return <SpecificFaultsContent />;
      default:
        return <ChemistryContent />;
    }
  };

  return (
    // 1. Set the overall container to flex and take up the whole screen height (min-h-screen)
    <div className="flex w-full min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-500 dark:text-slate-800">
      {/* 2. Navigation Container: Fixed height and its own scrolling */}
      <nav
        className="w-80 flex-shrink-0 bg-blue-500 dark:bg-blue-600 p-4 border-r border-slate-800 dark:border-slate-200 
                   max-h-screen overflow-y-auto" // <-- ADDED: max-h-screen and overflow-y-auto
      >
        {/* Navigation header/title - stays at the top */}
        <div className="p-4 mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">
            Gas Formation
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-800">
            Core Concepts in DGA
          </p>
        </div>

        {/* Topic List - will scroll if it exceeds max-height */}
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-semibold text-left ${
                  activeTopic === topic.id
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'
                    : 'text-slate-600 dark:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-200'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all flex-shrink-0 ${
                    activeTopic === topic.id
                      ? 'bg-blue-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                ></span>

                <span className="whitespace-normal">{topic.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Main Content Area: Fixed height and its own scrolling */}
      <main
        className="flex-1 overflow-y-auto max-h-screen h-full" // <-- ADDED: max-h-screen and flex-1 already set
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default DgaTopicsLayout;
