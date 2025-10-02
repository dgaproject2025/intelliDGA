import React from 'react';
import {
  LightBulbIcon,
  CalculatorIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import RogersMethodTable1 from './RogersMethodTable1'; // <-- Import Table 1
import RogersMethodTable2 from './RogersMethodTable2'; // <-- Import Table 1
import RogersMethodTable3 from './RogersMethodTable3'; // <-- Import Table 1
// A reusable component for each ratio card
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

const RogersMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        The Rogers Ratio Method
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
              Based on the Dornenburg method, the Rogers method proposed the
              evaluation of failures by the relationship between the gases C₂H₂,
              C₂H₄, C₂H₆, CH₄, and H₂.
            </li>
            <li>
              Because the ratio C₂H₆/CH₄ only indicated a limited temperature
              range of decomposition, but did not assist in further identifying
              the fault, it was deleted in IEEE Std C57.104.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RatioCard
              ratio="CH₄ / H₂"
              description="Indicates partial discharges and overheating."
              bgColor="bg-sky-500 dark:bg-sky-600"
            />
            <RatioCard
              ratio="C₂H₄ / C₂H₆"
              description="Indicates the temperature of the thermal fault."
              bgColor="bg-orange-500 dark:bg-orange-600"
            />
            <RatioCard
              ratio="C₂H₂ / C₂H₄"
              description="Indicates the presence of high-energy arcing."
              bgColor="bg-red-500 dark:bg-red-600"
            />
          </div>
        </div>

        {/* The new table component is placed here */}
        <div className="grid grid-cols-1 gap-6">
          <RogersMethodTable1 />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RogersMethodTable2 />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RogersMethodTable3 />
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
              <li>Identify faults PD, D1, D2, T1, T2, T3.</li>
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
                The limitation of the Rogers Ratios Method is that it cannot
                identify faults in a relatively large number of DGA results
                (typically 35%).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RogersMethodContent;
