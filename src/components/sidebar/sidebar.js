'use client';
import Image from 'next/image';
import {
  PlusLogo,
  AnalysisLogo,
  HomeLogo,
  SettingLogo,
  HistoryLogo,
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
    <aside
      className={`fixed top-0 left-0 w-64 h-full bg-[#3E54D3] text-white z-50 p-4 shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-white text-2xl font-bold"
      >
        &times;
      </button>

      <h3 className="text-white font-semibold mb-4 mt-6">Page</h3>
      <div className="flex flex-col gap-2">
        <Link
          href="/home"
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
          href="/history"
          className="bg-white p-2 rounded flex items-center gap-2 text-black"
          onClick={onClose}
        >
          <Image src={HistoryLogo.src} alt="History" width={20} height={20} />{' '}
          History
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
  );
}
