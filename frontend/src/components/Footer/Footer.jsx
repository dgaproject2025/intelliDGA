// frontend/src/components/Footer.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Footer/logo.svg';

/**
 * Props:
 * - fixed:   stick footer to viewport bottom (e.g. for empty pages)
 * - autoPad: when fixed, add body padding so content isn’t covered
 */
export default function Footer({ fixed = false, autoPad = false }) {
  useEffect(() => {
    if (fixed && autoPad) {
      document.body.style.paddingBottom = '150px'; // ~footer height
      return () => void (document.body.style.paddingBottom = '');
    }
  }, [fixed, autoPad]);

  return (
    <footer
      role="contentinfo"
      className={[
        fixed ? 'fixed bottom-0 left-0 w-full z-40' : 'w-full',
        // --- AESTHETICS UPDATE ---
        'relative isolate overflow-hidden',
        'bg-[#1f75fe] text-white',
        'dark:bg-slate-900 dark:text-slate-300', // Adjusted text base color for better dark contrast
        'border-t border-blue-700/60 dark:border-slate-700/60',
      ].join(' ')}
    >
      {/* Decorative glow / waves (subtle, non-interfering) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30"
      >
        <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full blur-3xl bg-blue-100/40 dark:bg-amber-300/30" />{' '}
        {/* Highlight color change */}
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full blur-3xl bg-white/30 dark:bg-blue-500/20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* TOP: Brand + Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="IntelliDGA logo"
                className="h-12 w-auto 
                           // Strong shadow for the constant glow
                           drop-shadow-[0_0_24px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_24px_rgba(255,193,7,0.8)]
                           
                           // --- APPLY THE SLOWER ANIMATION ---
                           animate-pulse-slow 
                           "
              />
              <span className="text-xl font-extrabold tracking-tight text-white dark:text-amber-300">
                intelliDGA
              </span>
            </div>
            {/* REMOVED: Redundant IntelliDGA text */}
            <p className="text-sm/6 text-blue-100 dark:text-slate-400">
              <span className="font-bold">Predict • Protect • Perform</span>—
              Intelligent DGA insights for reliable grid assets.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition
                           dark:bg-slate-800/70 dark:text-amber-300 dark:hover:bg-slate-700" // Icon color update
                aria-label="Twitter / X"
                title="Twitter / X"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M22 4.01c-.77.35-1.6.6-2.46.7a4.27 4.27 0 0 0 1.87-2.35 8.58 8.58 0 0 1-2.7 1.03A4.26 4.26 0 0 0 11.7 7.3a12.09 12.09 0 0 1-8.78-4.45 4.26 4.26 0 0 0 1.32 5.69 4.22 4.22 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.92.07 4.26 4.26 0 0 0 3.98 2.96A8.55 8.55 0 0 1 2 17.55a12.07 12.07 0 0 0 6.53 1.92c7.84 0 12.13-6.49 12.13-12.12 0-.18-.01-.35-.02-.53A8.65 8.65 0 0 0 22 4.01z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition
                           dark:bg-slate-800/70 dark:text-amber-300 dark:hover:bg-slate-700" // Icon color update
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 11-.01 5.01 2.5 2.5 0 01.01-5zM4 9h2v12H4zM9 9h1.92v1.64h.03c.27-.51.94-1.04 1.93-1.04 2.06 0 2.44 1.36 2.44 3.14V21h-2v-6.39c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37V21H9z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition
                           dark:bg-slate-800/70 dark:text-amber-300 dark:hover:bg-slate-700" // Icon color update
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.1-.76.08-.75.08-.75 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.82 1.32 3.5 1.01.11-.78.42-1.32.76-1.63-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.19-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.22a11.44 11.44 0 016.01 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.24 2.87.12 3.17a4.54 4.54 0 011.24 3.19c0 4.58-2.8 5.59-5.47 5.89.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-3 text-white dark:text-amber-300">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-blue-100 dark:text-slate-300">
              <li>
                <Link
                  to="/analysis"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-3 text-white dark:text-amber-300">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-blue-100 dark:text-slate-300">
              <li>
                <Link
                  to="/data-input"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Data Input Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/equipment"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Equipment
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@intellidga.example"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  Support
                </a>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white dark:hover:text-amber-300 transition hover:underline"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-bold mb-3 text-white dark:text-amber-300">
              Stay updated
            </h4>
            <form
              // --- INPUT FIELD SIZE FIX: Use flex-col on mobile to stack elements ---
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! We’ll be in touch.');
              }}
            >
              <input
                type="email"
                placeholder="you@company.com"
                // --- INPUT FIELD SIZE FIX: Enforce w-full for horizontal stretch ---
                className="w-full rounded-lg bg-white/90 text-slate-900 placeholder:text-slate-500 
                           border border-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/80
                           dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700 dark:placeholder:text-slate-500 dark:focus:ring-amber-300 px-3 py-2"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-white/90 text-[#1f75fe] font-bold px-4 py-2 hover:bg-white shadow 
                           dark:bg-amber-300 dark:text-slate-900 dark:hover:bg-amber-200 transition"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-blue-200/80 dark:text-slate-500">
              By subscribing, you agree to our{' '}
              <a
                href="#"
                className="underline hover:opacity-90 dark:hover:text-amber-300"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/20 dark:bg-slate-700/60" />

        {/* BOTTOM: Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-blue-200/90 dark:text-slate-500">
            © {new Date().getFullYear()} IntelliDGA. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-blue-200/90 dark:text-slate-500">
            <a
              href="#"
              className="hover:underline hover:text-white dark:hover:text-amber-300 transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:underline hover:text-white dark:hover:text-amber-300 transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:underline hover:text-white dark:hover:text-amber-300 transition"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
