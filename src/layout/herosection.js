import '@fontsource/poppins';
import '@fontsource/tilt-warp';
import { Rectangle2 } from '@/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen px-4 py-8 md:px-8 md:py-16 bg-white overflow-hidden">
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 md:gap-6 max-w-lg md:max-w-2xl">
        <div className="flex flex-col justify-center items-center md:items-start" style={{ marginBottom: '0' }}>
          <h1 className="font-poppins text-black font-bold text-3xl md:text-[40px] lg:text-5xl leading-tight"> {/* Sesuaikan ukuran font */}
            Mari Foto Struk! 
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-tilt-warp leading-tight" style={{ marginTop: '-8px', marginBottom: '-4px' }}> {/* Sesuaikan ukuran font & margin */}
            <span className="text-black">Dan Dapatkan Laporan </span>
            <span className="text-[var(--secondary)]">Secara Instan</span>
          </h1>
        </div>
        <p className="text-base md:text-lg lg:text-xl font-normal text-center md:text-left" style={{ fontFamily: '"Tilt Warp", sans-serif', color: 'var(--primary)', marginTop: '-10px' }}> {/* Sesuaikan ukuran font & margin */}
          Cara Pintar Untuk Mengembangkan Bisnis Anda
        </p>
        <Link href={"/sign-in"}>
          <button 
            className="bg-white text-black border-2 border-[var(--secondary)] hover:text-white hover:bg-[var(--secondary)] px-6 py-3 rounded-full cursor-pointer transition duration-300 text-lg md:text-xl" // Sesuaikan padding & font
            >
            Ayo Mulai!
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"> 
        <div className="flex justify-center items-center m-0 p-0 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"> {/* Kontainer gambar responsif */}
          <Image
            src={Rectangle2}  
            alt="Rectangle2 Image"
            width={800} 
            height={445} 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>
    </div>
  );
}