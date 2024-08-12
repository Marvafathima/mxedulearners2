

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'admin-bg': '#f0f4f8',
        'admin-primary': '#2c7be5',
        'admin-secondary': '#1e3a8a',
        dark: {
          lightblue: '#d2deeb',
          white: '#FFFFFF',
          gray: {
            100: '#5C7C89',
            200: '#1F4959',
            300: '#011425',
          },
          black: '#242424',
         
        },
        light: {
          blueberry:'#192231',
          apricot:'#494E6B' ,
          citrus: '#985E6D',
          applecore: '#ffffff' ,
          peach:'#F9DBBA',
          cyan:'#ADC4CE',
          darkcyan:'#96B6C5'
        },
      },
    },
  },
  darkMode: 'class', // Enable dark mode
  plugins: [],
}