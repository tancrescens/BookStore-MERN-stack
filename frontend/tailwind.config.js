// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Add this if your root HTML file is in the project root
    "./src/**/*.{js,ts,jsx,tsx}", // Includes all JS, JSX, TS, and TSX files inside src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
