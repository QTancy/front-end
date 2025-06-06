'use client';

import Image from 'next/image';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';
import { Rect } from '@/icons'; 

export default function QrepFunctionSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
        
        {/* Left Image */}
        <div className="flex justify-center ml-10">
          <Image
            src={Rect}
            alt="qrepgroup"
            className="w-full max-w-xl h-auto"
            priority
          />
        </div>

        {/* Right Text */}
        <div className="mr-20 -mt-30"> 
          <h1 className="text-3xl md:text-5xl font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
            <span className="text-[var(--secondary)]">QRep</span> Know More, <br />
            Spend Smarter
          </h1>
          <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
            Visualize your spending, track trends, and gain insights—all in one clear, simple dashboard. Perfect for UMKM to stay in control.
          </p>
        </div>
      </div>
    </section>
  );
}
