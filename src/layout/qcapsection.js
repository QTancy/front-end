'use client';

import Image from 'next/image';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';
import { qcapgroup } from '@/icons'; 

export default function QcapFunctionSection() {
  return (
    <section className="bg-white py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Left Text */}
        <div className="ml-40 mt-[-40px]">
          <h1 className="text-3xl md:text-5xl text-black font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
            Scan <span className="text-[var(--secondary)]">QCap</span>,<br />
            <span className='text-[var(--secondary)]'>Work</span> Smart! 
          </h1>
          <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
            QCap’s smart AI turns receipts into accurate digital records in seconds, eliminating manual entry and saving your UMKM time to focus on growing your business.
          </p>
        </div>

       {/* Right Image */}
        <div className="flex justify-center ml-[-40px]">
          <Image
            src={qcapgroup}
            alt="qcapgroup"
            className="w-full max-w-lg h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
