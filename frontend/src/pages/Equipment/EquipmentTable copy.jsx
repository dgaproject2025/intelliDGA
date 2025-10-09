import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';

/* --- Helpers: compute Y/M/D age from a date string --- */
function diffYMD(fromStr, to = new Date()) {
  if (!fromStr) return null;
  const from = new Date(fromStr);
  if (isNaN(from)) return null;
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) {
    const daysInPrevMonth = new Date(
      to.getFullYear(),
      to.getMonth(),
      0
    ).getDate();
    d += daysInPrevMonth;
    m -= 1;
  }
  if (m < 0) {
    m += 12;
    y -= 1;
  }
  return { y, m, d };
}
function formatAge(fromStr) {
  const a = diffYMD(fromStr);
  if (!a) return '—';
  return `${a.y}y ${a.m}m ${a.d}d`;
}

/** Table with flexible widths, vertical lines, and local horizontal scroll */
export default function EquipmentTable({ rows, sortKey, sortDir, toggleSort }) {
  // NOTE: No hideOn for the 3 requested columns so they ALWAYS render.
  // colClass controls sizing; tdClass can enforce nowrap on the Equipment column.
  const columns = [
    {
      key: 'equipment',
      label: 'Equipment',
      colClass: 'min-w-[260px] w-[18%]',
      tdClass: 'whitespace-nowrap font-semibold',
    },
    {
      key: 'designation',
      label: 'Designation',
      colClass: 'min-w-[240px] w-[18%]',
    },
    { key: 'sapId', label: 'SAP ID', colClass: 'min-w-[160px] w-[10%]' },

    {
      key: 'intelliDgaId',
      label: 'IntelliDGA Equipment Id',
      sortKey: 'id',
      colClass: 'min-w-[220px] w-[16%]',
    },

    { key: 'station', label: 'Station', colClass: 'min-w-[160px] w-[10%]' },
    { key: 'type', label: 'Type', colClass: 'min-w-[160px] w-[10%]' }, // kept visible
    { key: 'unit', label: 'Unit', colClass: 'min-w-[140px] w-[8%]' }, // kept visible

    {
      key: 'commissionedAt',
      label: 'Date of Commissioning',
      colClass: 'min-w-[180px] w-[12%]',
    },
    {
      key: 'equipmentAge',
      label: 'Equipment Age',
      sortKey: 'commissionedAt',
      colClass: 'min-w-[160px] w-[12%]',
    },

    { key: 'status', label: 'Status', colClass: 'min-w-[140px] w-[10%]' },
    {
      key: 'manufacturer',
      label: 'Manufacturer',
      colClass: 'min-w-[180px] w-[12%]',
    },

    {
      key: 'createdAt',
      label: 'Equipment Created On',
      colClass: 'min-w-[180px] w-[12%]',
    },
    {
      key: 'createdBy',
      label: 'Equipment Created by',
      colClass: 'min-w-[180px] w-[12%]',
    }, // visible

    // >>> ALWAYS VISIBLE NOW <<<
    {
      key: 'lastEditDate',
      label: 'Last Edit Date',
      colClass: 'min-w-[180px] w-[12%]',
    },
    {
      key: 'lastEditedBy',
      label: 'Last Edited By',
      colClass: 'min-w-[180px] w-[12%]',
    },
    {
      key: 'editReason',
      label: 'Reason for Last Edit',
      colClass: 'min-w-[320px] w-[20%]',
    },
  ];

  const ariaSortFor = (key) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none';

  // Render with fallbacks; content contained to the column
  const renderCell = (key, r) => {
    switch (key) {
      case 'equipment':
        return r.equipment ?? r.designation ?? '—';
      case 'intelliDgaId':
        return r.intelliId || r.id || '—';
      case 'equipmentAge':
        return formatAge(r.commissionedAt);
      case 'status':
        return (
          <span
            className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${
              r.status === 'In Service'
                ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                : r.status === 'Under Maintenance'
                ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800'
            }`}
          >
            {r.status || '—'}
          </span>
        );
      case 'editReason': {
        const txt = r.editReason || '—';
        // Max content width + wrapping after a reasonable length (~60ch)
        return (
          <div
            className="max-w-[60ch] whitespace-normal break-words leading-relaxed hyphens-auto"
            title={typeof txt === 'string' ? txt : undefined}
          >
            {txt}
          </div>
        );
      }
      default:
        return r[key] || '—';
    }
  };

  // Apply width classes to headers & cells (colgroup alone can't enforce min-w in all browsers)
  const sizeCls = (c) => c.colClass || '';

  return (
    <div
      className="mt-4 rounded-md border border-slate-200 dark:border-slate-800
  bg-white/50 dark:bg-slate-900/40 backdrop-blur text-gray-500 dark:text-gray-200 shadow-lg"
    >
      {/* Local horizontal scroll (table only) */}
      <div className="relative overflow-x-auto overscroll-x-contain rounded-md">
        <table className="w-full table-auto text-sm">
          {/* Flexible sizing per column */}
          <colgroup>
            {columns.map((c) => (
              <col key={c.key} className={c.colClass} />
            ))}
          </colgroup>

          <thead className=" text-white sticky top-0 z-10 bg-blue-500 dark:bg-slate-900/60 backdrop-blur">
            <tr className="border-b border-slate-200/70 dark:border-slate-800">
              {columns.map((c) => {
                const activeKey = c.sortKey || c.key;
                const isActive = sortKey === activeKey;
                return (
                  <th
                    key={c.key}
                    aria-sort={ariaSortFor(activeKey)}
                    className={`px-4 py-3 font-semibold text-left border-r last:border-r-0 border-slate-200 dark:border-slate-800 ${sizeCls(
                      c
                    )}`}
                  >
                    <button
                      onClick={() => toggleSort(activeKey)}
                      className="group inline-flex items-center gap-1"
                      title="Sort"
                    >
                      <span>{c.label}</span>
                      {isActive ? (
                        sortDir === 'asc' ? (
                          <SortAsc className="w-4 h-4" />
                        ) : (
                          <SortDesc className="w-4 h-4" />
                        )
                      ) : (
                        <span className="opacity-0 group-hover:opacity-40 transition">
                          <SortAsc className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
            {rows.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors align-top"
              >
                {columns.map((c, idx) => {
                  const val = renderCell(c.key, r);
                  const wrap = c.tdClass?.includes('whitespace-nowrap')
                    ? 'whitespace-nowrap'
                    : 'whitespace-normal break-words';
                  return (
                    <td
                      key={c.key}
                      className={`px-4 py-3 ${
                        idx === 0 ? 'font-semibold' : ''
                      } border-r last:border-r-0 border-slate-200 dark:border-slate-800 ${wrap} ${sizeCls(
                        c
                      )} ${c.tdClass || ''}`}
                      title={typeof val === 'string' ? val : undefined}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
