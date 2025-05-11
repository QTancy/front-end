import HeadNavigation from '@/components/header/component';
import BodySection from '@/layout/bodysection';
import HeroSection from '@/layout/herosection';


export default function Home() {
  return(
    <div className="w-full">
      <div className="w-full flex flex-col gap-38 mb-30">
        <HeadNavigation />
        <HeroSection />
      </div>
      <div className="w-full flex flex-col gap-38 body-color-background-secondary">
        <BodySection />
      </div>
    </div>
  );
}
