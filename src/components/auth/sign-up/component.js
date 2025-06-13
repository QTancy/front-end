'use client'

import Button from '@/components/ui/buttons/buttons';
import IconsWrapper from '@/components/ui/wrapper/icons-wrapper';
import {
  AppLogo,
  FacebookLogo,
  GoogleLogo,
  SignInIllustration,
  SignUpIllustration,
  TwitterLogo,
} from '@/icons';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/api/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setError(null);

    try {
      await signUp(name,email,password)
      Swal.fire({
        title: "Sign In Berhasil!",
        icon: "success",
        draggable: true,
        confirmButtonText:"Lanjut"
      }).then((result) => {
        if(result.isConfirmed){
          router.push("/sign-in")
        }
      })
    } catch (error) { 
      setError(error.message || 'Terjadi kesalahan saat sign up. Silakan coba lagi.');
    } finally { 
      setIsLoading(false);
    }
  }

  return (
    <div className='w-fit p-9 rounded-3xl bg-[var(--primary)] drop-shadow-xl shadow-xl'>
      <Link href='/' className='flex w-fit items-left mb-3'>
        <ChevronLeft/>
        <p className='font-bold'>Homepage</p>
      </Link>
      <div className="w-full flex justify-center items-center gap-5">
        <div className="flex flex-col gap-9 items-center justify-center">
          <Image
            src={SignUpIllustration}
            alt="Sign In Illustration"
            width={SignUpIllustration.width}
            height={SignUpIllustration.height}
          />
        </div>
        <div className="max-w-[400px] w-full flex flex-col items-center justify-center  p-4">
          <div className='w-full flex flex-col items-center text-center'>
            <div className="flex flex-col text-white gap-1 justify-center items-center">
              <h1 className="font-bold text-3xl">Sign Up</h1>
              <p className="text-sm">Masukkan Informasi untuk Melakukan Sign Up</p>
            </div>
            <form className="flex flex-col w-full gap-4 mt-4" onSubmit={handleSignUp}>
              <input
                className="w-full px-4 py-2 text-md bg-white rounded-md text-gray-800 focus:border-transparent focus:outline-blue-400"
                placeholder="Nama Lengkap"
                id="name"
                type="string"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-full px-4 py-2 text-md bg-white rounded-md text-gray-800 focus:border-transparent focus:outline-blue-400"
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
                className="w-full px-4 py-2 text-md bg-white rounded-md text-gray-800 focus:border-transparent focus:outline-blue-400"
                placeholder="Kata Sandi"
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              { error && (
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${error}`,
                })
              )}
              <Button 
                color="secondary" 
                text={isLoading ? "Memuat..." : "Sign Up" }
                disabled = {isLoading} 
              />
            </form>
            <div className="flex flex-row text-white gap-1 justify-center items-center mt-4">
              <p className="text-sm">Sudah punya Akun? Klik disini untuk <Link href='/sign-in'><span className='text-[var(--secondary)] font-bold'>Sign In</span></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
