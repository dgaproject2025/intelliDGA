import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  CubeTransparentIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

import DuvalPentagon2Visualization from './DuvalPentagon2MethodVisualisation';

// A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'D1 (Discharges of Low energy)', color: 'rgba(26, 232, 232,1)' },
    { name: 'D2 (Discharges of High energy)', color: 'rgba(51, 100, 240,1)' },
    { name: 'S (Stray gassing ≤ 200 °C)', color: 'rgba(128,128,128,1)' },
    {
      name: 'O (Overheating ≤ 250 °C without carbonization of paper)',
      color: '#ffff00',
    },
    {
      name: 'C (Possible Paper Carbonization)',
      color: '#ffa500',
    },
    { name: 'T3-H (Thermal fault, T >700 °C)', color: 'rgba(0, 0, 0,1)' },
    { name: 'PD (Partial Discharge)', color: 'rgba(255, 0, 0,1)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      {/* UPDATED: Using a grid layout for perfect column alignment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
        {faultZones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex-shrink-0"
              style={{ backgroundColor: zone.color }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {zone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DuvalPentagon2MethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Duval Pentagon 2 Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              The Duval Pentagon 2 method is a specialized graphical tool used
              for the analysis of dissolved gases in high-voltage equipment.
              Like Pentagon 1, it uses all five key hydrocarbon gases: H₂, CH₄,
              C₂H₆, C₂H₄, and C₂H₂.
            </p>
            <p>
              Its primary purpose is to build upon the diagnosis of Pentagon 1.
              While it can identify the three basic electrical faults (PD, D1,
              D2), its main strength is in further distinguishing between the
              four additional sub-types of thermal faults that occur in mineral
              oil only: Stray Gassing (S), Overheating (O), Carbonization (C),
              and high-temperature thermal faults in oil (T3-H). This makes it a
              powerful secondary tool for a more granular diagnosis of thermal
              issues.
            </p>
          </div>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Duval Pentagon Method -2 Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <DuvalPentagon2Visualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <li>
              <strong className="text-red-500 dark:text-red-400">
                PD (Partial Discharge):
              </strong>{' '}
              Low-energy electrical discharges, often of the corona type.
            </li>
            <li>
              <strong className="text-cyan-500 dark:text-cyan-400">
                D1 (Discharges of Low energy):
              </strong>{' '}
              Sparking or low-energy discharges, more energetic than PD.
            </li>
            <li>
              <strong className="text-blue-800 dark:text-blue-500">
                D2 (Discharges of High energy):
              </strong>{' '}
              Severe arcing faults with significant power follow-through.
            </li>
            <li>
              <strong className="text-gray-500 dark:text-gray-400">
                S (Stray Gassing):
              </strong>{' '}
              Low-temperature gassing (≤ 200 °C) in mineral oil due to chemical
              instability, not necessarily a fault.
            </li>
            <li>
              <strong className="text-yellow-500 dark:text-yellow-400">
                O (Overheating):
              </strong>{' '}
              Low-temperature overheating (≤ 250 °C) without charring of paper
              insulation.
            </li>
            <li>
              <strong className="text-orange-700 dark:text-orange-500">
                C (Carbonization):
              </strong>{' '}
              Indication of possible paper carbonization, suggesting a more
              severe thermal fault.
            </li>
            <li>
              <strong className="text-black dark:text-white">
                T3-H (Thermal fault, T &gt;700 °C):
              </strong>{' '}
              A high-temperature thermal fault occurring exclusively in the
              mineral oil, with no paper involvement.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
              <h5 className="font-semibold text-green-700 dark:text-green-300">
                Advantages
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                Provides a more detailed diagnosis of thermal faults in oil than
                Pentagon 1.
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <ShieldExclamationIcon className="w-6 h-6 text-orange-500" />
              <h5 className="font-semibold text-orange-700 dark:text-orange-300">
                Disadvantages
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                More complex to interpret than the triangles or Pentagon 1.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuvalPentagon2MethodContent;
