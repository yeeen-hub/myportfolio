module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
      },

      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
};