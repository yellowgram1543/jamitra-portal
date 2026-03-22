/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            light: "#3b82f6",
            DEFAULT: "#2563EB",
            dark: "#1E40AF",
          },
          green: {
            light: "#34d399",
            DEFAULT: "#10b981",
            dark: "#059669",
          },
          orange: {
            light: "#fb923c",
            DEFAULT: "#f97316",
            dark: "#ea580c",
          },
          surface: "#F9FAFB",
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}