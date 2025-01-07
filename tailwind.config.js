/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
      },
      colors: {
        primary: '#315771',
      },
    },
  },
  plugins: [],
};
