/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
        width: "width",
        top: "top",
        left: "left",
        filter: "filter",
      },
    },
  },
  plugins: [tailwindScrollbar],
};
