/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      colors: {
        sandstone: "#C2A883",   // warm earthy beige
        moss: "#8A9A5B",        // muted green
        neonPink: "#FF3CAC",    // bright cyberpunk pink
        vintagePeach: "#F8C8DC",// soft pastel peach
        abyssBlue: "#0A2463",   // deep ocean blue
        brand: "#691e87",
        brandLight: "#b372cc"
      },
    },
  },
  plugins: [],
}