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

export default function SignUpForm() {
  return (
    <div className="w-full flex justify-center gap-72">
      <div className="flex flex-col gap-9 items-center justify-center">
        <Image src={AppLogo.src} alt="App Logo" width={478} height={40} />
        <Image
          src={SignUpIllustration.src}
          alt="Sign In Illustration"
          width={SignUpIllustration.width}
          height={SignUpIllustration.height}
        />
      </div>
      <div className="max-w-[400px]  flex flex-col items-center justify-center p-4 rounded-3xl sign-form drop-shadow-xl shadow-xl">
        <div className="flex flex-col gap-1 justify-center text-white items-center m-3">
          <h1 className="font-bold text-3xl">Sign Up</h1>
          <p className="text-sm">Enter your email to sign up for this app</p>
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
          <Button color="secondary" text="Sign Up" />
        </form>
        <div className=" w-full flex items-center text-white justify-center m-3">
          <p>or continue with</p>
        </div>

        <div className="w-full flex justify-center items-center gap-6 mb-3">
          <IconsWrapper icon={<GoogleLogo />} alt="Google Icon" />
          <IconsWrapper icon={<TwitterLogo />} alt="Twitter Icon" />
          <IconsWrapper icon={<FacebookLogo />} alt="Facebook Icon" />
        </div>

        <div className="w-full flex text-center text-white items-center">
          <p className="text-sm">
            By Clicking continue, you agree to our{' '}
            <a className="link-in-sign-form">Terms of Services</a> and{' '}
            <a className="link-in-sign-form">Privacy Polices</a>
          </p>
        </div>
      </div>
    </div>
  );
}
