import React, { useState } from 'react';

import {
  ScaleIcon,
  KeyIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ChartPieIcon,
  CubeTransparentIcon,
  ChartBarSquareIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';

import TechniquesComparisonTable from './TechniquesComparisonTable'; // <-- NEW: Import the table component
import MethodAdvantages from './MethodProsConsContent'; // <-- NEW: Import the pros/cons component

// Data for the method category cards
const ratioMethods = [
  { name: 'The Key Gas Method', icon: <KeyIcon className="w-8 h-8" /> },
  {
    name: 'The Doornenburg Ratio Method',
    icon: <CalculatorIcon className="w-8 h-8" />,
  },
  {
    name: 'The Rogers Ratio Method',
    icon: <CalculatorIcon className="w-8 h-8" />,
  },
  {
    name: 'The IEC Ratio Method',
    icon: <DocumentTextIcon className="w-8 h-8" />,
  },
  {
    name: 'The Three Ratio Techniques',
    icon: <ScaleIcon className="w-8 h-8" />,
  },
];
const graphicalMethods = [
  {
    name: 'The Duval Triangle 1 Method',
    icon: <ChartPieIcon className="w-8 h-8" />,
  },
  {
    name: 'The Duval Triangle 4 Method',
    icon: <ChartPieIcon className="w-8 h-8" />,
  },
  {
    name: 'The Duval Triangle 5 Method',
    icon: <ChartPieIcon className="w-8 h-8" />,
  },
  {
    name: 'The Gouda Triangle Method',
    icon: <ChartPieIcon className="w-8 h-8" />,
  },
  {
    name: 'The LEDT Method',
    icon: <ViewfinderCircleIcon className="w-8 h-8" />,
  },
  {
    name: 'The Duval Pentagon 1 Method',
    icon: <CubeTransparentIcon className="w-8 h-8" />,
  },
  {
    name: 'The Duval Pentagon 2 Method',
    icon: <CubeTransparentIcon className="w-8 h-8" />,
  },
  {
    name: 'The Combine Duval Pentagon Method',
    icon: <CubeTransparentIcon className="w-8 h-8" />,
  },
  {
    name: 'The Mansour Pentagon Method',
    icon: <CubeTransparentIcon className="w-8 h-8" />,
  },
  {
    name: 'The Heptagon Graph Method',
    icon: <ChartBarSquareIcon className="w-8 h-8" />,
  },
  {
    name: 'The ETRA Square Method',
    icon: <ChartBarSquareIcon className="w-8 h-8" />,
  },
];

// Reusable component for the method category cards
const MethodCard = ({ icon, name, color }) => (
  <div className="bg-white/50 dark:bg-slate-800/60 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 flex flex-col items-center text-center">
    <div className={`p-4 rounded-full bg-gradient-to-br ${color.gradient}`}>
      <div className="text-white">{icon}</div>
    </div>
    <h5 className="mt-4 font-bold text-slate-700 dark:text-slate-200">
      {name}
    </h5>
  </div>
);

const ConventionalMethodsContent = () => {
  const [activeTab, setActiveTab] = useState('ratio');
  const colors = {
    ratio: {
      border: 'border-purple-500',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-indigo-500',
    },
    graphical: {
      border: 'border-teal-500',
      text: 'text-teal-600',
      gradient: 'from-teal-500 to-cyan-500',
    },
    techniques: { border: 'border-cyan-500', text: 'text-cyan-600' },
    pros_cons: { border: 'border-orange-500', text: 'text-orange-600' },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ratio':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratioMethods.map((method, index) => (
              <MethodCard
                key={index}
                icon={method.icon}
                name={method.name}
                color={colors.ratio}
              />
            ))}
          </div>
        );
      case 'graphical':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicalMethods.map((method, index) => (
              <MethodCard
                key={index}
                icon={method.icon}
                name={method.name}
                color={colors.graphical}
              />
            ))}
          </div>
        );
      case 'techniques':
        return (
          <div className="animate-fadeIn space-y-8">
            <TechniquesComparisonTable />
          </div>
        );
      case 'pros_cons':
        return (
          <div className="animate-fadeIn">
            <MethodAdvantages />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        Conventional DGA Methods
      </h3>
      <blockquote className="mt-4 border-l-4 border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/50 p-4 rounded-r-lg">
        <p className="text-base text-purple-800 dark:text-purple-200 leading-relaxed text-justify italic">
          Explore DGA methods by category or view a detailed grouping of fault
          codes for various interpretation techniques.
        </p>
      </blockquote>
      <div className="mt-8 border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('ratio')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'ratio'
                ? `${colors.ratio.border} ${colors.ratio.text}`
                : 'border-transparent text-slate-500'
            }`}
          >
            Ratio Methods
          </button>
          <button
            onClick={() => setActiveTab('graphical')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'graphical'
                ? `${colors.graphical.border} ${colors.graphical.text}`
                : 'border-transparent text-slate-500'
            }`}
          >
            Graphical Methods
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'techniques'
                ? `${colors.techniques.border} ${colors.techniques.text}`
                : 'border-transparent text-slate-500'
            }`}
          >
            Interpretation Techniques
          </button>
          {/* NEW: Button for the Advantages/Disadvantages tab */}
          <button
            onClick={() => setActiveTab('pros_cons')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'pros_cons'
                ? `${colors.pros_cons.border} ${colors.pros_cons.text}`
                : 'border-transparent text-slate-500'
            }`}
          >
            Advantages & Disadvantages
          </button>
        </nav>
      </div>
      <div className="mt-6 py-4">{renderContent()}</div>
    </>
  );
};

export default ConventionalMethodsContent;
