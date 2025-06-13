// 'use client';

// import Image from 'next/image';
// import '@fontsource/tilt-warp';
// import '@fontsource/tilt-neon';
// import { Rect } from '@/icons'; 

// export default function QrepFunctionSection() {
//   return (
//     <section className="bg-white py-16 px-6 md:px-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
        
//         {/* Left Image */}
//         <div className="flex justify-center ml-10">
//           <Image
//             src={Rect}
//             alt="qrepgroup"
//             className="w-full max-w-xl h-auto"
//             priority
//           />
//         </div>

//         {/* Right Text */}
//         <div className="mr-20 -mt-30"> 
//           <h1 className="text-3xl md:text-5xl text-black font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
//             <span className="text-[var(--secondary)]">QRep</span> Know More, <br />
//             Spend <span className="text-[var(--secondary)]">Smarter</span>
//           </h1>
//           <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
//             Visualize your spending, track trends, and gain insights—all in one clear, simple dashboard. Perfect for UMKM to stay in control.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import Image from 'next/image';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';
import { Rect } from '@/icons'; 

export default function QrepFunctionSection() {
  return (
    <section className="bg-white py-12 px-6 md:py-20 md:px-8"> {/* Sesuaikan padding vertikal dan horizontal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center"> {/* Gunakan flex-col di mobile, flex-row di desktop, sesuaikan gap */}
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-1"> {/* order-1/1 agar gambar selalu di kiri/atas */}
          <Image
            src={Rect}
            alt="qrepgroup"
            // Hapus class margin negatif di sini
            className="w-full max-w-sm sm:max-w-md md:max-w-xl h-auto object-contain" // Sesuaikan max-width gambar
            priority
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-2"> {/* order-2/2 agar teks selalu di kanan/bawah */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-normal mb-2 leading-tight" style={{ fontFamily: '"Tilt Warp", sans-serif'}}> {/* Sesuaikan ukuran font */}
            <span className="text-[var(--secondary)]">QRep</span> Tau Banyak, <br className="hidden md:block" /> {/* Tambahkan break line hanya di desktop */}
            Gunakan Pengeluaran Dengan <span className="text-[var(--secondary)]">Cerdas!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed" style={{ fontFamily: '"Tilt Neon", sans-serif'}}> {/* Sesuaikan ukuran font dan line-height */}
          Visualisasikan pengeluaran Anda, lacak tren, dan dapatkan wawasan—semuanya dalam satu dasbor yang jelas dan sederhana. Sempurna bagi UMKM untuk tetap memegang kendali.
          </p>
        </div>
      </div>
    </section>
  );
}