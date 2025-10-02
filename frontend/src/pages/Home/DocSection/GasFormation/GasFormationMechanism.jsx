import React from 'react';

const GasFormationMechanism = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      {/* Intro (blockquote) */}
      <blockquote className="mt-4 border-l-4 border-sky-500 bg-sky-50/50 dark:bg-slate-800/60 pl-4 py-2">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
          In power transformers, the insulating mineral oil is a mixture of
          hydrocarbons containing{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            methyl (CH₃•)
          </strong>
          ,{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            methylene (CH₂•)
          </strong>
          , and{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            methine (=CH–)
          </strong>{' '}
          groups linked by C–C bonds. Under{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            thermal and electrical stresses
          </strong>
          , C–H and C–C bonds break, generating radicals that rapidly form gases
          such as H₂, CH₄, C₂H₆, C₂H₄, and C₂H₂, or recombine into heavier
          polymers/soot.
        </p>
      </blockquote>

      <div className="mt-6 space-y-6 text-slate-900 dark:text-slate-500">
        <p>
          The mechanism of gas formation is governed by bond dissociation and
          radical chemistry. Fault energy determines which bonds break first and
          which stable products dominate. By tracking the resulting gas
          signatures and their rates of change, Dissolved Gas Analysis (DGA)
          infers the fault type and severity.
        </p>

        {/* Section 1: Breakdown Mechanism */}
        <div className="mt-6 text-slate-900 dark:text-slate-500">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-300 mb-2">
            1. Breakdown Mechanism
          </h3>

          <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-300/50 px-4 py-3">
            <p>
              Energy input initiates{' '}
              <span className="font-medium">bond scission</span>, creating
              highly reactive fragments (radicals). Subsequent propagation and
              termination steps set the final gas pattern:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 pl-1">
              <li>
                <span className="font-medium">Initiation:</span> Weaker C–H
                bonds cleave first → H• and alkyl radicals (R•).
              </li>
              <li>
                <span className="font-medium">Propagation:</span> β-scission,
                hydrogen abstraction, and dehydrogenation yield small fragments
                (•CH₃, •C₂H₅, •CH₂=CH•).
              </li>
              <li>
                <span className="font-medium">Termination:</span> Radical
                recombination forms stable gases and heavy residues
                (polymers/soot).
              </li>
            </ul>

            <div className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-80/60 px-4 py-3 text-sm text-slate-900 dark:text-blue-500">
              <p className="font-medium">Representative pathways</p>
              <p className="mt-1">
                R–H → R• + H•; H• + H• → H₂
                <br />
                •CH₃ + •CH₃ → C₂H₆; •C₂H₅ → C₂H₄ + H•
                <br />
                Extensive cracking at high energy produces C₂H₂ and carbon/soot.
              </p>
            </div>
          </div>

          <p className="mt-4">The fault energy controls the dominant gases:</p>
          <ul className="mt-3 list-disc list-inside space-y-2 pl-4">
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Low-energy discharges (Partial Discharge/Corona):
              </strong>{' '}
              Preferential C–H cleavage →{' '}
              <strong>
                Hydrogen (H<sub>2</sub>)
              </strong>{' '}
              dominates.
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Low-temperature overheating (&lt; 300&nbsp;°C):
              </strong>{' '}
              Limited cracking; saturated fragments stabilize as{' '}
              <strong>
                Methane (CH<sub>4</sub>)
              </strong>{' '}
              and{' '}
              <strong>
                Ethane (C<sub>2</sub>H<sub>6</sub>)
              </strong>
              .
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                High-temperature overheating (300–700&nbsp;°C):
              </strong>{' '}
              Dehydrogenation/β-elimination →{' '}
              <strong>
                Ethylene (C<sub>2</sub>H<sub>4</sub>)
              </strong>{' '}
              increases.
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                High-energy discharges (Arcing, &gt; 700&nbsp;°C):
              </strong>{' '}
              Extensive pyrolysis; triple-bond precursors yield{' '}
              <strong>
                Acetylene (C<sub>2</sub>H<sub>2</sub>)
              </strong>{' '}
              and carbon/soot.
            </li>
          </ul>
        </div>

        {/* Section 2: Modifiers & Cellulose Coupling */}
        <div className="mt-6 text-slate-900 dark:text-slate-500">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-300 mb-2">
            2. Modifiers & Coupling with Cellulose
          </h3>

          <p>
            Real transformers contain oxygen, moisture, metals, inhibitors, and
            cellulose. These alter reaction pathways and final gas proportions,
            so they must be considered while interpreting DGA.
          </p>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card: Modifiers */}
            <div className="rounded-md text-slate-900 dark:text-slate-500 border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 px-4 py-3">
              <h4 className="font-semibold text-slate-900 dark:text-red-500">
                Key Modifiers
              </h4>
              <ul className="mt-2 list-disc list-inside space-y-2">
                <li>
                  <span className="font-medium">Oxygen (O₂):</span> Promotes
                  oxidation → more CO/CO₂; moderates polymer build-up.
                </li>
                <li>
                  <span className="font-medium">Moisture (H₂O):</span> Catalyzes
                  hydrolysis; lowers PD inception voltage.
                </li>
                <li>
                  <span className="font-medium">Metal surfaces:</span>{' '}
                  Copper/iron favor dehydrogenation → higher C₂H₄ at a given T.
                </li>
                <li>
                  <span className="font-medium">
                    Aging products/inhibitors:
                  </span>{' '}
                  Change radical lifetimes; slightly skew gas ratios.
                </li>
              </ul>
            </div>

            {/* Card: Cellulose Coupling */}
            <div className="rounded-md text-slate-900 dark:text-slate-500 border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 px-4 py-3">
              <h4 className="font-semibold text-slate-900 dark:text-red-500">
                Cellulose Involvement
              </h4>
              <p className="mt-2">
                When paper insulation is thermally stressed, glycosidic scission
                and dehydration dominate, producing <strong>CO</strong>,{' '}
                <strong>CO₂</strong>, H₂O, and furanic compounds. A rising
                CO/CO₂ trend, together with hydrocarbon gases, indicates mixed
                oil–paper faults and advanced aging or localized hotspots.
              </p>
            </div>
          </div>

          <p className="mt-4 text-slate-900 dark:text-slate-500">
            For diagnostics, prioritize trends (Δppm/day or per 1000&nbsp;h)
            over absolutes, correlate with load/events, and validate paper
            involvement with moisture, furan, and DP measurements. Always apply
            limits per relevant IEC/IEEE guides and unit history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GasFormationMechanism;
