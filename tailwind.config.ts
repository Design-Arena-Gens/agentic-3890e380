import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in',
        'fade-out': 'fadeOut 2s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dissolve': 'dissolve 3s ease-in-out',
        'flash': 'flash 0.3s ease-out',
        'erase': 'erase 1.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        dissolve: {
          '0%': { opacity: '1', filter: 'blur(0px)' },
          '100%': { opacity: '0', filter: 'blur(20px)' },
        },
        flash: {
          '0%': { opacity: '0', filter: 'brightness(2)' },
          '50%': { opacity: '1', filter: 'brightness(3)' },
          '100%': { opacity: '0', filter: 'brightness(1)' },
        },
        erase: {
          '0%': { opacity: '1', clipPath: 'inset(0 0 0 0)' },
          '100%': { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
