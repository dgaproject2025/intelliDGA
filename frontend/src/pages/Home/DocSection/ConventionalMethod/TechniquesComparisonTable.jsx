import React from 'react';

const TechniquesComparisonTable = () => {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 shadow-lg overflow-hidden rounded-xl">
      <h3 className="p-4 font-bold text-lg text-white bg-blue-600 text-center border-b-2 border-slate-700 dark:border-slate-300">
        Grouping of the incipient fault type codes for conventional DGA
        interpretation techniques.
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-white">
            <tr>
              <th
                scope="col"
                rowSpan={2}
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 align-middle bg-blue-600"
              >
                Technique
              </th>
              <th
                scope="colgroup"
                colSpan={6}
                className="px-4 py-3 border-b-2 border-slate-700 dark:border-slate-300 bg-blue-600 text-center align-middle"
              >
                Fault Type
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                T1
              </th>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                T2
              </th>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                T3
              </th>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                PD
              </th>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                D1
              </th>
              <th
                scope="col"
                className="px-4 py-3 border-b-2 border-r-0 border-slate-700 dark:border-slate-300 bg-blue-600"
              >
                D2
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 dark:text-slate-300">
            {/* Duval Triangle */}
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Duval Triangle
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault &lt;300°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault 300–700°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault &gt;700°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Partial Discharge
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Low energy discharge
              </td>
              <td className="px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle">
                High energy discharge
              </td>
            </tr>
            {/* Doornenburg */}
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <td className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Doornenburg
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"></td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal Decomposition (T)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"></td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Partial Discharge
              </td>
              <td
                colSpan={2}
                className="text-center px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle"
              >
                Energy Discharge
              </td>
            </tr>
            {/* Rogers */}
            <tr className="bg-white dark:bg-slate-800/50">
              <td
                rowSpan={3}
                className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Rogers
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault of low temperature &lt;150°C (T1_1)
              </td>
              <td
                rowSpan={3}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Winding circulation current (T2)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Core and tank circulation current (T3_1)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Partial Discharge (PD_1)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Continuous Sparking (D1_1)
              </td>
              <td
                rowSpan={3}
                className="px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle"
              >
                Arc with power follows through (D2)
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault of temperature range 150–200°C (T1_2)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Insulated conductor overheating (T3_2)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Partial discharge with tracking (PD_2)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Flashover (D1_2)
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault of temperature range 200–300°C (T1_3)
              </td>
            </tr>
            {/* Rogers IEEE */}
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <td className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Rogers IEEE
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Low temperature thermal (T1)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal &lt;700°C (T2)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal &gt;700°C (T3)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Low-energy density arcing (PD)
              </td>
              <td
                colSpan={2}
                className="px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle"
              >
                Arcing-High-energy discharge (D)
              </td>
            </tr>
            {/* IEC ratio method */}
            <tr className="bg-white dark:bg-slate-800/50">
              <td
                rowSpan={2}
                className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                IEC ratio method
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault of temperature &lt;150°C (T1_1)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Thermal fault of medium temperature range 300°C to 700°C (T2)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Thermal fault of high temperature range &gt;700°C (T3)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                PD of low-energy density (PD_1)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Discharge with low-energy density (D1)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle"
              >
                Discharge with high-energy density (D2)
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault of low temperature range 150°C to 300°C (T1_2)
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                PD of high-energy density (PD_2)
              </td>
            </tr>
            {/* Duval Pentagon 1 */}
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <td className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Duval Pentagon 1
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault &lt;300°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault 300–700°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault &gt;700°C
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Partial Discharge
              </td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Low energy discharge
              </td>
              <td className="px-4 py-2 border-b border-slate-700 dark:border-slate-300 align-middle">
                High energy discharge
              </td>
            </tr>
            {/* Key Gas */}
            <tr className="bg-white dark:bg-slate-800/50">
              <td
                rowSpan={2}
                className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Key Gas
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              ></td>
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal degradation (TD)
              </td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              ></td>
              <td
                rowSpan={2}
                className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle"
              >
                Partial Discharge
              </td>
              <td
                rowSpan={2}
                colSpan={2}
                className="px-4 py-2 border-b border-r-0 border-slate-700 dark:border-slate-300 align-middle"
              >
                Arcing
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-800/50">
              <td className="px-4 py-2 border-b border-r border-slate-700 dark:border-slate-300 align-middle">
                Overheat cellulose (OC)
              </td>
            </tr>
            {/* IEC 60599 ratio method */}
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              <td className="px-4 py-2 font-bold text-[#1f75fe] dark:text-sky-400 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                IEC 60599 ratio method
              </td>
              <td className="px-4 py-2 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault t &lt;300°C (T1)
              </td>
              <td className="px-4 py-2 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault 300°C &lt; T &lt;700°C (T2)
              </td>
              <td className="px-4 py-2 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                Thermal fault T &gt;700°C (T3)
              </td>
              <td className="px-4 py-2 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                Partial Discharge (PD)
              </td>
              <td className="px-4 py-2 border-b-0 border-r border-slate-700 dark:border-slate-300 align-middle">
                Discharge of low energy (D1)
              </td>
              <td className="px-4 py-2 border-b-0 border-r-0 border-slate-700 dark:border-slate-300 align-middle">
                Discharge of high energy (D2)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechniquesComparisonTable;
