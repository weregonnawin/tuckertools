import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          dark: "#1a1a1a",
          charcoal: "#2d2d2d",
          steel: "#4a4a4a",
          yellow: "#f59e0b",
          "yellow-dark": "#d97706",
          orange: "#ea580c",
          red: "#dc2626",
        },
      },
      fontFamily: {
        heading: ['"Industry"', '"Arial Black"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
