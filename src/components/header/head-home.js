'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { AppLogo1, QTancyHeaderLogo } from '@/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function HeadNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      const headerHeight = 100; 
      const scrollToPosition = elementTop - headerHeight;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); 
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: 'Apakah Anda yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        Swal.fire({
          title: 'Berhasil Logout!',
          text: 'Anda telah berhasil keluar dari akun Anda.',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          router.push('/');
        });
      }
    });
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="w-full flex justify-between items-center p-4">
        {/* Kiri: Logo & Hamburger Menu untuk Mobile */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu (hanya tampil di mobile) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 text-3xl focus:outline-none"
          >
            &#9776;
          </button>
          
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Image
              src={QTancyHeaderLogo} 
              alt="App Logo"
              width={120} 
              height={32} 
              className="md:w-[161px] md:h-[32px]" 
            />
          </div>
        </div>

        {/* Tengah: Navigasi - Sembunyikan di mobile, tampil di desktop */}
        <div className="hidden md:flex gap-6 flex-grow justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleScrollToSection('our-team-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Tim Kami
          </button>
          <button
            onClick={() => handleScrollToSection('why-qtancy-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Kenapa QTancy
          </button>
          <button
            onClick={() => handleScrollToSection('qcap-product-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            Produk Kami
          </button>
          <button
            onClick={() => handleScrollToSection('faq-section')}
            className="text-[var(--secondary)] hover:text-[var(--secondary)] cursor-pointer"
          >
            FAQ
          </button>
        </div>

        {/* Kanan: Navigasi Kondisional - Sembunyikan di mobile, tampil di desktop */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <div className="flex gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/qcap">
                  <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-full hover:bg-[var(--secondary)] hover:text-white transition duration-300 w-[120px]">
                    Qcap
                  </button>
                </Link>
                <Link href="/qrep">
                  <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-full hover:bg-[var(--secondary)] hover:text-white transition duration-300 w-[120px]">
                    Qrep
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer px-6 py-2 border-2 border-red-500 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 w-[120px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-full hover:bg-[var(--secondary)] hover:text-white transition duration-300 w-[120px]">
                    Sign Up
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="cursor-pointer px-6 py-2 border-2 border-[var(--secondary)] bg-[var(--secondary)] text-white rounded-full hover:bg-[var(--secondary-hover)] hover:bg-opacity-80 transition duration-300 w-[120px]">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden 
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col items-end">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 text-4xl mb-6">&times;</button>
          <nav className="flex flex-col gap-4 w-full">
            <button
              onClick={() => handleScrollToSection('hero-section')}
              className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection('our-team-section')}
              className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full"
            >
              Tim Kami
            </button>
            <button
              onClick={() => handleScrollToSection('why-qtancy-section')}
              className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full"
            >
              Kenapa QTancy
            </button>
            <button
              onClick={() => handleScrollToSection('qcap-product-section')}
              className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full"
            >
              Produk Kami
            </button>
            <button
              onClick={() => handleScrollToSection('faq-section')}
              className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full"
            >
              FAQ
            </button>
            <hr className="my-2 border-gray-200" />
            {isLoggedIn ? (
              <>
                <Link href="/qcap" className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full">
                  Qcap
                </Link>
                <Link href="/qrep" className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full">
                  Qrep
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-lg font-medium py-2 px-4 text-red-500 hover:bg-red-50 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-up" className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full">
                  Sign Up
                </Link>
                <Link href="/sign-in" className="text-left text-lg font-medium py-2 px-4 text-gray-700 hover:bg-gray-100 w-full">
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}