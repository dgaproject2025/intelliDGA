import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
  TableCellsIcon,
  CalculatorIcon,
  ClockIcon,
  EyeIcon,
  ChartBarSquareIcon,
  BriefcaseIcon,
  BeakerIcon,
  FireIcon,
  BoltIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Note: You will need to create this visualization component separately.
//import TheERTASquareMethodVisualisation from './TheERTASquareMethodVisualisation';
import TheERTASquareMethodVisualisation from './TheERTASquareMethodVisualisation';

// NEW: A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'PD (Partial Discharge)', color: 'rgba(255, 0, 0, 0.7)' },
    { name: 'T1 (Thermal <300°C)', color: 'rgba(255, 153, 153, 0.7)' },
    { name: 'T2 (Thermal 300-700°C)', color: 'rgba(255, 204, 0, 0.7)' },
    { name: 'T3 (Thermal >700°C)', color: 'rgba(0, 0, 0, 0.7)' },
    { name: 'D1 (Low Energy Discharge)', color: 'rgba(104, 255, 255, 0.7)' },
    { name: 'D2 (High Energy Discharge)', color: 'rgba(51, 100, 240, 0.7)' },
    { name: 'DT (Thermal & Electrical)', color: 'rgba(200, 60, 200, 0.7)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
        {faultZones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: zone.color }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {zone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TheERTASquareMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
        The ERTA Square Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        {/* Section 3.2: Core Principles and Rationale for Gas Selection */}
        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-blue-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/40">
          {/* Decorative Glow / Gradient Accent */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10"></div>

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md">
              <LightBulbIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Core Principles and Rationale for Gas Selection
            </h4>
          </div>

          {/* Body */}
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The diagnostic power of the{' '}
              <strong className="text-blue-600 dark:text-blue-400">
                ERTA Square Method
              </strong>{' '}
              is derived from its focused selection of three specific
              hydrocarbon gases: <em>Ethane</em> (C<sub>2</sub>H<sub>6</sub>),{' '}
              <em>Ethylene</em> (C<sub>2</sub>H<sub>4</sub>), and{' '}
              <em>Acetylene</em> (C<sub>2</sub>H<sub>2</sub>). These represent a
              clear, escalating spectrum of fault energy.
            </p>

            <ul className="list-disc list-inside space-y-2 pl-3">
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  Ethane (C<sub>2</sub>H<sub>6</sub>):
                </strong>
                &nbsp;Formed at lower-to-medium temperatures, indicating general
                overheating.
              </li>
              <li>
                <strong className="text-orange-500 dark:text-orange-400">
                  Ethylene (C<sub>2</sub>H<sub>4</sub>):
                </strong>
                &nbsp;Produced at higher temperatures, reflecting more severe
                overheating.
              </li>
              <li>
                <strong className="text-pink-500 dark:text-pink-400">
                  Acetylene (C<sub>2</sub>H<sub>2</sub>):
                </strong>
                &nbsp;Appears only at very high temperatures, a hallmark of
                high-energy electrical arcing.
              </li>
            </ul>

            <p>
              A defining feature of the ERTA Square is its use of{' '}
              <strong>Ethane</strong> (C<sub>2</sub>H<sub>6</sub>) as the common
              denominator in both diagnostic ratios. As a stable, lower-energy
              thermal gas, it serves as the{' '}
              <span className="italic text-blue-600 dark:text-blue-400">
                normalizing baseline
              </span>
              , enabling a relative measure of higher-energy gases against
              low-level thermal activity.
            </p>

            <p>
              The ratio{' '}
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H<sub>6</sub>
              </span>{' '}
              quantifies “high-temperature thermal stress,” while{' '}
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                C<sub>2</sub>H<sub>2</sub>/C<sub>2</sub>H<sub>6</sub>
              </span>
              measures “arcing energy.” This makes the ERTA Square a{' '}
              <strong>semi-quantitative indicator</strong> of fault energy
              escalation — movement away from the graph’s origin reflects
              increasing fault severity.
            </p>
          </div>

          {/* Subtle bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        <section className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          {/* Header */}
          <header className="flex items-center gap-3">
            <BeakerIcon className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-bold text-red-400 dark:text-red-500">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400 bg-clip-text ">
                Fault Gas Generation Pathways and Temperature Correlation
              </span>
            </h4>
          </header>

          {/* Intro */}
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            The types and quantities of gases produced are directly correlated
            to the energy level and temperature of the fault—this is the
            foundational principle of DGA interpretation.
          </p>

          {/* Content Grid */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Thermal: Low (T1) */}
            <article className="rounded-lg border border-slate-200 dark:border-red-50 bg-white/60 dark:bg-slate-900/30 p-4">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-red-500" />
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                  Low-Temperature Thermal Faults (T<sub>1</sub>)
                  <span className="ml-2 inline-block rounded-full border border-red-200/60 dark:border-red-700/40 px-2 py-0.5 text-xs text-red-600 dark:text-red-400">
                    &lt; 300<sup>°</sup>C
                  </span>
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Minor overheating (e.g., poor cooling) generates small amounts
                of Hydrogen (H<sub>2</sub>) and Methane (CH<sub>4</sub>)
                starting ~150<sup>°</sup>C, followed by Ethane (C<sub>2</sub>H
                <sub>6</sub>) as temperatures approach ~250<sup>°</sup>C.
              </p>
            </article>

            {/* Thermal: Medium (T2) */}
            <article className="rounded-lg border border-slate-200 dark:border-red-50 bg-white/60 dark:bg-slate-900/30 p-4">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                  Medium-Temperature Thermal Faults (T<sub>2</sub>)
                  <span className="ml-2 inline-block rounded-full border border-orange-200/60 dark:border-orange-700/40 px-2 py-0.5 text-xs text-orange-600 dark:text-orange-400">
                    300–700<sup>°</sup>C
                  </span>
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Higher temperatures lead to Ethylene (C<sub>2</sub>H<sub>4</sub>
                ) formation starting ~350<sup>°</sup>C. Carbonization of
                cellulose insulation can occur at this level.
              </p>
            </article>

            {/* Thermal: High (T3) */}
            <article className="rounded-lg border border-slate-200 dark:border-red-50 bg-white/60 dark:bg-slate-900/30 p-4">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-red-600" />
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                  High-Temperature Thermal Faults (T<sub>3</sub>)
                  <span className="ml-2 inline-block rounded-full border border-red-200/60 dark:border-red-700/40 px-2 py-0.5 text-xs text-red-700 dark:text-red-400">
                    &gt; 700<sup>°</sup>C
                  </span>
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                At very high temperatures, Acetylene (C<sub>2</sub>H<sub>2</sub>
                ) begins to form in significant quantities.
              </p>
            </article>

            {/* Electrical Faults */}
            <article className="rounded-lg border border-slate-200 dark:border-red-50 bg-white/60 dark:bg-slate-900/30 p-4">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-violet-500" />
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                  Electrical Faults (Discharges)
                </h5>
              </div>
              <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <span className="font-medium text-violet-600 dark:text-violet-400">
                    Partial Discharges (PD):
                  </span>{' '}
                  Primarily generate Hydrogen (H<sub>2</sub>) and some Methane
                  (CH<sub>4</sub>).
                </li>
                <li>
                  <span className="font-medium text-violet-600 dark:text-violet-400">
                    Arcing:
                  </span>{' '}
                  Sustained high-energy discharge, often &gt;700<sup>°</sup>C;
                  the only process producing large quantities of Acetylene (C
                  <sub>2</sub>H<sub>2</sub>), making its presence a strong
                  indicator of arcing.
                </li>
              </ul>
            </article>

            {/* Cellulose Degradation */}
            <article className="lg:col-span-2 rounded-lg border border-slate-200 dark:border-red-50 bg-white/60 dark:bg-slate-900/30 p-4">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-emerald-500" />
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                  Cellulose Insulation Degradation
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Breakdown of solid paper insulation specifically generates
                Carbon Monoxide (CO) and Carbon Dioxide (CO<sub>2</sub>),
                starting as low as ~100<sup>°</sup>C.
              </p>
            </article>
          </div>
        </section>

        {/* Section 3.1: Historical Development and Provenance */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-400 dark:text-red-500">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400  bg-clip-text">
                Historical Development and Provenance
              </span>
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            <p>
              The ERTA Square method is a graphical diagnostic tool for DGA
              interpretation that originated in Japan. It was developed by the
              Electric Technology Research Association (ETRA) and was published
              in 1999. ETRA conducted extensive reviews of DGA diagnoses from
              transformers in Japan and internationally, producing a series of
              gas patterns associated with specific, visually confirmed internal
              faults. The ERTA Square was the culmination of this research,
              designed to offer a reliable and intuitive method for fault
              classification.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50  shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500">
              The ERTA Square Method Visualization
            </h4>
          </div>
          <div className="mt-3 ">
            <TheERTASquareMethodVisualisation />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>
        {/* Section 4.1: Visual Representation */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <EyeIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-400 dark:text-red-500">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400  bg-clip-text">
                Visual Representation
              </span>
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            <p>
              The ERTA Square is a two-dimensional diagnostic chart using a
              Cartesian coordinate system. The horizontal axis (X-axis)
              represents the ratio C₂H₂/C₂H₆, and the vertical axis (Y-axis)
              represents the ratio C₂H₄/C₂H₆. Both axes are typically on a
              logarithmic scale to accommodate a wide range of ratio values. The
              square is partitioned into distinct zones, each corresponding to a
              specific type of incipient fault. An engineer plots the calculated
              coordinate pair on this graph, and the zone where the point lands
              provides the diagnosis.
            </p>
          </div>
          <div className="mt-4 rounded-md">
            {/* Placeholder for the ERTA Square visualization component */}
            {/* <TheERTASquareMethodVisualisation /> */}
          </div>
        </div>

        {/* Section 4.2: Systematic Breakdown of Diagnostic Zones */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <TableCellsIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-400 dark:text-red-500">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400  bg-clip-text">
                Systematic Breakdown of Diagnostic Zones
              </span>
            </h4>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            Each diagnostic zone is defined by precise numerical boundaries for
            the two gas ratios. The following reference table serves as a guide
            for engineers to accurately apply the ERTA Square method.
          </p>
          <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Fault Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    IEC/IEEE Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    C₂H₂/C₂H₆ Range (X-axis)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    C₂H₄/C₂H₆ Range (Y-axis)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Partial Discharge
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    PD
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.01 ≤ X ≤ 1
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.01 ≤ Y ≤ 1
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Overheating (300-700°C)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    T2
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.001 ≤ X ≤ 0.01
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    1 ≤ Y ≤ 4
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Discharge of Low Energy
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    D1
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    1 ≤ X ≤ 10
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.01 ≤ Y ≤ 10
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Overheating (&lt;300°C)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    T1
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.01 ≤ X ≤ 1
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.001 ≤ Y ≤ 0.01
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Overheating (&gt;700°C)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    T3
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    4 ≤ X ≤ 1000
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.001 ≤ Y ≤ 0.01
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className=" col-span-2  px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Discharge of High Energy
                  </td>
                  <td className="row-span-2 px-6 py-4 text-slate-600 dark:text-slate-400">
                    D2
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    10 ≤ X ≤ 1000
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    1 ≤ Y ≤ 1000
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    Discharge of High Energy
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    D2
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    0.01 ≤ X ≤ 10
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    10 ≤ Y ≤ 1000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative overflow-hidden p-6 rounded-xl border border-slate-200 dark:border-blue-500 shadow-lg bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-slate-900/70 dark:to-slate-800/80 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/50">
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10" />

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md ring-1 ring-white/40 dark:ring-white/10">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Systematic Breakdown of Diagnostic Zones
            </h4>
          </div>

          {/* Intro */}
          <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300">
            Each diagnostic zone is defined by precise numerical boundaries for
            the two gas ratios.
          </p>

          {/* Zones List */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* T2 */}
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Overheating, Medium Temperature (300<sup>°</sup>C–700
                  <sup>°</sup>C)
                  <span className="ml-2 text-xs inline-block px-2 py-0.5 rounded-full border border-orange-300/60 dark:border-orange-700/40 text-orange-600 dark:text-orange-400">
                    IEC T2
                  </span>
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                This fault indicates significant thermal stress hot enough to
                carbonize paper but without significant arcing.
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-sky-400 dark:text-sky-400">
                  Boundaries:
                </span>{' '}
                0.001 ≤ C<sub>2</sub>H<sub>2</sub>/C<sub>2</sub>H<sub>6</sub> ≤
                0.01 and 1 ≤ C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H
                <sub>6</sub> ≤ 4.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-emerald-400 dark:text-emerald-400">
                  Interpretation:
                </span>{' '}
                The high C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H<sub>6</sub>{' '}
                ratio shows that ethylene production has surpassed ethane, a
                clear sign of temperatures over 300<sup>°</sup>C. The very low C
                <sub>2</sub>H<sub>2</sub>/C<sub>2</sub>H<sub>6</sub> ratio
                confirms the absence of arcing.
              </p>
            </article>

            {/* T3 */}
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-red-600" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Overheating, High Temperature (&gt;700<sup>°</sup>C)
                  <span className="ml-2 text-xs inline-block px-2 py-0.5 rounded-full border border-red-300/60 dark:border-red-700/40 text-red-700 dark:text-red-400">
                    IEC T3
                  </span>
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                This zone represents a very severe thermal fault.
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-sky-400 dark:text-sky-400">
                  Boundaries:
                </span>{' '}
                Located at higher C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H
                <sub>6</sub> values (likely &gt;4), while the C<sub>2</sub>H
                <sub>2</sub>/C<sub>2</sub>H<sub>6</sub> ratio remains relatively
                low.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-emerald-400 dark:text-emerald-400">
                  Interpretation:
                </span>{' '}
                The dominance of ethylene over ethane is even more pronounced,
                indicating extreme heat.
              </p>
            </article>

            {/* PD */}
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-violet-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Partial Discharge (PD)
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                This zone identifies low-energy electrical discharges.
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-sky-400 dark:text-sky-400">
                  Boundaries:
                </span>{' '}
                0.01 ≤ C<sub>2</sub>H<sub>2</sub>/C<sub>2</sub>H<sub>6</sub> ≤ 1
                and 0.01 ≤ C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H<sub>6</sub>{' '}
                ≤ 1.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-emerald-400 dark:text-emerald-400">
                  Interpretation:
                </span>{' '}
                Both ethylene and acetylene levels are low relative to the
                ethane baseline, indicating a low-energy electrical fault.
              </p>
            </article>

            {/* D1 */}
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-indigo-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Discharge of Low Energy (D1) / Sparking
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                This zone signifies a more energetic electrical fault than PD,
                such as intermittent sparking.
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-sky-400 dark:text-sky-400">
                  Boundaries:
                </span>{' '}
                1 ≤ C<sub>2</sub>H<sub>2</sub>/C<sub>2</sub>H<sub>6</sub> ≤ 10
                and 0.01 ≤ C<sub>2</sub>H<sub>4</sub>/C<sub>2</sub>H<sub>6</sub>{' '}
                ≤ 10.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-emerald-400 dark:text-emerald-400">
                  Interpretation:
                </span>{' '}
                The significant rise in the C<sub>2</sub>H<sub>2</sub>/C
                <sub>2</sub>H<sub>6</sub> ratio (above 1) shows that acetylene
                production has become dominant.
              </p>
            </article>

            {/* D2 */}
            <article className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-fuchsia-600" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Discharge of High Energy (D2) / Arcing
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                This zone represents the most severe fault type — a sustained
                high-energy arc.
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-sky-400 dark:text-sky-400">
                  Boundaries:
                </span>{' '}
                Located in the upper-right portion of the graph, characterized
                by high values for both ratios, likely with C<sub>2</sub>H
                <sub>2</sub>/C<sub>2</sub>H<sub>6</sub> &gt; 10.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-emerald-400 dark:text-emerald-400">
                  Interpretation:
                </span>{' '}
                Extremely high levels of both acetylene and ethylene relative to
                ethane indicate a fault combining the extreme heat of an arc
                with general overheating.
              </p>
            </article>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-xl" />
        </div>

        {/* Section 5: Critical Evaluation */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-700">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-400 dark:text-red-500">
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-400  bg-clip-text">
                Critical Evaluation: Accuracy, Limitations, and Sources of
                Uncertainty
              </span>
            </h4>
          </div>
          <div className="mt-3 space-y-4 text-sm text-justify text-slate-600 dark:text-slate-400">
            <p>
              <strong>Diagnostic Accuracy and Validation:</strong> The ERTA
              Square method is reported in comparative studies to provide high
              reliability in identifying incipient faults. Its logical
              construction, based on the energy hierarchy of hydrocarbon gas
              formation, lends it a strong theoretical foundation. However, the
              ERTA Square has not been formally incorporated into the primary
              DGA interpretation guides from major international standards
              bodies like IEEE or IEC.
            </p>
            <p>
              <strong>
                The Primary Limitation (Insufficiency for Multiple Faults):
              </strong>{' '}
              The most significant limitation of the ERTA Square is its reliance
              on only three diagnostic gases. While this provides clarity for
              single, well-defined faults, it can become a source of ambiguity
              when a transformer is experiencing multiple faults concurrently. A
              composite gas profile may be plotted into a zone that accurately
              represents neither of the individual faults.
            </p>
            <p>
              <strong>General DGA Uncertainties:</strong> The accuracy of any
              diagnosis is dependent on the quality of the input data and an
              understanding of the transformer's context. Factors include
              sampling and analysis errors, transformer age, load conditions,
              oil type and additives, and potential stray gassing from
              components like on-load tap changers (LTCs).
            </p>
          </div>
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
                Shows high reliability in identifying faults compared to
                classical methods.
              </li>
              <li>
                Intuitive graphical method that avoids "no interpretation"
                results common in ratio-based techniques.
              </li>
              <li>
                Use of Ethane as a baseline provides a clear indicator of fault
                energy escalation.
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
                Uses only three gases, which is often insufficient for
                diagnosing multiple or complex faults.
              </li>
              <li>
                Lacks a "normal" or "no-fault" zone, requiring prior analysis to
                confirm a fault condition exists.
              </li>
              <li>
                Less widely adopted in international standards (IEEE, IEC)
                compared to other graphical methods.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheERTASquareMethodContent;
