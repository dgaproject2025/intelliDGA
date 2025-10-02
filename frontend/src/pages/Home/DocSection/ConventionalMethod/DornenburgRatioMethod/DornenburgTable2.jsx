import React from 'react';

const DornenburgTable2 = () => {
  const data = [
    { ratio: 'CH₄/H₂', thermal: '> 1', partial: '< 0.1', arcing: '0.1-1' },
    {
      ratio: 'C₂H₂/C₂H₄',
      thermal: '< 0.75',
      partial: 'Not Significant',
      arcing: '> 0.75',
    },
    { ratio: 'C₂H₂/CH₄', thermal: '< 0.3', partial: '< 0.3', arcing: '> 0.3' },
    { ratio: 'C₂H₆/C₂H₂', thermal: '> 0.4', partial: '> 0.4', arcing: '< 0.4' },
  ];
  return (
    // Main container with styles for both light and dark themes
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full">
      {/* Table Header */}
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl">
        Table 2: Method Relationships
      </h4>

      {/* Table Body with Padding */}
      <div className="p-4">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left border-collapse">
            {/* Table Head */}
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600"
                >
                  Ratio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600"
                >
                  Thermal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600"
                >
                  Partial Discharge
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600"
                >
                  Arcing
                </th>
              </tr>
            </thead>
            {/* Table Body with alternating row colors */}
            <tbody className="text-blue-50 dark:text-slate-300">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 
                             odd:bg-blue-900/50 even:bg-blue-800/60 hover:bg-blue-800/80
                             dark:odd:bg-zinc-900 dark:even:bg-zinc-800/50 dark:hover:bg-sky-900/30"
                >
                  {/* Ratio Cell */}
                  <td className="px-6 py-4 font-mono font-bold whitespace-nowrap border border-blue-700 dark:border-zinc-600 dark:text-slate-200">
                    {row.ratio}
                  </td>
                  {/* Thermal Cell */}
                  <td className="px-6 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.thermal}
                  </td>
                  {/* Partial Discharge Cell */}
                  <td className="px-6 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.partial}
                  </td>
                  {/* Arcing Cell */}
                  <td className="px-6 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.arcing}
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

export default DornenburgTable2;
