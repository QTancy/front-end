import HeadNavigation from '@/components/header/head-home';
import AnimatedSection from '@/components/ui/wrapper/animation-wrapper';
import RootWraper from '@/components/ui/wrapper/root-wrapper';
import WhyQTancySection from '@/layout/functionsection';
import HeroSection from '@/layout/herosection';
import FooterTeam from '@/layout/teamsection';
import QcapFunctionSection from '@/layout/qcapsection';
import QrepFunctionSection from '@/layout/qrepsection';
import FaqNewSection from '@/layout/faqnewsection';
import Footer from '@/layout/footernewsection';

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

      {/* Qcap Section Function */}
      <AnimatedSection animationType='fadeLeft'>
        <QcapFunctionSection/>
      </AnimatedSection>

      {/* Qrap Section Function */}
      <AnimatedSection animationType='fadeRight'>
        <QrepFunctionSection/>
      </AnimatedSection>

      {/* FAQ NEW SECTION */}
      <AnimatedSection animationType='fadeUp'>
        <FaqNewSection/>
      </AnimatedSection>

      {/* FAQ NEW SECTION */}
      <AnimatedSection animationType='fadeUp'>
        <Footer/>
      </AnimatedSection>
    </div>
  );
}
