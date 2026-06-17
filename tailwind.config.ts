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
        "bg-base": "var(--prism-site-bg, #000000)",
        "bg-surface": "var(--prism-site-surface, #08090E)",
        "bg-elevated": "var(--prism-site-elevated, #0D0F17)",
        "primary": "var(--prism-semantic-primary, #6366F1)",
        "primary-glow": "var(--prism-primary-glow, rgba(99, 102, 241, 0.4))",
        "secondary": "var(--prism-semantic-accent, #22D3EE)",
        "tertiary": "var(--prism-semantic-accent-2, #A855F7)",
        "success": "var(--prism-semantic-success, #10B981)",
        "text-primary": "var(--prism-site-text, #FAFAFA)",
        "text-secondary": "var(--prism-site-text-secondary, #71717A)",
        "text-muted": "var(--prism-site-text-muted, #52525B)",
        "border-subtle": "var(--prism-site-border, rgba(255, 255, 255, 0.06))",
        "border-glow": "var(--prism-border-glow, rgba(99, 102, 241, 0.3))",
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

