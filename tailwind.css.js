/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // adjust if your app dir is different
  ],
  theme: {
    extend: {
      screens: {
        xs: "5rem", 
      },
    },
  },
  plugins: [],
};
