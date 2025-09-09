module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // purge: [], // Remove this line - 'content' replaces 'purge' in Tailwind CSS v3+
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}