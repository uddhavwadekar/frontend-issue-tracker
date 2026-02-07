/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jira: {
          blue: '#0052CC',
          dark: '#172B4D',
          light: '#F4F5F7',
        }
      }
    },
  },
  plugins: [],
}