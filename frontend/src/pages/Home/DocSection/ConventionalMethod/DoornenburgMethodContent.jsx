import React from 'react';
import {
  LightBulbIcon,
  CalculatorIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import DornenburgChart from './DornenburgChart'; // <-- Import the new chart component
import DornenburgTable1 from './DornenburgTable1'; // <-- Import Table 1
import DornenburgTable2 from './DornenburgTable2'; // <-- Import Table 2

const RatioCard = ({ ratio, description, bgColor }) => (
  <div className={`rounded-xl shadow-lg overflow-hidden ${bgColor}`}>
    <div className="p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
          <BeakerIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h5 className="font-bold text-lg">{ratio}</h5>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const DoornenburgMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        The Doornenburg Ratio Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          <ul className="mt-3 space-y-3 list-disc pl-5 text-slate-600 dark:text-slate-300 text-justify">
            <li>
              This method was proposed in 1974 and used for the recognition of
              incipient faults using the technique of key gas ratios (H₂, CH₄,
              C₂H₆, C₂H₄ and C₂H₂).
            </li>
            <li>
              The principle of the method is that if one of the key gases
              exceeds double the reference value, or if CO or C₂H₆ exceeds the
              reference value, a fault is established and then analyzed.
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <CalculatorIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Key Gas Ratios
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RatioCard
              ratio="CH₄ / H₂"
              description="Distinguishes between thermal and electrical faults."
              bgColor="bg-sky-500 dark:bg-sky-600"
            />
            <RatioCard
              ratio="C₂H₂ / C₂H₄"
              description="Indicates the energy level of the fault."
              bgColor="bg-red-500 dark:bg-red-600"
            />
            <RatioCard
              ratio="C₂H₂ / CH₄"
              description="Helps differentiate types of discharges."
              bgColor="bg-orange-500 dark:bg-orange-600"
            />
            <RatioCard
              ratio="C₂H₆ / C₂H₂"
              description="Assesses the severity of thermal issues."
              bgColor="bg-yellow-500 dark:bg-yellow-600"
            />
          </div>
        </div>

        {/* UPDATED: Replaced the static image with the new interactive chart */}
        <DornenburgChart />
        {/* NEW: Two-column grid for the tables */}
        <div className="grid grid-cols-1  gap-6 items-start">
          <DornenburgTable1 />
          <DornenburgTable2 />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
              <h5 className="font-semibold text-green-700 dark:text-green-300">
                Advantages
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                Identify incipient faults such as thermal decomposition, partial
                discharge, and arcing.
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <ShieldExclamationIcon className="w-6 h-6 text-orange-500" />
              <h5 className="font-semibold text-orange-700 dark:text-orange-300">
                Disadvantages
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                Provides insufficient information for multiple faults or cases
                that fall outside specified codes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoornenburgMethodContent;
