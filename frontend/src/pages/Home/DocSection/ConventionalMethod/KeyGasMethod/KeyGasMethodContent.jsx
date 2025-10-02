import React from 'react';
import {
  LightBulbIcon,
  KeyIcon,
  BeakerIcon,
  FireIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import ArcingFaultChart from './ArcingFaultChart';
import PartialDischargeChart from './PartialDischargeChart';
import OvertemperatureChart from './OvertemperatureChart';
import OverheatedCelluloseChart from './OverheatedCelluloseChart';

const KeyGasCard = ({ icon, gasName, faultType, bgColor }) => (
  <div className={`rounded-xl shadow-lg overflow-hidden ${bgColor}`}>
    <div className="p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">{icon}</div>
        <div>
          <h5 className="font-semibold">{gasName}</h5>
          <p className="text-xs opacity-90">{faultType}</p>
        </div>
      </div>
    </div>
  </div>
);

const KeyGasMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        The Key Gas Method
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
              The key gas method is based on the fact that when a fault occurs,
              there is the formation of gases that exceed the normal values of
              insulation degradation.
            </li>
            <li>
              When the gas that characterizes the incipient failure type (the
              "key gas") is predominant among other gases, the condition is
              considered abnormal.
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <KeyIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Key Gases and Associated Faults
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KeyGasCard
              icon={<BeakerIcon className="w-7 h-7 text-white" />}
              gasName="Acetylene (C₂H₂)"
              faultType="Arcing"
              bgColor="bg-red-500 dark:bg-red-600"
            />
            <KeyGasCard
              icon={<FireIcon className="w-7 h-7 text-white" />}
              gasName="Ethylene (C₂H₄)"
              faultType="Overtemperature (>300°C)"
              bgColor="bg-orange-500 dark:bg-orange-600"
            />
            <KeyGasCard
              icon={<FireIcon className="w-7 h-7 text-white" />}
              gasName="Methane (CH₄)"
              faultType="Overtemperature (<300°C)"
              bgColor="bg-yellow-500 dark:bg-yellow-600"
            />
            <KeyGasCard
              icon={<SparklesIcon className="w-7 h-7 text-white" />}
              gasName="Hydrogen (H₂)"
              faultType="Partial Discharge"
              bgColor="bg-sky-500 dark:bg-sky-600"
            />
          </div>
        </div>

        {/* UPDATED: Changed grid to a single column */}
        <div className="grid grid-cols-1 gap-6">
          <ArcingFaultChart />
          <PartialDischargeChart />
          <OvertemperatureChart />
          <OverheatedCelluloseChart />
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
                Can detect: electric arcing, partial discharges, overtemperature
                in oil, and cellulose overheating.
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
              <li>Not widely used for diagnosing transformer conditions.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyGasMethodContent;
