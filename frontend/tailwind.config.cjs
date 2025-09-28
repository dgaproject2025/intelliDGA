/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // 1. Define the custom animation speed
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', // 4 seconds cycle
      },
      // 2. (Optional but good practice) Ensure the 'pulse' keyframes exist.
      //    Tailwind 3+ usually includes 'pulse', but defining it ensures consistency.
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.4' },
        },
      },
    },
  },
  plugins: [],
};
