// frontend/src/pages/Equipment.jsx
import { useEffect, useMemo, useState } from 'react';

/** ---------- tiny helpers ---------- */
const cx = (...cls) => cls.filter(Boolean).join(' ');

const StatusPill = ({ status = 'active' }) => {
  const map = {
    active:
      'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-400/30',
    maintenance:
      'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/30',
    offline:
      'bg-red-500/15 text-red-600 dark:text-red-300 border border-red-400/30',
  };
  return (
    <span
      className={cx(
        'inline-flex px-2 py-0.5 rounded-full text-xs',
        map[status] || map.active
      )}
    >
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 w-full max-w-[10rem] rounded bg-slate-200 dark:bg-slate-700" />
      </td>
    ))}
  </tr>
);

/** ---------- mock data (replace with API later) ---------- */
const MOCK = [
  {
    id: 'TX-001',
    name: 'Main Substation Transformer A',
    type: 'Transformer',
    site: 'Bay-1',
    status: 'active',
    updatedAt: '2025-09-10T10:22:00Z',
  },
  {
    id: 'TX-002',
    name: 'Main Substation Transformer B',
    type: 'Transformer',
    site: 'Bay-2',
    status: 'maintenance',
    updatedAt: '2025-09-16T09:05:00Z',
  },
  {
    id: 'DGA-113',
    name: 'Online DGA Sensor – Feeder-7',
    type: 'DGA Sensor',
    site: 'Feeder-7',
    status: 'active',
    updatedAt: '2025-09-14T15:40:00Z',
  },
  {
    id: 'OLTC-44',
    name: 'OLTC Controller – TX-001',
    type: 'OLTC',
    site: 'Bay-1',
    status: 'offline',
    updatedAt: '2025-09-12T21:20:00Z',
  },
];

/** ---------- main page ---------- */
export default function Equipment() {
  const [loading, setLoading] = useState(true);

  // filters / UI
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('recent');

  // pagination (client)
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  // pretend fetch
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // derive unique types from data
  const types = useMemo(() => {
    const s = new Set(MOCK.map((m) => m.type));
    return ['all', ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    let data = [...MOCK];

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.site.toLowerCase().includes(q)
      );
    }
    if (type !== 'all') data = data.filter((d) => d.type === type);
    if (status !== 'all') data = data.filter((d) => d.status === status);

    // sort
    if (sort === 'recent') {
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sort === 'name') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'id') {
      data.sort((a, b) => a.id.localeCompare(b.id));
    }

    return data;
  }, [query, type, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset page if filters change
  useEffect(() => setPage(1), [query, type, status, sort]);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
        {/* Header / actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Equipment</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Browse and manage IntelliDGA assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, ID, site..."
                className="w-64 md:w-72 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-3 py-2
                           placeholder-slate-400 dark:placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-800 text-sm px-3 py-2"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All types' : t}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-800 text-sm px-3 py-2"
            >
              {['all', 'active', 'maintenance', 'offline'].map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All status' : s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-800 text-sm px-3 py-2"
            >
              <option value="recent">Sort: Most recent</option>
              <option value="name">Sort: Name</option>
              <option value="id">Sort: ID</option>
            </select>

            <button
              className="inline-flex items-center rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => alert('Open: New equipment form (to implement)')}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Table / content */}
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Site</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Updated</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-700/70">
                {loading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : pageData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center">
                      <div className="mx-auto w-full max-w-md">
                        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                          <h3 className="font-semibold">No equipment found</h3>
                          <p className="text-slate-600 dark:text-slate-300 mt-1">
                            Try adjusting search or filters, or add a new asset.
                          </p>
                          <div className="mt-4">
                            <button
                              className="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => alert('Open: New equipment form')}
                            >
                              Add equipment
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageData.map((e) => (
                    <tr
                      key={e.id}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="px-4 py-3 font-medium">{e.id}</td>
                      <td className="px-4 py-3">{e.name}</td>
                      <td className="px-4 py-3">{e.type}</td>
                      <td className="px-4 py-3">{e.site}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={e.status} />
                      </td>
                      <td className="px-4 py-3">
                        {new Date(e.updatedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* footer / pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-800 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
