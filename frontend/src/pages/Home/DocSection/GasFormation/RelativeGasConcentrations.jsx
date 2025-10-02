import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import lightGraph from './light_tempVsgas.png';
import darkGraph from './dark_tempVsgas.png';

const RelativeGasConcentrations = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <ChartBarIcon className="w-6 h-6 text-red-500" />
        <h4 className="text-lg font-bold text-slate-800 dark:text-red-500">
          Relative Gas Concentrations vs. Fault Types
        </h4>
      </div>

      {/* Intro paragraph */}
      <p className="mt-2 text-slate-600 dark:text-slate-500 mb-4">
        This section illustrates how the concentrations of individual gases vary
        across different categories of transformer faults. The diagnostic power
        of DGA lies in correlating specific gas patterns with fault types and
        their associated temperature ranges.
      </p>

      {/* Graph Container */}
      <div className="my-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 flex justify-center items-center">
        <img
          src={lightGraph}
          alt="Gas Concentrations vs. Fault Types (Light)"
          className="max-w-full h-auto rounded-md shadow-md block dark:hidden"
        />
        <img
          src={darkGraph}
          alt="Gas Concentrations vs. Fault Types (Dark)"
          className="max-w-full h-auto rounded-md shadow-md hidden dark:block"
        />
      </div>

      {/* Key Insights */}
      <ul className="list-disc pl-5 mt-2 space-y-3 text-slate-600 dark:text-slate-500">
        <li>
          <strong>Fault Zones:</strong> The X-axis categorizes faults — starting
          with <em>Cold Plasma & Catalytic effects</em> (R, PD, S), moving
          through <em>Thermal zones</em> (T1, O, C, T2, T3), and culminating in
          <em> Discharges</em> (D2, D1).
        </li>
        <li>
          <strong>Gas Trends:</strong> Each colored line corresponds to a
          specific gas. Tracking the relative rise and fall of these lines
          provides a fingerprint for fault identification.
        </li>
        <li>
          <strong>Hydrogen (H₂) Dominance:</strong> Present in nearly all fault
          conditions, but especially pronounced in partial discharges and
          high-energy discharges.
        </li>
        <li>
          <strong>Thermal Indicators:</strong> Methane (CH₄) and Ethane (C₂H₆)
          peak in lower to mid-range thermal faults (T1, T2). Their rise
          suggests overheating without arcing.
        </li>
        <li>
          <strong>High-Temperature Cracking:</strong> Ethylene (C₂H₄) dominates
          in higher thermal fault zones (T3), indicating more intense heat and
          molecular breakdown.
        </li>
        <li>
          <strong>Arcing Signature:</strong> Acetylene (C₂H₂) is a distinctive
          marker for high-energy arcing faults (D2, D1) and is seldom produced
          by other mechanisms.
        </li>
      </ul>

      {/* Conclusion */}
      <p className="mt-5 text-slate-600 dark:text-slate-500">
        By analyzing the relative concentrations and ratios of these gases,
        engineers can accurately diagnose incipient transformer faults and take
        preventive measures before catastrophic failures occur. Recognizing
        these trends is fundamental to interpreting DGA test results.
      </p>
    </div>
  );
};

export default RelativeGasConcentrations;
