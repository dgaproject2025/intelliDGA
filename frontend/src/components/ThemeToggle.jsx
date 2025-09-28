import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                 border border-slate-700 bg-slate-900 text-slate-200
                 hover:border-slate-500 hover:bg-slate-800 transition"
    >
      {/* icon swaps based on theme */}
      {isDark ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.64 13.64A9 9 0 1 1 10.36 2.36a7 7 0 1 0 11.28 11.28z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.22 19.78l1.41 1.41 1.8-1.79-1.41-1.41-1.8 1.79zM20 11h3v2h-3v-2zm-1.76-7.95l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 1h2v3h-2V1zm7.78 18.56l-1.41-1.41-1.8 1.79 1.41 1.41 1.8-1.79zM12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      )}
      <span className="text-xs hidden sm:inline">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
