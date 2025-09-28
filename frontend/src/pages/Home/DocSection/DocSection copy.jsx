import React, { useState } from 'react';

import {
  BeakerIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  CircleStackIcon,
  KeyIcon,
  ScaleIcon,
  DocumentTextIcon,
  CubeTransparentIcon,
  ViewfinderCircleIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

// Import the dedicated content component
import GasFormationContent from './GasFormation/GasFormationContent';
import FaultTypeContent from './FaultType/FaultTypeContent';
import KeyGasRatioContent from './KeyGasRatio/KeyGasRatioContent';
import ConventionalMethodsContent from './ConventionalMethod/ConventionalMethodsContent';

const docTopics = [
  {
    id: 1,
    title: 'Gas Formation',
    icon: <BeakerIcon className="w-5 h-5" />,
    // We reference the imported component here.
    component: <GasFormationContent />,
  },
  {
    id: 2,
    title: 'Type of Faults',
    icon: <ExclamationTriangleIcon className="w-5 h-5" />,
    component: <FaultTypeContent />,
  },
  {
    id: 3,
    title: 'Key Gas Ratios',
    icon: <ScaleIcon className="w-5 h-5" />,
    // UPDATED: Replaced the placeholder with the new component
    component: <KeyGasRatioContent />,
  },
  {
    id: 4,
    title: 'Conventional Methods',
    icon: <CircleStackIcon className="w-5 h-5" />,
    component: <ConventionalMethodsContent />,
  },
  { id: 5, title: 'The Key Gas Method', icon: <KeyIcon className="w-5 h-5" /> },
  {
    id: 6,
    title: 'Dornenburg Ratio',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    id: 7,
    title: 'Rogers Ratio',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  { id: 8, title: 'IEC Ratio', icon: <DocumentTextIcon className="w-5 h-5" /> },
  {
    id: 9,
    title: 'Three Ratio Method',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    id: 10,
    title: 'Duval Triangle',
    icon: <ChartPieIcon className="w-5 h-5" />,
    content: {
      heading: 'A Graphical Diagnostic Tool',
      description:
        'The Duval Triangle is an internationally recognized graphical method that uses the relative concentrations of methane ($CH_4$), ethylene ($C_2H_4$), and acetylene ($C_2H_2$) to visually diagnose the type of fault.',
      points: [
        '<strong>Principle:</strong> Maps the percentage of each gas onto a triangular plot with defined fault zones.',
        '<strong>Fault Zones:</strong> Includes PD, Thermal Faults (T1, T2, T3), and Discharges (D1, D2).',
        '<strong>Advantage:</strong> Provides a simple, powerful, and highly effective visual diagnosis.',
      ],
    },
  },
  {
    id: 11,
    title: 'Duval Pentagon',
    icon: <CubeTransparentIcon className="w-5 h-5" />,
  },
  {
    id: 12,
    title: 'Gouda Triangle',
    icon: <ChartPieIcon className="w-5 h-5" />,
  },
  {
    id: 13,
    title: 'LED Triangle',
    icon: <ViewfinderCircleIcon className="w-5 h-5" />,
  },
  {
    id: 14,
    title: 'Mansour Pentagon',
    icon: <CubeTransparentIcon className="w-5 h-5" />,
  },
  {
    id: 15,
    title: 'Heptagon Graph',
    icon: <PuzzlePieceIcon className="w-5 h-5" />,
  },
];

const DocSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  const activeTopic = docTopics.find((topic) => topic.id === activeTab);

  const animationStyle = `@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.6s ease-in-out; }`;

  return (
    <section className="relative bg-slate-50 dark:bg-black py-20 sm:py-28 overflow-hidden">
      <style>{animationStyle}</style>

      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 ">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-sky-100 to-blue-200 blur-3xl opacity-40 dark:opacity-20" />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-100 to-orange-200 blur-3xl opacity-40 dark:opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 text-transparent bg-clip-text">
            Explore DGA Methodologies
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            An interactive guide to the principles and methods of Dissolved Gas
            Analysis.
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <nav className="border-b border-slate-200/80 dark:border-slate-800/80">
            <style>{`.tabs-scrollbar::-webkit-scrollbar { height: 0px; }`}</style>
            <div className="flex overflow-x-auto p-2 tabs-scrollbar">
              {docTopics.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 flex-shrink-0 whitespace-nowrap px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
                    activeTab === tab.id
                      ? 'bg-sky-50 dark:bg-slate-800/80 text-[#1f75fe]'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center min-h-[450px]">
            <div className="hidden md:flex justify-center items-center p-6 bg-gradient-to-br from-sky-100 to-blue-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl h-48 w-48 mx-auto shadow-lg">
              <div className="text-[#1f75fe] dark:text-sky-300">
                {activeTopic &&
                  React.cloneElement(activeTopic.icon, {
                    className: 'w-24 h-24',
                  })}
              </div>
            </div>

            <div className="md:col-span-2">
              <div key={activeTab} className="animate-fadeIn">
                {/* ============================================================= */}
                {/* CORRECTED: This logic now correctly renders the component */}
                {/* ============================================================= */}
                {activeTopic?.component ? (
                  activeTopic.component
                ) : (
                  // Fallback for topics without a dedicated component
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {activeTopic?.content?.heading || 'Content Coming Soon'}
                    </h3>
                    <p className="mt-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {activeTopic?.content?.description ||
                        `Detailed information for the "${activeTopic?.title}" method is being prepared.`}
                    </p>
                    {/* CORRECTED: This list rendering is now fixed */}
                    {activeTopic?.content?.points && (
                      <ul className="mt-6 space-y-4">
                        {activeTopic.content.points.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg
                                className="h-5 w-5 text-[#1f75fe]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span
                              className="ml-3 text-gray-700 dark:text-gray-300"
                              dangerouslySetInnerHTML={{ __html: point }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocSection;
