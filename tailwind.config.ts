import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#ddd",
        input: "#e1e8ed",
        background: "#ffffff",
        foreground: "#333333",
        primary: {
          DEFAULT: "#1da1f2",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#777777",
          foreground: "#333333",
        },
        muted: {
          DEFAULT: "#f6f6f6",
          foreground: "#333333",
        },
        accent: {
          DEFAULT: "#1da1f2",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "24px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;