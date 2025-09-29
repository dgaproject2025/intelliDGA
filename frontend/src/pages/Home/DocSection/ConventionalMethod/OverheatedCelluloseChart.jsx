import React from 'react';

const OverheatedCelluloseChart = () => {
  const chartData = [
    { gas: 'CO', value: 92, color: 'bg-blue-500', textColor: 'text-blue-400' },
    {
      gas: 'H₂',
      value: 6.7,
      color: 'bg-green-500',
      textColor: 'text-green-400',
    },
    {
      gas: 'CH₄',
      value: 1.2,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-400',
    },
    {
      gas: 'C₂H₆',
      value: 0.01,
      color: 'bg-red-500',
      textColor: 'text-red-400',
    },
    {
      gas: 'C₂H₄',
      value: 0.01,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
    },
    {
      gas: 'C₂H₂',
      value: 0.01,
      color: 'bg-orange-500',
      textColor: 'text-orange-400',
    },
  ];

  return (
    <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h4 className="font-bold text-center text-slate-800 dark:text-slate-200">
        Failure Type : Overheated Cellulose
      </h4>
      {/* UPDATED: Restructured the flex container for proper alignment */}
      <div className="mt-4 flex">
        <div className="relative h-64 flex-shrink-0 flex items-center pr-12">
          <div
            className="absolute -top-10 h-full transform -rotate-180 flex items-center -left-4"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span className="text-sm text-slate-600 dark:text-slate-300">
              % of Combustibles Gases
            </span>
          </div>
        </div>

        <div className="w-full h-64 flex flex-col">
          <div className="flex-grow flex items-end justify-around relative border-l-2 border-b-2 border-slate-300 dark:border-slate-600">
            {[...Array(11)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full flex items-center"
                style={{ bottom: `${i * 10}%`, height: '1px' }}
              >
                <div className="w-full border-t border-slate-200 dark:border-slate-700 border-dashed"></div>
                <span className="absolute -left-7 text-xs text-slate-500 dark:text-slate-400">
                  {i * 10}
                </span>
              </div>
            ))}
            {chartData.map((item) => (
              <div
                key={item.gas}
                className="w-full h-full flex flex-col justify-end items-center z-10 px-1"
              >
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {item.value} %
                </p>
                <div
                  className={`${item.color} w-2/4 rounded-t transition-all duration-500`}
                  style={{ height: `max(2px, ${item.value}%)` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-1 text-xs text-slate-600 dark:text-slate-400">
            {chartData.map((item) => (
              <span key={item.gas} className="w-full text-center">
                {item.gas}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
        Typical relative proportion of gases in cellulose heating type fault.
      </p>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
        <ul className="space-y-2 list-disc pl-5 text-sm">
          <li>
            Overheating insulation paper produces a large amount of CO and CO₂,
            but the latter is not a combustible gas, emphasizing that the
            analyses pertain to combustible gases.
          </li>
          <li>
            Gaseous hydrocarbons, such as CH₄ and C₂H₄, are also present if the
            fault consists of an oil-impregnated structure.
          </li>
          <li>Key gases: CO and CO₂.</li>
        </ul>
      </div>
    </div>
  );
};

export default OverheatedCelluloseChart;
