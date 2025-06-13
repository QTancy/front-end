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
import Head from 'next/head';

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <link rel='icon' href='./favicon.ico' />
      </Head>
      {/* HEADNAVIGATION SECTION - Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <HeadNavigation />
      </div>

      {/* HERO SECTION */}
      <AnimatedSection animationType="fadeUp">
        <HeroSection />
      </AnimatedSection>

      {/* OUR TEAM SECTION */}
      <AnimatedSection animationType="fadeUp" id="our-team-section"> {/* Tambahkan ID ini */}
        <FooterTeam />
      </AnimatedSection>

      {/* WHY QTANCY / FUNCTION SECTION */}
      <AnimatedSection animationType='fadeRight' id="why-qtancy-section"> {/* Tambahkan ID ini */}
        <WhyQTancySection/>
      </AnimatedSection>

      {/* OUR PRODUCT SECTION - QCAP */}
      <AnimatedSection animationType='fadeLeft' id="qcap-product-section"> {/* Tambahkan ID ini */}
        <QcapFunctionSection/>
      </AnimatedSection>

      {/* OUR PRODUCT SECTION - QREP */}
      <AnimatedSection animationType='fadeRight' id="qrep-product-section"> {/* Tambahkan ID ini */}
        <QrepFunctionSection/>
      </AnimatedSection>

      {/* FAQ NEW SECTION */}
      <AnimatedSection animationType='fadeUp' id="faq-section"> {/* Tambahkan ID ini */}
        <FaqNewSection/>
      </AnimatedSection>

      {/* FAQ NEW SECTION */}
      <AnimatedSection animationType='fadeUp'>
        <Footer/>
      </AnimatedSection>
    </div>
  );
}
