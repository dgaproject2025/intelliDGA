import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from './icons.jsx'; // Assuming you have these icons

const EquipmentCard = ({ equipment }) => {
  // --- ⬇️ FIX START ⬇️ ---
  // This is a "guard clause". If the equipment prop is not yet available,
  // we return null to prevent the component from crashing.
  if (!equipment) {
    return null;
  }
  // --- ⬆️ FIX END ⬆️ ---

  // Now that we've confirmed 'equipment' exists, we can safely destructure it.
  const { designation, type, unit, station, sapId, manufacturer, status } =
    equipment;

  const statusInfo = {
    Active: {
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      textColor: 'text-green-800 dark:text-green-300',
      bgColor: 'bg-green-100 dark:bg-green-800/50',
    },
    Inactive: {
      icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
      textColor: 'text-red-800 dark:text-red-300',
      bgColor: 'bg-red-100 dark:bg-red-800/50',
    },
  };

  const currentStatus = statusInfo[status] || statusInfo['Inactive'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {designation}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${currentStatus.bgColor} ${currentStatus.textColor}`}
          >
            {currentStatus.icon}
            {status}
          </span>
        </div>
        <p className="mt-1 text-sm text-blue-600 dark:text-blue-400 font-medium">
          {type}
        </p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/50 text-sm">
        <div className="space-y-3">
          <InfoRow label="Station" value={station} />
          <InfoRow label="Unit" value={unit} />
          <InfoRow label="Manufacturer" value={manufacturer} />
          <InfoRow label="SAP ID" value={sapId} isCode />
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value, isCode = false }) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-500 dark:text-slate-400">{label}</span>
    {isCode ? (
      <code className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded">
        {value}
      </code>
    ) : (
      <span className="font-medium text-slate-700 dark:text-slate-300 text-right">
        {value}
      </span>
    )}
  </div>
);

export default EquipmentCard;
