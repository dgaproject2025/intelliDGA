import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

// Note: You will need to create this visualization component separately.
import MansourPentagonVisualization from './TheMansourPentagonMethodVisualisation';

// A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'PD (Partial Discharge)', color: 'rgba(255,0,0,1)' },
    { name: 'T1 (Thermal ≤300°C)', color: 'rgb(255,153,153)' },
    { name: 'T2 (Thermal 300-700°C)', color: 'rgb(255,204,0)' },
    { name: 'T3 (Thermal >700°C)', color: 'rgb(0,0,0)' },
    { name: 'D1 (Low Energy Discharge)', color: 'rgb(104,255,255)' },
    { name: 'D2 (High Energy Discharge)', color: 'rgb(51,100,240)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-2">
        {faultZones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
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

const TheMansourPentagonMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
        The Mansour Pentagon Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        {/* --- EXPANDED CONTENT: Underlying Principle --- */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              Proposed in 2015 by Diaa-Eldin A. Mansour, the Pentagon Method is
              an advanced graphical analysis tool for transformer fault
              diagnosis. It was specifically designed to overcome the
              limitations of earlier methods like the Duval Triangle 1, which do
              not analyze all key fault gases.
            </p>
            <p>
              The method utilizes five critical hydrocarbon and fuel gases:
              Hydrogen (H₂), Methane (CH₄), Ethane (C₂H₆), Ethylene (C₂H₄), and
              Acetylene (C₂H₂). By plotting the relative percentage of these
              five gases on a pentagonal chart, it provides a more comprehensive
              and accurate diagnosis. The inclusion of H₂ and C₂H₆ enhances its
              sensitivity to partial discharges and low-temperature thermal
              faults, respectively, offering a more nuanced view of the
              transformer's health.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-indigo-500" />
            <h4 className="text-lg font-bold text-indigo-500">
              The Mansour Pentagon Method Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            {/* Placeholder for the actual pentagon chart component */}
            <MansourPentagonVisualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        {/* --- EXPANDED CONTENT: Fault Zone Interpretation --- */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <ul className="mt-3 space-y-4 text-sm text-justify">
            <li>
              <strong className="font-semibold text-red-800">
                PD (Partial Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                A low-energy electrical phenomenon (corona) that decomposes oil
                primarily into Hydrogen (H₂). The pentagon method is highly
                sensitive to this fault due to the dedicated H₂ axis.
              </span>
            </li>
            <li>
              <strong className="font-semibold" style={{ color: '#A0522D' }}>
                T₁ (Thermal Fault ≤ 300°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Indicates low-temperature overheating of oil or paper. This
                fault is characterized by the formation of Methane (CH₄) and
                Ethane (C₂H₆).
              </span>
            </li>
            <li>
              <strong className="font-semibold text-amber-500">
                T₂ (Thermal Fault 300°C - 700°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                A more severe overheating condition where the primary gas
                produced from oil decomposition is Ethylene (C₂H₄). Levels of
                CH₄ and C₂H₆ may also be present.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                T₃ (Thermal Fault &gt; 700°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                High-temperature overheating, leading to the carbonization of
                insulation. This is identified by a significant presence of
                Ethylene (C₂H₄) and Hydrogen (H₂), with small amounts of
                Acetylene (C₂H₂) beginning to form.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-cyan-500">
                D₁ (Low Energy Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Represents sparking or arcing of low energy. The key identifying
                gas is Acetylene (C₂H₂), along with large amounts of Hydrogen
                (H₂). Ethylene (C₂H₄) is also typically produced.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-blue-800">
                D₂ (High Energy Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                The most severe fault, indicating high-power arcing. This
                condition generates very large quantities of Acetylene (C₂H₂)
                and Hydrogen (H₂), which are clear indicators of a major
                electrical fault.
              </span>
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
                High diagnostic accuracy due to the use of five key fault gases.
              </li>
              <li>
                Clear graphical separation between thermal and electrical
                faults.
              </li>
              <li>
                Improved sensitivity to partial discharges and low-temperature
                faults.
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
                Can be more complex to calculate and plot compared to triangle
                methods.
              </li>
              <li>
                Interpretation may be difficult if multiple faults occur
                simultaneously.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheMansourPentagonMethodContent;
