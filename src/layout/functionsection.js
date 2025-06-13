'use client';

import '@fontsource/poppins';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';
import { carbon, solar, vector } from '@/icons'; 
import Image from 'next/image';

export default function WhyQTancySection() {
  return (
    <div className="bg-white py-20 flex flex-col items-center justify-center gap-12 px-4 text-center">
      {/* Title */}
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-6xl text-black font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
          Kenapa <span className="text-[var(--secondary)]">QTancy?</span>
        </h2>
        <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
        Situs web kami menyederhanakan segalanya untuk Anda—karena mengelola struk secara manual memakan waktu dan rentan terhadap kesalahan.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={carbon} alt="Carbon Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Foto struk dan digitalisasi<br />
            dalam hitungan detik.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={solar} alt="Solar Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Dapatkan wawasan jelas untuk melacak pengeluaran.<br />
            
          </p>
        </div>

        {/* Card 3 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={vector} alt="Vector Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Buat bisnis yang cerdas<br />
            berdasarkan keputusan real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
