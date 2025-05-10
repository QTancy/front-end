import SignInForm from '@/components/auth/sign-in/component';
import SignUpForm from '@/components/auth/sign-up/component';
import HeadNavigation from '@/components/header/component';

export default function SignUp() {
  return (
    <div className="w-full flex flex-col gap-38">
      <HeadNavigation />
      <SignUpForm />
    </div>
  );
}
