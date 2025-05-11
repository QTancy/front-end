import { RightArrowLogo } from '@/icons';
import Image from 'next/image';

export default function FAQItems({ question, answer }) {
  return (
    <div className="flex w-full rounded-xl body-color-primary faq-wrapper">
      <div className="faq-items">
        <div className="w-full flex flex-row items-center justify-between">
          <p>{question}</p>
          <Image
            src={RightArrowLogo.src}
            alt="Right Arrow"
            width={RightArrowLogo.width}
            height={RightArrowLogo.height}
          />
        </div>
      </div>
      <div className="hide px-8 pb-6 color-text-background">
        <p>{answer}</p>
      </div>
    </div>
  );
}
