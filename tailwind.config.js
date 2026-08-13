/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        babylon: {
          gold: "#D4AF37",
          sand: "#F4E4BA",
          sky: "#1CAAD9",
          dark: "#0F172A",
          card: "#1E293B",
        }
      }
    },
  },
  plugins: [],
}
