/** @type {import('tailwindcss').Config} */

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366F1", // Light purple for primary color
          DEFAULT: "#4F46E5", // Default primary color
          dark: "#4338CA", // Dark primary color
        },
        background: {
          DEFAULT: "#F3F4F6", // Light gray background color
        },
        text: {
          primary: "#1F2937", // Dark gray text color
          secondary: "#4B5563", // Medium gray for secondary text
        },
      },
    },
  },
  plugins: [],
};
