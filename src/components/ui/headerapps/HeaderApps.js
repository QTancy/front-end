'use client';

import Image from 'next/image';
import profilePic from '@/icons/profile-picture.svg';
import AppLogo from '@/icons/icon-logo.svg';
import QTancyFooterLogo from '@/icons/qtancy-logo-footer.svg';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '@/components/sidebar/sidebar';

export default function HeaderApps() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titleMap = {
    '/page/qrep': 'Qrep is here!',
    '/page/qcap': 'Qcap is here!',
  };

  const subtitleMap = {
    '/page/qrep':
      'Lihat pengeluaran berdasarkan kategori, tipe payment, atau jangka waktu',
    '/page/qcap': 'Unggah strukmu dan hasil ekstraksi otomatis akan muncul!',
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <div class="sticky top-0 z-30 bg-[#3E54D3] shadow-lg">
        <header className="bg-[#3E54D3] text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-white text-3xl px-2 focus:outline-none"
            >
              &#9776;
            </button>
            <Image
              src={QTancyFooterLogo.src}
              alt="App Logo"
              width={161}
              height={32}
            />
          </div>
          <div className="w-10 h-12 rounded-[12px] overflow-hidden border-2 border-white">
            <Image src={profilePic} alt="Profile" width={40} height={40} />
          </div>
        </header>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
