/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}" , "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#38bdf5",
        secondary: "#222",
      },
    },
  },
  plugins: [],
};
