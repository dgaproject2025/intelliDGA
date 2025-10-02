import React from 'react';

const ChemistryOfGasFormation = () => {
  return (
    <div className="p-6 md:p-8 text-justify">
      <blockquote className="mt-4 border-l-4 border-sky-500 bg-sky-50/50 dark:bg-slate-800/60 pl-4 py-2">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
          As a transformer begins to fail under{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            thermal or electrical stresses
          </strong>
          , its mixed paper-oil insulation system undergoes degradation,
          resulting in the generation of gases that dissolve in the transformer
          oil. These gases typically include{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            hydrogen (H<sub>2</sub>), methane (CH<sub>4</sub>), ethane (C
            <sub>2</sub>H<sub>6</sub>), ethylene (C<sub>2</sub>H<sub>4</sub>),
            and acetylene (C<sub>2</sub>H<sub>2</sub>)
          </strong>
          . In addition, when the cellulose insulation deteriorates,
          considerable amounts of{' '}
          <strong className="font-semibold text-sky-600 dark:text-sky-400">
            carbon monoxide (CO) and carbon dioxide (CO<sub>2</sub>)
          </strong>{' '}
          are produced.
        </p>
      </blockquote>

      <div className="mt-6 space-y-6 text-slate-700 dark:text-slate-600">
        <p>
          The diagnostic power of Dissolved Gas Analysis (DGA) stems from a
          simple principle: the energy of a fault determines which chemical
          bonds are broken within the insulation materials. By analyzing the
          specific types and quantities of the resulting gases, we can infer the
          nature and severity of the incipient fault. The degradation process
          can be divided into two main categories based on the material
          involved.
        </p>

        {/* Section 1: Transformer Oil Degradation */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-300 mb-2">
            1. Degradation of Insulating Oil
          </h3>
          <p>
            Transformer mineral oil is a complex mixture of hydrocarbon
            molecules (alkanes, naphthenes, and aromatics). When subjected to
            sufficient energy, the C-H and C-C bonds within these molecules
            rupture, creating highly reactive radicals and hydrogen atoms. These
            fragments then recombine to form stable, lower-molecular-weight gas
            molecules.
          </p>
          <p className="mt-2">
            The energy level of the fault directly correlates with the gases
            produced:
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 pl-4">
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Low-Energy Discharges (Partial Discharge / Corona):
              </strong>{' '}
              These low-energy events primarily break the weakest C-H bonds,
              leading to the formation of{' '}
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Hydrogen (H<sub>2</sub>)
              </strong>
              . Hydrogen is often the first indicator of partial discharge
              activity.
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Thermal Faults (Overheating):
              </strong>{' '}
              As temperatures rise, more energetic C-C bonds begin to break.
              <ul className="list-['-_'] list-inside mt-2 space-y-1 pl-6">
                <li>
                  <span className="font-medium">
                    Low-temperature overheating (&lt; 300°C):
                  </span>{' '}
                  Produces mainly{' '}
                  <strong className="font-semibold text-sky-600 dark:text-sky-400">
                    Methane (CH<sub>4</sub>)
                  </strong>{' '}
                  and{' '}
                  <strong className="font-semibold text-sky-600 dark:text-sky-400">
                    Ethane (C<sub>2</sub>H<sub>6</sub>)
                  </strong>
                  .
                </li>
                <li>
                  <span className="font-medium">
                    High-temperature overheating (300°C - 700°C):
                  </span>{' '}
                  Leads to the formation of{' '}
                  <strong className="font-semibold text-sky-600 dark:text-sky-400">
                    Ethylene (C<sub>2</sub>H<sub>4</sub>)
                  </strong>
                  , indicating a more severe thermal stress.
                </li>
              </ul>
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                High-Energy Discharges (Arcing):
              </strong>{' '}
              The extreme temperatures of an electrical arc (&gt; 700°C) can
              break all bonds, including the strong triple bond in acetylene
              precursors. This results in the formation of{' '}
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Acetylene (C<sub>2</sub>H<sub>2</sub>)
              </strong>
              , a key gas that almost exclusively points to a high-energy arcing
              fault.
            </li>
          </ul>
        </div>

        {/* Section 2: Cellulose Insulation Degradation */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-300 mb-2">
            2. Degradation of Solid Insulation (Cellulose Paper)
          </h3>
          <p>
            The solid insulation in transformers is typically Kraft paper, which
            is made of cellulose—a long-chain polymer of glucose. The
            degradation of cellulose is a critical concern as it is an
            irreversible process that weakens the mechanical strength of the
            windings.
          </p>
          <p className="mt-2">
            Thermal stress causes the long cellulose chains to break apart. This
            process, along with the presence of oxygen and water, produces
            carbon oxides:
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 pl-4">
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Carbon Monoxide (CO):
              </strong>{' '}
              Primarily formed from the incomplete thermal decomposition of
              cellulose. Its presence is a strong indicator that the paper
              insulation is involved in a fault.
            </li>
            <li>
              <strong className="font-semibold text-sky-600 dark:text-sky-400">
                Carbon Dioxide (CO<sub>2</sub>):
              </strong>{' '}
              Can be produced by both normal aging at lower temperatures and
              severe overheating. While some amount is expected, a high
              generation rate or a low CO<sub>2</sub>/CO ratio suggests more
              severe, localized overheating involving cellulose.
            </li>
          </ul>
          <p className="mt-3">
            In addition to gases, cellulose degradation also produces water (H
            <sub>2</sub>O) and furanic compounds, which can be measured through
            separate oil tests to assess the remaining life of the paper
            insulation. The generation of these carbon-based gases signifies a
            more advanced stage of transformer aging or a serious fault
            condition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChemistryOfGasFormation;
