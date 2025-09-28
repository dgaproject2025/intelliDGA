// frontend/src/components/Footer.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import Logo from '../Footer/logo.svg';
import Logo from '../Footer/logo.svg?react';
export default function Footer({ fixed = false, autoPad = false }) {
  // auto add body padding when fixed
  useEffect(() => {
    if (fixed && autoPad) {
      document.body.style.paddingBottom = '140px'; // ~footer height
      return () => {
        document.body.style.paddingBottom = '';
      };
    }
  }, [fixed, autoPad]);

  return (
    <footer
      className={[
        fixed ? 'fixed bottom-0 left-0 w-full z-40' : 'w-full',
        'bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300',
        'border-t border-slate-800/60 ',
      ].join(' ')}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Top row: brand + nav */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="IntelliDGA logo"
                className="h-10 w-auto  fill-slate-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.25)]"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Predict • Protect • Perform — Intelligent DGA insights for
              reliable grid assets.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/analysis" className="hover:text-white">
                  Analysis
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white">
                  History
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="hover:text-white">
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/data-input" className="hover:text-white">
                  Data Input Portal
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-white">
                  Equipment
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@intellidga.example"
                  className="hover:text-white"
                >
                  Support
                </a>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Stay updated</h4>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! We’ll be in touch.');
              }}
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-lg bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <button
                className="rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-2"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500">
              By subscribing, you agree to our{' '}
              <a href="#" className="underline hover:text-slate-300">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-800/60" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} IntelliDGA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
