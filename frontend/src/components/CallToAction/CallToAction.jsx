// src/components/CallToAction.jsx
import { Link } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';

export default function CallToAction() {
  const { user, loading } = useAuthStatus();

  // Avoid flicker while checking auth
  if (loading) return null;

  // Hide when logged in
  if (user) return null;

  // Show only for guests
  return (
    <section className="py-16 bg-blue-100 dark:bg-gradient-to-r dark:from-[#1f75fe] dark:to-blue-600 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold">
          Ready to power up your Transformer Analysis?
        </h2>
        <p className="mt-4 text-gray-700 dark:text-blue-100">
          Join hundreds of engineers and analysts who trust{' '}
          <span className="text-[#1f75fe] dark:text-amber-300">intelliDGA</span>
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
  );
}
