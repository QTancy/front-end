module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Mencakup semua file di dalam src/app
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Mencakup semua file di dalam src/components (sesuaikan jika struktur Anda berbeda)
    // Tambahkan path lain jika Anda menggunakan kelas Tailwind di tempat lain
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C55E',
        secondary: '#3E54D3',
      },
    },
  },
};
