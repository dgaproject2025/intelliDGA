import React from 'react';
import { TableCellsIcon } from '@heroicons/react/24/outline';

const NormalGassingTable = () => {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex items-center gap-4">
        <TableCellsIcon className="w-8 h-8 text-indigo-500" />
        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
          90th percentile gas concentrations as a function of O2/N2 ratio and
          age in μl/L (ppm)
        </h5>
      </div>
      <div className="overflow-x-auto relative rounded-lg border border-slate-300 dark:border-slate-600 mt-4">
        <table className="w-full text-sm text-center text-slate-600 dark:text-slate-300">
          <thead className="text-xs text-indigo-800 dark:text-indigo-200 uppercase bg-indigo-50 dark:bg-indigo-900/40">
            {/* CORRECTED: rowspan and colspan are now accurate */}
            <tr>
              <th
                scope="col"
                rowSpan="3"
                className="px-4 py-3 border-b border-r border-slate-300 dark:border-slate-600 align-middle"
              >
                Gas
              </th>
              <th
                scope="colgroup"
                colSpan="4"
                className="px-4 py-3 border-b border-r border-slate-300 dark:border-slate-600"
              >
                O₂/N₂ Ratio ≤ 0.2
              </th>
              <th
                scope="colgroup"
                colSpan="5"
                className="px-4 py-3 border-b border-slate-300 dark:border-slate-600"
              >
                O₂/N₂ Ratio &gt; 0.2
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan="5"
                className="px-4 py-3 border-b border-r border-slate-300 dark:border-slate-600"
              >
                Transformer Age in Years
              </th>
              <th
                scope="col"
                colSpan="4"
                className="px-4 py-3 border-b border-slate-300 dark:border-slate-600"
              >
                Transformer Age in Years
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              ></th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                Unknown
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                1-9
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                10-30
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                &gt;30
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                Unknown
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                1-9
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-r border-slate-300 dark:border-slate-600 font-medium"
              >
                10-30
              </th>
              <th
                scope="col"
                className="px-2 py-3 border-b border-slate-300 dark:border-slate-600 font-medium"
              >
                &gt;30
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300 dark:divide-slate-600">
            {/* CORRECTED: All borders are now theme-compatible and visible */}
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Hydrogen (H₂)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                80
              </td>

              <td
                colSpan="2"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                75
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                100
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                40
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                40
              </td>
              <td></td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Methane (CH₄)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                90
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                45
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                90
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                110
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                20
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                20
              </td>
              <td></td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Ethane (C₂H₆)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                90
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                30
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                90
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                150
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                15
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                15
              </td>
              <td></td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Ethylene (C₂H₄)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                50
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                20
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                50
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                90
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                50
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                25
              </td>
              <td
                colSpan="2"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                60
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Acetylene (C₂H₂)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                1
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                1
              </td>

              <td className="border-r border-slate-300 dark:border-slate-600">
                2
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                2
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Carbon monoxide (CO)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                900
              </td>

              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                900
              </td>

              <td className="border-r border-slate-300 dark:border-slate-600">
                900
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                500
              </td>
              <td
                colSpan="3"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                500
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-600">
                Carbon dioxide (CO₂)
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                9000
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                5000
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                10000
              </td>

              <td
                colSpan="2"
                className="border-r border-slate-300 dark:border-slate-600"
              >
                9000
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                5000
              </td>
              <td className="border-r border-slate-300 dark:border-slate-600">
                3500
              </td>
              <td>5500</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-justify">
        NOTE: During the data analysis, it was determined that voltage class,
        MVA, and volume of mineral oil did not contribute significantly to these
        values.
      </p>
    </div>
  );
};

export default NormalGassingTable;
