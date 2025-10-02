import React from 'react';

const DornenburgTable1 = () => {
  const data = [
    { gas: 'Hydrogen (H₂)', value: 100 },
    { gas: 'Methane (CH₄)', value: 120 },
    { gas: 'Carbon Monoxide (CO)', value: 350 },
    { gas: 'Carbon Dioxide (CO₂)', value: 2500 },
    { gas: 'Acetylene (C₂H₂)', value: 1 },
    { gas: 'Ethylene (C₂H₄)', value: 50 },
    { gas: 'Ethane (C₂H₆)', value: 65 },
  ];

  return (
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full">
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl">
        Table 1: Reference Gas Concentrations
      </h4>

      <div className="p-4">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600"
                >
                  Gas Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600"
                >
                  Concentration (ppm)
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
                  <td className="px-6 py-4 font-medium whitespace-nowrap border border-blue-700 dark:border-zinc-600 dark:text-slate-200">
                    {row.gas}
                  </td>
                  <td className="px-6 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.value}
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

export default DornenburgTable1;
