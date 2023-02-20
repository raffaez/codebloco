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
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(0, -1px, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(0, 2px, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(0, -4px, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(0, 4px, 0)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
