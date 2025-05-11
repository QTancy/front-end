import HeaderSubHeader from '@/components/header/header-subheader';
import FAQItems from '@/components/ui/faq/faq-items';
import FAQWrapper from '@/components/ui/wrapper/faq-wrapper';
import SectionWraper from '@/components/ui/wrapper/section-wraper';

export default function FAQSection() {
  return (
    <SectionWraper className={'flex-col mt-20 gap-30'}>
      <HeaderSubHeader
        header={'FAQ'}
        subHeader={'Frequently Asked Questions!'}
        subColor={'secondary'}
      />
      <div className="flex flex-col justify-between gap-16">
        <FAQWrapper />
        <FAQWrapper />
        <FAQWrapper />
      </div>
    </SectionWraper>
  );
}
