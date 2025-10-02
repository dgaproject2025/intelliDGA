import React from 'react';
import { TableCellsIcon } from '@heroicons/react/24/outline';

const GasesAssociatedWithFaults = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <TableCellsIcon className="w-6 h-6 text-red-500" />
        <h4 className="text-lg font-bold text-slate-800 dark:text-red-500">
          Gases Associated with Specific Faults
        </h4>
      </div>

      {/* Optional legend for quick decoding */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-slate-800 dark:text-sky-300 dark:border-slate-700">
          PD = Partial Discharge
        </span>
        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-slate-800 dark:text-emerald-300 dark:border-slate-700">
          D1/D2 = Low/High Energy Discharge
        </span>
        <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-slate-800 dark:text-amber-300 dark:border-slate-700">
          T1/T2/T3 = Low/Med/High Thermal Fault
        </span>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto relative rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:bg-blue-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fault
              </th>
              <th scope="col" className="px-6 py-3">
                Major Gas
              </th>
              <th scope="col" className="px-6 py-3">
                Minor Gas
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                PD
              </td>
              <td className="px-6 py-4">H₂, CH₄, CO</td>
              <td className="px-6 py-4">C₂H₆, C₂H₂, CO₂</td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                D1
              </td>
              <td className="px-6 py-4">H₂, C₂H₂</td>
              <td className="px-6 py-4">—</td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                D2
              </td>
              <td className="px-6 py-4">H₂, C₂H₂, CO, CO₂</td>
              <td className="px-6 py-4">CH₄, C₂H₄, C₂H₆</td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                T1
              </td>
              <td className="px-6 py-4">CH₄, C₂H₆, CO, CO₂</td>
              <td className="px-6 py-4">H₂, C₂H₄</td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                T2
              </td>
              <td className="px-6 py-4">C₂H₄, CH₄</td>
              <td className="px-6 py-4">H₂</td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                T3
              </td>
              <td className="px-6 py-4">C₂H₄</td>
              <td className="px-6 py-4">H₂, C₂H₆</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Expanded Analysis */}
      <div className="mt-5 space-y-3 text-slate-600 dark:text-slate-500">
        <p className="text-justify">
          <span className="font-semibold text-slate-800 dark:text-red-500">
            How to read this:
          </span>{' '}
          “Major Gas” indicates the most diagnostic species typically showing
          the highest rise or significance for that fault, while “Minor Gas”
          lists supporting gases that often appear but with lower magnitude or
          consistency. Consider <em>rates</em> (Δppm/day or per 1000 h),
          baseline levels, and operational context for reliable interpretation.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-semibold">PD (Partial Discharge):</span>{' '}
            Dominant <strong>H₂</strong> due to low-energy C–H cleavage;{' '}
            <strong>CH₄</strong> and small
            <strong> CO</strong> may accompany early paper involvement. Minor{' '}
            <strong>C₂H₆</strong> and occasional
            <strong> C₂H₂</strong> can appear if PD evolves or local hotspots
            develop. Look for intermittent rises correlated with load or
            moisture level changes.
          </li>
          <li>
            <span className="font-semibold">D1 (Low-Energy Discharge):</span>{' '}
            Onset of <strong>C₂H₂</strong> with <strong>H₂</strong> indicates
            incipient arcing. Even modest, sustained acetylene is suspicious.
            Absence of strong thermal gases suggests the discharge is not yet
            accompanied by extensive heating of oil or paper.
          </li>
          <li>
            <span className="font-semibold">D2 (High-Energy Discharge):</span>{' '}
            High <strong>C₂H₂</strong> with <strong>H₂</strong>, plus{' '}
            <strong>CO/CO₂</strong> from paper damage, is characteristic. Minor{' '}
            <strong>CH₄, C₂H₄, C₂H₆</strong> reflect collateral thermal
            cracking. Expect sharp spikes; verify with event logs, bushing
            condition, and through-fault histories.
          </li>
          <li>
            <span className="font-semibold">
              T1 (Low Thermal, &lt;≈300 °C):
            </span>{' '}
            Dominated by <strong>CH₄</strong> and <strong>C₂H₆</strong>;{' '}
            <strong>CO/CO₂</strong> rise if heating involves cellulose.{' '}
            <strong>H₂</strong> and small <strong>C₂H₄</strong> are common but
            secondary. Watch for gradual trending upward rather than sudden
            jumps.
          </li>
          <li>
            <span className="font-semibold">
              T2 (Medium Thermal, ≈300–700 °C):
            </span>{' '}
            <strong>C₂H₄</strong> becomes prominent as
            dehydrogenation/β-elimination accelerates; <strong>CH₄</strong>{' '}
            persists.
            <strong> H₂</strong> may be present but is less diagnostic here.
            Rising C₂H₄/C₂H₆ ratio is a classic pointer to hotter oil faults.
          </li>
          <li>
            <span className="font-semibold">
              T3 (High Thermal, &gt;≈700 °C):
            </span>{' '}
            Strong <strong>C₂H₄</strong> is typical; <strong>H₂</strong> and{' '}
            <strong>C₂H₆</strong> may co-appear. If <strong>C₂H₂</strong>{' '}
            emerges, reassess for concurrent arcing (D1/D2). Look for
            carbon/soot indicators and varnish darkening in oil tests.
          </li>
        </ul>

        <div className="mt-3 text-slate-800 dark:text-orange-50 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm">
          <p className="font-semibold text-slate-800 dark:text-orange-200">
            Practical tips
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Always compare against unit-specific baselines; some fleets show
              persistent background H₂.
            </li>
            <li>
              Use ratios (e.g., C₂H₂/CH₄, C₂H₄/C₂H₆) and{' '}
              <em>rates of change</em> to reinforce diagnosis.
            </li>
            <li>
              Correlate with loading, tap-changer operations, and ambient spikes
              to filter false positives.
            </li>
            <li>
              Confirm paper involvement with furans/moisture/DP where CO/CO₂ are
              elevated.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GasesAssociatedWithFaults;
