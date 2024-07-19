

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          white: '#FFFFFF',
          gray: {
            100: '#5C7C89',
            200: '#1F4959',
            300: '#011425',
          },
          black: '#242424',
        },
        light: {
          blueberry: '#6B7A8F',
          apricot: '#F7882F',
          citrus: '#F9C331',
          applecore: '#DCC7AA',
        },
      },
    },
  },
  darkMode: 'class', // Enable dark mode
  plugins: [],
}