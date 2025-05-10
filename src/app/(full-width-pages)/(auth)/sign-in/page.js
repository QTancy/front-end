import SignInForm from '@/components/auth/sign-in/component';
import HeadNavigation from '@/components/header/component';

export default function SignIn() {
  return (
    <div className="w-full flex flex-col gap-38">
      <HeadNavigation />
      <SignInForm />
    </div>
  );
}
