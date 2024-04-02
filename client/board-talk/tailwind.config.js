/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-green": "#c8dcdc",
        "mineral-green": "#465858",
        "gulf-stream": "#70aaaa"
      },
      height: {
        "9/10": "90%",
        "1/10": "10%",
      },
      width: {
        "1/20": "5%"
      }
    },
  },
  plugins: [],
}

