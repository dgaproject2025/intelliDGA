import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  CalculatorIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

import GoudaTriangleVisualization from './GoudaTriangleMethodVisualisation';

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

const GoudaTriangleMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Gouda Triangle Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-justify">
            The Gouda Triangle is a graphical DGA method that aims to resolve
            inconsistencies that can occur in the Duval Triangle 1. It utilizes
            three specific gas ratios, plotted as coordinates on a triangular
            graph, to diagnose the fault type. This method provides an
            alternative visual analysis for enhanced accuracy.
          </p>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <CalculatorIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Mathematical Expressions
            </h4>
          </div>
          <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
            <p className="text-sm text-justify">
              The method uses the following three ratios (R₁, R₂, R₃) to
              calculate percentage coordinates (P₁, P₂, P₃) for plotting on the
              triangle, where S is the sum of the ratios (S = R₁ + R₂ + R₃).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {/* CORRECTED: Replaced plain text with proper subscript formatting */}
              <div>
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400">
                  R₁ = CH₄ / (CH₄ + C₂H₆ + C₂H₄ + C₂H₂)
                </p>
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400 mt-2">
                  R₂ = C₂H₂ / (H₂ + CH₄ + C₂H₆ + C₂H₄)
                </p>
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400 mt-2">
                  R₃ = C₂H₄ / (H₂ + CH₄ + C₂H₆ + C₂H₂)
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-300 dark:border-slate-600 pt-4 md:pt-0 md:pl-4">
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400">
                  P₁ = (R₁ × 100) / S
                </p>
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400 mt-2">
                  P₂ = (R₂ × 100) / S
                </p>
                <p className="font-mono text-center text-lg font-bold text-[#1f75fe] dark:text-sky-400 mt-2">
                  P₃ = (R₃ × 100) / S
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Gouda Triangle Method Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <GoudaTriangleVisualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <li>
              <strong>PD (Partial Discharge):</strong> Low-energy electrical
              discharges.
            </li>
            <li>
              <strong>T₁ (Thermal Fault ≤ 300°C):</strong> Low-temperature
              overheating.
            </li>
            <li>
              <strong>T₂ (Thermal Fault 300-700°C):</strong> Medium-temperature
              overheating.
            </li>
            <li>
              <strong>T₃ (Thermal Fault &gt; 700°C):</strong> High-temperature
              overheating.
            </li>
            <li>
              <strong>D₁ (Low Energy Discharge):</strong> Sparking or low-energy
              arcing.
            </li>
            <li>
              <strong>D₂ (High Energy Discharge):</strong> High-energy arcing
              with significant power.
            </li>
            <li>
              <strong>DT (Mixed Fault):</strong> A combination of thermal and
              electrical faults.
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
                Resolves inconsistencies that can occur in Duval Triangle 1.
              </li>
              <li>Has a high accuracy of 85.42%.</li>
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
                Uncertainty if at least one gas concentration exceeds its limit.
              </li>
              <li>
                At the boundary between two fault zones, it is difficult to
                distinguish the real fault.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoudaTriangleMethodContent;
