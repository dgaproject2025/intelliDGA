import React, { useState } from 'react';

import {
  BoltIcon,
  SparklesIcon,
  FireIcon,
  BeakerIcon,
  DocumentMinusIcon,
  VariableIcon,
} from '@heroicons/react/24/outline';

// A reusable component for styling each fault card, now with enhanced dark mode styling
const FaultCard = ({ icon, title, children, colorClass = 'red' }) => {
  const colors = {
    red: {
      iconBg: 'bg-red-100 dark:bg-red-900/50',
      iconText: 'text-red-500',
      titleText: 'text-red-600 dark:text-red-500',
    },
    amber: {
      iconBg: 'bg-amber-100 dark:bg-amber-900/50',
      iconText: 'text-amber-500',
      titleText: 'text-amber-600 dark:text-amber-500',
    },
    teal: {
      iconBg: 'bg-teal-100 dark:bg-teal-900/50',
      iconText: 'text-teal-500',
      titleText: 'text-teal-600 dark:text-teal-500',
    },
  };
  const selectedColor = colors[colorClass] || colors.red;

  return (
    // ENHANCED: Added subtle glow and refined background/border for better dark mode elevation
    <div className="relative bg-white/50 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-800/80 dark:to-slate-900/90 rounded-xl shadow-md h-full flex flex-col p-6 border border-transparent dark:border-slate-800">
      {/* Glow effect for dark mode */}
      <div
        className="absolute -inset-px bg-gradient-to-br from-white/10 to-white/0 rounded-xl opacity-0 dark:opacity-50"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div
            className={`flex-shrink-0 p-3 rounded-full ${selectedColor.iconBg}`}
          >
            {React.cloneElement(icon, {
              className: `w-6 h-6 ${selectedColor.iconText}`,
            })}
          </div>
          <h4 className={`text-md font-bold ${selectedColor.titleText}`}>
            {title}
          </h4>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-justify">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

const FaultTypeContent = () => {
  const [activeTab, setActiveTab] = useState('electrical');

  const renderContent = () => {
    switch (activeTab) {
      case 'electrical':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaultCard
              icon={<BoltIcon />}
              title="1. Partial Discharge (PD)"
              colorClass="red"
            >
              Partial discharges (PD) of the cold plasma (corona) type,
              resulting in possible X-wax deposition on paper insulation.
            </FaultCard>
            <FaultCard
              icon={<SparklesIcon />}
              title="2. Low Energy Discharge (D1)"
              colorClass="red"
            >
              Discharges of low energy (D1), in mineral oil and/or paper,
              evidenced by larger carbonized perforations through paper
              (punctures), carbonization of the paper surface (tracking), or
              carbon particles in mineral oil.
            </FaultCard>
            <div className="md:col-span-2">
              <FaultCard
                icon={<FireIcon />}
                title="3. High Energy Discharge (D2)"
                colorClass="red"
              >
                Discharges of high energy (D₂), in mineral oil and/or paper,
                with power follow-through, evidenced by extensive destruction
                and carbonization of paper, metal fusion at the discharge
                extremities, and extensive carbonization in the oil.
              </FaultCard>
            </div>
          </div>
        );
      case 'thermal':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaultCard
              icon={<FireIcon />}
              title="4. Thermal Fault (T1)"
              colorClass="amber"
            >
              Thermal faults, in mineral oil and/or paper, below 300 °C if the
              paper has turned brownish (T1).
            </FaultCard>
            <FaultCard
              icon={<FireIcon />}
              title="5. Thermal Fault (T2)"
              colorClass="amber"
            >
              Thermal faults, in mineral oil and/or paper, above 300 °C if it
              has carbonized (T2).
            </FaultCard>
            <FaultCard
              icon={<FireIcon />}
              title="6. Thermal Fault (T3)"
              colorClass="amber"
            >
              Thermal faults of temperatures above 700 °C (T₃) if there is
              strong evidence of carbonization of the mineral oil, metal
              discoloration (800 °C) or metal fusion (&gt;1000 °C).
            </FaultCard>
            <FaultCard
              icon={<FireIcon />}
              title="8. Overheating (O)"
              colorClass="amber"
            >
              Overheating (O) of paper or mineral oil &lt; 250 °C (therefore
              without carbonization of paper and loss of its electrical
              insulating properties).
            </FaultCard>
            <div className="md:col-span-2">
              <FaultCard
                icon={<FireIcon />}
                title="10. Thermal Fault (T3-H)"
                colorClass="amber"
              >
                Thermal faults T₃ in mineral oil only (no paper involved)
                (T₃-H).
              </FaultCard>
            </div>
          </div>
        );
      case 'other':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaultCard
              icon={<BeakerIcon />}
              title="7. Stray Gassing (S)"
              colorClass="teal"
            >
              Stray gassing of mineral oil (S) at temperatures &lt; 200 °C due
              to chemical instability from refining techniques or material
              incompatibility.
            </FaultCard>
            <FaultCard
              icon={<DocumentMinusIcon />}
              title="9. Carbonization (C)"
              colorClass="teal"
            >
              Possible carbonization of paper (C).
            </FaultCard>
            <div className="md:col-span-2">
              <FaultCard
                icon={<VariableIcon />}
                title="11. Catalytic Reaction (R)"
                colorClass="teal"
              >
                Catalytic reactions (R) between water and galvanized steel in
                oil sampling valves of transformers or with tank steel (rust). R
                faults are very rare.
              </FaultCard>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Heading */}
      <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
        Faults Diagnosed by DGA
      </h3>

      {/* Introductory Paragraph */}
      <blockquote className="mt-4 border-l-4 border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/50 p-4 rounded-r-lg">
        <p className="text-base text-red-800 dark:text-red-200 leading-relaxed text-justify italic">
          DGA is a premier diagnostic tool for identifying incipient faults. The
          primary faults are categorized as Electrical, Thermal, and other
          unique conditions.
        </p>
      </blockquote>

      {/* Tab Navigation for broad categories */}
      <div className="mt-8 border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('electrical')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'electrical'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-600'
            }`}
          >
            Electrical Faults
          </button>
          <button
            onClick={() => setActiveTab('thermal')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'thermal'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-600'
            }`}
          >
            Thermal Faults
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'other'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-600'
            }`}
          >
            Other Faults
          </button>
        </nav>
      </div>

      {/* Tab Content Area */}
      <div className="mt-6">{renderContent()}</div>
    </>
  );
};

export default FaultTypeContent;
