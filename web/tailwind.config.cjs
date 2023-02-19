/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "top-ilustra": "url('/src/assets/ilustra-01.png')",
        "bottom-ilustra": "url('/src/assets/ilustra-02.png')",
      },
      colors: {
        red: {
          500: "#E45858",
        },
        purple: {
          500: "#6246EA",
        },
        black: {
          500: "#121214",
        },
        gray: {
          500: "#7C7C8A",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
