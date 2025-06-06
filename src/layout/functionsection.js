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
        <h2 className="text-4xl md:text-6xl font-normal mb-2" style={{ fontFamily: '"Tilt Warp", sans-serif'}}>
          Why <span className="text-[var(--secondary)]">QTancy?</span>
        </h2>
        <p className="text-base md:text-lg text-black" style={{ fontFamily: '"Tilt Neon", sans-serif'}}>
          Our website simplifies everything for you—because managing receipts manually is time-consuming and prone to errors.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={carbon} alt="Carbon Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Snap your receipts and digitize<br />
            them in seconds.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={solar} alt="Solar Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Get clear insights to track spending<br />
            and sales effortlessly.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border-2 border-[var(--secondary)] rounded-xl p-6 flex flex-col items-center text-center">
          <Image src={vector} alt="Vector Icon" width={48} height={48} className="mb-4" />
          <p className="font-semibold font-poppins text-gray-800">
            Make smarter business<br />
            decisions with real-time data.
          </p>
        </div>
      </div>
    </div>
  );
}
