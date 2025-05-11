import OtherLinkComponent from '@/components/footer/other-link';
import SubscribeComponent from '@/components/footer/subscribe';
import SectionWrapper from '@/components/ui/wrapper/section-wraper';
import { FacebookLogo } from '@/icons';

export default function FooterSection() {
  console.log(FacebookLogo);

  return (
    <SectionWrapper className={'flex-col gap-90'}>
      <SubscribeComponent />

      <OtherLinkComponent />
    </SectionWrapper>
  );
}
