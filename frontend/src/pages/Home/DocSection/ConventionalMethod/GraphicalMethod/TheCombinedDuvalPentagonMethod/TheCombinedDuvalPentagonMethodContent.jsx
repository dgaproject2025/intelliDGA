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
              Mathematical and Graphical Framework of the Duval Pentagon
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The Duval Pentagon method is a graphical tool for Dissolved Gas
              Analysis (DGA) that provides a robust and intuitive means of
              diagnosing incipient faults in oil-filled electrical equipment,
              particularly power transformers. Its efficacy is rooted in a
              rigorous mathematical framework that transforms raw gas
              concentration data into a single diagnostic point within a
              precisely defined geometric space. Understanding this framework is
              essential for the correct application and interpretation of the
              method, especially for its implementation in automated diagnostic
              software. The methodology relies on the relative proportions of
              five key gases, their projection onto a Cartesian plane, and the
              calculation of a geometric centroid whose location determines the
              fault classification.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-blue-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10"></div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md">
              <CalculatorIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              The Five Key Diagnostic Gases
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The method is based on the analysis of five specific combustible
              gases that are generated as byproducts of dielectric fluid
              (mineral oil) and solid insulation (cellulose paper) degradation
              under electrical or thermal stress. These gases are Hydrogen (H
              <sub>2</sub>), Methane (CH <sub>4</sub>), Ethane (C <sub>2</sub>H
              <sub>6</sub>), Ethylene (C <sub>2</sub>H <sub>4</sub>), and
              Acetylene (C <sub>2</sub>H <sub>2</sub>).
            </p>

            <p>
              The arrangement of these gases at the vertices of the pentagon is
              not arbitrary. The sequence, proceeding counterclockwise from
              Hydrogen at the top, is H <sub>2</sub> →C <sub>2</sub>H{' '}
              <sub>6</sub> →CH
              <sub>4</sub> →C <sub>2</sub>H <sub>4</sub> →C <sub>2</sub>H{' '}
              <sub>2</sub>. This specific order corresponds to the increasing
              levels of energy required for the formation of each gas. H{' '}
              <sub>2</sub> is generated at relatively low energy levels, such as
              those found in partial discharges, while C <sub>2</sub>H{' '}
              <sub>2</sub> requires the very high energy associated with
              high-temperature arcing. This physical principle is embedded in
              the geometry of the pentagon, meaning the location of the final
              diagnostic point has an inherent correlation to the energy level
              of the incipient fault
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-blue-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-sky-400/10 blur-2xl -z-10"></div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-md">
              <CalculatorIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-400 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Mathematical Framework
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The first step in the diagnostic process is to normalize the
              absolute concentrations of the five key gases. This is done by
              calculating the relative percentage of each gas relative to the
              total sum of all five. This normalization is critical as it
              removes the influence of the total volume of gas generated,
              focusing the analysis solely on the proportional "signature" of
              the fault gases.
            </p>

            <p>
              The relative percentage for each gas is calculated using the
              following formula:
            </p>
            <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg">
              <BlockMath
                math={
                  '\\%Gas_i = \\frac{[Gas_i]_{ppm}}{\\sum_{j=1}^{5} [Gas_j]_{ppm}} \\times 100\\%'
                }
              />
            </div>
            <p>
              where{' '}
              <em>
                Gas<sub>i</sub>
              </em>{' '}
              represents each of the five key gases (H<sub>2</sub>, CH
              <sub>4</sub>, C<sub>2</sub>H<sub>6</sub>, C<sub>2</sub>H
              <sub>4</sub>, C<sub>2</sub>H<sub>2</sub>).
            </p>

            {/* Transformation to Cartesian Coordinates Section */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Transformation to Cartesian Coordinates
              </h5>
              <p>
                To facilitate mathematical analysis and graphical plotting, the
                pentagon is centered at the origin (0,0) of a standard
                two-dimensional Cartesian coordinate system. The conversion of
                the gas percentage points into Cartesian (x,y) coordinates is
                achieved using standard trigonometry. The angles (α) of the five
                gas axes relative to the positive x-axis are fixed as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-3 my-4 text-slate-600 dark:text-slate-400">
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">
                    C<sub>2</sub>H<sub>2</sub>:
                  </strong>
                  <span className="font-mono ml-2">α = 18°</span>
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">
                    H<sub>2</sub>:
                  </strong>
                  <span className="font-mono ml-2">α = 90°</span>
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">
                    C<sub>2</sub>H<sub>6</sub>:
                  </strong>
                  <span className="font-mono ml-2">α = 162°</span>
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">
                    CH<sub>4</sub>:
                  </strong>
                  <span className="font-mono ml-2">α = 234°</span>
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">
                    C<sub>2</sub>H<sub>4</sub>:
                  </strong>
                  <span className="font-mono ml-2">α = 306°</span>
                </li>
              </ul>
              <p>
                For each gas, the coordinates of its point (x<sub>i</sub>, y
                <sub>i</sub>) on the plane are calculated by:
              </p>
              <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg my-4 space-y-2">
                <BlockMath math={'x_i = \\%Gas_i \\times \\cos(\\alpha_i)'} />
                <BlockMath math={'y_i = \\%Gas_i \\times \\sin(\\alpha_i)'} />
              </div>
              <p>
                These five calculated coordinate pairs define the vertices of an
                irregular polygon within the larger, regular pentagon.
              </p>
            </div>

            {/* Centroid Calculation Section */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Centroid Calculation for Diagnostic Plotting
              </h5>
              <p>
                The single point used for fault diagnosis is the geometric
                centroid of the irregular polygon formed by the five gas
                coordinate points. The centroid represents the true "center of
                mass" of the polygon, making the diagnostic point a more
                holistic and robust representation of the fault's gas signature.
              </p>
              <p className="mt-4">
                The coordinates of the centroid (C<sub>x</sub>, C<sub>y</sub>)
                are calculated using the following formulae, which depend on the
                area (A) of the irregular polygon. First, the area (A) of the
                polygon with n=5 vertices is calculated:
              </p>
              <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg my-4">
                <BlockMath
                  math={
                    'A = \\frac{1}{2} \\sum_{i=0}^{n-1} (x_i y_{i+1} - x_{i+1} y_i)'
                  }
                />
              </div>
              <p>Then, the centroid coordinates are calculated:</p>
              <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg my-4 space-y-4">
                <BlockMath
                  math={
                    'C_x = \\frac{1}{6A} \\sum_{i=0}^{n-1} (x_i + x_{i+1}) (x_i y_{i+1} - x_{i+1} y_i)'
                  }
                />
                <BlockMath
                  math={
                    'C_y = \\frac{1}{6A} \\sum_{i=0}^{n-1} (y_i + y_{i+1}) (x_i y_{i+1} - x_{i+1} y_i)'
                  }
                />
              </div>
              <p>
                A notable feature is that even if one gas is at 100%, the
                resulting centroid will lie at a maximum of 40% along that gas's
                axis. This means all possible diagnostic points fall within a
                "zoomed-in" space, enhancing the visual resolution of the chart.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-indigo-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-indigo-200/60 dark:hover:shadow-indigo-900/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400/10 via-transparent to-purple-400/10 blur-2xl -z-10"></div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 text-white shadow-md">
              <Square3Stack3DIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-400 dark:from-indigo-300 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent tracking-tight">
              The Precursor Diagnostic Models: Pentagon 1 & 2
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The Combined Duval Pentagon is a synthesis of two preceding
              models, known as Pentagon 1 and Pentagon 2. Understanding these
              original models is essential to appreciate the logic and enhanced
              capability of the combined version, which was driven by the need
              for greater diagnostic specificity.
            </p>

            {/* Pentagon 1 Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Duval Pentagon 1: Establishing the Basic Fault Types
              </h5>
              <p>
                Duval Pentagon 1 was the initial five-gas model, developed to
                provide a comprehensive diagnosis of the six basic fault types
                recognized by international standards (IEC 60599, IEEE C57.104),
                plus a zone for non-fault conditions.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    PD:
                  </strong>{' '}
                  Partial Discharges
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    D1:
                  </strong>{' '}
                  Low-Energy Discharges (Sparking)
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    D2:
                  </strong>{' '}
                  High-Energy Discharges (Arcing)
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    T1:
                  </strong>{' '}
                  Thermal Faults &lt; 300°C
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    T2:
                  </strong>{' '}
                  Thermal Faults 300°C – 700°C
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    T3:
                  </strong>{' '}
                  Thermal Faults &gt; 700°C
                </li>
                <li>
                  <strong className="text-indigo-500 dark:text-indigo-400">
                    S:
                  </strong>{' '}
                  Stray Gassing (non-fault)
                </li>
              </ul>
              <p className="mt-3">
                While a significant advancement, its classification of thermal
                faults was based solely on temperature ranges.
              </p>
            </div>

            {/* Pentagon 2 Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Duval Pentagon 2: Refining Thermal Fault Diagnosis
              </h5>
              <p>
                Pentagon 2 was motivated by the need for more actionable
                intelligence. Instead of asking "How hot is the fault?", it
                answers the more critical question:{' '}
                <em className="text-purple-600 dark:text-purple-400">
                  "What material is being degraded?"
                </em>{' '}
                It redefined the thermal zones based on the materials involved.
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <strong className="text-purple-500 dark:text-purple-400">
                    O (Overheating):
                  </strong>{' '}
                  Low-temperature overheating (&lt;250°C){' '}
                  <em className="font-semibold">without</em> carbonization of
                  paper.
                </li>
                <li>
                  <strong className="text-purple-500 dark:text-purple-400">
                    C (Carbonization):
                  </strong>{' '}
                  A critical zone indicating the thermal fault involves the
                  degradation and carbonization of solid paper insulation.
                </li>
                <li>
                  <strong className="text-purple-500 dark:text-purple-400">
                    T3-H (High-Temp in Oil):
                  </strong>{' '}
                  A high-temperature fault (&gt;700°C) occurring in the{' '}
                  <em className="font-semibold">oil only</em>.
                </li>
              </ul>
              <p className="mt-3">
                This shift provided more valuable information but introduced a
                cumbersome two-step process, motivating the creation of a
                single, unified model.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 rounded-b-2xl"></div>
        </div>

        <div className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-white/70 to-emerald-50/60 dark:from-slate-900/60 dark:to-slate-800/70 transition-all duration-500 hover:shadow-emerald-200/60 dark:hover:shadow-emerald-900/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-green-400/10 blur-2xl -z-10"></div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white shadow-md">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-500 to-teal-400 dark:from-emerald-300 dark:via-green-400 dark:to-teal-300 bg-clip-text text-transparent tracking-tight">
              The Combined Duval Pentagon: A Unified Diagnostic Geometry
            </h4>
          </div>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
            <p>
              The development of the Combined Duval Pentagon represents a
              significant step towards simplifying and automating the DGA
              process. By integrating the diagnostic capabilities of both
              Pentagon 1 and Pentagon 2 into a single, cohesive graphical
              representation, it eliminates procedural complexities and provides
              a more efficient and powerful tool for analysis.
            </p>

            {/* Rationale Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Rationale for Combination
              </h5>
              <p>
                The primary driver was the need for a simplified geometry
                suitable for straightforward implementation in computer
                programs. The sequential use of Pentagon 1 and 2 was inefficient
                and algorithmically complex. The combined approach streamlines
                this into a single calculation and location test, reducing the
                total number of distinct zones from 14 to a more manageable 10.
              </p>
            </div>

            {/* Methodology Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Methodology of Superposition
              </h5>
              <p>
                The Combined Pentagon is created by the logical and graphical
                superposition of the fault zones from Pentagon 1 and 2.
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    Northern Hemisphere (Electrical Faults):
                  </strong>{' '}
                  The zones for PD, D1, D2, and S are identical in both
                  precursors and are carried over directly.
                </li>
                <li>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    Southern Hemisphere (Thermal Faults):
                  </strong>{' '}
                  The new, more specific thermal zones are defined by the
                  geometric intersections of the thermal zones from Pentagon 1
                  (T1, T2, T3) and Pentagon 2 (O, C, T3-H). This is effectively
                  a logical 'AND' operation, confirming both temperature range
                  and material involvement in a single diagnosis.
                </li>
              </ul>
            </div>

            {/* 10 Unified Fault Zones Section */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                The 10 Unified Fault Zones and Their Significance
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The superposition results in a final set of 10 distinct fault
                zones, providing clear, actionable information in a single step.
              </p>
              <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Zone
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Origin
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Diagnostic Significance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">PD, S, D1, D2</td>
                      <td className="px-4 py-2">Unchanged</td>
                      <td className="px-4 py-2">
                        Electrical faults and stray gassing, identical to
                        precursors.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T1-O</td>
                      <td className="px-4 py-2">T1 ∩ O</td>
                      <td className="px-4 py-2">
                        Low-Temp Overheating (&lt;300°C) in Oil only.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T1-C</td>
                      <td className="px-4 py-2">T1 ∩ C</td>
                      <td className="px-4 py-2">
                        Low-Temp Overheating (&lt;300°C) with Paper
                        carbonization.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T2-O</td>
                      <td className="px-4 py-2">T2 ∩ O</td>
                      <td className="px-4 py-2">
                        Mid-Temp Overheating (300-700°C) in Oil only.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T2-C</td>
                      <td className="px-4 py-2">T2 ∩ C</td>
                      <td className="px-4 py-2">
                        Mid-Temp Overheating (300-700°C) with Paper
                        carbonization.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T3-C</td>
                      <td className="px-4 py-2">T3 ∩ C</td>
                      <td className="px-4 py-2">
                        High-Temp Fault (&gt;700°C) with Paper carbonization.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2 font-medium">T3-H</td>
                      <td className="px-4 py-2">T3 ∩ T3-H</td>
                      <td className="px-4 py-2">
                        High-Temp Fault (&gt;700°C) in Oil only.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 rounded-b-2xl"></div>
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
