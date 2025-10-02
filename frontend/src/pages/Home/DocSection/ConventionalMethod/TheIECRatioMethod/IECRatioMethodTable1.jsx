import React from 'react';

const IECRatioMethodTable1 = () => {
  // Data transcribed from the provided image
  const data = [
    {
      fault: 'Normal',
      c2h2_c2h4: '< 1',
      ch4_h2: '≥0.1 & <1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Partial discharge of low-energy density',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '< 0.1',
      c2h4_c2h6: '≥1 & <3',
    },
    {
      fault: 'Partial discharge of high-energy density',
      c2h2_c2h4: '≥0.1 & ≤3',
      ch4_h2: '< 0.1',
      c2h4_c2h6: '≥1 & <3',
    },
    {
      fault: 'Discharge of low energy',
      c2h2_c2h4: '(≥0.1 & ≤3) or (≥3)',
      ch4_h2: '≥0.1 & <1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Discharge of high energy',
      c2h2_c2h4: '≥0.1 & ≤3',
      ch4_h2: '≥0.1 & <1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Thermal fault of temperature < 150 °C',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '≥0.1 & <1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Thermal fault of low temperature range 150 °C to 300 °C',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '≥1',
      c2h4_c2h6: '> 3',
    },
    {
      fault: 'Thermal fault of medium temperature range 300 °C to 700 °C',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '≥1',
      c2h4_c2h6: '> 3',
    },
    {
      fault: 'Thermal fault of high temperature range > 700 °C',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '≥1',
      c2h4_c2h6: '> 3',
    },
  ];

  return (
    // Main container with styles for both light and dark themes
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full">
      {/* Table Header */}
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl">
        Table 1: First Version of IEC Ratio Method
      </h4>

      {/* Table Body with Padding */}
      <div className="p-4">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              <tr>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600 break-words w-2/5" // Wider column for fault description
                >
                  Fault
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/5"
                >
                  C₂H₂/C₂H₄
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/5"
                >
                  CH₄/H₂
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/5"
                >
                  C₂H₄/C₂H₆
                </th>
              </tr>
            </thead>
            <tbody className="text-blue-50 dark:text-slate-300">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 
                             odd:bg-blue-900/50 even:bg-blue-800/60 hover:bg-blue-800/80
                             dark:odd:bg-zinc-900 dark:even:bg-zinc-800/50 dark:hover:bg-sky-900/30"
                >
                  {/* Fault Cell */}
                  <td className="px-3 sm:px-4 py-4 font-medium whitespace-normal border border-blue-700 dark:border-zinc-600 dark:text-slate-200">
                    {row.fault}
                  </td>
                  {/* Ratio Cells */}
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.c2h2_c2h4}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.ch4_h2}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.c2h4_c2h6}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IECRatioMethodTable1;
