import HeadNavigation from '@/components/header/head-navigation';
import RootWraper from '@/components/ui/wrapper/root-wrapper';
import BodySection from '@/layout/bodysection';
import FAQSection from '@/layout/faqsection';
import FooterSection from '@/layout/footersection';
import HeroSection from '@/layout/herosection';

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <RootWraper>
        <HeadNavigation />
        <HeroSection />
      </RootWraper>

      {/* BODY SECTION */}
      <RootWraper color={'secondary'}>
        <BodySection />
      </RootWraper>

      {/* FAQ SECTION */}
      <RootWraper>
        <FAQSection />
      </RootWraper>

      {/* FOOTER SECTION */}
      <RootWraper color={'secondary'}>
        <FooterSection />
      </RootWraper>
    </div>
  );
}