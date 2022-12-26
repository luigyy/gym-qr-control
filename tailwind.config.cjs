/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: "768px",
      huge: { raw: "(min-height: 1000px) and (min-width: 1000px)" }, //for tall and wide devices (ipad pro for example)
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
