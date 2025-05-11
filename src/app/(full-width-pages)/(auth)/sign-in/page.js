import SignInForm from '@/components/auth/sign-in/component';
import HeadNavigation from '@/components/header/head-navigation';

export default function SignIn() {
  return (
    <div className="w-full flex flex-col gap-38">
      <HeadNavigation />
      <SignInForm />
    </div>
  );
}
