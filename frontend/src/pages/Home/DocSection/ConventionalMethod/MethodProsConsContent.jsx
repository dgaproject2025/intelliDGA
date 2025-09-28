import React, { useState } from 'react';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// NEW: A redesigned, vertically-oriented card
const MethodProsConsCard = ({ title, pros = [], cons = [] }) => (
  <div className="bg-white/50 dark:bg-slate-800/60 rounded-xl shadow-lg overflow-hidden h-full flex flex-col border border-red-700 dark:border-blue-500">
    {/* Title Section */}
    <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-center">
        {title}
      </h4>
    </div>
    {/* Details Section */}
    <div className="flex-grow p-4 space-y-4">
      {/* Advantages */}
      <div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          <h5 className="font-semibold text-green-700 dark:text-green-300">
            Advantages
          </h5>
        </div>
        <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
          {pros.length > 0 ? (
            pros.map((pro, i) => <li key={i}>{pro}</li>)
          ) : (
            <li>Not specified.</li>
          )}
        </ul>
      </div>
      {/* Disadvantages */}
      <div>
        <div className="flex items-center gap-2">
          <ExclamationCircleIcon className="w-5 h-5 text-orange-500" />
          <h5 className="font-semibold text-orange-700 dark:text-orange-300">
            Disadvantages
          </h5>
        </div>
        <ul className="mt-2 pl-4 list-disc list-outside text-sm text-slate-600 dark:text-slate-400 space-y-1">
          {cons.length > 0 ? (
            cons.map((con, i) => <li key={i}>{con}</li>)
          ) : (
            <li>Not specified.</li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

const MethodAdvantages = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // All methods data transcribed from the provided images
  const methods = [
    {
      title: 'The Key Gas Method',
      pros: [
        'Can detect: electric arcing, partial discharges, and overtemperature in oil and cellulose.',
      ],
      cons: ['Not widely used for diagnosing transformer conditions.'],
    },
    {
      title: 'The Doornenburg Ratio',
      pros: [
        'Identifies incipient faults like thermal decomposition, partial discharge, and arcing.',
      ],
      cons: [
        'Provides insufficient information, especially for multiple faults or cases outside specified codes.',
      ],
    },
    {
      title: 'Rogers & IEC Ratios',
      pros: ['Identifies faults PD, D1, D2, T1, T2, T3.'],
      cons: [
        'Some gas ratios may fall outside specific ranges, making diagnosis inconclusive.',
        'Overlapping situations for D1 and D2 defects can lead to wrong interpretation.',
      ],
    },
    {
      title: 'TRT (Three Ratio Technique)',
      pros: [
        'Identifies faults PD1, PD2, D1, D2, T1, T2, T3, T0, DT.',
        'Has a high accuracy of 99.86% compared to other methods.',
      ],
      cons: [
        'Provides insufficient information for multiple faults or cases outside specified codes.',
      ],
    },
    {
      title: 'Single Gas Ratio Method',
      pros: [
        'Uses three unique gas ratios (CO₂/CO, O₂/N₂, and C₂H₂/H₂) as complementary diagnostic methods.',
      ],
      cons: [
        'Provides insufficient information for multiple faults or cases outside specified codes.',
      ],
    },
    {
      title: 'C3 Hydrocarbon Method',
      pros: ['Used to confirm the temperature range for thermal defects.'],
      cons: [],
    },
    {
      title: 'Duval Triangle 1',
      pros: [
        'Simplicity and robustness.',
        'Identifies PD, D1, D2, T1, T2, T3, DT faults.',
        'Effective in determining the main fault type.',
      ],
      cons: [
        'Difficult to distinguish faults at the boundary between two zones.',
        'Provides insufficient information for multiple faults.',
      ],
    },
    {
      title: 'Duval Triangle 4',
      pros: [
        'Provides more information on low-temperature faults (PD, T1, T2).',
        'Uses "low-energy gases": H₂, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Duval Triangle 5',
      pros: [
        'Provides more information on T2 or T3 thermal defects.',
        'Uses "temperature gases": C₂H₄, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'The Gouda triangle',
      pros: [
        'Simplicity and robustness.',
        'Identifies PD, D1, D2, T1, T2, T3, DT faults.',
        'Effective in determining the main fault type.',
      ],
      cons: [
        'Difficult to distinguish faults at the boundary between two zones.',
        'Provides insufficient information for multiple faults.',
      ],
    },
    {
      title: 'Low Energy Degradation Triangle (LEDT)',
      pros: [
        'Provides more information on low-temperature faults (PD, T1, T2).',
        'Uses "low-energy gases": H₂, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Duval Pentagon 1 Method',
      pros: [
        'Provides more information on T2 or T3 thermal defects.',
        'Uses "temperature gases": C₂H₄, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Duval Pentagon 2 Method',
      pros: [
        'Simplicity and robustness.',
        'Identifies PD, D1, D2, T1, T2, T3, DT faults.',
        'Effective in determining the main fault type.',
      ],
      cons: [
        'Difficult to distinguish faults at the boundary between two zones.',
        'Provides insufficient information for multiple faults.',
      ],
    },
    {
      title: 'Combined Duval pentagon',
      pros: [
        'Provides more information on low-temperature faults (PD, T1, T2).',
        'Uses "low-energy gases": H₂, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Mansour pentagon',
      pros: [
        'Provides more information on T2 or T3 thermal defects.',
        'Uses "temperature gases": C₂H₄, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Heptagon Graph Method',
      pros: [
        'Simplicity and robustness.',
        'Identifies PD, D1, D2, T1, T2, T3, DT faults.',
        'Effective in determining the main fault type.',
      ],
      cons: [
        'Difficult to distinguish faults at the boundary between two zones.',
        'Provides insufficient information for multiple faults.',
      ],
    },
    {
      title: 'ERTA Square Method',
      pros: [
        'Provides more information on low-temperature faults (PD, T1, T2).',
        'Uses "low-energy gases": H₂, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
    {
      title: 'Nomogram Method',
      pros: [
        'Provides more information on T2 or T3 thermal defects.',
        'Uses "temperature gases": C₂H₄, CH₄, and C₂H₆.',
      ],
      cons: [
        'Provides insufficient information for multiple faults due to using only three gases.',
      ],
    },
  ];

  // Group methods into slides of 3
  const slides = [];
  for (let i = 0; i < methods.length; i += 3) {
    slides.push(methods.slice(i, i + 3));
  }

  return (
    <div className="relative">
      <div className="animate-fadeIn  ">
        {slides.map((slideMethods, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
              currentSlide === index
                ? 'opacity-100'
                : 'opacity-0 absolute top-0 left-0 w-full'
            }`}
          >
            {slideMethods.map((method) => (
              <MethodProsConsCard
                key={method.title}
                title={method.title}
                pros={method.pros}
                cons={method.cons}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Navigation Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
          }
          className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          disabled={currentSlide === 0}
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-orange-500 scale-125'
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
        ))}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev < slides.length - 1 ? prev + 1 : prev
            )
          }
          className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </div>
  );
};

export default MethodAdvantages;
