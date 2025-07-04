'use client'

import Button from '@/components/ui/buttons/buttons';
import { SignUpIllustration } from '@/icons';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signUp } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import gsap from 'gsap';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const formContainerRef = useRef(null);

  useEffect(() => {
    if (formContainerRef.current) {
      gsap.from(formContainerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });
    }
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Baris ini sudah cukup
    // e.preventDefault(); // <-- Hapus baris duplikat ini
    setIsLoading(true);
    setError(null);

    try {
      await signUp(name, email, password); // Baris ini sudah cukup
      // await signUp(name, email, password); // <-- Hapus baris duplikat ini
      Swal.fire({
        title: "Sign Up Berhasil!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Lanjut"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/sign-in");
        }
      });
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan saat sign up. Silakan coba lagi.');
      Swal.fire({
        icon: "error",
        title: "Gagal Sign Up!",
        text: error.message || 'Terjadi kesalahan saat sign up. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  }; // <-- Penutup handleSignUp yang benar. Tidak ada lagi di bawahnya.

  return (
    <div
      ref={formContainerRef}
      className='w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl
                 p-6 sm:p-8 md:p-9 rounded-3xl bg-[#36D5A7] drop-shadow-xl shadow-xl
                 mx-auto'
    >
      <Link href='/' className='flex items-center w-fit mb-3 text-white'>
        <ChevronLeft/>
        <p className='font-bold text-sm sm:text-base'>Homepage</p>
      </Link>
      <div className="w-full flex flex-col md:flex-row-reverse justify-center items-center gap-6 sm:gap-8 md:gap-10">
        {/* Illustration Section - Sembunyikan di mobile kecil, tampil di md ke atas */}
        <div className="hidden md:flex flex-col gap-9 items-center justify-center md:w-1/2">
          <Image
            src={SignUpIllustration}
            alt="Sign Up Illustration"
            width={SignUpIllustration.width}
            height={SignUpIllustration.height}
            className="w-full h-auto max-w-xs md:max-w-full object-contain"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-0 sm:p-4">
          <div className='w-full flex flex-col items-center text-center'>
            <div className="flex flex-col text-white gap-1 justify-center items-center mb-4">
              <h1 className="font-bold text-2xl sm:text-3xl">Sign Up</h1>
              <p className="text-sm sm:text-base">Masukkan Informasi untuk Melakukan Sign Up</p>
            </div>
            <form className="flex flex-col w-full gap-3 sm:gap-4 mt-2 sm:mt-4" onSubmit={handleSignUp}>
              <input
                className="w-full px-4 py-2 text-sm sm:text-md bg-white rounded-md text-gray-800 transition-all duration-300 focus:border-transparent focus:outline-blue-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Nama Lengkap"
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-full px-4 py-2 text-sm sm:text-md bg-white rounded-md text-gray-800 transition-all duration-300 focus:border-transparent focus:outline-blue-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Alamat Email"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full px-4 py-2 text-sm sm:text-md bg-white rounded-md text-gray-800 transition-all duration-300 focus:border-transparent focus:outline-blue-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Kata Sandi"
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                color="secondary"
                text={isLoading ? "Memuat..." : "Sign Up" }
                disabled={isLoading}
                className="transition-all duration-150 active:scale-[0.98] mt-2"
              />
            </form>
            <div className="flex flex-row text-white gap-1 justify-center items-center mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm">Sudah punya Akun? Klik disini untuk <Link href='/sign-in'><span className='text-[var(--secondary)] font-bold'>Sign In</span></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}