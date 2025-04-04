/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
import { colors } from "@nextui-org/react";
import animate from "tailwindcss-animate";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-primary": "#0d0d0d",
        "background-secondary": "#161616",
        "background-tertiary": "#282828",
        grey: "#838294",
        text: "#f6f6f6",
        transparent: "transparent",
        primary: "#25AE9D",
        danger: "#f9343a",
        secondary: { DEFAULT: "#65EBF3", dark: "#50bcc2" },
        tertiary: { DEFAULT: "#DDE038", dark: "#b0b32c" },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        moveUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8%)" },
        },
        intro: {
          "0%": { opacity: "0", transform: "translateY(25%) translateX(10%)" },
          "100%": { opacity: "1", transform: "translateY(0) translateX(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.75s ease-in-out",
        moveUp: "moveUp 0.75s ease-in-out",
        intro: "intro 0.75s ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), animate],
};
