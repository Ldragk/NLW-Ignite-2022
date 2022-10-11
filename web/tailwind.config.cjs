/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
    ["./src/**/*.tsx",
      "./index.html"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    backgroundSize: {
      'fundo': '100% 40rem'
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/Fundo.png')",
        "gradient": "linear-gradient(90deg, #9572FC 0%, #43E7AD 50.52%, #E2D45C 100%)",
        "g-gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: []
}
