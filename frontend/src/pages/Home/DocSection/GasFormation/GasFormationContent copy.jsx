import React from 'react';

// Import the theme-specific graph images
import lightGraph from './light_tempVsgas.png';
import darkGraph from './dark_tempVsgas.png';

// Import icons for section headings
import {
  Cog6ToothIcon,
  CircleStackIcon,
  FireIcon,
  ChartBarIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';

const GasFormationContent = () => {
  return (
    <>
      {/* ENHANCED: Main Heading with Gradient */}
      <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 text-transparent bg-clip-text">
        The Chemistry of Gas Formation
      </h3>

      {/* ENHANCED: Introductory paragraph styled as a blockquote */}
      <blockquote className="mt-4 border-l-4 border-sky-500 bg-sky-50/50 dark:bg-slate-800/60 pl-4 py-2">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed text-justify italic">
          As a transformer begins to fail under{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            thermal or electrical stresses
          </strong>
          , its mixed paper-oil insulation system undergoes degradation,
          resulting in the generation of gases that dissolve in the transformer
          oil. These gases typically include{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            hydrogen (H₂), methane (CH₄), ethane (C₂H₆), ethylene (C₂H₄), and
            acetylene (C₂H₂)
          </strong>
          . In addition, when the cellulose insulation deteriorates,
          considerable amounts of{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            carbon monoxide (CO) and carbon dioxide (CO₂)
          </strong>{' '}
          are produced.
        </p>
      </blockquote>

      <div className="mt-8 space-y-8">
        {/* Section 1: Breakdown Mechanism */}
        <div>
          {/* ENHANCED: Section heading with icon */}
          <div className="flex items-center gap-3">
            <Cog6ToothIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Gas Formation Mechanism
            </h4>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-justify">
            In power transformers, mineral oils are used, whose chemical
            composition is a mixture of hydrocarbon molecules with chemical
            groups such as a{' '}
            <strong className="font-semibold text-sky-700 dark:text-sky-400">
              methyl radical (CH₃•)
            </strong>
            , a{' '}
            <strong className="font-semibold text-sky-700 dark:text-sky-400">
              methylene radical (CH₂•)
            </strong>
            , and a{' '}
            <strong className="font-semibold text-sky-700 dark:text-sky-400">
              methine group (=CH–)
            </strong>
            , all linked by carbon-carbon (C–C) molecular bonds. During
            operation, these transformers are subjected to a range of
            electrical, thermal, oxidative and mechanical stresses. Under the
            action of thermal and electrical stresses, a series of C–H and C–C
            bonds break, forming unstable fragments. These fragments react
            rapidly to form gas molecules like H₂, CH₄, C₂H₆, C₂H₄, and C₂H₂, or
            they recombine to form new molecules like solid carbon particles and
            hydrocarbon polymers (such as X-wax).
          </p>
        </div>

        {/* Section 2: Sources of Gases */}
        <div>
          <div className="flex items-center gap-3">
            <CircleStackIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Primary Sources of Dissolved Gases
            </h4>
          </div>
          <ul className="mt-3 space-y-3">
            <li className="flex">
              <strong className="w-40 flex-shrink-0 font-semibold text-slate-800 dark:text-slate-200">
                Hydrocarbon Gases:
              </strong>
              <span className="text-slate-600 dark:text-slate-400">
                Generated from the degradation of the mineral oil itself. This
                group includes Hydrogen (H₂), Methane (CH₄), Ethane (C₂H₆),
                Ethylene (C₂H₄), and Acetylene (C₂H₂).
              </span>
            </li>
            <li className="flex">
              <strong className="w-40 flex-shrink-0 font-semibold text-slate-800 dark:text-slate-200">
                Carbon Oxides:
              </strong>
              <span className="text-slate-600 dark:text-slate-400">
                Thermal stress degrades the cellulose insulation, resulting in
                the formation of carbon oxides (CO and CO₂) which are dissolved
                in the oil in large quantities.
              </span>
            </li>
            <li className="flex">
              <strong className="w-40 flex-shrink-0 font-semibold text-slate-800 dark:text-slate-200">
                Atmospheric Gases:
              </strong>
              <span className="text-slate-600 dark:text-slate-400">
                Transformer oil also contains dissolved oxygen (O₂) and nitrogen
                (N₂). Their presence is due to the oxidation of the oil from
                overheating, contact with air in the conservator, or air
                entering the equipment through leaks.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 3: Temperature Relationship */}
        <div>
          <div className="flex items-center gap-3">
            <FireIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Relationship Between Gas & Temperature
            </h4>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400 mb-2 text-justify">
            Since gas production depends on temperature, the outgassing speed of
            each gas can be estimated at any temperature. The relationships
            between gas production and temperature have been established for
            each hydrocarbon gas concentration as follows:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            {/* ENHANCED: Temperature values styled as badges */}
            <li>
              At roughly
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                150°C
              </span>
              , initial traces of H₂ and CH₄ begin to emerge.
            </li>
            <li>
              Around
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                250°C
              </span>
              , C₂H₆ starts to form.
            </li>
            <li>
              At approximately
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                350°C
              </span>
              , C₂H₄ makes its debut.
            </li>
            <li>
              Between
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                200°C and 300°C
              </span>
              , methane (CH₄) production exceeds that of hydrogen.
            </li>
            <li>
              Above about
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                275°C
              </span>
              , ethane (C₂H₆) production overtakes methane.
            </li>
            <li>
              Between
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                500°C and 700°C
              </span>
              , C₂H₂ begins forming and continues to increase until it peaks
              around 800°C.
            </li>
            <li>
              From roughly
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold mx-1.5 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">
                455°C to 750–800°C
              </span>
              , hydrogen (H₂) remains the dominant gas.
            </li>
          </ul>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-justify">
            It should be noted that after the peaks are reached, the production
            of CH₄, C₂H₆ and C₂H₄ decreases with increasing temperature.
          </p>
        </div>

        {/* Section 4: Relative Gas Concentrations vs. Fault Types */}
        <div>
          <div className="flex items-center gap-3">
            <ChartBarIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Relative Gas Concentrations vs. Fault Types
            </h4>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400 mb-4 text-justify">
            This graph visually represents the relative concentrations of key
            fault gases across different fault types and associated temperature
            ranges.
          </p>
          <div className="my-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 flex justify-center items-center">
            <img
              src={lightGraph}
              alt="Gas Concentrations vs. Fault Types (Light)"
              className="max-w-full h-auto rounded-md shadow-md block dark:hidden"
            />
            <img
              src={darkGraph}
              alt="Gas Concentrations vs. Fault Types (Dark)"
              className="max-w-full h-auto rounded-md shadow-md hidden dark:block"
            />
          </div>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Fault Zones:</strong> The X-axis categorizes fault types,
              starting from "Cold Plasma & Catalytic" effects (R, PD, S), moving
              through "Thermal" fault zones (T1, O, C, T2, T3) and culminating
              in "Discharges" (D2, D1).
            </li>
            <li>
              <strong>Gas Trends:</strong> Each colored line represents a
              specific gas. Observe how their concentrations change
              significantly with increasing fault severity and temperature.
            </li>
            <li>
              <strong>Hydrogen (H₂) Dominance:</strong> Remains prevalent across
              many fault types, especially in partial discharges and at high
              discharge energies.
            </li>
            <li>
              <strong>Thermal Indicators:</strong> CH₄ and C₂H₆ show significant
              peaks in the lower to mid-range thermal fault zones (T1, T2).
            </li>
            <li>
              <strong>High-Temperature & Arcing:</strong> C₂H₄ is prominent in
              higher thermal faults (T3), while C₂H₂ is the definitive marker
              for high-energy arcing (D2, D1).
            </li>
          </ul>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-justify">
            Understanding these trends is crucial for accurately diagnosing
            incipient faults in power transformers using Dissolved Gas Analysis.
          </p>
        </div>

        {/* Section 5: Gases Associated with Specific Faults */}
        <div>
          <div className="flex items-center gap-3">
            <TableCellsIcon className="w-6 h-6 text-sky-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Gases Associated with Specific Faults
            </h4>
          </div>
          <div className="mt-3 overflow-x-auto relative rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
              <thead className="text-xs text-white uppercase bg-blue-600 dark:bg-blue-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Fault
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Major Gas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Minor Gas
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    PD
                  </td>
                  <td className="px-6 py-4">H₂, CH₄, CO</td>
                  <td className="px-6 py-4">C₂H₆, C₂H₂, CO₂</td>
                </tr>
                <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    D1
                  </td>
                  <td className="px-6 py-4">H₂, C₂H₂</td>
                  <td className="px-6 py-4">/</td>
                </tr>
                <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    D2
                  </td>
                  <td className="px-6 py-4">H₂, C₂H₂, CO, CO₂</td>
                  <td className="px-6 py-4">CH₄, C₂H₄, C₂H₆</td>
                </tr>
                <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    T1
                  </td>
                  <td className="px-6 py-4">CH₄, C₂H₆, CO, CO₂</td>
                  <td className="px-6 py-4">H₂, C₂H₄</td>
                </tr>
                <tr className="bg-white dark:bg-slate-800/50 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    T2
                  </td>
                  <td className="px-6 py-4">C₂H₄, CH₄</td>
                  <td className="px-6 py-4">H₂</td>
                </tr>
                <tr className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    T3
                  </td>
                  <td className="px-6 py-4">C₂H₄</td>
                  <td className="px-6 py-4">H₂, C₂H₆</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GasFormationContent;
