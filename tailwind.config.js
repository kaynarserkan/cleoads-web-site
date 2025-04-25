/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./partials/**/*.{html,js}",
    "./layouts/**/*.{html,js}",
    "./js/**/*.{html,js}"
  ],
  safelist: [
    "w-[12.5%]",
    "h-[12.5%]",
    "left-[0%]", "left-[12.5%]", "left-[25%]", "left-[37.5%]",
    "left-[50%]", "left-[62.5%]", "left-[75%]", "left-[87.5%]",
    "top-[0%]", "top-[12.5%]", "top-[25%]", "top-[37.5%]",
    "top-[50%]", "top-[62.5%]", "top-[75%]", "top-[87.5%]"
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#660c87',
      },
      fontFamily: {
        gotham: ['Gotham', 'sans-serif'],
      },
      spacing: {
        '25': '6.25rem', // ⬅️ 100px / 16 = 6.25rem
      },
    },
  },
  plugins: [],
}
