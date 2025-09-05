/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // ¡Esta línea es la más importante!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
