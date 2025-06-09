import Button from '@/components/ui/buttons/buttons';
import IconsWrapper from '@/components/ui/wrapper/icons-wrapper';
import {
  AppLogo,
  FacebookLogo,
  GoogleLogo,
  SignInIllustration,
  TwitterLogo,
} from '@/icons';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SignInForm() {
  return (
    <div className='w-fit p-9 rounded-3xl bg-[var(--primary)] drop-shadow-xl shadow-xl'>
      <Link href='/' className='flex w-fit items-left mb-3'>
        <ChevronLeft/>
        <p className='font-bold'>Homepage</p>
      </Link>
      <div className="w-full flex justify-center items-center gap-5">
        <div className="max-w-[400px] w-full flex flex-col items-center justify-center  p-4">
          <div className='w-full flex flex-col items-center text-center'>
            <div className="flex flex-col text-white gap-1 justify-center items-center">
              <h1 className="font-bold text-3xl">Sign In</h1>
              <p className="text-sm">Enter your email to sign in for this app</p>
            </div>
            <form className="flex flex-col w-full gap-4 mt-4">
              <input
                className="w-full px-4 py-2 text-md bg-white rounded-md text-gray-800 focus:border-transparent focus:outline-blue-400"
                placeholder="email@domain.com"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
              <input
                className="w-full px-4 py-2 text-md bg-white rounded-md text-gray-800 focus:border-transparent focus:outline-blue-400"
                placeholder="password"
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                required
              />
              <Link href="/homepage" className='mt-4'>
                <Button color="secondary" text="Sign In" />
              </Link>
            </form>
            <div className="flex flex-row text-white gap-1 justify-center items-center mt-4">
              <p className="text-sm">Belum memiliki Akun? Klik disini untuk <Link href='/sign-up'><span className='text-[var(--secondary)] font-bold'>Sign Up</span></Link></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 items-center justify-center">
          <Image
            src={SignInIllustration}
            alt="Sign In Illustration"
            width={SignInIllustration.width}
            height={SignInIllustration.height}
          />
        </div>
      </div>
    </div>
  );
}
