/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f97316", // main brand orange
          black: "#000000",
          white: "#ffffff",
        },
      },
    },
  },
  plugins: [],
}
