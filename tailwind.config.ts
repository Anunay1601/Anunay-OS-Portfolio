import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface-1)",
          hover: "var(--surface-2)",
          active: "var(--surface-3)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          blue: {
            DEFAULT: "#4F8CFF",
            glow: "rgba(79, 140, 255, 0.20)",
            subtle: "rgba(79, 140, 255, 0.08)",
          },
          violet: {
            DEFAULT: "#8B5CF6",
            glow: "rgba(139, 92, 246, 0.20)",
            subtle: "rgba(139, 92, 246, 0.08)",
          },
          emerald: {
            DEFAULT: "#10B981",
            glow: "rgba(16, 185, 129, 0.20)",
          }
        },
        border: "var(--border-color)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "'Plus Jakarta Sans'",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "'Outfit'",
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "apple-soft": "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        "apple-window": "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
        "apple-dock": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        "apple-sm": "8px",
        "apple-md": "12px",
        "apple-lg": "18px",
        "apple-xl": "24px",
      },
      backdropBlur: {
        xs: "2px",
        "apple-dock": "20px",
        "apple-window": "24px",
      },
      animation: {
        "subtle-pulse": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
