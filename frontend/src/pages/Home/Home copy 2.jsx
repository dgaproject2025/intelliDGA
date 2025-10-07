//import HealthCheck from '../components/HealthCheck';
//import AuthPing from '../components/AuthPing';

// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Home/logo.svg';

import DocSection from './DocSection/DocSection';
import HeroSection from './HeroSection/HeroSection';

import CallToAction from '../../components/CallToAction/CallToAction';
export default function Home() {
  return (
    <div
      className=" min-h-screen w-full  
                 flex flex-col bg-blue-50 dark:bg-slate-900 transition-colors mb-0  "
    >
      {/* Hero Section */}
      <HeroSection />
      <DocSection />

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

      <CallToAction />
    </div>
  );
}
