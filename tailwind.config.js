const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        'primary-lime': '#c2ff44',
      },
    },
  },
  plugins: [flowbite.plugin(), require('daisyui')],
};
