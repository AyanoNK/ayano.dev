/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', sans",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        darkpurple: "#25274D",
        lightpurple: "#464866",
        marine: "#29648A",
        lightblue: "#2E9CCA",
        whiter: "#AAABB8",
      },
      keyframes: {
        rainbow: {
          "12.5%": {
            backgroundColor: "#FF0000",
          },
          "25%": {
            backgroundColor: "#FFA500",
          },
          "37.5%": {
            backgroundColor: "#FFFF00",
          },
          "50%": {
            backgroundColor: "#7FFF00",
          },
          "62.5%": {
            backgroundColor: "#00FFFF",
          },
          "75%": {
            backgroundColor: "#0000FF",
          },
          "87.5%": {
            backgroundColor: "#9932CC",
          },
          "100%": {
            backgroundColor: "#FF1493",
          },
        },
      },
      animation: {
        rainbow: "rainbow 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
