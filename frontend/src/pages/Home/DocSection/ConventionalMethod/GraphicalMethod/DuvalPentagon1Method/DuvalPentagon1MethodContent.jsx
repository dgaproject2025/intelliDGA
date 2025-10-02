import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import DuvalPentagon1Visualization from './DuvalPentagon1MethodVisualisation';

// A dedicated component for the chart legend
const FaultZoneLegend = () => {
  const faultZones = [
    { name: 'D1 (Discharges of Low energy)', color: 'rgba(26, 232, 232,1)' },
    { name: 'D2 (Discharges of High energy)', color: 'rgba(51, 100, 240,1)' },
    { name: 'S (Stray gassing ≤ 200 °C)', color: 'rgba(128,128,128,1)' },
    { name: 'T1 (Thermal fault, T ≤300 °C)', color: 'rgba(255, 153, 153,1)' },
    {
      name: 'T2 (Thermal fault, 300 ≤T ≤700 °C)',
      color: 'rgba(255, 204, 0,1)',
    },
    { name: 'T3 (Thermal fault, T >700 °C)', color: 'rgba(0, 0, 0,1)' },
    { name: 'PD (Partial Discharge)', color: 'rgba(255, 0, 0,1)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      {/* UPDATED: Using a grid layout for perfect column alignment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
        {faultZones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex-shrink-0"
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

const DuvalTriangle4MethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Duval Pentagon-1 Method
      </h3>

      <div className="mt-6 space-y-8 max-h-[600px] overflow-y-auto pr-4">
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Underlying Principle
            </h4>
          </div>
          {/* UPDATED: Content from the new slide */}
          <div className="mt-3">
            <p className="text-slate-600 dark:text-slate-300 text-justify">
              The Duval Pentagon 1 Method is an advanced graphical technique for
              Dissolved Gas Analysis (DGA) that expands upon the concepts of the
              Duval Triangles. It is specifically designed for the general
              analysis of fault types and provides additional insight into the
              normal aging process of a transformer.
            </p>
          </div>
          <div className="mt-3">
            <p className="text-slate-600 dark:text-slate-300 text-justify">
              Its core principles are:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-justify">
              <li>
                <span className="font-bold text-blue-500">
                  Uses Five Key Gases:
                </span>{' '}
                Unlike the triangles, which use three gases, the Pentagon 1
                method utilizes all five main combustible hydrocarbon gases. The
                order of these gases at the five vertices of the pentagon
                corresponds to the increasing energy or temperature required to
                produce them:
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Hydrogen (H₂)</li>
                  <li>Methane (CH₄)</li>
                  <li>Ethane (C₂H₆)</li>
                  <li>Ethylene (C₂H₄)</li>
                  <li>Acetylene (C₂H₂)</li>
                </ul>
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Graphical Diagnosis:
                </span>{' '}
                imilar to the triangles, the relative percentages of these five
                gases are calculated and plotted as a single point within the
                pentagon. The location of this point inside specific, predefined
                zones indicates the type of fault.
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Identifies Normal Aging:
                </span>{' '}
                A key advantage of the pentagon is its ability to identify the
                "S" (Stray Gassing) zone, which is associated with the
                production of gases during the normal aging process of the
                transformer's oil.
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Complementary to Triangles:
                </span>{' '}
                The Duval Pentagon 1 method is often used after an initial
                analysis with the Duval Triangles. It serves as a complementary
                tool to confirm or provide more detail on a suspected fault.
              </li>
            </ul>
          </div>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Duval Pentagon Method -1 Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <DuvalPentagon1Visualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              The Duval Pentagon 1 Method expands on the Duval Triangles by
              incorporating all five key combustible gases (H₂, CH₄, C₂H₆, C₂H₄,
              C₂H₂) to provide a more comprehensive diagnosis. The location of
              the plotted point within the pentagon's specific zones indicates
              the fault type.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  PD (Partial Discharge):
                </strong>{' '}
                This zone indicates the presence of low-energy electrical
                discharges, often occurring in gas-filled voids within the
                insulation system.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  S (Stray Gassing):
                </strong>{' '}
                A unique feature of the pentagon, this zone is designed to
                identify stray gassing associated with the normal aging process
                of the mineral oil.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  T₁ (Thermal Fault, T &lt; 300°C):
                </strong>{' '}
                Represents low-temperature overheating. This condition may cause
                the paper insulation to turn brownish but is typically not
                severe enough to cause carbonization.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  T₂ (Thermal Fault, 300°C - 700°C):
                </strong>{' '}
                Indicates a medium-temperature thermal fault where the energy is
                sufficient to cause carbonization of paper insulation.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  T₃ (Thermal Fault, T &gt; 700°C):
                </strong>{' '}
                A high-temperature thermal fault, suggesting severe overheating
                that can lead to extensive carbonization of the oil.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  D₁ (Low Energy Discharge):
                </strong>{' '}
                This zone corresponds to sparking or low-energy electrical
                discharges, which are more energetic than partial discharges.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-400">
                  D₂ (High Energy Discharge):
                </strong>{' '}
                Represents a severe, high-energy arcing fault with significant
                power follow-through, which can cause extensive damage.
              </li>
            </ul>
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
                It is designed for the general analysis of fault types and in
                addition shows the stray gas "S" area associated with the
                production of gases during the normal ageing process.
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
                It is used after analysis with the Duval triangles and are
                complementary.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuvalTriangle4MethodContent;
