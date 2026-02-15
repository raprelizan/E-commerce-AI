import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f7f7fb',
        foreground: '#151515',
        primary: '#0f766e',
        card: '#ffffff'
      }
    }
  },
  plugins: []
};

export default config;
