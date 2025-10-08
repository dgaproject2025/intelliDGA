import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter as FilterIcon, X as XIcon, ChevronRight } from 'lucide-react';

/* ========== PUBLIC API ========== */
// Main filter panel
export default function EquipmetFilter({
  embedded = false,
  showFilters,
  setShowFilters,
  showAdvanced,
  setShowAdvanced,
  filters,
  handleFilterChange,
  clearFilters,
  uniqueValues = {},
}) {
  const Stat = ({ label, value }) => (
    <div className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-xs">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>{' '}
      <span className="font-semibold text-slate-800 dark:text-slate-100">
        {value || '—'}
      </span>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-black p-4 rounded-md border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/70 dark:shadow-blue-900/30 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
            <FilterIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-slate-800 dark:from-blue-400 dark:to-slate-200 bg-clip-text text-transparent">
            Filter Equipment
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Stat label="Station" value={filters.station || 'All'} />
          <Stat label="Type" value={filters.type || 'All'} />
          <Stat label="Status" value={filters.status || 'All'} />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          {showFilters ? 'Hide Panel' : 'Show Panel'}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Quick row */}
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
              <FilterInput
                name="generalSearch"
                placeholder="Search designation, SAP ID, type, station..."
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
                name="status"
                value={filters.status}
                options={uniqueValues.statuses || []}
                onChange={handleFilterChange}
              />
            </div>

            {/* Advanced toggle */}
            <div className="mt-3">
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:underline"
              >
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    showAdvanced ? 'rotate-90' : ''
                  }`}
                />
                Advanced filters
              </button>
            </div>

            {/* Advanced area */}
            <AnimatePresence initial={false}>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  <FilterSelect
                    name="unit"
                    value={filters.unit}
                    options={uniqueValues.units || []}
                    onChange={handleFilterChange}
                  />
                  <FilterSelect
                    name="manufacturer"
                    value={filters.manufacturer}
                    options={uniqueValues.manufacturers || []}
                    onChange={handleFilterChange}
                  />
                  <FilterSelect
                    name="createdBy"
                    label="Created By"
                    value={filters.createdBy}
                    options={(uniqueValues.creators || []).filter(
                      (v) => v !== 'System'
                    )}
                    onChange={handleFilterChange}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FilterInput
                      type="date"
                      name="dateFrom"
                      label="From Date"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                    />
                    <FilterInput
                      type="date"
                      name="dateTo"
                      label="To Date"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick chips + Clear */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 justify-between">
              <QuickChips
                onPick={(v) =>
                  handleFilterChange({ target: { name: 'status', value: v } })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100/60 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl transition-all duration-200"
                >
                  <XIcon className="h-4 w-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========== SUB-COMPONENTS (exported) ========== */
export const FilterInput = ({ name, label, value, onChange, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
    >
      {label ||
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition duration-200"
      {...props}
    />
  </div>
);

export const FilterSelect = ({ name, label, value, options, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
    >
      {label || name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition duration-200"
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

export const QuickChips = ({ onPick }) => {
  const chips = ['In Service', 'Under Maintenance', 'Out of Service'];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Quick Status:
      </span>
      {chips.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          className="px-3 py-1 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export const ActiveFilterPills = ({ filters, setFilters, clearFilters }) => {
  const entries = Object.entries(filters).filter(([_, v]) => v);
  if (entries.length === 0) return null;
  const remove = (key) => setFilters((f) => ({ ...f, [key]: '' }));
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {entries.map(([k, v]) => (
        <span
          key={k}
          className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60"
        >
          <span className="capitalize text-slate-700 dark:text-slate-200">
            {k.replace(/([A-Z])/g, ' $1')}
          </span>
          <span className="text-slate-500 dark:text-slate-400">=</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            {v}
          </span>
          <button
            onClick={() => remove(k)}
            className="rounded-full p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Clear"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <button
        onClick={clearFilters}
        className="ml-2 text-xs text-indigo-600 dark:text-indigo-300 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
};
