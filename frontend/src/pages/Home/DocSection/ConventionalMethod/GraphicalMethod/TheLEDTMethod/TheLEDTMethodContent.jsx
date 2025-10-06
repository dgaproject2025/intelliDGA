import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

import LEDTVisualization from './TheLEDTMethodVisualisation';

// A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'PD (Partial Discharge)', color: 'rgba(255, 0, 0, 0.7)' },
    { name: 'T1 (Thermal <300°C)', color: 'rgba(255, 153, 153, 0.7)' },
    { name: 'T2 (Thermal 300-700°C)', color: 'rgba(255, 204, 0, 0.7)' },
    { name: 'T3 (Thermal >700°C)', color: 'rgba(0, 0, 0, 0.7)' },
    { name: 'D1 (Low Energy Discharge)', color: 'rgba(104, 255, 255, 0.7)' },
    { name: 'D2 (High Energy Discharge)', color: 'rgba(51, 100, 240, 0.7)' },
    { name: 'DT (Thermal & Electrical)', color: 'rgba(200, 60, 200, 0.7)' },
    { name: 'N (Normal)', color: 'rgba(129, 239, 154, 1)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
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

const TheLEDTMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Low Energy Degradation Triangle (LEDT) Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        {/* --- UPDATED CONTENT: Underlying Principle --- */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-red-500">
              Underlying Principle
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              The Low Energy Degradation Triangle (LEDT) is a diagnostic tool
              that utilizes the relative concentrations of three key dissolved
              gases: Hydrogen (H₂), Methane (CH₄), and Carbon Monoxide (CO).
              These specific gases are selected because they are the primary
              byproducts of incipient and low-energy degradation processes
              occurring in a transformer's insulation system (both oil and
              paper).
            </p>
            <p>
              By plotting the percentage of these three gases on a ternary
              diagram, the LEDT method provides a visual representation of the
              dominant fault type. Its high sensitivity to the initial stages of
              gas formation makes it particularly effective for on-line
              monitoring, allowing for the early detection of subtle changes
              from normal operation to a developing fault condition long before
              it escalates.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              The Low Energy Degradation Triangle (LEDT) Method Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <LEDTVisualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        {/* --- UPDATED CONTENT: Fault Zone Interpretation --- */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <ul className="mt-3 space-y-4 text-sm text-justify">
            <li>
              <strong className="font-semibold text-green-500">
                N (Normal):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Gas levels are low and stable, indicating the transformer is
                operating under normal, healthy conditions.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-red-500">
                PD (Partial Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Caused by low-energy electrical discharges (corona) in
                gas-filled voids. This fault primarily produces Hydrogen (H₂)
                with minor traces of Methane (CH₄).
              </span>
            </li>
            <li>
              <strong className="font-semibold text-pink-400">
                T₁ (Thermal Fault ≤ 300°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Indicates low-temperature overheating, affecting paper and oil.
                This condition mainly generates Carbon Monoxide (CO) from paper
                degradation and Methane (CH₄) from oil.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-amber-500">
                T₂ (Thermal Fault 300-700°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Represents medium-temperature overheating. Gas generation
                becomes more significant, with increased production of various
                hydrocarbon gases from oil breakdown.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                T₃ (Thermal Fault &gt; 700°C):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                A high-temperature thermal fault leading to severe oil
                degradation (carbonization) and extensive paper charring.
                Hydrogen (H₂) becomes a dominant gas.
              </span>
            </li>
            <li>
              <strong className="font-semibold text-cyan-400">
                D₁ (Low Energy Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Sparking or low-energy arcing is occurring. This decomposes oil
                into Hydrogen (H₂) and various hydrocarbon gases, with a notable
                increase in Methane (CH₄).
              </span>
            </li>
            <li>
              <strong className="font-semibold text-blue-500">
                D₂ (High Energy Discharge):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                Indicates high-energy arcing with significant power, often due
                to short circuits. This fault generates large volumes of
                Hydrogen (H₂) and Acetylene (C₂H₂).
              </span>
            </li>
            <li>
              <strong className="font-semibold text-fuchsia-500">
                DT (Mixed Fault):
              </strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">
                A complex fault condition exhibiting characteristics of both
                thermal overheating and electrical discharge. This often occurs
                when a hot spot evolves into an electrical arc.
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
                It is sensitive to both cellulose and oil insulation
                degradation.
              </li>
              <li>Ensures early detection of transformer condition changes.</li>
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
                It is only effective when applied to on-line dissolved gas
                samples, where the dissolved gas trend plays a key role in
                detecting early changes in the level of insulation degradation.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheLEDTMethodContent;
