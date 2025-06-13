'use client'
import Image from 'next/image';
import Button from '../ui/buttons/buttons';
import Link from 'next/link';
import Sidebar from '../sidebar/sidebar';
import { AppLogo1, QTancyHeaderLogo } from '@/icons';

export default function HeadNavigation() {

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Dapatkan posisi top elemen
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;

      // Tinggi header Anda (sesuaikan nilai ini)
      // Anda bisa mengukur tinggi header atau menentukan nilai perkiraan
      const headerHeight = 100; // Contoh: 70px, sesuaikan dengan tinggi sebenarnya header Anda

      // Posisi scroll yang diinginkan (posisi top elemen minus tinggi header)
      const scrollToPosition = elementTop - headerHeight;

      // Gulir ke posisi yang dihitung
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="w-full flex justify-between items-center p-4">
        {/* Kiri: Sidebar / Hamburger */}
        <div className="flex items-center gap-3">
          
          {/* Logo icon */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image
              src={QTancyHeaderLogo} 
              alt="App Logo"
              width={AppLogo1.width} 
              height={AppLogo1.height} 
            />
          </div>
        </div>

        {/* Tengah: Navigasi */}
        <div className="flex gap-6 flex-grow justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Scroll ke atas halaman
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleScrollToSection('our-team-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Our Team
          </button>
          <button
            onClick={() => handleScrollToSection('why-qtancy-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Why Qtancy
          </button>
          <button
            onClick={() => handleScrollToSection('qcap-product-section')} // Mengarahkan "Our Product" ke Qcap
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Our Product
          </button>
          <button
            onClick={() => handleScrollToSection('faq-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            FAQ
          </button>
        </div>

        {/* Kanan: Button Navigasi */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Wrapper for the Sign Up and Sign In Buttons */}
          <div className="flex gap-4 ">
            {/* Sign Up Button */}
            <Link href="/sign-up">
              <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-full hover:bg-[var(--secondary)] hover:text-white transition duration-300 w-[120px]">
                Sign Up
              </button>
            </Link>
            {/* Sign In Button */}
            <Link href="/sign-in">
              <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] bg-[var(--secondary)] text-white rounded-full hover:bg-[var(--secondary-hover)] hover:bg-opacity-80 transition duration-300 w-[120px]">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
