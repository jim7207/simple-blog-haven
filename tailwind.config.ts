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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#f6f6ef",
        foreground: "#000000",
        primary: {
          DEFAULT: "#ff6600",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#828282",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#828282",
          foreground: "#828282",
        },
        accent: {
          DEFAULT: "#0000ff",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Verdana", "Geneva", "sans-serif"],
      },
      fontSize: {
        xs: "8pt",
        sm: "9pt",
        base: "10pt",
        lg: "11pt",
        xl: "12pt",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;