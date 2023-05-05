/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'new': '#68D391',
        'resolved': '#F6E05E',
        'in progress': '#FC8181',        
      },
    },
  },
  plugins: [],
}
