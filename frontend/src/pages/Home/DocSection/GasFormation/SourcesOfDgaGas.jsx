import React from 'react';
import { CircleStackIcon } from '@heroicons/react/24/outline';

const SourcesOfDgaGas = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <CircleStackIcon className="w-6 h-6 text-sky-500" />
        <h4 className="text-lg font-bold text-blue-800 dark:text-blue-500">
          Primary Sources of Dissolved Gases
        </h4>
      </div>

      {/* Expanded Content */}
      <ul className="mt-4 space-y-4">
        {/* Hydrocarbon Gases */}
        <li className="flex">
          <strong className="w-44 flex-shrink-0 font-semibold text-red-600 dark:text-red-500">
            Hydrocarbon Gases:
          </strong>
          <span className="text-slate-600 dark:text-slate-500">
            These originate from the{' '}
            <strong>
              thermal and electrical degradation of the mineral oil
            </strong>{' '}
            used in transformers. When oil molecules undergo cracking, gases
            such as{' '}
            <strong>
              Hydrogen (H₂), Methane (CH₄), Ethane (C₂H₆), Ethylene (C₂H₄), and
              Acetylene (C₂H₂)
            </strong>{' '}
            are formed. <br />
            <em>Key insight:</em> The ratio and concentration of these gases
            provide clues about the type of fault — from low-energy discharges
            (H₂ dominant) to severe arcing (C₂H₂ signature).
          </span>
        </li>

        {/* Carbon Oxides */}
        <li className="flex">
          <strong className="w-44 flex-shrink-0 font-semibold text-red-600 dark:text-red-500">
            Carbon Oxides:
          </strong>
          <span className="text-slate-600 dark:text-slate-500">
            Generated when the{' '}
            <strong>cellulose insulation (Kraft paper)</strong> thermally
            degrades. This produces significant amounts of{' '}
            <strong>Carbon Monoxide (CO)</strong> and{' '}
            <strong>Carbon Dioxide (CO₂)</strong>. <br />
            <em>Diagnostic note:</em> A persistently low CO₂/CO ratio may
            indicate localized overheating or paper involvement in a fault. The
            rate of generation of these oxides often correlates with insulation
            aging severity.
          </span>
        </li>

        {/* Atmospheric Gases */}
        <li className="flex">
          <strong className="w-44 flex-shrink-0 font-semibold text-red-600 dark:text-red-500">
            Atmospheric Gases:
          </strong>
          <span className="text-slate-600 dark:text-slate-500">
            Transformers also contain dissolved <strong>Oxygen (O₂)</strong> and
            <strong> Nitrogen (N₂)</strong>, which are introduced from air in
            the conservator system, through leaks, or during maintenance. <br />
            <em>Role in DGA:</em> Elevated O₂ accelerates oxidation of oil,
            producing acids, sludge, and water. N₂ is generally inert but its
            sudden increase may indicate air ingress, seal deterioration, or
            poor vacuuming during oil processing.
          </span>
        </li>

        {/* Other By-products */}
        <li className="flex">
          <strong className="w-44 flex-shrink-0 font-semibold text-red-600 dark:text-red-500">
            Other By-products:
          </strong>
          <span className="text-slate-600 dark:text-slate-500">
            In addition to the main groups, minor gases and compounds such as{' '}
            <strong>water vapor (H₂O)</strong>, <strong>furans</strong>, and low
            molecular weight hydrocarbons may also dissolve in the oil. These
            are typically measured in parallel with DGA to give a broader
            assessment of insulation aging and oil health.
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SourcesOfDgaGas;
