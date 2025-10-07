import React, { useState } from 'react';
import EquipmentForm from './EquipmentForm';
import EquipmentUpload from './EquipmentUpload';
import { XIcon } from './icons.jsx';

function EquipmentCreationModal({ isOpen, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'upload'

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Create New Equipment
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-6 px-5" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('form')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'form'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Create with Form
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Bulk Upload from Template
            </button>
          </nav>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto">
          {activeTab === 'form' ? (
            <EquipmentForm onSubmit={onSubmit} onCancel={onClose} />
          ) : (
            <EquipmentUpload onCancel={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default EquipmentCreationModal;
