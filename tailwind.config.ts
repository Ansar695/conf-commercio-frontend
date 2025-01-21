import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        primary: "#0F3A56",
        accent: "#5CBDFA",
        secondary: "#eef7fe",
        gray: {
          1: "#B6B4C2",
          DEFAULT: "#B9B9B9",
          light: "#EEF1F3",
          dark: "#2F3540",
        },
      },
      backgroundImage: {
        "accent-gr":
          "linear-gradient(274deg, #0F3A56 -83.99%, #5CBDFA 142.46%)",
        "destructive-gr":
          "linear-gradient(274deg, #A31307 -83.99%, #EF6A60 142.46%)",
      },
      boxShadow: {
        card: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};
export default config;
