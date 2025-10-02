import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import DuvalTriangle5Visualization from './DuvalTriangle5MethodVisualization';

const FaultZoneLegend = () => {
  const faultZones = [
    {
      name: 'O (Overheating ≤ 250 °C without carbonization of paper)',
      color: 'rgb(104, 255, 255)',
    },
    { name: 'C (Possible paper carbonization)', color: '#ffa500' },
    { name: 'PD (Partial Discharge)', color: 'rgb(255, 0, 0)' },
    {
      name: 'S (Stray gassing at temperatures ≤ 200 °C)',
      color: 'rgb(51, 100, 240)',
    },
    { name: 'ND (Not Determined or Not Detected.)', color: '#d3d3d3' },
    { name: 'T2 (Thermal fault, 300 ≤T ≤700 °C)', color: 'rgb(255,204,0)' },
    { name: 'T3 (Thermal fault, T >700 °C)', color: 'rgb(0,0,0)' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
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

const DuvalTriangle4MethodContent = () => {
  return (
    <>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">
        The Duval Triangle 5 Method
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
              Duval’s Triangle 5 was developed to assist in the identification
              of low-energy faults to provide more information on the fault. The
              three dissolved gases that make up Duval’s Triangle 5 are Hydrogen
              (H₂), Methane (CH₄), and Ethylene (C₂H₄). The one precondition is
              that Duval’s Triangle 5 can only be used after it has been
              identified by Duval’s Triangle 1 that the fault type is that of
              either PD, T1, or T2. It also cannot be used for the
              identification of faults of the D1 and D2 electrical fault types.
            </p>
          </div>
          <div className="mt-3">
            <p className="text-slate-600 dark:text-slate-300 text-justify">
              Its core principles are:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-justify">
              <li>
                <span className="font-bold text-blue-500">
                  Focus on Thermal Faults:
                </span>{' '}
                It was specifically developed to assist in identifying medium to
                high-level energy faults, providing more information on thermal
                faults in paper and oil.
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Uses "Temperature Gases":
                </span>{' '}
                The method is based on the relationship between three key gases
                associated with thermal degradation: Ethylene (C₂H₄), Methane
                (CH₄), and Ethane (C₂H₆).
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  A Precondition for Use:
                </span>{' '}
                A crucial rule is that Triangle 5 should only be used for faults
                that have already been identified by Duval Triangle 1 as being
                either T2 or T3 type faults.
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Specific Exclusions:
                </span>{' '}
                It should never be used to analyze electrical faults of type D1
                or D2. For lower-energy faults like O, S, and PD, Duval's
                Triangle 4 is the appropriate tool to use.
              </li>
              <li>
                <span className="font-bold text-blue-500">
                  Identifies Carbonization:
                </span>{' '}
                The chart includes new sub-areas that help indicate the specific
                location of paper carbonization faults.
              </li>
            </ul>
          </div>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Duval Triangle Method -5 Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <DuvalTriangle5Visualization />
          </div>
          <div className="mt-3 w-full mx-auto rounded-md bg-slate-400 pl-2 pb-2">
            <FaultZoneLegend />
          </div>
        </div>

        <div className=" p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <InformationCircleIcon className="w-6 h-6 text-teal-500" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Fault Zone Interpretation
            </h4>
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            The Duval Triangle 5 is a specialized tool used to provide a more
            refined diagnosis of medium-to-high temperature thermal faults that
            were initially identified as T₂ or T₃ by the primary Duval Triangle
            1. It uses the "temperature gases"—Ethylene (C₂H₄), Methane (CH₄),
            and Ethane (C₂H₆)—to differentiate between various thermal
            conditions.
          </div>
          <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300 text-justify">
            <p>
              The fault zones in Triangle 5 provide more specific information
              about the nature of these thermal faults:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  PD (Partial Discharge):
                </strong>{' '}
                While Triangle 5 is not primarily for PD, its zones can still
                help identify it. However, for a definitive PD diagnosis,
                Triangle 4 is recommended.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  S (Stray Gassing):
                </strong>{' '}
                Represents stray gassing of the mineral oil at temperatures
                below 200 °C.It indicates stray gassing of the mineral oil at
                low temperatures. For faults identified as O, S, and PD, Duval's
                Triangle 4 is the appropriate tool to use
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  O (Overheating):
                </strong>{' '}
                Indicates overheating at temperatures below 250 °C, but without
                the carbonization (charring) of paper insulation.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  C (Carbonization):
                </strong>{' '}
                Suggests possible carbonization of the paper insulation,
                indicating a higher temperature thermal fault than the 'O'
                zone.This new sub-area in Triangle 5 is significant as it helps
                to indicate the location of paper carbonization faults,
                providing a more precise diagnosis of thermal stress on the
                solid insulation.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  T2 (Thermal Fault, 300-700°C):
                </strong>{' '}
                This zone confirms a medium-temperature thermal fault,
                consistent with the initial diagnosis from Triangle 1. fusion.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  T3 (Thermal Fault,&gt; 700°C):
                </strong>{' '}
                This zone confirms a high-temperature thermal fault, often
                involving severe carbonization of oil and potential metal
                discoloration or
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-slate-200 dark:border-blue-500">
          <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
              <h5 className="font-semibold text-green-700 dark:text-green-300">
                Advantages
              </h5>
            </div>
            <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                Used to obtain more information about low-temperature faults
                like PD, T1 or T2.
              </li>
              <li>Faults identified: PD, S, O, C.</li>
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
                Because it uses only three dissolved gases, it provides
                insufficient information, especially in the case of the
                existence of multiple faults.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuvalTriangle4MethodContent;
