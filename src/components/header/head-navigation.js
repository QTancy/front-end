import { AppLogo, NotificationLogo, ProfilePicture } from '@/icons';
import Button from '../ui/buttons/buttons';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../sidebar/sidebar';
import {
  PlusLogo,
  AnalysisLogo,
  HomeLogo,
  SettingLogo,
  HistoryLogo,
} from '@/icons';

export default function HeadNavigation() {
  return (
    <div className="w-full flex justify-center items-center">
      <nav className="max-w-[1273px] w-full flex justify-between items-center p-4">
        {/* Kiri: Sidebar / Hamburger */}
        <div className="flex items-center gap-3">
          <Sidebar />
          <Image
            src={AppLogo.src}
            alt="App Logo"
            width={AppLogo.width}
            height={AppLogo.height}
          />
        </div>

        {/* Kanan: Button Navigasi */}
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Image
                src={ProfilePicture.src}
                alt="Profile"
                width={28}
                height={28}
                className="rounded-full"
              />
            </button>
          </Link>
          <Link href="/notifications">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Image
                src={NotificationLogo.src}
                alt="Notifications"
                width={20}
                height={20}
              />
            </button>
          </Link>
          <div className="flex gap-2 border-2 border-black px-3 py-1 rounded-full">
            <Link href="/sign-up">
              <Button color="secondary" text="Sign Up" />
            </Link>
            <Link href="/sign-in">
              <Button color="primary" text="Sign In" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
