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

import TechniquesComparisonTable from './TechniquesComparisonTable';
import MethodAdvantages from './MethodProsConsContent';
import KeyGasMethodContent from './KeyGasMethod/KeyGasMethodContent';
import DoornenburgMethodContent from './DornenburgRatioMethod/DoornenburgMethodContent';
import RogersMethodContent from './RogerRatioMethod/RogersMethodContent';
import IECRatioMethodContent from './TheIECRatioMethod/IECRatioMethodContent';
import ThreeRatioMethodContent from './ThreeRatioTechnique/ThreeRatioMethodContent';

import DuvalTriangleMethodContent from './GraphicalMethod/DuvalTriangle1Method/DuvalTriangle1MethodContent';
import DuvalTriangle4MethodContent from './GraphicalMethod/DuvalTriangle4Method/DuvalTriangle4MethodContent';
import DuvalTriangle5MethodContent from './GraphicalMethod/DuvalTriangle5Method /DuvalTriangle5MethodContent';
import DuvalPentagon1MethodContent from './GraphicalMethod/DuvalPentagon1Method/DuvalPentagon1MethodContent';

import DuvalPentagon2MethodContent from './GraphicalMethod/DuvalPentagon2Method /DuvalPentagon2MethodContent';

import GoudaTriangleMethodContent from './GraphicalMethod/GoudaTriangleMethod/GoudaTriangleMethodContent';

import TheLEDTMethodContent from './GraphicalMethod/TheLEDTMethod/TheLEDTMethodContent';

import TheMansourPentagonMethodContent from './GraphicalMethod/TheMansourPentagon/TheMansourPentagonMethodContent';

import TheHeptagonGraphMethodContent from './GraphicalMethod/TheHeptagonGraphMethod/TheHeptagonGraphMethodContent';

import TheETRASquareMethodContent from './GraphicalMethod/ERTASquareMethod/TheERTASquareMethodContent';

import TheCombinedDuvalPentagonMethodContent from './GraphicalMethod/TheCombinedDuvalPentagonMethod/TheCombinedDuvalPentagonMethodContent';

// A single, unified data structure for all methods
const allMethods = {
  ratio: [
    {
      name: 'The Key Gas Method',
      icon: <KeyIcon className="w-5 h-5" />,
      component: <KeyGasMethodContent />,
    },
    {
      name: 'The Doornenburg Ratio Method',
      icon: <CalculatorIcon className="w-5 h-5" />,
      component: <DoornenburgMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Rogers Ratio Method',
      icon: <CalculatorIcon className="w-5 h-5" />,
      component: <RogersMethodContent />, // <-- Link the new component
    },
    {
      name: 'The IEC Ratio Method',
      icon: <DocumentTextIcon className="w-5 h-5" />,
      component: <IECRatioMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Three Ratio Techniques',
      icon: <ScaleIcon className="w-5 h-5" />,
      component: <ThreeRatioMethodContent />, // <-- Link the new component
    },
  ],
  graphical: [
    {
      name: 'The Duval Triangle 1 Method',
      icon: <ChartPieIcon className="w-5 h-5" />,
      component: <DuvalTriangleMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Duval Triangle 4 Method',
      icon: <ChartPieIcon className="w-5 h-5" />,
      component: <DuvalTriangle4MethodContent />, // <-- Link the new component
    },
    {
      name: 'The Duval Triangle 5 Method',
      icon: <ChartPieIcon className="w-5 h-5" />,
      component: <DuvalTriangle5MethodContent />, // <-- Link the new component
    },
    {
      name: 'The Gouda Triangle Method',
      icon: <ChartPieIcon className="w-5 h-5" />,
      component: <GoudaTriangleMethodContent />, // <-- Link the new component
    },
    {
      name: 'The LEDT Method',
      icon: <ViewfinderCircleIcon className="w-5 h-5" />,
      component: <TheLEDTMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Duval Pentagon 1 Method',
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      component: <DuvalPentagon1MethodContent />, // <-- Link the new component
    },
    {
      name: 'The Duval Pentagon 2 Method',
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      component: <DuvalPentagon2MethodContent />, // <-- Link the new component
    },
    {
      name: 'The Combine Duval Pentagon Method',
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      component: <TheCombinedDuvalPentagonMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Mansour Pentagon Method',
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      component: <TheMansourPentagonMethodContent />, // <-- Link the new component
    },
    {
      name: 'The Heptagon Graph Method',
      icon: <ChartBarSquareIcon className="w-5 h-5" />,
      component: <TheHeptagonGraphMethodContent />, // <-- Link the new component
    },
    {
      name: 'The ETRA Square Method',
      icon: <ChartBarSquareIcon className="w-5 h-5" />,
      component: <TheETRASquareMethodContent />, // <-- Link the new component
    },
  ],
};

const ConventionalMethodsContent = () => {
  const [activeTab, setActiveTab] = useState('ratio');
  const [selectedMethod, setSelectedMethod] = useState(allMethods.ratio[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'ratio') {
      setSelectedMethod(allMethods.ratio[0]);
    } else if (tab === 'graphical') {
      setSelectedMethod(allMethods.graphical[0]);
    }
  };

  const colors = {
    ratio: {
      border: 'border-purple-500',
      text: 'text-purple-600',
      activeBg: 'bg-purple-100 dark:bg-purple-900/50',
      activeText: 'text-purple-700 dark:text-purple-200',
      icon: 'text-purple-500',
    },
    graphical: {
      border: 'border-teal-500',
      text: 'text-teal-600',
      activeBg: 'bg-teal-100 dark:bg-teal-900/50',
      activeText: 'text-teal-700 dark:text-teal-200',
      icon: 'text-teal-500',
    },
    techniques: { border: 'border-cyan-500', text: 'text-cyan-600' },
    pros_cons: { border: 'border-orange-500', text: 'text-orange-600' },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ratio':
      case 'graphical':
        const currentMethods =
          activeTab === 'ratio' ? allMethods.ratio : allMethods.graphical;
        const currentColor =
          activeTab === 'ratio' ? colors.ratio : colors.graphical;

        return (
          <div className="animate-fadeIn flex flex-col md:flex-row gap-8 items-start">
            {/* --- Sidebar (Master Column) --- */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="space-y-1 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg">
                {currentMethods.map((method) => (
                  <button
                    key={method.name}
                    onClick={() => setSelectedMethod(method)}
                    className={`w-full flex items-center gap-3 text-left p-2 rounded-md transition-colors text-sm font-medium ${
                      selectedMethod.name === method.name
                        ? `${currentColor.activeBg} ${currentColor.activeText}`
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span className={currentColor.icon}>{method.icon}</span>
                    {method.name}
                  </button>
                ))}
              </div>
            </div>
            {/* --- Content Area (Detail Column) --- */}
            <div className="flex-1 w-full min-h-[400px]">
              <div key={selectedMethod.name} className="animate-fadeIn">
                {selectedMethod.component ? (
                  selectedMethod.component
                ) : (
                  <div className="bg-white/50 dark:bg-slate-800/60 rounded-xl shadow-lg p-6 text-center">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedMethod.name}
                    </h4>
                    <p className="mt-4 text-slate-500 dark:text-slate-400">
                      Detailed content for this method is being prepared.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'techniques':
        return (
          <div className="animate-fadeIn">
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
            onClick={() => handleTabClick('ratio')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'ratio'
                ? `${colors.ratio.border} ${colors.ratio.text}`
                : 'border-transparent text-slate-500'
            }`}
          >
            Ratio Methods
          </button>
          <button
            onClick={() => handleTabClick('graphical')}
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
