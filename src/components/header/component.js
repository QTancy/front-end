import { AppLogo } from '@/icons';
import Button from '../ui/buttons/buttons';
import Image from 'next/image';
import Link from 'next/link';

export default function HeadNavigation() {
  return (
    <nav className="w-full flex justify-center items-center p-4 gap-200">
      <Image
        src={AppLogo.src}
        alt="App Logo"
        width={AppLogo.width}
        height={AppLogo.height}
      />
      <div className="flex gap-7 px-2.5 py-1.5 border-2 border-black rounded-full">
        <Link href="/sign-up">
          <Button color="secondary" text="Sign Up" />
        </Link>
        <Link href="/sign-in">
          <Button color="primary" text="Sign In" />
        </Link>
      </div>
    </nav>
  );
}
