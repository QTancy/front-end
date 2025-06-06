import HeadNavigation from '@/components/header/head-home';
import AnimatedSection from '@/components/ui/wrapper/animation-wrapper';
import RootWraper from '@/components/ui/wrapper/root-wrapper';
import BodySection from '@/layout/bodysection';
import FAQSection from '@/layout/faqsection';
import FooterSection from '@/layout/footersection';
import WhyQTancySection from '@/layout/functionsection';
import HeroSection from '@/layout/herosection';
import FooterTeam from '@/layout/teamsection';

export default function Home() {
  return (
    <div className="w-full">
      {/* HEADNAVIGATION SECTION - Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <HeadNavigation />
      </div>

      {/* HERO SECTION */}
      <AnimatedSection animationType="fadeUp">
        <RootWraper>
          <HeroSection />
        </RootWraper>
      </AnimatedSection>

      {/* FOOTER TEAM SECTION */}
      <AnimatedSection animationType="fadeUp">
        <FooterTeam />
      </AnimatedSection>

      {/* FUNCTION SECTION */}
      <AnimatedSection animationType='fadeRight'>
        <WhyQTancySection/>
      </AnimatedSection>

      {/* BODY SECTION */}
      <AnimatedSection animationType="fadeLeft">
        <RootWraper color={'secondary'}>
          <BodySection />
        </RootWraper>
      </AnimatedSection>

      {/* FAQ SECTION */}
      <AnimatedSection animationType="fadeRight">
        <RootWraper>
          <FAQSection />
        </RootWraper>
      </AnimatedSection>

      {/* FOOTER SECTION */}
      <AnimatedSection animationType="fadeUp">
        <RootWraper color={'secondary'}>
          <FooterSection />
        </RootWraper>
      </AnimatedSection>
    </div>
  );
}
