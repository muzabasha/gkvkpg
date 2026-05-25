/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette optimized for high-contrast projector viewing
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#adc2ff',
          400: '#7599ff',
          500: '#3b66ff',
          600: '#2546e6',
          700: '#1d33b3',
          800: '#1a2b8c',
          900: '#131e59',
          950: '#0b1033',
        },
        // Deep background colors for dark mode to prevent glare and ensure solid contrast
        brandDark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#030712', // Pure deep black-blue for maximum projector contrast
        },
        // Accent colors for different semantic sections
        concept: '#2563eb', // Blue
        warning: '#dc2626', // Red
        activity: '#d97706', // Amber
        project: '#059669', // Emerald
        math: '#7c3aed', // Violet
        insight: '#0891b2', // Cyan
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'lg-readable': '1.125rem', // 18px minimum readable text
        'xl-readable': '1.25rem',
      }
    },
  },
  plugins: [],
}
