/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito', 'Fraunces', 'mono'],
        league_spartan: ['League Spartan', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#0369a1',
        secondary: '#e0f2fe',
        eerie_black_1: 'hsl(0, 0%, 9%)',
        eerie_black_2: 'hsl(180, 3%, 7%)',
        kappel: 'hsl(170, 75%, 41%)',
        radical_red: 'hsl(351, 83%, 61%)',
        selective_yellow: 'hsl(42, 94%, 55%)',
        isabelline: 'hsl(36, 33%, 94%)',
        category1_bg: 'hsla(170, 75%, 41%, 0.1)',
        category1_bg2: 'hsla(170, 75%, 41%, 0.2)',
        category2_bg: 'hsla(351, 83%, 61%, 0.1)',
        category2_bg2: 'hsla(351, 83%, 61%, 0.2)',
        category3_bg: 'hsla(229, 75%, 58%, 0.1)',
        category3_bg2: 'hsla(229, 75%, 58%, 0.2)',
        category3_text: 'hsl(229, 75%, 58%)',
        category4_bg: 'hsla(42, 94%, 55%, 0.1)',
        category4_bg2: 'hsla(42, 94%, 55%, 0.2)',
      },
      backgroundImage: {
        linear_gradient: 'linear-gradient(-90deg,hsl(201, 91%, 18%) 0%,hsl(202, 84%, 48%) 100%)',
      },
    },
  },
  plugins: [],
};
