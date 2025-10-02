import React from 'react';

const ThreeRatioDiagnosisCodeTable = () => {
  return (
    // Main container with the established blue theme
    <div className="bg-blue-600 dark:bg-blue-800 p-4 rounded-lg text-white shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4">
        Diagnosis Code of Three Ratio Method
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-lg">
          <thead>
            <tr className="bg-white/10">
              <th
                colSpan="3"
                className="p-3 border border-white/30 font-semibold"
              >
                Diagnosis Input Code
              </th>
              <th
                rowSpan="2"
                className="p-3 border border-white/30 font-semibold align-middle"
              >
                Fault Type
              </th>
            </tr>
            <tr className="bg-white/10">
              <th className="p-3 border border-white/30 font-semibold w-1/4">
                R₁
              </th>
              <th className="p-3 border border-white/30 font-semibold w-1/4">
                R₂
              </th>
              <th className="p-3 border border-white/30 font-semibold w-1/4">
                R₃
              </th>
            </tr>
          </thead>
          <tbody>
            {/* --- Block for T₃ --- */}
            <tr>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                R₁ &gt; 0.9
              </td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle"
              >
                R₂ ≤ 1
              </td>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                T₃
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
            </tr>

            {/* --- Block for T₂ --- */}
            <tr className="border-t-2 border-white/40">
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                R₁ &gt; 0.9
              </td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle"
              >
                1 ≤ R₂ ≤ 3.5
              </td>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                T₂
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
            </tr>

            {/* --- Block for T₁ --- */}
            <tr className="border-t-2 border-white/40">
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                R₁ &gt; 0.9
              </td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle"
              >
                R₂ &gt; 3.5
              </td>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
              <td
                rowSpan="4"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                T₁
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
            </tr>

            {/* --- Block for T₀, PD₁, PD₂ --- */}
            <tr className="border-t-2 border-white/40">
              <td className="p-4 border border-white/30 align-middle">
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td className="p-4 border border-white/30 align-middle">
                Non-Significant
              </td>
              <td className="p-4 border border-white/30 align-middle">
                R₃ &lt; 0.05
              </td>
              <td className="p-4 border border-white/30 align-middle font-bold">
                T₀
              </td>
            </tr>
            <tr>
              <td
                rowSpan="3"
                className="p-4 border border-white/30 align-middle"
              >
                R₁ ≤ 0.05
              </td>
              <td
                rowSpan="3"
                className="p-4 border border-white/30 align-middle"
              >
                R₂ &gt; 1
              </td>
              <td className="p-4 border border-white/30">R₃ &lt; 0.05</td>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                PD₁
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">0.05 ≤ R₃ ≤ 0.5</td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30">R₃ ≤ 0.05</td>
              <td className="p-4 border border-white/30 align-middle font-bold">
                PD₂
              </td>
            </tr>

            {/* --- Final Appended Block --- */}
            <tr className="border-t-2 border-white/40">
              <td className="p-4 border border-white/30 align-middle">
                R₁ ≤ 0.05
              </td>
              <td className="p-4 border border-white/30 align-middle">
                R₂ &gt; 1
              </td>
              <td
                rowSpan="6"
                className="p-4 border border-white/30 align-middle"
              >
                R₃ ≥ 0.5
              </td>
              <td className="p-4 border border-white/30 align-middle font-bold">
                PD₂
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30 align-middle">
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle"
              >
                R₂ &gt; 3.5
              </td>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                D₁
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30 align-middle">
                R₁ &gt; 0.9
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30 align-middle">
                0.05 ≤ R₁ ≤ 0.9
              </td>
              <td
                rowSpan="3"
                className="p-4 border border-white/30 align-middle"
              >
                R₂ ≤ 3.5
              </td>
              <td
                rowSpan="2"
                className="p-4 border border-white/30 align-middle font-bold"
              >
                D₂
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30 align-middle">
                R₁ ≤ 0.05
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-white/30 align-middle">
                R₁ &gt; 0.9
              </td>
              <td className="p-4 border border-white/30 align-middle font-bold">
                DT
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThreeRatioDiagnosisCodeTable;
