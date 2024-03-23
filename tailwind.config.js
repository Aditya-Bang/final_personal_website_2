/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 0.8s steps(25) forwards',
        caret: 'typewriter 0.8s steps(25) forwards',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
      },
      colors: {
        'testcol': '#281556',
      },
      boxShadow: {
        'lg-invert':
          '0 10px 30px -3px rgba(255, 255, 255, 0.2), 0 10px 6px -20px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
