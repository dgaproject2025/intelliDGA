import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from './icons.jsx';

const EquipmentTable = ({ equipmentData }) => {
  // --- ⬇️ FIX START ⬇️ ---
  // Guard clause to prevent crashing if equipmentData is not yet available.
  if (!equipmentData || !Array.isArray(equipmentData)) {
    // You could also return a loading skeleton here
    return null;
  }
  // --- ⬆️ FIX END ⬆️ ---

  const tableHeaders = [
    'Designation',
    'Type',
    'Unit',
    'Station',
    'Manufacturer',
    'SAP ID',
    'Status',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {equipmentData.map((eq, index) => (
              <motion.tr
                key={eq.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                  {eq.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {eq.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {eq.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {eq.station}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {eq.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded">
                    {eq.sapId}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusPill status={eq.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const StatusPill = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300'
      }`}
    >
      {isActive ? (
        <CheckCircleIcon className="h-4 w-4" />
      ) : (
        <XCircleIcon className="h-4 w-4" />
      )}
      {status}
    </span>
  );
};

export default EquipmentTable;
