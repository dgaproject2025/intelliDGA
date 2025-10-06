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
  BeakerIcon,
  FireIcon,
  BoltIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Note: You will need to create this visualization component separately.
import TheCombinedDuvalPentagonMethodVisualisation from './TheCombinedDuvalPentagonMethodVisualisation';

const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'PD (Partial Discharges)', color: 'rgba(255, 0, 0, 0.7)' },
    { name: 'S (Stray Gassing)', color: 'rgba(128,128,128,1)' },
    { name: 'D1 (Low-Energy Discharges)', color: 'rgba(26, 232, 232, 1)' },
    { name: 'D2 (High-Energy Discharges)', color: 'rgba(51, 100, 240, 1)' },
    { name: 'T1-O (Low-Temp Overheating - Oil)', color: '#ffff00' },
    { name: 'T1-C (Low-Temp Overheating - Paper)', color: '#ffa500' },
    {
      name: 'T2-O (Mid-Temp Overheating - Oil)',
      color: 'rgba(255, 204, 0, 1)',
    },
    { name: 'T2-C (Mid-Temp Overheating - Paper)', color: '#06d6a0' },
    { name: 'T3-C (High-Temp Fault - Paper)', color: '#9381ff' },
    {
      name: 'T3-H (High-Temp Fault - Oil)',
      color: 'rgba(0, 0, 0, 1)',
      darkBorder: true,
    },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
        {faultZones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded shadow-sm border ${
                zone.darkBorder
                  ? 'border-slate-300 dark:border-white'
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: zone.color }}
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {zone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TheCombinedDuvalPentagonMethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
        The Combined Duval Pentagon Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        {/* Section: Mathematical and Graphical Framework */}
        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-blue-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10"></div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md">
              <CalculatorIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Mathematical and Graphical Framework
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The Duval Pentagon method is a graphical tool for Dissolved Gas
              Analysis (DGA) that diagnoses faults in oil-filled electrical
              equipment. It transforms raw gas concentration data into a single
              diagnostic point within a precisely defined geometric space. The
              methodology relies on the relative proportions of five key gases:
              <strong className="text-blue-600 dark:text-blue-400">
                &nbsp;Hydrogen (H<sub>2</sub>), Methane (CH<sub>4</sub>), Ethane
                (C<sub>2</sub>H<sub>6</sub>), Ethylene (C<sub>2</sub>H
                <sub>4</sub>
                ), and Acetylene (C<sub>2</sub>H<sub>2</sub>).
              </strong>
            </p>
            <p>
              The first step is to calculate the relative percentage of each gas
              against the total sum of all five, removing the influence of the
              total gas volume and focusing on the proportional "signature" of
              the fault.
            </p>
            <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg">
              <BlockMath
                math={
                  '\\%Gas_i = \\frac{[Gas_i]_{ppm}}{\\sum_{j=1}^{5} [Gas_j]_{ppm}} \\times 100\\%'
                }
              />
            </div>
            <p>
              These percentages are converted into Cartesian (x, y) coordinates
              and plotted on the pentagon. The final diagnostic point is the
              <strong className="text-sky-600 dark:text-sky-400">
                &nbsp;geometric centroid
              </strong>
              &nbsp;of the irregular polygon formed by these five points. The
              centroid's location within one of the predefined fault zones
              provides the final diagnosis.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        {/* Section: The Precursor Models */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              The Precursor Models: Pentagon 1 and Pentagon 2
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            <p>
              The Combined Pentagon is a synthesis of two preceding models.
              <strong className="text-slate-700 dark:text-slate-300">
                &nbsp;Pentagon 1
              </strong>
              &nbsp;was developed to diagnose six basic fault types (PD, D1, D2,
              T1, T2, T3) based on temperature ranges.
            </p>
            <p>
              The development of
              <strong className="text-slate-700 dark:text-slate-300">
                &nbsp;Pentagon 2
              </strong>
              &nbsp;was motivated by the need to identify which material was
              degrading. It redefined the thermal fault zones to distinguish
              between overheating in oil only (O, T3-H) and faults involving the
              carbonization of solid paper insulation (C). This provided more
              actionable intelligence but required a cumbersome two-step
              analysis, motivating the creation of a single, unified model.
            </p>
          </div>
        </div>

        {/* Section: The 10 Unified Fault Zones */}
        <div className="relative overflow-hidden p-6 rounded-xl border border-slate-200 dark:border-blue-500 shadow-lg bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-slate-900/70 dark:to-slate-800/80 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/50">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md ring-1 ring-white/40 dark:ring-white/10">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              The 10 Unified Fault Zones
            </h4>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300">
            By superimposing the zones from Pentagon 1 and 2, the Combined
            Pentagon offers a single, comprehensive chart with 10 distinct fault
            zones, providing highly specific and actionable intelligence.
          </p>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-sky-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Electrical & Stray Gassing
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Zones for
                <strong className="text-sky-400">&nbsp;PD, D1, D2,</strong>
                &nbsp;and
                <strong className="text-sky-400">&nbsp;S</strong>
                &nbsp;are carried over directly from the precursor models.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Low-Temp Thermal (&lt;300°C)
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-orange-400">T1-O:</strong>
                &nbsp;Overheating in oil only.
                <br />
                <strong className="text-orange-400">T1-C:</strong>
                &nbsp;Overheating with paper carbonization.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-red-500" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  Mid-Temp Thermal (300-700°C)
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-red-400">T2-O:</strong>
                &nbsp;Overheating in oil only.
                <br />
                <strong className="text-red-400">T2-C:</strong>
                &nbsp;Overheating with paper carbonization.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 dark:border-blue-500 bg-white/70 dark:bg-slate-900/40 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-red-700" />
                <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                  High-Temp Thermal (&gt;700°C)
                </h5>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-red-500">T3-C:</strong>
                &nbsp;High-temp fault with paper carbonization.
                <br />
                <strong className="text-red-500">T3-H:</strong>
                &nbsp;High-temp fault in oil only.
              </p>
            </article>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-xl" />
        </div>

        {/* Section: Visualization */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50  shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Combined Duval Pentagon Visualization
            </h4>
          </div>
          <div className="mt-3 ">
            <TheCombinedDuvalPentagonMethodVisualisation />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-100 dark:bg-slate-800/50 p-4">
            <FaultZoneLegend />
          </div>
        </div>

        {/* Section: Fault Zone Coordinates */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <TableCellsIcon className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Definitive Fault Zone Coordinates
            </h4>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-justify">
            The practical implementation of the method in software depends on a
            precise, quantitative definition of its 10 fault zone boundaries.
            The following table presents the definitive list of vertices for
            each polygonal fault zone.
          </p>
          <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Zone ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Diagnostic Definition
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Polygon Vertices (x, y)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    PD
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Partial Discharges
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (0, 24.5), (0, 33), (-1, 33), (-1, 24.5)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    S
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Stray Gassing
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (-38, 12.4), (0, 1.5), (0, 24.5), (-1, 24.5)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    D1
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Low-Energy Discharges
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (0, 40), (38, 12), (32, -6), (4, 16), (0, 1.5)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    D2
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    High-Energy Discharges
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (4, 16), (32, -6), (24, -30), (-1, -2)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T1-O
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Low-Temp Overheating (Oil)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (-38, 12.4), (0, 1.5), (-1, -2), (-3.5, -3), (-11, -8)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T1-C
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Low-Temp Overheating (Paper)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (-22.5, -32), (-6, -4), (-3.5, -3), (-11, -8), (-21.5, -32)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T2-O
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Mid-Temp Overheating (Oil)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (-11, -8), (-3.5, -3), (-6, -4)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T2-C
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    Mid-Temp Overheating (Paper)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (-21.5, -32), (-11, -8), (-6, -4), (1, -32), (-22.5, -32)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T3-C
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    High-Temp Fault (Paper)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (1, -32), (-6, -4), (-3.5, -3), (2.5, -32)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    T3-H
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    High-Temp Fault (Oil)
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    (2.5, -32), (-3.5, -3), (24, -30)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: Critical Evaluation */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-700">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Application and Interpretation
            </h4>
          </div>
          <div className="mt-3 space-y-4 text-sm text-justify text-slate-600 dark:text-slate-400">
            <p>
              <strong>Software Implementation:</strong> The method is ideal for
              automation. Once the centroid is calculated, a
              <strong className="text-slate-700 dark:text-slate-300">
                &nbsp;Point-in-Polygon test
              </strong>
              &nbsp;(e.g., Ray Casting Algorithm) determines which of the 10
              fault zones contains the point, providing an automated diagnosis.
            </p>
            <p>
              <strong>Borderline Cases:</strong> A point falling near a boundary
              may indicate a mixture of faults or a fault in transition. In
              these cases,
              <strong className="text-slate-700 dark:text-slate-300">
                &nbsp;trend analysis
              </strong>
              &nbsp;is crucial. Plotting a series of results over time can
              reveal the evolution of a fault as it migrates from one zone to
              another.
            </p>
            <p>
              <strong>Diagnostic Context:</strong> The Pentagon is a tool for
              fault
              <strong className="text-slate-700 dark:text-slate-300">
                &nbsp;classification
              </strong>
              , not detection. It should be applied after gas levels or
              generation rates have already indicated a likely fault condition.
              Its power is maximized when used alongside other DGA methods like
              Duval Triangles.
            </p>
          </div>
        </div>

        {/* Section: Advantages and Disadvantages */}
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
                Provides highly specific and actionable diagnoses in a single
                step.
              </li>
              <li>
                Unified geometry is simple to implement in automated software.
              </li>
              <li>
                Standardized 10-category output is ideal for large-scale data
                analysis and machine learning.
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <ShieldExclamationIcon className="w-6 h-6 text-orange-500" />
              <h5 className="font-semibold text-orange-700 dark:text-orange-300">
                Limitations
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                Primarily for fault classification, not initial fault detection.
              </li>
              <li>
                Accuracy depends on reliable DGA measurements and laboratory
                precision.
              </li>
              <li>
                Most powerful when cross-referenced with other DGA methods, not
                as a sole diagnostic tool.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheCombinedDuvalPentagonMethodContent;
