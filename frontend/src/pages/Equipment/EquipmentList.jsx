import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEquipmentFilter from './useEquipmentFilter';
import EquipmentTable from './EquipmentTable';
import EquipmentCard from './EquipmentCard';
import { FilterIcon, GridIcon, TableIcon, XIcon } from './icons.jsx';

// Main component that assembles the filter and list
const EquipmentList = () => {
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [showFilters, setShowFilters] = useState(true);

  // Dummy data - replace with API call
  const allEquipment = useMemo(
    () => [
      {
        id: 'EQ001',
        station: 'MTPS-Mundra',
        type: 'Generator Transformer',
        unit: 'Unit-10',
        designation: 'GT-10',
        status: 'Active',
        sapId: 'SAP-12345',
        manufacturer: 'BHEL',
        createdBy: 'admin_user',
      },
      {
        id: 'EQ002',
        station: 'MTPS-Mundra',
        type: 'Unit Transformer',
        unit: 'Unit-20',
        designation: 'UT-20A',
        status: 'Inactive',
        sapId: 'SAP-12346',
        manufacturer: 'Siemens',
        createdBy: 'shashi',
      },
      {
        id: 'EQ003',
        station: 'Jetpur-1',
        type: 'Station Transformer',
        unit: 'Station',
        designation: 'ST-01',
        status: 'Active',
        sapId: 'SAP-12347',
        manufacturer: 'ABB',
        createdBy: 'admin_user',
      },
      {
        id: 'EQ004',
        station: 'Limbdi',
        type: 'Reactor',
        unit: 'Unit-30',
        designation: 'R-30',
        status: 'Active',
        sapId: 'SAP-12348',
        manufacturer: 'BHEL',
        createdBy: 'guest',
      },
      {
        id: 'EQ005',
        station: 'MTPS-Mundra',
        type: 'Unit Auxiliary Transformer',
        unit: 'Unit-40',
        designation: 'UAT-40B',
        status: 'Inactive',
        sapId: 'SAP-12349',
        manufacturer: 'CGL',
        createdBy: 'shashi',
      },
      {
        id: 'EQ006',
        station: 'MTPS-Mundra',
        type: 'Generator Transformer',
        unit: 'Unit-50',
        designation: 'GT-50',
        status: 'Active',
        sapId: 'SAP-12350',
        manufacturer: 'Siemens',
        createdBy: 'admin_user',
      },
    ],
    []
  );

  const {
    filters,
    handleFilterChange,
    clearFilters,
    filteredData,
    uniqueValues,
  } = useEquipmentFilter(allEquipment);

  return (
    <div className="space-y-6">
      <FilterBar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        uniqueValues={uniqueValues}
        resultCount={filteredData.length}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {filteredData.length} Equipment Found
        </h2>
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData.map((eq) => (
                <EquipmentCard key={eq.id} equipment={eq} />
              ))}
            </div>
          ) : (
            <EquipmentTable equipmentData={filteredData} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Component for the top filter bar
const FilterBar = ({
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  clearFilters,
  uniqueValues = {},
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-black p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/70 dark:shadow-blue-900/30 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
            <FilterIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-slate-800 dark:from-blue-400 dark:to-slate-200 bg-clip-text text-transparent">
            Filter Equipment
          </h3>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
              <FilterInput
                name="generalSearch"
                placeholder="Search designation, SAP ID..."
                value={filters.generalSearch}
                onChange={handleFilterChange}
              />
              <FilterSelect
                name="station"
                value={filters.station}
                options={uniqueValues.stations || []}
                onChange={handleFilterChange}
              />
              <FilterSelect
                name="type"
                label="Equipment Type"
                value={filters.type}
                options={uniqueValues.types || []}
                onChange={handleFilterChange}
              />
              <FilterSelect
                name="unit"
                value={filters.unit}
                options={uniqueValues.units || []}
                onChange={handleFilterChange}
              />
              <FilterSelect
                name="status"
                value={filters.status}
                options={uniqueValues.statuses || []}
                onChange={handleFilterChange}
              />
              <FilterSelect
                name="manufacturer"
                value={filters.manufacturer}
                options={uniqueValues.manufacturers || []}
                onChange={handleFilterChange}
              />
              <FilterInput
                name="createdBy"
                label="Created By"
                placeholder="Enter creator's name..."
                value={filters.createdBy}
                onChange={handleFilterChange}
              />
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-sm transition-all duration-200 transform hover:scale-105"
              >
                <XIcon className="h-4 w-4" />
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Filter Components
const FilterInput = ({ name, label, value, onChange, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5"
    >
      {label ||
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-100/50 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-slate-700 rounded-sm px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition duration-200"
      {...props}
    />
  </div>
);

const FilterSelect = ({ name, label, value, options, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5"
    >
      {label || name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-100/50 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition duration-200"
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// View Switcher Component
const ViewSwitcher = ({ viewMode, setViewMode }) => {
  const commonClasses = 'p-2 rounded-sm transition-colors duration-200';
  const activeClasses = 'bg-blue-600 text-white shadow-md';
  const inactiveClasses =
    'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600';

  return (
    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
      <button
        onClick={() => setViewMode('card')}
        className={`${commonClasses} ${
          viewMode === 'card' ? activeClasses : inactiveClasses
        }`}
      >
        <GridIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setViewMode('table')}
        className={`${commonClasses} ${
          viewMode === 'table' ? activeClasses : inactiveClasses
        }`}
      >
        <TableIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default EquipmentList;
