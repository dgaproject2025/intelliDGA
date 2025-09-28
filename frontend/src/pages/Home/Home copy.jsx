import HealthCheck from '../components/HealthCheck';
import AuthPing from '../components/AuthPing';

// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

export default function Home() {
  return (
    <div
      className=" w-full
                 flex flex-col bg-blue-50 dark:bg-slate-900 transition-colors mb-0  "
    >
      {/* Hero Section */}
      <section className=" flex-grow relative flex-1 bg-[#1f75fe] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Welcome to <span className="text-amber-300">intelliDGA</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Smart Dissolved Gas Analysis for Power Transformers & Reactors.
              Empowering you with insights, predictions, and monitoring tools to
              ensure grid reliability.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-white text-[#1f75fe] font-semibold hover:bg-blue-50 shadow"
              >
                Get Started
              </Link>
              <Link
                to="/documentation"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right graphic */}
          <div className="flex-1 flex justify-center">
            <img
              src={Logo}
              alt="IntelliDGA Logo"
              className="w-56 sm:w-72 md:w-80 drop-shadow-xl animate-pulse"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-slate-100">
            Why Choose <span className="text-[#1f75fe]">intelliDGA</span>?
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Driven Insights',
                desc: 'Advanced algorithms to detect patterns and predict transformer failures early.',
                icon: '💡',
              },
              {
                title: 'Multi-Method Analysis',
                desc: 'Supports Duval Triangles, Roger Ratios, IEC methods, and more.',
                icon: '📊',
              },
              {
                title: 'Real-Time Monitoring',
                desc: 'Stay ahead with instant dashboards and health indicators.',
                icon: '⏱️',
              },
              {
                title: 'Secure Access',
                desc: 'Role-based authentication, password policies, and audit trails built-in.',
                icon: '🔐',
              },
              {
                title: 'Responsive Design',
                desc: 'Optimized for desktop, tablet, and mobile experiences.',
                icon: '📱',
              },
              {
                title: 'Reporting & Export',
                desc: 'Generate professional reports and export insights in multiple formats.',
                icon: '📝',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-[#1f75fe] hover:shadow-md transition"
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-2xl bg-blue-100 text-[#1f75fe] dark:bg-blue-900/40 dark:text-blue-200 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-100 dark:bg-gradient-to-r dark:from-[#1f75fe] dark:to-blue-600 text-gray-900 dark:text-white transition-colors">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold">
            Ready to power up your Transformer Analysis?
          </h2>
          <p className="mt-4 text-gray-700 dark:text-blue-100">
            Join hundreds of engineers and analysts who trust{' '}
            <span className="text-[#1f75fe] dark:text-amber-300">
              intelliDGA
            </span>
            .
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-[#1f75fe] text-white font-semibold hover:bg-blue-700 shadow"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-white text-[#1f75fe] font-semibold hover:bg-blue-50 shadow"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
