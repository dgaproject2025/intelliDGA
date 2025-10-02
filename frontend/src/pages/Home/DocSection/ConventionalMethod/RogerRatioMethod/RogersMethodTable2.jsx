import React from 'react';

const RogersMethodTable2 = () => {
  // Data transcribed from the provided image
  const data = [
    {
      fault: 'PD (Partial Discharge)',
      ch4_h2: '< 0.1',
      c2h6_ch4: 'NS',
      c2h4_c2h6: 'NS',
      c2h2_c2h4: 'NS',
    },
    {
      fault: 'D1 (Thermal < 300 °C)',
      ch4_h2: '> 1.0',
      c2h6_ch4: '< 0.1',
      c2h4_c2h6: '< 0.1',
      c2h2_c2h4: 'NS',
    },
    {
      fault: 'D2 (Thermal 300-700 °C)',
      ch4_h2: '> 1.0',
      c2h6_ch4: '0.1-0.5',
      c2h4_c2h6: '0.1-1.0',
      c2h2_c2h4: 'NS',
    },
    {
      fault: 'T1 (Thermal < 300 °C)',
      ch4_h2: '> 1.0',
      c2h6_ch4: '< 0.1',
      c2h4_c2h6: '< 0.1',
      c2h2_c2h4: 'NS',
    },
    {
      fault: 'T2 (Thermal 300-700 °C)',
      ch4_h2: '> 1.0',
      c2h6_ch4: '0.1-0.5',
      c2h4_c2h6: '0.1-1.0',
      c2h2_c2h4: 'NS',
    },
    {
      fault: 'T3 (Thermal > 700 °C)',
      ch4_h2: '0.1-1.0',
      c2h6_ch4: '> 0.5',
      c2h4_c2h6: '> 1.0',
      c2h2_c2h4: '< 0.1',
    },
    {
      fault: 'DT (Mixture of Thermal & Electrical)',
      ch4_h2: '0.1-1.0',
      c2h6_ch4: '> 0.1',
      c2h4_c2h6: '> 0.1',
      c2h2_c2h4: '> 0.1',
    },
  ];

  return (
    // Main container with styles for both light and dark themes
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full">
      {/* Table Header */}
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl">
        Table 2: Rogers Ratios Detailed Fault Analysis
      </h4>

      {/* Table Body with Padding */}
      <div className="p-4">
        <div className="overflow-x-auto rounded-md">
          {/* Using 'table-fixed' to manage the 5 columns */}
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              <tr>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600 break-words w-[30%]" // Give more width to the fault column
                >
                  Fault
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words"
                >
                  CH₄/H₂
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words"
                >
                  C₂H₆/CH₄
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words"
                >
                  C₂H₄/C₂H₆
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words"
                >
                  C₂H₂/C₂H₄
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
                    {row.ch4_h2}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.c2h6_ch4}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.c2h4_c2h6}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.c2h2_c2h4}
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

export default RogersMethodTable2;
