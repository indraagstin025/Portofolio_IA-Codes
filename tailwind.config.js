/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- agar bisa toggle dark mode
  content: [
    "./index.html",
    "./about.html",
    "./skills.html",
    "./experience.html",
    "./**/*.html",   // jaga-jaga kalau ada file lain di folder
    "./**/*.js"      // kalau ada JS yang mengandung class tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
