import React, { useMemo, useState, useEffect } from 'react';
import {
  Filter as FilterIcon,
  X as XIcon,
  Grid3X3 as GridIcon,
  Table as TableIcon,
  Save as SaveIcon,
  Download as DownloadIcon,
  RefreshCcw as ResetIcon,
  ChevronDown,
  SortAsc,
  SortDesc,
  SlidersHorizontal,
} from 'lucide-react';
import EquipmetFilter, { ActiveFilterPills } from './EquipmentFilter';
import EquipmentTable from './EquipmentTable';
import EquipmentGrid from './EquipmentCard';

/* =========================
   DUMMY DATA (swap with API)
   ========================= */
const DUMMY_EQUIPMENT = [
  {
    id: 'EQ-1001',
    designation: '220kV Power Transformer-1',
    sapId: 'PT220-01',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'Siemens',
    createdBy: 'A. Verma',
    createdAt: '2025-06-12',
  },
  {
    id: 'EQ-1002',
    designation: '220kV Power Transformer-2',
    sapId: 'PT220-02',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-20',
    status: 'Under Maintenance',
    manufacturer: 'ABB',
    createdBy: 'R. Sharma',
    createdAt: '2025-07-03',
  },
  {
    id: 'EQ-1003',
    designation: '66kV Bus Coupler',
    sapId: 'BC66-01',
    station: 'GIS Hall',
    type: 'Switchgear',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'Toshiba',
    createdBy: 'P. Singh',
    createdAt: '2025-05-28',
  },
  {
    id: 'EQ-1004',
    designation: '11kV Feeder-17',
    sapId: 'FD11-17',
    station: 'Aux Substation',
    type: 'Feeder',
    unit: 'Unit-40',
    status: 'Out of Service',
    manufacturer: 'Schneider',
    createdBy: 'A. Verma',
    createdAt: '2025-04-20',
  },
  {
    id: 'EQ-1005',
    designation: '220kV CT Bank',
    sapId: 'CT220-01',
    station: 'Main Yard',
    type: 'CT',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'GE',
    createdBy: 'System',
    createdAt: '2025-02-15',
  },
  {
    id: 'EQ-1006',
    designation: 'UPS–A Room',
    sapId: 'UPS-A-01',
    station: 'Control Building',
    type: 'UPS',
    unit: 'Unit-20',
    status: 'In Service',
    manufacturer: 'Eaton',
    createdBy: 'M. Khan',
    createdAt: '2025-03-02',
  },
  {
    id: 'EQ-1007',
    designation: 'Service Transformer-1',
    sapId: 'ST-01',
    station: 'Aux Substation',
    type: 'Transformer',
    unit: 'Unit-50',
    status: 'Under Maintenance',
    manufacturer: 'BHEL',
    createdBy: 'System',
    createdAt: '2025-08-09',
  },
  {
    id: 'EQ-1008',
    designation: 'Critical Motor—Circulation Pump',
    sapId: 'CM-CP-01',
    station: 'TG Floor',
    type: 'Motor',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'WEG',
    createdBy: 'R. Sharma',
    createdAt: '2025-01-23',
  },
  {
    id: 'EQ-1001',
    designation: '220kV Power Transformer-1',
    sapId: 'PT220-01',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'Siemens',
    createdBy: 'A. Verma',
    createdAt: '2025-06-12',
  },
  {
    id: 'EQ-1002',
    designation: '220kV Power Transformer-2',
    sapId: 'PT220-02',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-20',
    status: 'Under Maintenance',
    manufacturer: 'ABB',
    createdBy: 'R. Sharma',
    createdAt: '2025-07-03',
  },
  {
    id: 'EQ-1003',
    designation: '66kV Bus Coupler',
    sapId: 'BC66-01',
    station: 'GIS Hall',
    type: 'Switchgear',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'Toshiba',
    createdBy: 'P. Singh',
    createdAt: '2025-05-28',
  },
  {
    id: 'EQ-1004',
    designation: '11kV Feeder-17',
    sapId: 'FD11-17',
    station: 'Aux Substation',
    type: 'Feeder',
    unit: 'Unit-40',
    status: 'Out of Service',
    manufacturer: 'Schneider',
    createdBy: 'A. Verma',
    createdAt: '2025-04-20',
  },
  {
    id: 'EQ-1005',
    designation: '220kV CT Bank',
    sapId: 'CT220-01',
    station: 'Main Yard',
    type: 'CT',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'GE',
    createdBy: 'System',
    createdAt: '2025-02-15',
  },
  {
    id: 'EQ-1006',
    designation: 'UPS–A Room',
    sapId: 'UPS-A-01',
    station: 'Control Building',
    type: 'UPS',
    unit: 'Unit-20',
    status: 'In Service',
    manufacturer: 'Eaton',
    createdBy: 'M. Khan',
    createdAt: '2025-03-02',
  },
  {
    id: 'EQ-1007',
    designation: 'Service Transformer-1',
    sapId: 'ST-01',
    station: 'Aux Substation',
    type: 'Transformer',
    unit: 'Unit-50',
    status: 'Under Maintenance',
    manufacturer: 'BHEL',
    createdBy: 'System',
    createdAt: '2025-08-09',
  },
  {
    id: 'EQ-1008',
    designation: 'Critical Motor—Circulation Pump',
    sapId: 'CM-CP-01',
    station: 'TG Floor',
    type: 'Motor',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'WEG',
    createdBy: 'R. Sharma',
    createdAt: '2025-01-23',
  },
  {
    id: 'EQ-1001',
    designation: '220kV Power Transformer-1',
    sapId: 'PT220-01',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'Siemens',
    createdBy: 'A. Verma',
    createdAt: '2025-06-12',
  },
  {
    id: 'EQ-1002',
    designation: '220kV Power Transformer-2',
    sapId: 'PT220-02',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-20',
    status: 'Under Maintenance',
    manufacturer: 'ABB',
    createdBy: 'R. Sharma',
    createdAt: '2025-07-03',
  },
  {
    id: 'EQ-1003',
    designation: '66kV Bus Coupler',
    sapId: 'BC66-01',
    station: 'GIS Hall',
    type: 'Switchgear',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'Toshiba',
    createdBy: 'P. Singh',
    createdAt: '2025-05-28',
  },
  {
    id: 'EQ-1004',
    designation: '11kV Feeder-17',
    sapId: 'FD11-17',
    station: 'Aux Substation',
    type: 'Feeder',
    unit: 'Unit-40',
    status: 'Out of Service',
    manufacturer: 'Schneider',
    createdBy: 'A. Verma',
    createdAt: '2025-04-20',
  },
  {
    id: 'EQ-1005',
    designation: '220kV CT Bank',
    sapId: 'CT220-01',
    station: 'Main Yard',
    type: 'CT',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'GE',
    createdBy: 'System',
    createdAt: '2025-02-15',
  },
  {
    id: 'EQ-1006',
    designation: 'UPS–A Room',
    sapId: 'UPS-A-01',
    station: 'Control Building',
    type: 'UPS',
    unit: 'Unit-20',
    status: 'In Service',
    manufacturer: 'Eaton',
    createdBy: 'M. Khan',
    createdAt: '2025-03-02',
  },
  {
    id: 'EQ-1007',
    designation: 'Service Transformer-1',
    sapId: 'ST-01',
    station: 'Aux Substation',
    type: 'Transformer',
    unit: 'Unit-50',
    status: 'Under Maintenance',
    manufacturer: 'BHEL',
    createdBy: 'System',
    createdAt: '2025-08-09',
  },
  {
    id: 'EQ-1008',
    designation: 'Critical Motor—Circulation Pump',
    sapId: 'CM-CP-01',
    station: 'TG Floor',
    type: 'Motor',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'WEG',
    createdBy: 'R. Sharma',
    createdAt: '2025-01-23',
  },
  {
    id: 'EQ-1001',
    designation: '220kV Power Transformer-1',
    sapId: 'PT220-01',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'Siemens',
    createdBy: 'A. Verma',
    createdAt: '2025-06-12',
  },
  {
    id: 'EQ-1002',
    designation: '220kV Power Transformer-2',
    sapId: 'PT220-02',
    station: 'Main Yard',
    type: 'Transformer',
    unit: 'Unit-20',
    status: 'Under Maintenance',
    manufacturer: 'ABB',
    createdBy: 'R. Sharma',
    createdAt: '2025-07-03',
  },
  {
    id: 'EQ-1003',
    designation: '66kV Bus Coupler',
    sapId: 'BC66-01',
    station: 'GIS Hall',
    type: 'Switchgear',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'Toshiba',
    createdBy: 'P. Singh',
    createdAt: '2025-05-28',
  },
  {
    id: 'EQ-1004',
    designation: '11kV Feeder-17',
    sapId: 'FD11-17',
    station: 'Aux Substation',
    type: 'Feeder',
    unit: 'Unit-40',
    status: 'Out of Service',
    manufacturer: 'Schneider',
    createdBy: 'A. Verma',
    createdAt: '2025-04-20',
  },
  {
    id: 'EQ-1005',
    designation: '220kV CT Bank',
    sapId: 'CT220-01',
    station: 'Main Yard',
    type: 'CT',
    unit: 'Unit-10',
    status: 'In Service',
    manufacturer: 'GE',
    createdBy: 'System',
    createdAt: '2025-02-15',
  },
  {
    id: 'EQ-1006',
    designation: 'UPS–A Room',
    sapId: 'UPS-A-01',
    station: 'Control Building',
    type: 'UPS',
    unit: 'Unit-20',
    status: 'In Service',
    manufacturer: 'Eaton',
    createdBy: 'M. Khan',
    createdAt: '2025-03-02',
  },
  {
    id: 'EQ-1007',
    designation: 'Service Transformer-1',
    sapId: 'ST-01',
    station: 'Aux Substation',
    type: 'Transformer',
    unit: 'Unit-50',
    status: 'Under Maintenance',
    manufacturer: 'BHEL',
    createdBy: 'System',
    createdAt: '2025-08-09',
  },
  {
    id: 'EQ-1008',
    designation: 'Critical Motor—Circulation Pump',
    sapId: 'CM-CP-01',
    station: 'TG Floor',
    type: 'Motor',
    unit: 'Unit-30',
    status: 'In Service',
    manufacturer: 'WEG',
    createdBy: 'R. Sharma',
    createdAt: '2025-01-23',
  },
];

