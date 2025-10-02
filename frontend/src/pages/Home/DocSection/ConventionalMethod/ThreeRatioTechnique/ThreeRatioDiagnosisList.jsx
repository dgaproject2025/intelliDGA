import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

// Data for the list of fault types
const faultTypes = [
  { code: 'T₃', description: 'Thermal faults of T > 700°C.' },
  { code: 'T₂', description: 'Thermal faults of 300°C < T < 700°C.' },
  { code: 'T₁', description: 'Thermal faults 150°C < T < 300°C.' },
  { code: 'T₀', description: 'Thermal faults T < 150°C.' },
  { code: 'D₁', description: 'Low energy discharge.' },
  { code: 'D₂', description: 'High energy discharge.' },
  { code: 'PD₁', description: 'Low energy-corona partial discharge.' },
  { code: 'PD₂', description: 'High energy-corona partial discharge.' },
  { code: 'DT', description: 'Mix of electrical and thermal fault.' },
  { code: 'N', description: 'Normal.' },
];

const ThreeRatioFaultDiagnosisCards = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-blue-200">
        Fault Type Diagnosis using Three Ratio Method
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faultTypes.map((type, index) => {
          // Check if the current card is the last one in the array
          const isLastCard = index === faultTypes.length - 1;

          // Define the base classes for every card
          const baseClasses =
            'bg-blue-600 dark:bg-blue-800 p-5 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200 ease-in-out';

          // Define the special classes ONLY for the last card
          const specialClasses = isLastCard
            ? 'md:col-span-2 lg:col-span-3' // Span 2 cols on medium screens, 3 on large
            : '';

          return (
            <div
              key={index}
              className={`${baseClasses} ${specialClasses}`} // Combine the classes
            >
              <div className="flex items-center gap-3 mb-2">
                <LightBulbIcon className="w-6 h-6 text-white/80" />
                <h4 className="font-bold text-xl">({type.code})</h4>
              </div>
              <p className="text-sm opacity-90">{type.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeRatioFaultDiagnosisCards;
