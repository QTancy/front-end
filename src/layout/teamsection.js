// 'use client';

// import React from 'react';

// export default function FooterTeam() {
//   return (
//     <footer className="w-full bg-[#E6FFFA] py-10 flex justify-center">
//       <div className="w-full max-w-screen-xl px-4 flex flex-col items-center justify-center gap-6">
//         <button className="px-6 py-3 border border-[var(--secondary)] bg-white text-[var(--secondary)] rounded-full text-lg font-medium hover:bg-gray-100 transition">
//           Made by CC25-CF269
//         </button>

//         {/* Daftar nama anggota */}
//         <div className="flex flex-wrap justify-center gap-10 text-[var(--secondary)] font-bold text-lg text-center">
//           <span>Pandu Persada</span>
//           <span>Rachelle Melody</span>
//           <span>Ulayya Thifal</span>
//           <span>Ghiffari Kenang</span>
//           <span>M. Hafidz Rizki</span>
//           <span>I Wayan Satya</span>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import React from 'react';

export default function FooterTeam() {
  return (
    <footer className="w-full bg-[#E6FFFA] py-8 md:py-10 flex justify-center"> {/* Sesuaikan padding vertikal */}
      <div className="w-full max-w-screen-xl px-4 md:px-8 flex flex-col items-center justify-center gap-4 md:gap-6"> {/* Sesuaikan padding horizontal & gap */}
        <button className="px-5 py-2 md:px-6 md:py-3 border border-[var(--secondary)] bg-white text-[var(--secondary)] rounded-full text-base md:text-lg font-medium hover:bg-gray-100 transition whitespace-nowrap"> {/* Sesuaikan padding & font, tambahkan whitespace-nowrap */}
          Made by CC25-CF269
        </button>

        {/* Daftar nama anggota */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-[var(--secondary)] font-bold text-base md:text-lg text-center"> {/* Sesuaikan gap & font */}
          <span className="w-full sm:w-auto">Pandu Persada</span> {/* Tambahkan w-full sm:w-auto agar pecah baris di mobile kecil */}
          <span className="w-full sm:w-auto">Rachelle Melody</span>
          <span className="w-full sm:w-auto">Ulayya Thifal</span>
          <span className="w-full sm:w-auto">Ghiffari Kenang</span>
          <span className="w-full sm:w-auto">M. Hafidz Rizki</span>
          <span className="w-full sm:w-auto">I Wayan Satya</span>
        </div>
      </div>
    </footer>
  );
}