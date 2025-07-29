// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
       dropShadow: {
        glow: '0 0 10px rgba(59,130,246,0.5)', // glow for icons (e.g., blue)
      },
    },
  },
  plugins: [],
}
