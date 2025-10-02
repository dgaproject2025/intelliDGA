import React from 'react';
import { FireIcon } from '@heroicons/react/24/outline';

const TemperatureRelationship = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <FireIcon className="w-6 h-6 text-red-500" />
        <h4 className="text-lg font-bold text-slate-800 dark:text-red-500">
          Relationship Between Gas & Temperature
        </h4>
      </div>

      {/* Intro paragraph */}
      <p className="mt-2 text-slate-600 dark:text-slate-500 mb-2">
        Gas generation in transformers is strongly dependent on the temperature
        to which the oil and cellulose insulation are exposed. Each hydrocarbon
        gas exhibits a distinct onset temperature and growth trend. These
        well-established relationships allow engineers to correlate gas profiles
        with specific thermal fault conditions.
      </p>

      {/* Temperature thresholds */}
      <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-500">
        <li>
          At roughly{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            150°C
          </span>
          , initial traces of <strong>Hydrogen (H₂)</strong> and{' '}
          <strong>Methane (CH₄)</strong> begin to emerge.
        </li>
        <li>
          Around{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            250°C
          </span>
          , <strong>Ethane (C₂H₆)</strong> starts to form.
        </li>
        <li>
          At approximately{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            350°C
          </span>
          , <strong>Ethylene (C₂H₄)</strong> makes its debut.
        </li>
        <li>
          Between{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            200°C and 300°C
          </span>
          , methane (CH₄) production exceeds that of hydrogen.
        </li>
        <li>
          Above about{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            275°C
          </span>
          , ethane (C₂H₆) production overtakes methane.
        </li>
        <li>
          Between{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            500°C and 700°C
          </span>
          , <strong>Acetylene (C₂H₂)</strong> begins forming and continues to
          increase until peaking near 800°C.
        </li>
        <li>
          From roughly{' '}
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
            455°C to 750–800°C
          </span>
          , hydrogen (H₂) remains the dominant gas.
        </li>
      </ul>

      {/* Conclusion */}
      <p className="mt-4 text-slate-600 dark:text-slate-500">
        Beyond their peak production points, gases such as CH₄, C₂H₆, and C₂H₄
        decline in concentration with further temperature rise, while H₂ and
        C₂H₂ maintain diagnostic significance. These temperature–gas
        correlations form the backbone of DGA interpretation for thermal faults.
      </p>
    </div>
  );
};

export default TemperatureRelationship;
