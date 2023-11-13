/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        "black-200": "#of172a",
        "gray-150": "#475569",
        "gray-50": "#e2e8f0",
        "gray-100": "#94a3b8",
        "gray-250": "#e2e8f0",
        "blue-350": "#0ea5e9",
        "gray-850": "#f1f5f9",
      },
      gap: {
        2.5: "10px",
      },
      boxShadow: {
        inputShadow: "0px 0px 0px 2px #bae6fd",
        radioItemShadow:
          "0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
