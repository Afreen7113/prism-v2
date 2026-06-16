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
        "bg-base": "#000000",
        "bg-surface": "#08090E",
        "bg-elevated": "#0D0F17",
        "primary": "#6366F1",
        "primary-glow": "rgba(99, 102, 241, 0.4)",
        "secondary": "#22D3EE",
        "tertiary": "#A855F7",
        "success": "#10B981",
        "text-primary": "#FAFAFA",
        "text-secondary": "#71717A",
        "text-muted": "#52525B",
        "border-subtle": "rgba(255, 255, 255, 0.06)",
        "border-glow": "rgba(99, 102, 241, 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.32, 0.72, 0, 1)",
        "custom-ease": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;

