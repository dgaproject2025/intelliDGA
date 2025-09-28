import React, { useState } from 'react';

import {
  ScaleIcon,
  DocumentChartBarIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import NormalGassingTable from './NormalgassingTable';

// A reusable component for styling each "Insight Card"
const InsightCard = ({ icon, borderColor, title, children }) => (
  <div
    className={`bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md overflow-hidden border-t-4 ${borderColor}`}
  >
    <div className="p-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <h5 className="font-bold text-slate-800 dark:text-slate-200">
          {title}
        </h5>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

const KeyGasRatioContent = () => {
  const [activeTab, setActiveTab] = useState('co_co2');
  const [co2Slide, setCo2Slide] = useState(0);

  const slides = [
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InsightCard
        icon={<ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />}
        borderColor="border-orange-500"
        title="Warning: Potential Oil Oxidation"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
          High CO (≥ 1000 µL/L) and/or low CO₂/CO ratios (&lt; 3), WITHOUT
          significant hydrocarbon gases, suggest mineral oil oxidation with a
          limited O₂ supply.
        </p>
      </InsightCard>
      <InsightCard
        icon={<EyeIcon className="w-8 h-8 text-blue-500" />}
        borderColor="border-blue-500"
        title="Indication: Possible Paper Fault"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
          If the same conditions occur TOGETHER WITH significant hydrocarbon
          gases, it may indicate a paper fault, requiring confirmation with
          other methods.
        </p>
      </InsightCard>
      <InsightCard
        icon={<InformationCircleIcon className="w-8 h-8 text-purple-500" />}
        borderColor="border-purple-500"
        title="Observation: Slow Degradation"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
          High CO₂ (&gt; 10,000 µL/L) and high CO₂/CO ratios (&gt; 20) indicate
          slow paper degradation at low temperatures (&lt;140 °C).
        </p>
      </InsightCard>
      <InsightCard
        icon={<CheckCircleIcon className="w-8 h-8 text-cyan-500" />}
        borderColor="border-cyan-500"
        title="Note on Normal Gassing"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
          Zero or very low rates of change for CO and CO₂ do not guarantee the
          absence of a fault, as localized issues may not produce detectable
          amounts.
        </p>
      </InsightCard>
    </div>,
    <NormalGassingTable />,
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'co_co2':
        return (
          <div className="relative">
            <div className="animate-fadeIn min-h-[400px]">
              {slides[co2Slide]}
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setCo2Slide(0)}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                disabled={co2Slide === 0}
              >
                <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCo2Slide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    co2Slide === index
                      ? 'bg-green-500 scale-125'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
              <button
                onClick={() => setCo2Slide(1)}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                disabled={co2Slide === 1}
              >
                <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        );
      case 'o2_n2':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard
              icon={<InformationCircleIcon className="w-8 h-8 text-blue-500" />}
              borderColor="border-blue-500"
              title="Decreasing Values"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
                Decreasing values of the O₂/N₂ ratio indicate overheating and
                oxidation of mineral oil and can be used to confirm thermal
                faults.
              </p>
            </InsightCard>
            <InsightCard
              icon={
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
              }
              borderColor="border-orange-500"
              title="Increasing Values"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
                Increasing values may indicate leaks in the air preservation
                system of the transformer (e.g., membrane or nitrogen blanket).
              </p>
            </InsightCard>
          </div>
        );
      case 'c2h2_h2':
        return (
          <div className="animate-fadeIn grid grid-cols-1">
            <InsightCard
              icon={
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
              }
              borderColor="border-orange-500"
              title="Indication of Leaks or Contamination"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
                Values of this ratio &gt;3 may indicate leaks or contamination
                from the tap-changer compartment into the main tank. If such
                contamination is suspected, it should be investigated.
              </p>
            </InsightCard>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
        Interpreting Key Gas Ratios
      </h3>
      <blockquote className="mt-4 border-l-4 border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/50 p-4 rounded-r-lg">
        <p className="text-base text-green-800 dark:text-green-200 leading-relaxed text-justify italic">
          While individual gas levels are important, the ratios between specific
          key gases provide deeper diagnostic insights into fault conditions.
        </p>
      </blockquote>
      <div className="mt-8 border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => {
              setActiveTab('co_co2');
              setCo2Slide(0);
            }}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'co_co2'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            CO/CO₂ Ratio
          </button>
          <button
            onClick={() => setActiveTab('o2_n2')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'o2_n2'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            O₂/N₂ Ratio
          </button>
          <button
            onClick={() => setActiveTab('c2h2_h2')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'c2h2_h2'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            C₂H₂/H₂ Ratio
          </button>
        </nav>
      </div>
      {/* UPDATED: Replaced fixed min-height with padding */}
      <div className="mt-6 py-4">{renderContent()}</div>
    </>
  );
};

export default KeyGasRatioContent;
