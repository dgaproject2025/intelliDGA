import React from 'react';
import { motion } from 'framer-motion';

/* ==== Helpers: compute Y/M/D age ==== */
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

/** Card/grid view for equipment (enhanced, with requested omissions) */
export default function EquipmentGrid({ items }) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {items.map((it) => {
        const showCreatedBy = it.createdBy && it.createdBy !== 'System';

        return (
          <motion.article
            key={it.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="group relative overflow-hidden rounded-md border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-white/85 to-slate-50/70 dark:from-slate-900/75 dark:to-slate-900/35 shadow-[0_6px_30px_-10px_rgba(2,6,23,0.25)]"
          >
            {/* aurora accent (kept from your original) */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(50%_40%_at_90%_20%,rgba(56,189,248,0.10),transparent_60%)] blur-2xl -z-10" />

            <div className="p-4">
              {/* Header: Equipment name + status chip */}
              <header className="flex items-start justify-between gap-2">
                <h4 className="font-extrabold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
                  {it.equipment ?? it.designation ?? '—'}
                </h4>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border whitespace-nowrap ${
                    it.status === 'In Service'
                      ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                      : it.status === 'Under Maintenance'
                      ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {it.status || '—'}
                </span>
              </header>

              {/* Quick identity row with IntelliDGA ID */}
              <div className="mt-1 text-xs">
                <span className="text-gray-500 dark:text-gray-200 mr-1">
                  IntelliDGA ID:
                </span>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-100">
                  {it.intelliId || it.id || '—'}
                </span>
              </div>

              {/* Core details */}
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <KV label="SAP ID" value={it.sapId} />
                <KV label="Station" value={it.station} />
                <KV label="Type" value={it.type} />
                <KV label="Unit" value={it.unit} />
                <KV label="Mfr." value={it.manufacturer} />

                {/* New fields */}
                <KV label="Commissioned" value={it.commissionedAt} />
                <KV label="Age" value={formatAge(it.commissionedAt)} />
                <KV label="Created On" value={it.createdAt} />

                {it.lastEditDate ? (
                  <KV label="Last Edit" value={it.lastEditDate} />
                ) : null}
                {it.lastEditedBy ? (
                  <KV label="Edited By" value={it.lastEditedBy} />
                ) : null}
              </dl>

              {/* OMITTED: Reason for Last Edit (as requested) */}

              {/* Footer: prefer Edited By; else Created By (not System); else hide left text */}
              <footer className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-200">
                <span className="truncate">
                  {it.lastEditedBy ? (
                    <>
                      edited by{' '}
                      <strong className="text-gray-800 dark:text-gray-100">
                        {it.lastEditedBy}
                      </strong>
                    </>
                  ) : showCreatedBy ? (
                    <>
                      by{' '}
                      <strong className="text-gray-800 dark:text-gray-100">
                        {it.createdBy}
                      </strong>
                    </>
                  ) : (
                    <span className="sr-only">meta</span>
                  )}
                </span>
                <button
                  className="opacity-0 group-hover:opacity-100 transition"
                  title="Open details"
                >
                  <span className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                    View
                  </span>
                </button>
              </footer>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

const KV = ({ label, value }) => (
  <div className="flex items-center gap-2 min-w-0">
    <span className="text-gray-500 dark:text-gray-200">{label}</span>
    <span
      className="font-semibold text-gray-800 dark:text-gray-100 truncate"
      title={typeof value === 'string' ? value : undefined}
    >
      {value || '—'}
    </span>
  </div>
);