/* Helpers */
const buildUniqueValues = (rows) => {
  const pick = (key) =>
    Array.from(new Set(rows.map((r) => r[key]).filter(Boolean))).sort();
  return {
    stations: pick('station'),
    types: pick('type'),
    units: pick('unit'),
    statuses: pick('status'),
    manufacturers: pick('manufacturer'),
    creators: pick('createdBy'),
  };
};
const icIncludes = (a = '', b = '') =>
  String(a ?? '')
    .toLowerCase()
    .includes(String(b ?? '').toLowerCase());
const toCSV = (rows) => {
  if (!rows?.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v) =>
    `"${String(v ?? '')
      .replaceAll('"', '""')
      .replaceAll('\n', ' ')
      .trim()}"`;
  const body = rows
    .map((r) => headers.map((h) => escape(r[h])).join(','))
    .join('\n');
  return `${headers.join(',')}\n${body}`;
};
const saveTextFile = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/* =========================
   MAIN
   ========================= */
export default function EquipmentList() {
  const [raw] = useState(DUMMY_EQUIPMENT);
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'
  const [showFilters, setShowFilters] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [filters, setFilters] = useState({
    generalSearch: '',
    station: '',
    type: '',
    unit: '',
    status: '',
    manufacturer: '',
    createdBy: '',
    dateFrom: '',
    dateTo: '',
  });

  // saved views
  const [savedViews, setSavedViews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('equipSavedViews') || '[]');
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('equipSavedViews', JSON.stringify(savedViews));
  }, [savedViews]);

  const uniqueValues = useMemo(() => buildUniqueValues(raw), [raw]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setPage(1);
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      generalSearch: '',
      station: '',
      type: '',
      unit: '',
      status: '',
      manufacturer: '',
      createdBy: '',
      dateFrom: '',
      dateTo: '',
    });
    setPage(1);
  };

  const activeFilterCount = useMemo(
    () =>
      Object.entries(filters).filter(([k, v]) => v && k !== 'generalSearch')
        .length + (filters.generalSearch ? 1 : 0),
    [filters]
  );

  // Filtering
  const filtered = useMemo(() => {
    const {
      generalSearch,
      station,
      type,
      unit,
      status,
      manufacturer,
      createdBy,
      dateFrom,
      dateTo,
    } = filters;

    return raw.filter((r) => {
      const passSearch =
        !generalSearch ||
        icIncludes(r.designation, generalSearch) ||
        icIncludes(r.sapId, generalSearch) ||
        icIncludes(r.type, generalSearch) ||
        icIncludes(r.station, generalSearch) ||
        icIncludes(r.unit, generalSearch) ||
        icIncludes(r.manufacturer, generalSearch);

      const passStation = !station || r.station === station;
      const passType = !type || r.type === type;
      const passUnit = !unit || r.unit === unit;
      const passStatus = !status || r.status === status;
      const passMfg = !manufacturer || r.manufacturer === manufacturer;
      const passCreator = !createdBy || r.createdBy === createdBy;

      const d = r.createdAt ? new Date(r.createdAt) : null;
      const afterFrom = !dateFrom || (d && d >= new Date(dateFrom));
      const beforeTo = !dateTo || (d && d <= new Date(dateTo));

      return (
        passSearch &&
        passStation &&
        passType &&
        passUnit &&
        passStatus &&
        passMfg &&
        passCreator &&
        afterFrom &&
        beforeTo
      );
    });
  }, [raw, filters]);

  // Sorting
  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (sortKey === 'createdAt') {
        const da = new Date(va).getTime();
        const db = new Date(vb).getTime();
        return sortDir === 'asc' ? da - db : db - da;
      }
      const sa = String(va ?? '').toLowerCase();
      const sb = String(vb ?? '').toLowerCase();
      if (sa < sb) return sortDir === 'asc' ? -1 : 1;
      if (sa > sb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Saved views
  const saveCurrentView = () => {
    const name = prompt('Name this view:');
    if (!name) return;
    setSavedViews((v) => [
      ...v,
      { name, filters, sortKey, sortDir, viewMode, pageSize },
    ]);
  };
  const applySavedView = (v) => {
    setFilters(v.filters);
    setSortKey(v.sortKey);
    setSortDir(v.sortDir);
    setViewMode(v.viewMode);
    setPageSize(v.pageSize);
    setPage(1);
  };
  const removeSavedView = (name) =>
    setSavedViews((v) => v.filter((x) => x.name !== name));

  return (
    <div className="relative overflow-hidden text-gray-500 dark:text-gray-200 ">
      {/* Ambient aurora */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-md blur-3xl bg-blue-400/10" />
        <div className="absolute -bottom-20 -left-32 w-96 h-96 rounded-md blur-3xl bg-indigo-400/10" />
      </div>

      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800 dark:from-blue-300 dark:via-indigo-300 dark:to-slate-200 bg-clip-text text-transparent">
          Equipment Directory
        </h2>

        <div className="flex items-center gap-2 rounded-md">
          <ViewSwitcher
            className="rounded-md"
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <button
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 backdrop-blur hover:bg-white dark:hover:bg-slate-800 transition"
            title={showFilters ? 'Hide filters' : 'Show filters'}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-5 px-1 text-xs font-bold rounded bg-indigo-600 text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={saveCurrentView}
            className="text-gray-500 dark:text-gray-200 inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition"
            title="Save current filters/sort as a view"
          >
            <SaveIcon className="w-4 h-4" />
            Save View
          </button>

          {savedViews.length > 0 && (
            <div className="relative">
              <details className="group">
                <summary className="list-none inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer">
                  My Views <ChevronDown className="w-4 h-4" />
                </summary>
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 shadow-xl p-2 space-y-1 z-10">
                  {savedViews.map((v) => (
                    <div
                      key={v.name}
                      className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <button
                        onClick={() => applySavedView(v)}
                        className="text-sm font-medium truncate text-slate-700 dark:text-slate-200"
                        title="Apply view"
                      >
                        {v.name}
                      </button>
                      <button
                        onClick={() => removeSavedView(v.name)}
                        className="text-xs text-red-600 hover:underline"
                        title="Delete view"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}

          <button
            onClick={() => {
              const csv = toCSV(sorted);
              saveTextFile(
                csv,
                `equipment_${new Date().toISOString().slice(0, 10)}.csv`
              );
            }}
            className="text-gray-500 dark:text-gray-200  inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition"
          >
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 p-4">
        {/* Active pills */}
        <ActiveFilterPills
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />
        {/* Filters */}
        <EquipmetFilter
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          uniqueValues={uniqueValues}
        />
      </div>

      <ResultsToolbar
        total={sorted.length}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        sortKey={sortKey}
        sortDir={sortDir}
        setSortKey={setSortKey}
        toggleSort={toggleSort}
        onReset={() => {
          clearFilters();
          setSortKey('createdAt');
          setSortDir('desc');
          setPage(1);
        }}
      />

      {/* Content */}
      {sorted.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : viewMode === 'card' ? (
        <EquipmentGrid items={current} />
      ) : (
        <EquipmentTable
          rows={current}
          sortKey={sortKey}
          sortDir={sortDir}
          toggleSort={toggleSort}
        />
      )}

      {/* Pagination */}
      {sorted.length > 0 && (
        <Pagination
          page={page}
          pageCount={Math.max(1, Math.ceil(sorted.length / pageSize))}
          setPage={setPage}
        />
      )}
    </div>
  );
}

/* ========== UI bits kept local to List ========== */
const ResultsToolbar = ({
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
  sortKey,
  sortDir,
  setSortKey,
  toggleSort,
  onReset,
}) => {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-3">
      <div className="text-sm text-slate-600 dark:text-slate-300">
        Showing{' '}
        <span className="font-semibold">
          {total === 0 ? 0 : (page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, total)}
        </span>{' '}
        of <span className="font-semibold">{total}</span> items
      </div>
      <div className="flex items-center gap-2">
        <SortControl
          sortKey={sortKey}
          sortDir={sortDir}
          setSortKey={setSortKey}
          toggleSort={toggleSort}
        />
        <select
          className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[8, 12, 20, 40].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:text-blue-500 font-semibold rounded-md border border-slate-200 dark:border-gray-500 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-gray-200 transition"
        >
          <ResetIcon className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

const SortControl = ({ sortKey, sortDir, setSortKey, toggleSort }) => {
  const opts = [
    ['createdAt', 'Created'],
    ['designation', 'Designation'],
    ['station', 'Station'],
    ['type', 'Type'],
    ['unit', 'Unit'],
    ['status', 'Status'],
    ['manufacturer', 'Manufacturer'],
  ];
  return (
    <div className="inline-flex items-center gap-2">
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
      >
        {opts.map(([k, l]) => (
          <option key={k} value={k}>
            Sort: {l}
          </option>
        ))}
      </select>
      <button
        onClick={() => toggleSort(sortKey)}
        className="px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800"
        title="Toggle sort direction"
      >
        {sortDir === 'asc' ? (
          <SortAsc className="w-4 h-4" />
        ) : (
          <SortDesc className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

const Pagination = ({ page, pageCount, setPage }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const go = (p) => setPage(Math.max(1, Math.min(pageCount, p)));
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => go(page - 1)}
        className="px-3 py-1 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800"
      >
        Prev
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className={`px-3 py-1 text-sm rounded-lg border ${
              p === page
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-200'
                : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => go(page + 1)}
        className="px-3 py-1 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  );
};

const EmptyState = ({ onClear }) => {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center bg-white/60 dark:bg-slate-900/40">
      <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
        <FilterIcon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
        No items match the current filters.
      </h3>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Try adjusting filters or clearing them.
      </p>
      <button
        onClick={onClear}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800"
      >
        <ResetIcon className="w-4 h-4" />
        Clear Filters
      </button>
    </div>
  );
};

const ViewSwitcher = ({ viewMode, setViewMode }) => {
  const commonClasses = 'p-2 rounded-xl transition-colors duration-200';
  const activeClasses = 'bg-blue-600 text-white shadow-md';
  const inactiveClasses =
    'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600';

  return (
    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
      <button
        onClick={() => setViewMode('card')}
        className={`${commonClasses} ${
          viewMode === 'card' ? activeClasses : inactiveClasses
        }`}
        title="Card view"
      >
        <GridIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setViewMode('table')}
        className={`${commonClasses} ${
          viewMode === 'table' ? activeClasses : inactiveClasses
        }`}
        title="Table view"
      >
        <TableIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
