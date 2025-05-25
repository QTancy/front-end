import HeadNavigation from '@/components/header/head-navigation';
import AnimatedSection from '@/components/ui/wrapper/animation-wrapper';
import RootWraper from '@/components/ui/wrapper/root-wrapper';
import BodySection from '@/layout/bodysection';
import FAQSection from '@/layout/faqsection';
import FooterSection from '@/layout/footersection';
import HeroSection from '@/layout/herosection';

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <AnimatedSection animationType='fadeUp'>
        <RootWraper>
          <HeadNavigation />
          <HeroSection />
        </RootWraper>
      </AnimatedSection>

      {/* BODY SECTION */}
      <AnimatedSection animationType='fadeLeft'>
        <RootWraper color={'secondary'}>
          <BodySection />
        </RootWraper>
      </AnimatedSection>

      {/* FAQ SECTION */}
      <AnimatedSection animationType='fadeRight'>
        <RootWraper>
          <FAQSection />
        </RootWraper>
      </AnimatedSection>

      {/* FOOTER SECTION */}
      <AnimatedSection animationType='fadeUp'>
        <RootWraper color={'secondary'}>
          <FooterSection />
        </RootWraper>
      </AnimatedSection>
    </div>
  );
}
