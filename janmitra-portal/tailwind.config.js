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
            DEFAULT: "#1d4ed8",
            dark: "#1e40af",
          },
          green: {
            light: "#22c55e",
            DEFAULT: "#10b981",
            dark: "#059669",
          },
          orange: {
            light: "#fb923c",
            DEFAULT: "#f97316",
            dark: "#ea580c",
          }
        }
      }
    },
  },
  plugins: [],
}