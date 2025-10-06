import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
  TableCellsIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Note: You will need to create this visualization component separately.
import TheHeptagonGraphMethodVisualisation from './TheHeptagonGraphMethodVisualisation';

// A dedicated component for the chart legend (no changes here)
const FaultZoneLegend = () => {
  // ... same as before
  const faultZones = [
    { name: 'HCCD', color: 'rgba(255, 105, 180, 1)' },
    { name: 'MCCD', color: 'rgba(255, 165, 0, 1)' },
    { name: 'LCCD', color: 'rgba(255, 255, 0, 1)' },
    { name: 'PD', color: 'rgb(255, 0, 0)' },
    { name: 'D1', color: 'rgb(104, 255, 255)' },
    { name: 'D2', color: 'rgba(51, 100, 240, 1)' },
    { name: 'T1', color: 'rgba(255, 153, 153, 1)' },
    { name: 'T2', color: 'rgba(255, 204, 0, 1)' },
    { name: 'T3', color: 'rgba(0, 0, 0, 1)' },
    { name: 'DT', color: 'rgba(200, 60, 200, 1)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2">
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

const TheHeptagonGraphMethodContent = () => {
  // CORRECTED: Using the proper multiplication symbol (×)
  const denominator = `(3.5 × H_2) + (2.9167 × CH_4) + (5.3846 × C_2H_6) + (7 × C_2H_4) + (116.6667 × C_2H_2) + CO + (0.14 × CO_2)`;

  // CORRECTED: Updated all formulas to use the proper multiplication symbol (×)
  const formulas = [
    {
      name: 'Hydrogen',
      symbol: 'H₂',
      color: 'border-sky-500',
      formula: `H_2 (\\%) = \\frac{3.5 × H_2}{${denominator}} × 100`,
    },
    {
      name: 'Methane',
      symbol: 'CH₄',
      color: 'border-slate-500',
      formula: `CH_4 (\\%) = \\frac{2.9167 × CH_4}{${denominator}} × 100`,
    },
    {
      name: 'Ethane',
      symbol: 'C₂H₆',
      color: 'border-green-500',
      formula: `C_2H_6 (\\%) = \\frac{5.3846 × C_2H_6}{${denominator}} × 100`,
    },
    {
      name: 'Ethylene',
      symbol: 'C₂H₄',
      color: 'border-lime-500',
      formula: `C_2H_4 (\\%) = \\frac{7 × C_2H_4}{${denominator}} × 100`,
    },
    {
      name: 'Acetylene',
      symbol: 'C₂H₂',
      color: 'border-red-500',
      formula: `C_2H_2 (\\%) = \\frac{116.6667 × C_2H_2}{${denominator}} × 100`,
    },
    {
      name: 'Carbon Dioxide',
      symbol: 'CO₂',
      color: 'border-stone-500',
      formula: `CO_2 (\\%) = \\frac{0.14 × CO_2}{${denominator}} × 100`,
    },
    {
      name: 'Carbon Monoxide',
      symbol: 'CO',
      color: 'border-orange-500',
      formula: `CO (\\%) = \\frac{1.0 × CO}{${denominator}} × 100`,
    },
  ];

  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        The Heptagon Graph Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-red-500 text-transparent bg-clip-text">
                Underlying Principle
              </span>
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            <p>
              The Heptagon Graph Method is a comprehensive diagnostic tool used
              in Dissolved Gas Analysis (DGA) to determine the health of power
              transformers. It is one of the most advanced graphical techniques
              because it utilizes seven key fault gases: Hydrogen (H₂), Methane
              (CH₄), Ethylene (C₂H₄), Ethane (C₂H₆), Acetylene (C₂H₂), Carbon
              Monoxide (CO), and Carbon Dioxide (CO₂).
            </p>
            <p>
              The core principle of this method is to normalize the measured
              concentrations (in ppm) of these seven gases using specific
              weighting factors. This process converts the absolute ppm values
              into relative percentages, which are then plotted on a heptagonal
              graph where each vertex represents 100% of a single gas. The
              location of the plotted point within the various defined fault
              zones allows for a detailed and nuanced diagnosis of potential
              issues, ranging from low-energy discharges to severe overheating
              of both oil and paper insulation.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <TableCellsIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-red-500 text-transparent bg-clip-text">
                Normal Concentration Limits & Weighting Factors
              </span>
            </h4>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            To accurately assess the significance of each gas, the Heptagon
            method applies a unique weighting factor. These factors give more
            prominence to gases that are highly indicative of severe faults,
            even if they appear in small concentrations (e.g., Acetylene).
          </p>
          <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Key Gas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Symbol
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Normal Unit (PPM)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Weighting Factor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Hydrogen
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    H₂
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    100
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    3.50
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Methane
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    CH₄
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    120
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    2.9167
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Ethylene
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    C₂H₄
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    50
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    7.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Ethane
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    C₂H₆
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    65
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    5.3846
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Acetylene
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    C₂H₂
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    3
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    116.6667
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Carbon Monoxide
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    CO
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    350
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    1.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Carbon Dioxide
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    CO₂
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    2500
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.14
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500">
              The Heptagon Graph Method Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <TheHeptagonGraphMethodVisualisation />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-700">
          <div className="flex items-center gap-3">
            <CalculatorIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-red-500 text-transparent bg-clip-text">
                Mathematical Expressions for Gas Percentages
              </span>
            </h4>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {formulas.map((item) => (
              <div
                key={item.name}
                className={`bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg border-l-4 ${item.color}`}
              >
                <div className="p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      {item.symbol}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {item.name}
                    </h5>
                  </div>
                  <div className="mt-3 overflow-x-auto p-2 bg-slate-100 dark:bg-slate-900/70 rounded-md text-slate-900 dark:text-slate-200">
                    <BlockMath math={item.formula} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-700">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-500 text-transparent bg-clip-text">
                Fault Zone Interpretation
              </span>
            </h4>
          </div>
          <ul className="mt-3 space-y-4 text-sm text-justify text-slate-600 dark:text-slate-400">
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(255, 0, 0)' }}
              >
                PD (Partial Discharge):
              </strong>{' '}
              When moisture is dissolved in transformer oil, a large amount of
              hydrogen with a small amount of methane and a trace amount of
              acetylene will be produced. This zone depends upon H₂ and CH₄.
            </li>
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(255, 153, 153)' }}
              >
                T₁ (Thermal Fault &lt; 300°C):
              </strong>{' '}
              Indicates low-temperature overheating of insulation oil. This
              fault mainly creates H₂ and CH₄ under normal conditions.
            </li>
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(255, 204, 0)' }}
              >
                T₂ (Thermal Fault 300-700°C):
              </strong>{' '}
              Indicates medium-temperature overheating. With rising temperature,
              oil thermal decomposition produces a large amount of C₂H₄.
            </li>
            <li>
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                T₃ (Thermal Fault &gt; 700°C):
              </strong>{' '}
              Indicates high-temperature overheating. At higher temperatures, a
              trace amount of C₂H₂ is produced in addition to C₂H₄ from the
              decomposition of windings.
            </li>
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(104, 255, 255)' }}
              >
                D₁ (Low Energy Discharge):
              </strong>{' '}
              Represents spark discharge. Arcing faults release large amounts of
              hydrogen and acetylene, while methane, ethane, and ethylene are
              small. D1 is classified based on a lower energy level of
              acetylene.
            </li>
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(51, 100, 240)' }}
              >
                D₂ (High Energy Discharge):
              </strong>{' '}
              Represents arc discharge. During high current and temperature,
              large amounts of hydrogen and acetylene are released. D2 is
              classified based on a higher energy level of acetylene.
            </li>
            <li>
              <strong
                className="font-semibold"
                style={{ color: 'rgb(255, 105, 180)' }}
              >
                HCCD, MCCD, LCCD (Cellulose Degradation):
              </strong>{' '}
              When solid insulation is heated, it generates CO and CO₂. The
              production rate depends on O₂ availability, moisture, and
              temperature. This zone depends upon H₂, CO, and CO₂; while CO is
              considered the main gas in this fault type.
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
              <li>The most comprehensive method, utilizing 7 key gases.</li>
              <li>
                Clearly distinguishes between oil and paper insulation faults.
              </li>
              <li>
                Weighting factors provide high sensitivity to critical
                low-concentration gases.
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
                Requires complex calculations before a point can be plotted.
              </li>
              <li>
                A large number of fault zones can sometimes result in ambiguous
                interpretations.
              </li>
              <li>
                Diagnosis is highly dependent on the accuracy of the predefined
                weighting factors.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheHeptagonGraphMethodContent;
