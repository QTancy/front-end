'use client';
import Image from 'next/image';
import {
  PlusLogo,
  AnalysisLogo,
  HomeLogo,
  SettingLogo,
  QTancyFooterLogo,
} from '@/icons';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Sidebar({ isOpen, onClose }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  // EFEK 1: Mengontrol mounting & unmounting komponen berdasarkan `isOpen`
  useEffect(() => {
    if (isOpen) {
      setShowSidebar(true); // Jika terbuka, langsung set untuk muncul
    } else {
      // Jika tertutup, jalankan animasi keluar. Unmounting diatur oleh onComplete.
      gsap.to(sidebarRef.current, {
        xPercent: -100,
        duration: 0.7,
        ease: 'power3.in',
        onComplete: () => setShowSidebar(false), // Setelah animasi selesai, baru unmount
      });
    }
  }, [isOpen]);

  // EFEK 2: Menjalankan animasi SETELAH komponen di-mount (showSidebar menjadi true)
  useEffect(() => {
    // Jalankan animasi masuk hanya jika `showSidebar` true (artinya elemen sudah di DOM)
    if (showSidebar) {
      gsap.fromTo(
        sidebarRef.current,
        { xPercent: -100 }, // Awal: dari luar layar
        {
          xPercent: 0, // Akhir: pas di layar
          duration: 0.7,
          ease: 'power3.out',
        }
      );
    }
  }, [showSidebar]); // Efek ini bergantung pada `showSidebar`

  // Jika showSidebar false, komponen tidak di-render sama sekali.
  if (!showSidebar) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-30 bg-black/3 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 w-64 h-full bg-[#3E54D3] text-white z-50 p-4 shadow-xl"
      >
        {/* ... sisa kode Anda tetap sama ... */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold hover:opacity-75"
        >
          &times;
        </button>

        <div className="mt-8 flex flex-col items-center gap-2">
          <Image
            src={QTancyFooterLogo.src}
            alt="QTancy Logo"
            width={180}
            height={50}
          />
        </div>
        <h3 className="text-white font-semibold mb-4 mt-4">Page</h3>
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="bg-white p-2 rounded flex items-center gap-2 text-black hover:bg-gray-200"
            onClick={onClose}
          >
            <Image src={HomeLogo.src} alt="Home" width={20} height={20} /> Home
          </Link>
          <Link
            href="/qcap"
            className="bg-white p-2 rounded flex items-center gap-2 text-black hover:bg-gray-200"
            onClick={onClose}
          >
            <Image src={PlusLogo.src} alt="QCap" width={20} height={20} /> QCap
          </Link>
          <Link
            href="/qrep"
            className="bg-white p-2 rounded flex items-center gap-2 text-black hover:bg-gray-200"
            onClick={onClose}
          >
            <Image src={AnalysisLogo.src} alt="QRep" width={20} height={20} />{' '}
            QRep
          </Link>
        </div>
      </aside>
    </div>
  );
}
