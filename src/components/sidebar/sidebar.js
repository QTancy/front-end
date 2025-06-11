'use client';
import Image from 'next/image';
import {
  PlusLogo,
  AnalysisLogo,
  HomeLogo,
  SettingLogo,
  HistoryLogo,
  QTancyFooterLogo,
} from '@/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar({ isOpen, onClose }) {
  const [showSidebar, setShowSidebar] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowSidebar(true);
    } else {
      // Delay unmount for exit animation
      const timeout = setTimeout(() => setShowSidebar(false), 300); // same as transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showSidebar) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#3E54D3] z-50 shadow-lg">
      <aside
        className={`fixed top-0 left-0 w-70 h-full bg-[#3E54D3] text-white z-50 p-4 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold"
        >
          &times;
        </button>

        {/* Logo */}
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
            className="bg-white p-2 rounded flex items-center gap-2 text-black"
            onClick={onClose}
          >
            <Image src={HomeLogo.src} alt="Home" width={20} height={20} /> Home
          </Link>
          <Link
            href="/qcap"
            className="bg-white p-2 rounded flex items-center gap-2 text-black"
            onClick={onClose}
          >
            <Image src={PlusLogo.src} alt="QCap" width={20} height={20} /> QCap
          </Link>
          <Link
            href="/qrep"
            className="bg-white p-2 rounded flex items-center gap-2 text-black"
            onClick={onClose}
          >
            <Image src={AnalysisLogo.src} alt="QRep" width={20} height={20} />{' '}
            QRep
          </Link>
          <Link
            href="/profile"
            className="bg-white p-2 rounded flex items-center gap-2 text-black"
            onClick={onClose}
          >
            <Image src={SettingLogo.src} alt="Profile" width={20} height={20} />{' '}
            Account & Profile
          </Link>
        </div>
      </aside>
    </div>
  );
}
