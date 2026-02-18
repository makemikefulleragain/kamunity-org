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
        kai: { gold: '#C4922A', 'gold-light': '#D4A84A', 'gold-dark': '#A87A1E', glow: 'rgba(196,146,42,0.15)', cream: '#FFF8F0' },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        dm: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'card-surface': 'cardSurface 0.3s ease-in-out forwards',
        'card-recede': 'cardRecede 0.2s ease-in-out forwards',
        'ember-pulse': 'emberPulse 3s ease-in-out infinite',
        'typewriter-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        cardSurface: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        cardRecede: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        emberPulse: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
