/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enables class-based dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // ✅ Optional: enhances markdown/post content
  ],
};
