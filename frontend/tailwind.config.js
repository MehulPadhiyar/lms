/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito', 'Fraunces', 'mono'],
      },
      colors: {
        primary: '#0369a1',
        secondary: '#e0f2fe',
      },
    },
  },
  plugins: [],
};
