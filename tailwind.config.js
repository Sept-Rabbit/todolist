const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme("textShadow", {
            none: "none",
            sm: "black 0.05em 0.1em 0.2em",
          }),
        }
      );
    }),
  ],
};
