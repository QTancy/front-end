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

export default function SignInForm() {
  return (
    <div className="w-full flex justify-center gap-72">
      <div className="max-w-[400px] flex flex-col items-center justify-center p-4 rounded-3xl sign-form drop-shadow-xl shadow-xl">
        <div className="flex flex-col gap-1 justify-center items-center m-3">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <p className="text-sm">Enter your email to sign in for this app</p>
        </div>
        <form className="flex flex-col w-full gap-4">
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
          <Button color="secondary" text="Sign In" />
        </form>
        <div className=" w-full flex items-center justify-center m-3">
          <p>or continue with</p>
        </div>

        <div className="w-full flex justify-center items-center gap-6 mb-3">
          <IconsWrapper icon={<GoogleLogo />} alt="Google Icon" />
          <IconsWrapper icon={<TwitterLogo />} alt="Twitter Icon" />
          <IconsWrapper icon={<FacebookLogo />} alt="Facebook Icon" />
        </div>

        <div className="w-full flex text-center items-center">
          <p className="text-sm">
            By Clicking continue, you agree to our{' '}
            <a className="link-in-sign-form">Terms of Services</a> and{' '}
            <a className="link-in-sign-form">Privacy Polices</a>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-9 items-center justify-center">
        <Image src={AppLogo.src} alt="App Logo" width={478} height={40} />
        <Image
          src={SignInIllustration.src}
          alt="Sign In Illustration"
          width={SignInIllustration.width}
          height={SignInIllustration.height}
        />
      </div>
    </div>
  );
}
