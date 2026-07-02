/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm "white / brown / golden" luxury palette
        primary: "#f7f1e7", // cream base
        secondary: "#8a7560", // muted mocha (secondary text)
        tertiary: "#efe3d2", // warm surface
        "black-100": "#f1e7d7",
        "black-200": "#eaddc9",
        "white-100": "#5b4a3d", // soft brown (was light text)
        ink: "#2e2521", // espresso — primary text
        "ink-soft": "#6b5a4c",
        cream: "#f7f1e7",
        // Accent keys kept the same so existing accent-*/gradient classes
        // auto-convert to the gold/bronze/brown family.
        accent: {
          violet: "#C9A227", // gold
          purple: "#B0875A", // bronze
          cyan: "#8B5E3C", // brown
          blue: "#A8732F", // amber-brown
          pink: "#E0A45C", // soft gold
          magenta: "#caa14a",
          gold: "#C9A227",
          bronze: "#B0875A",
          brown: "#6F4E37",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(111, 78, 55, 0.25)",
        glow: "0 0 40px -10px rgba(201, 162, 39, 0.55)",
        "glow-cyan": "0 0 40px -8px rgba(176, 135, 90, 0.55)",
        "glow-pink": "0 0 40px -8px rgba(224, 164, 92, 0.5)",
        "glow-soft": "0 0 80px -20px rgba(201, 162, 39, 0.4)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/banner-bg.png')",
        "neon-grid":
          "linear-gradient(rgba(111,78,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,78,55,0.06) 1px, transparent 1px)",
        "accent-gradient":
          "linear-gradient(90deg, #D4AF37 0%, #B0875A 50%, #8B5E3C 100%)",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(8%, -12%) scale(1.15)" },
          "66%": { transform: "translate(-10%, 8%) scale(0.95)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-12%, 10%) scale(1.1)" },
          "66%": { transform: "translate(10%, -8%) scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "aurora-1": "aurora-1 20s ease-in-out infinite",
        "aurora-2": "aurora-2 25s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
}
