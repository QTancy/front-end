import Image from 'next/image';
import Button from '../ui/buttons/buttons';
import Link from 'next/link';
import Sidebar from '../sidebar/sidebar';
import { AppLogo1 } from '@/icons';

export default function HeadNavigation() {
  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-[1273px] w-full flex justify-between items-center p-4">
        {/* Kiri: Sidebar / Hamburger */}
        <div className="flex items-center gap-3">
          <Sidebar />
          {/* Logo icon */}
          <div className="flex items-center">
            <Image
              src={AppLogo1} 
              alt="App Logo"
              width={AppLogo1.width} 
              height={AppLogo1.height} 
            />
          </div>
        </div>

        {/* Tengah: Navigasi */}
        <div className="flex gap-6 flex-grow justify-center">
          <Link href="/home">
            <button className="text-[var(--secondary)] hover:text-[var(--secondary)]">Home</button>
          </Link>
          <Link href="/our-team">
            <button className="text-[var(--secondary)] hover:text-[var(--secondary)]">Our Team</button>
          </Link>
          <Link href="/solution">
            <button className="text-[var(--secondary)] hover:text-[var(--secondary)]">Solution</button>
          </Link>
          <Link href="/faq">
            <button className="text-[var(--secondary)] hover:text-[var(--secondary)]">FAQ</button>
          </Link>
        </div>

        {/* Kanan: Button Navigasi */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Wrapper for the Sign Up and Sign In Buttons */}
          <div className="flex gap-4">
            {/* Sign Up Button */}
            <Link href="/sign-up">
              <button className="px-6 py-2 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-full hover:bg-[var(--secondary)] hover:text-white transition duration-300 w-[120px]">
                Sign Up
              </button>
            </Link>
            {/* Sign In Button */}
            <Link href="/sign-in">
              <button className="px-6 py-2 border-2 border-[var(--secondary)] bg-[var(--secondary)] text-white rounded-full hover:bg-[var(--secondary)] hover:bg-opacity-80 transition duration-300 w-[120px]">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
