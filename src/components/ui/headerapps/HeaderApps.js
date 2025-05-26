'use client';

import Image from 'next/image';
import profilePic from '@/icons/profile-picture.svg';
import AppLogo from '@/icons/icon-logo.svg';
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
      <header className="bg-[#3E54D3] text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-white text-3xl px-2 focus:outline-none"
          >
            &#9776;
          </button>
          <Image
            src={AppLogo.src}
            alt="App Logo"
            width={AppLogo.width}
            height={AppLogo.height}
          />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <Image src={profilePic} alt="Profile" width={40} height={40} />
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
