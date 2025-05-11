import Image from 'next/image';

export default function ButtonLink({ icon, alt, text }) {
  return (
    <div className="flex flex-row justify-start gap-1.5 items-start">
      <Image src={icon.src} alt={alt} width={icon.width} height={icon.height} />
      {text === '' ? (
        <></>
      ) : (
        <p className="color-text-primary text-lg text-justify">{text}</p>
      )}
    </div>
  );
}
