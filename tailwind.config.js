/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby': '#FF8FAB',      // Rose
        'enfants': '#4DA9FF',   // Bleu
        'ados': '#6EE7B7',      // Vert
        'adultes': '#FF5757',   // Rouge
        'primary': '#2C3E50',   // Couleur principale du texte
        'secondary': '#3498DB', // Couleur secondaire (accents)
        'background': '#F8FAFC', // Fond principal
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-in-out',
        'bounce-light': 'bounceLight 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      screens: {
        'sm': '640px', // Mobile
        'md': '768px', // Tablette
        'lg': '1024px', // Ordinateur portable
        'xl': '1280px', // Grand écran
        '2xl': '1536px', // Très grand écran
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
