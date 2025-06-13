
import HeadNavigation from '@/components/header/head-home';
import AnimatedSection from '@/components/ui/wrapper/animation-wrapper';
import WhyQTancySection from '@/layout/functionsection';
import HeroSection from '@/layout/herosection';
import FooterTeam from '@/layout/teamsection';
import QcapFunctionSection from '@/layout/qcapsection';
import QrepFunctionSection from '@/layout/qrepsection';
import FaqNewSection from '@/layout/faqnewsection';
import Footer from '@/layout/footernewsection';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Head>
        <link rel='icon' href='./favicon.ico' />
      </Head>
      {/* HEADNAVIGATION SECTION - Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <HeadNavigation />
      </div>

      {/* Konten Utama */}
      <AnimatedSection animationType="fadeUp">
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection animationType="fadeUp" id="our-team-section">
        <FooterTeam />
      </AnimatedSection>

      <AnimatedSection animationType='fadeRight' id="why-qtancy-section">
        <WhyQTancySection/>
      </AnimatedSection>

      <AnimatedSection animationType='fadeLeft' id="qcap-product-section">
        <QcapFunctionSection/>
      </AnimatedSection>

      <AnimatedSection animationType='fadeRight' id="qrep-product-section">
        <QrepFunctionSection/>
      </AnimatedSection>

      <AnimatedSection animationType='fadeUp' id="faq-section">
        <FaqNewSection/>
      </AnimatedSection>

      <AnimatedSection animationType='fadeUp'>
        <Footer/>
      </AnimatedSection>
    </div>
  );
}