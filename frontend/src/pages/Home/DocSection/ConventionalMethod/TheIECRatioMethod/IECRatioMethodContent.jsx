import React from 'react';
import {
  LightBulbIcon,
  DocumentTextIcon,
  TableCellsIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  BeakerIcon, // Added for the new section
} from '@heroicons/react/24/outline';

import IECRatioMethodTable1 from './IECRatioMethodTable1';
import IECRatioMethodTable2 from './IECRatioMethodTable2';
import IECRatioMethodTable3 from './IECRatioMethodTable3';

const IECRatioMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        The IEC Ratio Method
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
              This method was published in the IEEE article in 1978,
              differentiating from the Rogers method by removing the ratio
              analysis between the C₂H₆/CH₄ gases.
            </li>
            <li>
              The purpose of removing this ratio was to simplify the analysis of
              failures, since its contribution was limited and not useful in
              identifying the failure.
            </li>
            <li>
              Because the ratio C₂H₆/CH₄ only indicated a limited temperature
              range of decomposition, it was deleted in the first version of the
              IEC ratio Method.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <IECRatioMethodTable1 />
        </div>

        {/* ============================================================= */}
        {/* NEW: Added the "Further Considerations" section here          */}
        {/* ============================================================= */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <BeakerIcon className="w-6 h-6 text-purple-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Further Considerations & Limitations
            </h4>
          </div>
          <ul className="mt-3 space-y-3 list-disc pl-5 text-slate-600 dark:text-slate-300 text-justify">
            <li>
              In order to use the IEC 60599 ratio method, at least one of the
              gases shown in Table 2 must be above its limit; if these limits
              are not exceeded, the conditions of the equipment will be
              considered normal.
            </li>
            <li>
              The IEC 60599:2022 standard recommends that if the ranges of the
              reported values do not fall inside the limit ranges and do not
              correspond to the types of faults, a two- or three-dimensional
              plot of the quantities of the dissolved gases should be used.
            </li>
            <li>
              Using a Cartesian representation of the IEC ratio method, it can
              be seen that faults D₁ and D₂ overlap. Although these are both
              cases of energy discharge, misinterpretation of the intensity of
              the fault type can occur.
            </li>
            <li>
              In conclusion, one of the main disadvantages of these techniques
              consists of the fact that the gas proportion obtained does not
              fall within the specific domain of values, leading to an
              inconclusive diagnosis of the defect.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <IECRatioMethodTable2 />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <IECRatioMethodTable3 />
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
                A part of the gas ratio values obtained does not fall within the
                specific range of values, making diagnosis of the fault
                inconclusive.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default IECRatioMethodContent;
