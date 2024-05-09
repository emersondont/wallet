const { text } = require('stream/consumers');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#3C096C',
        secondary: '#7B2CBF',
        background: '#0F0F0F',
        text: '#F5F7F8',
        textSecondary: '#6C757D'
      }
    },
  },
  plugins: [],
}