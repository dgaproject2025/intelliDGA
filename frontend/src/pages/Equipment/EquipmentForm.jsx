import React, { useState } from 'react';

const formSchema = {
  station: {
    label: 'Station',
    type: 'text',
    defaultValue: 'MTPS-Mundra',
    disabled: true,
  },
  equipmentType: {
    label: 'Equipment Type',
    type: 'select',
    options: [
      'Generator Transformer',
      'Unit Transformer',
      'Unit Auxiliary Transformer',
      'Station Transformer',
      'Station Auxiliary Transformer',
      'Reactor',
    ],
  },
  unit: {
    label: 'Unit',
    type: 'select',
    options: ['Unit-10', 'Unit-20', 'Unit-30', 'Unit-40', 'Unit-50', 'Station'],
  },
  designation: {
    label: 'Designation',
    type: 'text',
    placeholder: 'e.g., GT-10A',
  },
  manufacturer: {
    label: 'Manufacturer',
    type: 'text',
    placeholder: 'e.g., BHEL',
  },
  dateOfCommissioning: { label: 'Date of Commissioning', type: 'date' },
  sapEquipmentId: {
    label: 'SAP Equipment ID',
    type: 'text',
    placeholder: 'Enter SAP ID',
  },
  activePower: {
    label: 'Active Power (MVA)',
    type: 'number',
    placeholder: 'e.g., 500',
  },
};

const initialFormState = Object.keys(formSchema).reduce((acc, key) => {
  acc[key] = formSchema[key].defaultValue || '';
  return acc;
}, {});

function EquipmentForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formSchema).map(([key, field]) => (
          <div
            key={key}
            className={field.type === 'textarea' ? 'md:col-span-2' : ''}
          >
            <label
              htmlFor={key}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={field.placeholder || ''}
                disabled={field.disabled}
                required
                className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
              />
            )}
          </div>
        ))}
      </div>
      {/* Form Actions */}
      <div className="pt-4 flex justify-end gap-4 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          Create Equipment
        </button>
      </div>
    </form>
  );
}

export default EquipmentForm;
