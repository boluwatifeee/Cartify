export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      primary: "#1a1a1a",
      secondary: "#2a2a2a",
      accent: "#3a3a3a",
      background: "#1a1a1a",
      foreground: "#2a2a2a",
      border: "#3a3a3a",
      input: "#4a4a4a",
    },
  },

  plugins: [],
};
