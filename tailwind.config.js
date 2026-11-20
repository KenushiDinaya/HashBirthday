/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        paper: '#FFFDF4',
        butter: '#FFD93D',
        sunflower: '#FFC93C',
        honey: '#F5A623',
        deep: '#E08900',
        cocoa: '#5C3A1E',
        bark: '#3E2A14',
        petal: '#FF8FA3',
        leaf: '#7A9E3B',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
        sinhala: ['"Noto Serif Sinhala"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(255, 201, 60, 0.55)',
        paper: '0 18px 50px rgba(92, 58, 30, 0.35)',
        polaroid: '0 12px 30px rgba(62, 42, 20, 0.35)',
      },
      backgroundImage: {
        'sun-radial': 'radial-gradient(circle at 50% 35%, #FFE98A 0%, #FFD93D 35%, #FFC93C 70%, #F5A623 100%)',
        'night-cocoa': 'radial-gradient(circle at 50% 30%, #4A2C12 0%, #2E1D0C 60%, #1B110A 100%)',
      },
    },
  },
  plugins: [],
}
