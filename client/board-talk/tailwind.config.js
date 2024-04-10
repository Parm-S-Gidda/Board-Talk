/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-green": "#c8dcdc",
        "mineral-green": "#465858",
        "gulf-stream": "#70aaaa",
        "test": "#B3c5c5"
      },
      height: {
        "9/10": "90%",
        "1/10": "10%",
        "1/12": "8.33%",
        "11/12": "91.66%"
      },
      width: {
        "1/20": "5%"
      },
      maxHeight: {
        "9/10": "90%"
      },
      backgroundSize: {
        "0": "0% 0.15rem",
        "100": "100% 0.15rem"

      }
    },
  },
  plugins: [],
}

