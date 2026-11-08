/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        accent: "var(--accent-text)",
        "accent-ink": "var(--accent-ink)",
      },
      borderRadius: {
        xl2: "var(--r-xl)",
        l: "var(--r-l)",
      },
    },
  },
  plugins: [],
};
