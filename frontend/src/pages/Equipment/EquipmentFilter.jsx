import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Filter as FilterIcon,
  X as XIcon,
  ChevronRight,
  Calendar,
  ChevronDown,
} from 'lucide-react';

/* ========== PUBLIC API ========== */
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
    <div className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg--900/50 text-xs">
      <span className="text-gray-500 dark:text-gray-200">{label}</span>{' '}
      <span className="font-semibold text-gray-800 dark:text-gray-100">
        {value || '—'}
      </span>
    </div>
  );

  // Open native date picker if available
  const openPicker = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof el.showPicker === 'function') el.showPicker();
    else el.focus();
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-black p-4 rounded-md border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/70 dark:shadow-blue-900/30 transition-all duration-300">
      {/* Hide native date icon (avoid double calendar) & normalize select */}
      <style>{`
        .date-input::-webkit-calendar-picker-indicator { opacity: 0; display: none; }
        .date-input::-webkit-clear-button, .date-input::-webkit-inner-spin-button { display: none; }
        .select-appearance { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
      `}</style>

      {/* Header */}
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
            {/* Quick/basic row: 4 per line */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <FilterInput
                name="generalSearch"
                placeholder="Search designation, SAP ID, type, station..."
                value={filters.generalSearch}
                onChange={handleFilterChange}
              />

              {/* Type-to-search inputs (datalist): NO chevron, WITH light-mode border */}
              <ComboInput
                name="station"
                value={filters.station || ''}
                options={uniqueValues.stations || []}
                onChange={handleFilterChange}
              />
              <ComboInput
                name="type"
                label="Equipment Type"
                value={filters.type || ''}
                options={uniqueValues.types || []}
                onChange={handleFilterChange}
              />
              <ComboInput
                name="status"
                value={filters.status || ''}
                options={uniqueValues.statuses || []}
                onChange={handleFilterChange}
              />
            </div>

            {/* Advanced toggle */}
            <div className="mt-3">
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline"
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
                  className="mt-3"
                >
                  {/* Advanced (non-date) fields: 3 per row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FilterInput
                      name="equipment"
                      label="Equipment"
                      placeholder="Equipment name"
                      value={filters.equipment || ''}
                      onChange={handleFilterChange}
                    />
                    <FilterInput
                      name="designation"
                      label="Designation"
                      placeholder="Enter designation"
                      value={filters.designation || ''}
                      onChange={handleFilterChange}
                    />

                    {/* Age (operator + number) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5">
                        Age (years)
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative w-28 group">
                          <select
                            name="ageOp"
                            value={filters.ageOp || '>='}
                            onChange={handleFilterChange}
                            className="select-appearance w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            title="Age operator"
                          >
                            {['>=', '<=', '=', '>', '<'].map((op) => (
                              <option key={op} value={op}>
                                {op}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 bg-white/80 dark:bg-slate-800/60  ring-slate-200 dark:ring-slate-700 group-focus-within:ring-indigo-500 transition">
                            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                          </span>
                        </div>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="ageValue"
                          value={filters.ageValue ?? ''}
                          onChange={handleFilterChange}
                          placeholder="Years"
                          className="flex-1 bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <ComboInput
                      name="unit"
                      value={filters.unit || ''}
                      options={uniqueValues.units || []}
                      onChange={handleFilterChange}
                    />
                    <ComboInput
                      name="manufacturer"
                      value={filters.manufacturer || ''}
                      options={uniqueValues.manufacturers || []}
                      onChange={handleFilterChange}
                    />
                    <ComboInput
                      name="createdBy"
                      label="Created By"
                      value={filters.createdBy || ''}
                      options={(uniqueValues.creators || []).filter(
                        (v) => v !== 'System'
                      )}
                      onChange={handleFilterChange}
                    />

                    {/* === DATE RANGE group === */}
                    <div className="md:col-span-3 rounded-md border border-slate-200 dark:border-slate-400 bg-white/70 dark:bg-slate-900/50 p-4">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">
                        Filter with Date range
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* By */}
                        <div>
                          <label
                            htmlFor="dateField"
                            className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
                          >
                            By
                          </label>
                          <div className="relative group">
                            <select
                              id="dateField"
                              name="dateField"
                              value={filters.dateField || 'createdAt'}
                              onChange={handleFilterChange}
                              className="select-appearance w-full bg-white/80 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              title="Filter by date field"
                            >
                              <option value="createdAt">Created On</option>
                              <option value="commissionedAt">
                                Commissioned On
                              </option>
                              <option value="lastEditDate">
                                Last Edited On
                              </option>
                            </select>
                            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 bg-white/85 dark:bg-slate-800/60 ring-0 ring-slate-200 dark:ring-slate-700 group-focus-within:ring-indigo-500 transition">
                              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                            </span>
                          </div>
                        </div>

                        {/* From */}
                        <div>
                          <label
                            htmlFor="dateFrom"
                            className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
                          >
                            From
                          </label>
                          <div className="relative">
                            <input
                              id="dateFrom"
                              type="date"
                              name="dateFrom"
                              value={filters.dateFrom || ''}
                              onChange={handleFilterChange}
                              className="date-input w-full bg-white/80 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-gray-500 rounded-md pr-10 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => openPicker('dateFrom')}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1.5 bg-white/85 dark:bg-slate-800/60 ring-0 ring-slate-200 dark:ring-slate-700 hover:ring-indigo-400 focus:outline-none"
                              title="Open calendar"
                            >
                              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                            </button>
                          </div>
                        </div>

                        {/* To */}
                        <div>
                          <label
                            htmlFor="dateTo"
                            className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
                          >
                            To
                          </label>
                          <div className="relative">
                            <input
                              id="dateTo"
                              type="date"
                              name="dateTo"
                              value={filters.dateTo || ''}
                              onChange={handleFilterChange}
                              className="date-input w-full bg-white/80 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-gray-500 rounded-md pr-10 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => openPicker('dateTo')}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1.5 bg-white/85 dark:bg-slate-800/60 ring-0 ring-slate-200 dark:ring-slate-700 hover:ring-indigo-400 focus:outline-none"
                              title="Open calendar"
                            >
                              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick chips + Clear */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 justify-between">
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
                  <XIcon className="w-4 h-4" />
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
      className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
    >
      {label ||
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  </div>
);

