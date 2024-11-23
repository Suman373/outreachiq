/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',   // Blue
        secondary: '#9333EA', // Purple
        accent: '#FBBF24',    // Amber
        neutral: '#9CA3AF',   // Gray
        success: '#22C55E',   // Green
        warning: '#F59E0B',   // Yellow
        danger: '#EF4444',    // Red
      },
    },
  },
  plugins: [],
}
