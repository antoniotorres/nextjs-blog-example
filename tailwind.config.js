const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.jsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
