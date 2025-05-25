'use client';
import Image from 'next/image';
import {
  PlusLogo,
  AnalysisLogo,
  HomeLogo,
  SettingLogo,
  HistoryLogo,
} from '@/icons';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="text-black text-3xl px-4 focus:outline-none"
      >
        &#9776;
      </button>

      {/* Sidebar */}
      {isOpen && (
        <aside className="fixed top-0 left-0 w-64 h-full bg-[#3E4EB8] text-white z-50 p-4 shadow-lg">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="absolute top-2 right-4 text-white text-2xl font-bold"
          >
            &times;
          </button>

          <h3 className="text-white font-semibold mb-4 mt-6">Page</h3>
          <div className="flex flex-col gap-2">
            <Link
              href="/home"
              className="bg-[#57DBC2] p-2 rounded flex items-center gap-2 text-black"
              onClick={closeSidebar}
            >
              <Image src={HomeLogo.src} alt="Home" width={20} height={20} />{' '}
              Home
            </Link>
            <Link
              href="/qcap"
              className="bg-[#57DBC2] p-2 rounded flex items-center gap-2 text-black"
              onClick={closeSidebar}
            >
              <Image src={PlusLogo.src} alt="QCap" width={20} height={20} />{' '}
              QCap
            </Link>
            <Link
              href="/history"
              className="bg-[#57DBC2] p-2 rounded flex items-center gap-2 text-black"
              onClick={closeSidebar}
            >
              <Image
                src={HistoryLogo.src}
                alt="History"
                width={20}
                height={20}
              />{' '}
              History
            </Link>
            <Link
              href="/qrep"
              className="bg-[#57DBC2] p-2 rounded flex items-center gap-2 text-black"
              onClick={closeSidebar}
            >
              <Image src={AnalysisLogo.src} alt="QRep" width={20} height={20} />{' '}
              QRep
            </Link>
            <Link
              href="/profile"
              className="bg-[#57DBC2] p-2 rounded flex items-center gap-2 text-black"
              onClick={closeSidebar}
            >
              <Image
                src={SettingLogo.src}
                alt="Profile"
                width={20}
                height={20}
              />{' '}
              Account & Profile
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
