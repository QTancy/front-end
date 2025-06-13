'use client';

import Image from 'next/image';
import profilePic from '@/icons/profile-picture.svg';
import AppLogo from '@/icons/icon-logo.svg';
import QTancyFooterLogo from '@/icons/qtancy-logo-footer.svg';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import Swal from 'sweetalert2';

export default function HeaderApps() {
  const pathname = usePathname();
  const router = useRouter()
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

  const handleLogout = async () => {
    // Tampilkan konfirmasi SweetAlert sebelum logout
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
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Optional: Jika ada item lain yang berkaitan dengan sesi, hapus juga
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('user_email');

        // Tampilkan pesan sukses
        Swal.fire({
          title: 'Berhasil Logout!',
          text: 'Anda telah berhasil keluar dari akun Anda.',
          icon: 'success',
          timer: 1500, // Otomatis tutup setelah 1.5 detik
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          // Arahkan pengguna ke halaman login atau halaman utama
          router.push('/sign-in'); // Ganti dengan path halaman login Anda
        });
      }
    });
  };

  return (
    <>
      <div className="sticky top-0 z-30 bg-[#3E54D3] shadow-lg">
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
          <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
            >
              Logout
          </button>
        </header>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
