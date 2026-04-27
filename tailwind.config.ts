import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF3E7",
          50: "#FEFBF6",
          100: "#FAF3E7",
          200: "#F4E8D2",
        },
        rose: {
          soft: "#F5C2C7",
          deep: "#C9476B",
          darker: "#A93655",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
        },
        gold: {
          DEFAULT: "#D4A574",
          light: "#E5BE8E",
          dark: "#B88A57",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "rose-glow": "0 25px 50px -12px rgba(201, 71, 107, 0.15)",
        "soft": "0 4px 24px -8px rgba(26, 26, 26, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
