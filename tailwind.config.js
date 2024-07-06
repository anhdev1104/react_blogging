/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2EBAC1',
        secondary: '#A4D96C',
        grayf1: '#F1F1F3',
      },
    },
  },
  plugins: [],
};
