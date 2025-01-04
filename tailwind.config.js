/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "white": "#F0F0F0",
      "black": "#1E1E1B",
      "primary-dark":"#000814",
      "primary-medium":"#001D3D",
      "primary-light":"#003566",
      "secondary-medium":"#FFC40D",
      "secondary-light":"#FFD60A",
    },
    extend: {},
  },
  plugins: [],
}