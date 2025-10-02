import React from 'react';

const OvertemperatureChart = () => {
  const chartData = [
    {
      gas: 'CO',
      value: 0.01,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      gas: 'H₂',
      value: 2,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      gas: 'CH₄',
      value: 16,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      gas: 'C₂H₆',
      value: 17,
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      gas: 'C₂H₄',
      value: 63,
      color: 'bg-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      gas: 'C₂H₂',
      value: 2,
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="mt-8 p-6 bg-slate-100 dark:bg-black/80 rounded-xl shadow-lg border border-slate-200 dark:border-blue-500/50">
      <h4 className="font-bold text-center text-slate-800 dark:text-white">
        Failure Type : Over Temperature in Oil
      </h4>
      <div className="mt-4 flex items-start">
        <div className="relative h-64 flex-shrink-0 flex items-center pr-12">
          <div
            className="absolute -top-10 h-full transform -rotate-180 flex items-center -left-4"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span className="text-sm text-slate-600 dark:text-gray-300">
              % of Combustibles Gases
            </span>
          </div>
        </div>

        <div className="w-full h-64 flex flex-col">
          <div className="flex-grow flex items-end justify-around relative border-l-2 border-b-2 border-slate-300 dark:border-gray-500">
            {[...Array(11)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full flex items-center"
                style={{ bottom: `${i * 10}%`, height: '1px' }}
              >
                <div className="w-full border-t border-slate-200 dark:border-gray-600 border-dashed"></div>
                <span className="absolute -left-7 text-xs text-slate-500 dark:text-gray-400">
                  {i * 10}
                </span>
              </div>
            ))}
            {chartData.map((item) => (
              <div
                key={item.gas}
                className="w-full h-full flex flex-col justify-end items-center z-10 px-1"
              >
                <p className={`text-xs font-semibold ${item.textColor} mb-1`}>
                  {item.value} %
                </p>
                <div
                  className={`w-2/4 ${item.color} rounded-t transition-all duration-500`}
                  style={{ height: `max(2px, ${item.value}%)` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-1 text-xs text-slate-600 dark:text-gray-300">
            {chartData.map((item) => (
              <span key={item.gas} className="w-full text-center">
                {item.gas}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-2">
        Typical relative proportion of gases in overtemperature type fault.
      </p>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-blue-500/30 text-slate-700 dark:text-white">
        <ul className="space-y-2 list-disc pl-5 text-sm">
          <li>
            Overtemperatures in oil with values of at least 300 °C have the
            characteristic formation of C₂H₆ and CH₄.
          </li>
          <li>
            Decomposition products also include CH₄. Traces of C₂H₂ can also
            form if the fault is severe or if there are electrical contacts.
          </li>
          <li>Key gas: C₂H₄.</li>
        </ul>
      </div>
    </div>
  );
};

export default OvertemperatureChart;
