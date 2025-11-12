/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // All React components
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#8b0000",
      },
    },
  },
  plugins: [],
};
