/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "lightgrey": "#AAAAAA",
      "true-white":"#FFFFFF",
      "white": "#F0F0F0",
      "black": "#1E1E1B",
      "primary-dark":"#000814",
      "primary-medium":"#001D3D",
      "primary-light":"#003566",
      "primary-very-light":"#0070dc",
      "primary-transparent":"rgba(0,53,102,0.5)",
      "secondary-medium":"#FFC40D",
      "secondary-light":"#FFD60A",
      "secondary-transparent":"rgba(255,214,10,0.5)",
      "red-transparent":"rgba(255,8,0,0.5)",
      "orange-transparent":"rgba(255,93,0,0.5)",
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'playfair' : ['Playfair Display'],
    },
    extend: {
      keyframes: {
        checkboxChecked: {
          '0%': { transform: 'scale(0.8)', opacity: 0.5 },
          '50%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        checkboxUnchecked: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.5 },
          '100%': { transform: 'scale(0.8)', opacity: 0 },
        },
      },
      animation: {
        checkboxChecked: 'checkboxChecked 0.3s ease-in-out',
        checkboxUnchecked: 'checkboxUnchecked 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}