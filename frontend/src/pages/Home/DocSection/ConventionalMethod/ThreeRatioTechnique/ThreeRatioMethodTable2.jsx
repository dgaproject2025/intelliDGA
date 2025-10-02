import React from 'react';

// Reusable components for the icons in the table
const MajorIcon = () => <div className="w-3 h-3 bg-white mx-auto"></div>;
const SecondaryIcon = () => (
  <div className="w-3 h-3 border-2 border-white rounded-full mx-auto"></div>
);

// Data for the table
const faultData = [
  {
    fault: 'T > 700°C',
    h2: 'secondary',
    ch4: 'secondary',
    c2h6: null,
    c2h4: 'major',
    c2h2: 'secondary',
  },
  {
    fault: '300°C < T < 700°C',
    h2: 'secondary',
    ch4: 'secondary',
    c2h6: 'major',
    c2h4: 'major',
    c2h2: 'trace',
  },
  {
    fault: '150°C < T < 300°C',
    h2: 'secondary',
    ch4: 'major',
    c2h6: 'major',
    c2h4: 'trace',
    c2h2: null,
  },
  {
    fault: 'T < 150°C',
    h2: 'secondary',
    ch4: 'major',
    c2h6: 'major',
    c2h4: 'trace',
    c2h2: null,
  },
  {
    fault: 'Corona Partial Discharge',
    h2: 'major',
    ch4: 'secondary',
    c2h6: null,
    c2h4: null,
    c2h2: 'trace',
  },
  {
    fault: 'Low Energy Discharge',
    h2: 'major',
    ch4: 'secondary',
    c2h6: null,
    c2h4: null,
    c2h2: 'major',
  },
  {
    fault: 'High Energy Discharge',
    h2: 'major',
    ch4: 'secondary',
    c2h6: null,
    c2h4: 'major',
    c2h2: 'major',
  },
];

const IncipientFaultTable = () => {
  const renderCellContent = (gas) => {
    if (gas === 'major') return <MajorIcon />;
    if (gas === 'secondary') return <SecondaryIcon />;
    if (gas === 'trace') return 'trace';
    return null;
  };

  return (
    <div className="bg-blue-600 dark:bg-blue-800 p-4 rounded-lg text-white shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4">
        Generated Gas Vs Incipient Fault
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-white/10">
              <th className="p-3 border border-white/30">Fault Type</th>
              <th className="p-3 border border-white/30">Fault</th>
              <th className="p-3 border border-white/30">H₂</th>
              <th className="p-3 border border-white/30">CH₄</th>
              <th className="p-3 border border-white/30">C₂H₆</th>
              <th className="p-3 border border-white/30">C₂H₄</th>
              <th className="p-3 border border-white/30">C₂H₂</th>
            </tr>
          </thead>
          <tbody>
            {/* Thermal Faults */}
            <tr>
              <td
                className="p-3 border border-white/30 font-semibold"
                rowSpan="4"
              >
                Thermal
              </td>
              <td className="p-3 border border-white/30">
                {faultData[0].fault}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[0].h2)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[0].ch4)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[0].c2h6)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[0].c2h4)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[0].c2h2)}
              </td>
            </tr>
            {faultData.slice(1, 4).map((row, index) => (
              <tr key={index}>
                <td className="p-3 border border-white/30">{row.fault}</td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.h2)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.ch4)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h6)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h4)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h2)}
                </td>
              </tr>
            ))}
            {/* Electrical Faults */}
            <tr>
              <td
                className="p-3 border border-white/30 font-semibold"
                rowSpan="3"
              >
                Electrical fault
              </td>
              <td className="p-3 border border-white/30">
                {faultData[4].fault}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[4].h2)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[4].ch4)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[4].c2h6)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[4].c2h4)}
              </td>
              <td className="p-3 border border-white/30">
                {renderCellContent(faultData[4].c2h2)}
              </td>
            </tr>
            {faultData.slice(5, 7).map((row, index) => (
              <tr key={index}>
                <td className="p-3 border border-white/30">{row.fault}</td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.h2)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.ch4)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h6)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h4)}
                </td>
                <td className="p-3 border border-white/30">
                  {renderCellContent(row.c2h2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-4 p-2 bg-white/10 rounded-md">
          <div className="flex items-center gap-2">
            <MajorIcon />
            <span>major gas concentration</span>
          </div>
          <div className="flex items-center gap-2">
            <SecondaryIcon />
            <span>secondary gas concentration.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncipientFaultTable;
