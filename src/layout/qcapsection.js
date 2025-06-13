// 'use client';

// import Image from 'next/image';
// import '@fontsource/tilt-warp';
// import '@fontsource/tilt-neon';
// import { qcapgroup } from '@/icons'; 

// export default function QcapFunctionSection() {
//   return (
//     <section className="bg-white py-12 px-6 md:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
//         {/* Left Text */}
//         <div className="ml-40 mt-[-40px]">
//           <h1 className="text-3xl md:text-5xl text-black font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
//             Scan <span className="text-[var(--secondary)]">QCap</span>,<br />
//             <span className='text-[var(--secondary)]'>Work</span> Smart! 
//           </h1>
//           <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
//             QCap’s smart AI turns receipts into accurate digital records in seconds, eliminating manual entry and saving your UMKM time to focus on growing your business.
//           </p>
//         </div>

//        {/* Right Image */}
//         <div className="flex justify-center ml-[-40px]">
//           <Image
//             src={qcapgroup}
//             alt="qcapgroup"
//             className="w-full max-w-lg h-auto"
//             priority
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import Image from 'next/image';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';
import { qcapgroup } from '@/icons';

export default function QcapFunctionSection() {
  return (
    <section className="bg-white py-12 px-6 md:py-20 md:px-8"> {/* Sesuaikan padding vertikal dan horizontal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center"> {/* Gunakan flex-col di mobile, flex-row di desktop, sesuaikan gap */}
        
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"> {/* order-2/1 untuk membalik urutan di mobile/desktop */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-normal mb-2 leading-tight" style={{ fontFamily: '"Tilt Warp", sans-serif'}}> {/* Sesuaikan ukuran font, tambahkan sm:text-4xl */}
            Pindai dengan <span className="text-[var(--secondary)]">QCap</span>,<br className="hidden md:block" /> 
            <span className="text-[var(--secondary)]"> Laporan</span> Beres! 
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed" style={{ fontFamily: '"Tilt Neon", sans-serif'}}> {/* Sesuaikan ukuran font dan line-height */}
            AI cerdas QCap mengubah struk menjadi catatan digital yang akurat dalam hitungan detik, menghilangkan entri manual dan menghemat waktu UMKM Anda untuk fokus mengembangkan bisnis
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2"> {/* order-1/2 untuk membalik urutan di mobile/desktop */}
          <Image
            src={qcapgroup}
            alt="qcapgroup"
            // Hapus class margin negatif di sini
            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain" // Sesuaikan max-width gambar untuk mobile
            priority
          />
        </div>
      </div>
    </section>
  );
}