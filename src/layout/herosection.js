import '@fontsource/poppins';  
import '@fontsource/tilt-warp';  
import Button from '@/components/ui/buttons/buttons';
import SectionWrapper from '@/components/ui/wrapper/section-wraper'; 
import { Rectangle2 } from '@/icons';  
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-white">
        {/* Text Section */}
        <div className="w-full flex flex-col justify-center items-center gap-6 max-w-2xl">
          <div className="flex flex-col justify-center items-center" style={{ marginBottom: '0' }}>
            <h1 className="font-poppins text-black font-bold text-[40px] ">
              SNAP! a Receipt
            </h1>
            <h1 className="text-4xl md:text-6xl font-normal font-tilt-warp" style={{ marginTop: '-10px', marginBottom: '-5px' }}>
              <span className="text-black">Get </span>
              <span className="text-[var(--secondary)]">Instant Report</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl font-normal" style={{ fontFamily: '"Tilt Warp", sans-serif', color: 'var(--primary)', marginTop: '-15px' }}>
            A Smarter Way to Grow Your Small Business
          </p>
          <button 
            className="bg-white text-black border-2 border-[var(--secondary)] hover:text-white hover:bg-[var(--secondary)] px-4 py-2 rounded-full cursor-pointer transition duration-300"
          >
            Get Started!
          </button>
        </div>
        {/* Image Section */}
        <div className="w-full flex justify-center mt-8">
          <div className="flex justify-center items-center m-0 p-0 ml-[-100px] mt-[-80px]">
            <Image
              src={Rectangle2}  
              alt="Rectangle2 Image"
              width={800}
              height={445}
              className="m-0 p-0"
            />
          </div>
        </div>
      
    </div>
  );
}
