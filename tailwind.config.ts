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
        parchment: { DEFAULT: '#f5f0e8', dark: '#e8dfd0', edge: '#d4c9b5' },
        ink: { DEFAULT: '#2c1810', light: '#5a4a3a', faint: '#8a7a6a' },
        fire: { amber: '#d4a574', orange: '#c47d3f', red: '#8b3a3a' },
        ku: { DEFAULT: '#6366f1', light: '#818cf8', bg: '#eef0ff' },
        forest: '#3d6b2e',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
