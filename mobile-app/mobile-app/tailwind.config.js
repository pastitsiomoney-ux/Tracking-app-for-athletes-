// Tailwind config for NativeWind — mirrors the design tokens used
// on the marketing website so the app and site feel like one product.
module.exports = {
  content: ["./App.js", "./screens/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1F",
        paper: "#FAFAFA",
        zinc: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
        },
      },
    },
  },
  plugins: [],
};
