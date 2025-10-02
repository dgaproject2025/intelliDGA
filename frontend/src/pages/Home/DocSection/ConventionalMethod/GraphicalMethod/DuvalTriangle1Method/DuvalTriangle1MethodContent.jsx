import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ChartPieIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import DuvalTriangleVisualization from './DuvalTriangleVisualization';

// NEW: A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'PD (Partial Discharge)', color: 'rgba(255, 0, 0, 0.7)' },
    { name: 'T1 (Thermal <300°C)', color: 'rgba(255, 153, 153, 0.7)' },
    { name: 'T2 (Thermal 300-700°C)', color: 'rgba(255, 204, 0, 0.7)' },
    { name: 'T3 (Thermal >700°C)', color: 'rgba(0, 0, 0, 0.7)' },
    { name: 'D1 (Low Energy Discharge)', color: 'rgba(104, 255, 255, 0.7)' },
    { name: 'D2 (High Energy Discharge)', color: 'rgba(51, 100, 240, 0.7)' },
    { name: 'DT (Thermal & Electrical)', color: 'rgba(200, 60, 200, 0.7)' },
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

const DuvalTriangleMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Duval Triangle 1 Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4 ">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-justify">
            The Duval Triangle is a graphical method that uses the relative
            concentrations of three key hydrocarbon gases to diagnose faults.
            The percentages of these three gases, which correspond to increasing
            energy or temperature, are plotted on a triangular graph to identify
            the fault type.
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Methane (CH₄)</strong> for low energy or low-temperature
              faults.
            </li>
            <li>
              <strong>Ethylene (C₂H₄)</strong> for high-temperature faults.
            </li>
            <li>
              <strong>Acetylene (C₂H₂)</strong> for very high temperature, high
              energy, or arcing faults.
            </li>
          </ul>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-md shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Duval Triangle Method -1 Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <DuvalTriangleVisualization />
            <FaultZoneLegend />
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              Each zone within the Duval Triangle corresponds to a specific type
              of fault, providing a visual diagnosis based on the gas
              composition:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>PD (Partial Discharge):</strong> Indicates low-energy
                electrical discharges, often occurring in gas-filled voids in
                the insulation. This is typically the least severe type of
                electrical fault.
              </li>
              <li>
                <strong>T1 (Thermal Fault, T ≤ 300 °C):</strong> Represents
                low-temperature overheating, which may cause the paper
                insulation to turn brownish but not yet carbonize.
              </li>
              <li>
                <strong>T2 (Thermal Fault, 300 °C ≤ T ≤ 700 °C):</strong> A
                medium-temperature thermal fault, indicating more significant
                overheating that leads to the carbonization (charring) of paper
                insulation.
              </li>
              <li>
                <strong>T3 (Thermal Fault, T &gt; 700 °C):</strong> Indicates
                high-temperature overheating, characterized by severe
                carbonization of oil and paper, and potentially involving
                discoloration or fusion of metallic parts.
              </li>
              <li>
                <strong>D1 (Discharge of Low Energy):</strong> Represents
                sparking or partial discharges of the sparking type. This is a
                more energetic fault than PD and can cause punctures or
                carbonized tracking on insulation surfaces.
              </li>
              <li>
                <strong>D2 (Discharge of High Energy):</strong> Indicates
                high-energy arcing, which is a severe electrical fault. It
                involves significant power follow-through and can cause
                extensive damage, including metal fusion and widespread
                carbonization.
              </li>
              <li>
                <strong>DT (Mixed Fault):</strong> This zone represents a
                combination of both thermal and electrical faults, indicating a
                complex fault scenario that may involve both overheating and
                discharging.
              </li>
            </ul>
          </div>
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
              <li>Simplicity and robustness.</li>
              <li>Faults identified: PD, D1, D2, T1, T2, T3, DT.</li>
              <li>Is effective in determining the main type of fault.</li>
              <li>
                New sub-areas make it possible to specify whether arc faults D1
                and D2 are in paper or oil.
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
                At the boundary between two fault zones, it is difficult to
                distinguish which of the two faults is the real one.
              </li>
              <li>
                Because it uses only three dissolved gases, it provides
                insufficient information, especially in the case of the
                existence of multiple faults.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuvalTriangleMethodContent;
