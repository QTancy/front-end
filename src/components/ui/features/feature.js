import Image from 'next/image';
import Button from '../buttons/buttons';

export default function Features({ logo, featureName, description }) {
  return (
    <div className="w-full flex flex-col justify-start body-color-primary p-5 gap-2.5 rounded-3xl">
      <div>
        <Image
          src={logo.src}
          alt="Qrep Logo"
          width={logo.width}
          height={logo.height}
        />
      </div>
      <div className="w-full flex flex-col color-text-background gap-4">
        <h1 className="text-bold text-2xl font-bold">{featureName}</h1>
        <p className="text-md text-justify">{description}</p>
      </div>
      <div className="w-full">
        <Button color="secondary" text="Try Now" />
      </div>
    </div>
  );
}
