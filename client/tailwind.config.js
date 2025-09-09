/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px',   // custom breakpoint
        'desktop': '1280px', // custom breakpoint
      },
    },
  },
  plugins: [],
}