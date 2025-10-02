import React from 'react';
import {
  LightBulbIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import DuvalTriangle4Visualization from './DuvalTriangle4MethodVisualization';

const FaultZoneLegend = () => {
  const faultZones = [
    {
      name: 'O (Overheating ≤ 250 °C without carbonization of paper)',
      color: '#ffff00',
    },
    { name: 'C (Possible paper carbonization)', color: '#ffa500' },
    { name: 'PD (Partial Discharge)', color: 'rgb(255,0,0)' },
    { name: 'S (Stray gassing at temperatures ≤ 200 °C)', color: '#ffa500' },
    { name: 'ND (Not Determined or Not Detected.)', color: '#d3d3d3' },
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
        The Duval Triangle 4 Method
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
          <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-justify">
            <li>
              Duval’s Triangle 4 was developed to assist in the identification
              of low-energy faults to provide more information on the fault.
            </li>
            <li>
              The three dissolved gases that make up Duval’s Triangle 4 are
              Hydrogen (H₂), Methane (CH₄), and Ethane (C₂H₆).
            </li>
            <li>
              The one precondition is that Duval’s Triangle 4 can only be used
              after it has been identified by Duval’s Triangle 1 that the fault
              type is that of either PD, T1, or T2.
            </li>
            <li>
              It also cannot be used for the identification of faults of the D1
              and D2 electrical fault types.
            </li>
          </ul>
        </div>

        {/* UPDATED: Chart and Legend are now in a single container */}
        <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-sm shadow-md border border-slate-200 dark:border-blue-500">
          <div className="flex items-center gap-3">
            <ChartPieIcon className="w-6 h-6 text-red-500" />
            <h4 className="text-lg font-bold text-red-500 dark:text-red-500">
              Duval Triangle Method -4 Visualization
            </h4>
          </div>
          <div className="mt-3 rounded-md ">
            <DuvalTriangle4Visualization />
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
            <p>
              Each zone within the Duval Triangle 4 corresponds to a specific
              type of low-energy fault:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  PD (Partial Discharge):
                </strong>{' '}
                Indicates low-energy electrical discharges, often of the corona
                type.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  S (Stray Gassing):
                </strong>{' '}
                Represents stray gassing of the mineral oil at temperatures
                below 200 °C.
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
                indicating a higher temperature thermal fault than the 'O' zone.
              </li>
              <li>
                <strong className="text-red-500 dark:text-red-500">
                  ND (Not Determined):
                </strong>{' '}
                This zone means the fault type is not determined or not detected
                by this specific triangle.
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
