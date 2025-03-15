/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E88E5', 
        },
        secondary: {
          DEFAULT: '#F5F7FA', 
        },
        gray: {
          DEFAULT: '#4A5568',
          light: '#F5F7FA', 
        },
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}