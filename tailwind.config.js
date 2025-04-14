/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customPurple: '#660c87',
      },
      fontFamily: {
        gotham: ['Gotham', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
