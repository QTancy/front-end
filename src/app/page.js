import RootWrapper from '@/components/ui/wrapper/root-wrapper';
import HeaderSection from '@/layout/headersection';
import HeroSection from '@/layout/herosection';
import BodySection from '@/layout/bodysection';
import FAQSection from '@/layout/faqsection';
import FooterSection from '@/layout/footersection';

export default function Home() {
  return (
    <div className="w-full">
      {/* ================= HEADER & HERO SECTION ================ */}
      <RootWrapper>
        <HeaderSection />
        <HeroSection />
      </RootWrapper>

      {/* ===================== BODY SECTION ===================== */}
      <RootWrapper color="secondary">
        <BodySection />
      </RootWrapper>

      {/* ===================== FAQ SECTION ====================== */}
      <RootWrapper>
        <FAQSection />
      </RootWrapper>

      {/* ===================== FOOTER SECTION =================== */}
      <RootWrapper color="secondary">
        <FooterSection />
      </RootWrapper>
    </div>
  );
}
