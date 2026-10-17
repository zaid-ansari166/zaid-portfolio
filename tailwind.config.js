/** @type {import('tailwindcss').Config} */
// Design tokens live in src/app/globals.css (CSS variables). This file only maps them to Tailwind class names.
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        // fixed palette — deep navy × cyan
        bg: "#0B0F19",
        ink: "#030F25",
        fg: "#FFFFFF",
        fg2: "rgba(255,255,255,0.72)",
        line: "rgba(255,255,255,0.14)",
        light: "#FFFFFF",
        soft: "#F4F6FB",
        ink2: "#56719F",
        lineLight: "#E7ECF4",
        accent: "#22D3EE",
        blue: "#1E6DFD",
        // section-scoped (follow [data-theme] of the nearest section)
        // NOTE: the prefix is `sec-` (not `s-`) because Tailwind's logical `border-s-*` / `rounded-s-*` utilities
        // would otherwise also match `border-s-line` and paint a fixed inline-start border on light sections.
        "sec-bg": "var(--s-bg)",
        "sec-fg": "var(--s-fg)",
        "sec-fg2": "var(--s-fg-2)",
        "sec-line": "var(--s-line)",
        "sec-surface": "var(--s-surface)",
        "sec-mark": "var(--s-mark)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        media: "8px",
        btn: "4px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        220: "220ms",
        550: "550ms",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
