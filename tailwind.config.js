module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Mencakup semua file di dalam src/app
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Mencakup semua file di dalam src/components (sesuaikan jika struktur Anda berbeda)
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D10000',
        'secondary': '#3E54D3',
      },
    },
  },
};
