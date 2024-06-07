/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode:"selector",
  safelist: [
    'text-lime-600',
    'bg-lime-200',
    'bg-lime-600',
    'dark:hover:bg-lime-600',
    'dark:bg-lime-600',
    'hover:text-lime-600',
    'hover:bg-lime-200',
    'hover:bg-lime-600',
    'border-lime-600',
    'shadow-lime-600',
    'dark:shadow-lime-600',
    'fill-lime-600',
    'from-lime-600',
    'from-lime-200',
    'focus:border-lime-600',
    // Add all possible dynamic classes
  ],
  plugins: [],
}

