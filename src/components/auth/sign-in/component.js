'use client'
import Button from '@/components/ui/buttons/buttons';
import { SignInIllustration } from '@/icons';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/api/auth';
import gsap from 'gsap';

export default function SignInForm() {
  const [email, setEmail] = useState('');
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn(email, password);
      const token = response.user.token;
      console.log(token);
      if (token) { 
        localStorage.setItem('token', token);
        console.log("TOKEN DISIMPAN");
        Swal.fire({
            title: "Sign In Berhasil!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }
        ).then(() => {
          router.push('/qcap');
        });
      }
    } catch (error) { 
      setError(error.message || 'Terjadi kesalahan saat sign in. Silakan coba lagi.');
      Swal.fire({
        icon: 'error',
        title: 'Gagal Sign In!',
        text:
          error.message || 'Terjadi kesalahan saat sign in. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  };

  return (
    <div 
      ref={formContainerRef} 
      className='w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 
                 p-6 sm:p-8 md:p-9 rounded-3xl bg-[#36D5A7] drop-shadow-xl shadow-xl 
                 mx-auto' // Menambahkan mx-auto untuk centering di mobile
    >
      <Link href='/' className='flex items-center w-fit mb-3 text-white'> {/* Tambahkan text-white */}
        <ChevronLeft/>
        <p className='font-bold text-sm sm:text-base'>Homepage</p> {/* Sesuaikan ukuran font */}
      </Link>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10"> {/* flex-col di mobile, flex-row di desktop, sesuaikan gap */}
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-0 sm:p-4"> {/* Hapus p-4 tetap, gunakan p-0 atau padding lebih kecil */}
          <div className='w-full flex flex-col items-center text-center'>
            <div className="flex flex-col text-white gap-1 justify-center items-center mb-4"> {/* Tambahkan margin-bottom */}
              <h1 className="font-bold text-2xl sm:text-3xl">Sign In</h1> {/* Sesuaikan ukuran font */}
              <p className="text-sm sm:text-base">Masukkan Email Anda Untuk Sign In</p> {/* Sesuaikan ukuran font */}
            </div>
            <form className="flex flex-col w-full gap-3 sm:gap-4 mt-2 sm:mt-4" onSubmit={handleSignIn}> {/* Sesuaikan gap dan margin-top */}
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
                min="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button 
                color="secondary" 
                text={isLoading ? "Memuat..." : "Sign In" }
                disabled={isLoading} 
                className="transition-all duration-150 active:scale-[0.98] mt-2" // Tambahkan margin-top
              />
            </form>
            <div className="flex flex-row text-white gap-1 justify-center items-center mt-3 sm:mt-4"> {/* Sesuaikan margin-top */}
              <p className="text-xs sm:text-sm">Belum memiliki Akun? Klik disini untuk <Link href='/sign-up'><span className='text-[var(--secondary)] font-bold'>Sign Up</span></Link></p> {/* Sesuaikan ukuran font */}
            </div>
          </div>
        </div>
        {/* Illustration Section - Sembunyikan di mobile kecil, tampil di md ke atas */}
        <div className="hidden md:flex flex-col gap-9 items-center justify-center md:w-1/2">
          <Image
            src={SignInIllustration}
            alt="Sign In Illustration"
            width={SignInIllustration.width}
            height={SignInIllustration.height}
            className="w-full h-auto max-w-xs md:max-w-full object-contain" // Sesuaikan ukuran gambar responsif
          />
        </div>
      </div>
    </div>
  );
}
