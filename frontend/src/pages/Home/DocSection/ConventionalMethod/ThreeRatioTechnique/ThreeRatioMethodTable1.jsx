import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const ThreeRatioTable1 = () => {
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
    // Main container now holds the table and the new caption
    <div className="rounded-xl shadow-2xl bg-blue-900/90 text-white dark:bg-zinc-900 backdrop-blur-sm border border-blue-800 dark:border-zinc-700 h-full flex flex-col">
      {/* Table Header */}
      <h4 className="p-4 text-lg font-bold text-center text-blue-100 dark:text-sky-200 bg-blue-800/70 dark:bg-zinc-800 border-b border-blue-700 dark:border-zinc-700 rounded-t-xl flex-shrink-0">
        Reference Values for Three Ratio Method (ANSI/IEEE C57.104)
      </h4>

      {/* Table Body with Padding */}
      <div className="p-4 flex-grow">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <thead className="text-xs text-blue-100 dark:text-sky-300 uppercase bg-blue-700/80 dark:bg-slate-800">
              {/* ... table headers ... */}
              <tr>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider border border-blue-600 dark:border-zinc-600 w-1/2"
                >
                  Gas Type
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center border border-blue-600 dark:border-zinc-600 w-1/2"
                >
                  Concentration (PPM)
                </th>
              </tr>
            </thead>
            <tbody className="text-blue-50 dark:text-slate-300">
              {/* ... table rows ... */}
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 
                             odd:bg-blue-900/50 even:bg-blue-800/60 hover:bg-blue-800/80
                             dark:odd:bg-zinc-900 dark:even:bg-zinc-800/50 dark:hover:bg-sky-900/30"
                >
                  <td className="px-3 sm:px-4 py-4 font-medium whitespace-nowrap border border-blue-700 dark:border-zinc-600 dark:text-slate-200">
                    {row.gas}
                  </td>
                  <td className="px-3 sm:px-4 py-4 font-mono text-center border border-blue-700 dark:border-zinc-600">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appended Caption Section */}
      <div className="p-4 pt-0 mt-auto flex-shrink-0">
        <div className="bg-blue-600/80 dark:bg-sky-900/40 p-3 rounded-lg text-white/90 dark:text-sky-200/90 border border-blue-500 dark:border-sky-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 pt-0.5">
              <InformationCircleIcon className="w-5 h-5 text-white dark:text-sky-200" />
            </div>
            <p className="text-sm text-justify">
              <strong>Note:</strong> According to IEC 60599, to use the Gas
              Ratio technique for Dissolved Gas Analysis, at least one of the
              hydrocarbon gas concentration values has to be above the normal
              concentration limits before applying the fault interpretation
              method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeRatioTable1;
