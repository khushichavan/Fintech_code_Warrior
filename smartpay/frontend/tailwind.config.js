/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
      },
      backgroundColor: {
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
      },
      textColor: {
        'dark-primary': '#e2e8f0',
        'dark-secondary': '#9ca3af',
      },
      borderColor: {
        'dark-border': '#374151',
      },
      animation: {
        slideInUp: 'slideInUp 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