/** Combo input with <datalist>: type OR choose; no chevron; WITH light-mode border */
export const ComboInput = ({
  name,
  label,
  value,
  options = [],
  onChange,
  placeholder,
}) => {
  const listId = `${name}-list`;
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
      >
        {label || name.charAt(0).toUpperCase() + name.slice(1)}
      </label>

      <input
        id={name}
        name={name}
        list={listId}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Type or choose…`}
        className="w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <datalist id={listId}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );
};

export const FilterSelect = ({ name, label, value, options, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-500 dark:text-gray-200 mb-1.5"
    >
      {label || name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <div className="relative group">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="select-appearance w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-gray-500 rounded-md px-3 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Chevron only for real <select> fields */}
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 bg-white/85 dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-700 group-focus-within:ring-indigo-500 transition">
        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-200" />
      </span>
    </div>
  </div>
);

export const QuickChips = ({ onPick }) => {
  const chips = ['In Service', 'Under Maintenance', 'Out of Service'];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-200">
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
  const prettyKey = (k) => {
    if (k === 'ageValue') return 'Age';
    if (k === 'ageOp') return null;
    if (k === 'dateField') return 'Date Field';
    return k.replace(/([A-Z])/g, ' $1');
  };
  const prettyVal = (k, v) => {
    if (k === 'dateField') {
      return v === 'createdAt'
        ? 'Created On'
        : v === 'commissionedAt'
        ? 'Commissioned On'
        : 'Last Edited On';
    }
    return v;
  };

  const entries = Object.entries(filters).filter(
    ([_, v]) => v !== '' && v != null
  );
  const pills = [];
  const hasAge = filters.ageValue !== '' && filters.ageValue != null;
  if (hasAge) {
    pills.push({
      k: 'Age',
      v: `${filters.ageOp || '>='} ${filters.ageValue}`,
      clear: () => setFilters((f) => ({ ...f, ageOp: '>=', ageValue: '' })),
    });
  }
  for (const [k, v] of entries) {
    if (k === 'ageValue' || k === 'ageOp') continue;
    pills.push({
      k: prettyKey(k),
      v: prettyVal(k, v),
      clear: () => setFilters((f) => ({ ...f, [k]: '' })),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {pills.map((p, idx) =>
        p.k ? (
          <span
            key={`${p.k}-${idx}`}
            className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60"
          >
            <span className="capitalize text-gray-700 dark:text-gray-200">
              {p.k}
            </span>
            <span className="text-gray-500 dark:text-gray-200">=</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {p.v}
            </span>
            <button
              onClick={() => p.clear()}
              className="rounded-full p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Clear"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </span>
        ) : null
      )}
      <button
        onClick={clearFilters}
        className="ml-2 text-xs text-indigo-600 dark:text-indigo-300 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
};
