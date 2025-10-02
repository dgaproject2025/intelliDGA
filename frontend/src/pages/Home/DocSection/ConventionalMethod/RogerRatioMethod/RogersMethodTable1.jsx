import React from 'react';

const RogersMethodTable1 = () => {
  const data = [
    {
      fault: 'Normal',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '≥ 0.1 & < 1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Low-energy density arcing-PD',
      c2h2_c2h4: '< 0.1',
      ch4_h2: '< 0.1',
      c2h4_c2h6: '< 1',
    },
    {
      fault: 'Arcing high-energy discharge',
      c2h2_c2h4: '≥ 1 & ≤ 3',
      ch4_h2: '≥ 0.1 & ≤ 1',
      c2h4_c2h6: '> 3',
    },
    {
      fault: 'Low temperature thermal',
      c2h2_c2h4: '< 1',
      ch4_h2: '≥ 0.1 & ≤ 1',
      c2h4_c2h6: '≥ 1 & ≤ 3',
    },
    {
      fault: 'Thermal < 700 °C',
      c2h2_c2h4: '< 1',
      ch4_h2: '> 1',
      c2h4_c2h6: '≥ 1 & ≤ 3',
    },
    {
      fault: 'Thermal > 700 °C',
      c2h2_c2h4: '< 1',
      ch4_h2: '> 1',
      c2h4_c2h6: '> 3',
    },
  ];

  return (
    // Main container with styles for both light and dark themes
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full">
      {/* Table Header */}
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl">
        Table 1. Rogers method relationships IEEE Std C57.104.
      </h4>

      {/* Table Body with Padding */}
      <div className="p-4">
        <div className="overflow-x-auto rounded-md">
          {/* Added 'table-fixed' to enforce column widths */}
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              <tr>
                <th
                  scope="col"
                  // Added 'break-words' and responsive padding
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600 break-words w-1/4" // Adjusted width for fault column
                >
                  Fault
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/4"
                >
                  C₂H₂ / C₂H₄
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/4"
                >
                  CH₄ / H₂
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 break-words w-1/4"
                >
                  C₂H₄ / C₂H₆
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
                  {/* Fault Cell with responsive padding */}
                  <td className="px-3 sm:px-4 py-4 font-medium whitespace-normal border border-blue-700 dark:border-zinc-600 dark:text-slate-200">
                    {row.fault}
                  </td>
                  {/* Other cells with responsive padding */}
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

export default RogersMethodTable1;
