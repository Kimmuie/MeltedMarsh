/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.js",
    "./**/*.css",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'woodD': '#593722',
        'woodO': '#935732',
        'woodA': '#a8663e',
        'woodI': '#cd9a65',
        'whiteC':'#F0E1D1',
        'sap':'#FC9425',
        'skyB':'#a8def0'
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '22': '5.5rem',
        '112': '27rem',
        '116': '28rem',
        '120': '29rem',
        '124': '30rem',
        '128': '31rem',
        '132': '33rem',
        '136': '34rem',
        '144': '36rem',
        '148': '37rem',
        '152': '38rem',
        '160': '40rem',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

