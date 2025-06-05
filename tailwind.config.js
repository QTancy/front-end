module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'tilt-warp': ['"Tilt Warp"', 'sans-serif'],
      },
      colors: {
        primary: '#D10000',
        secondary: '#3E54D3',
      },
    },
  },
};