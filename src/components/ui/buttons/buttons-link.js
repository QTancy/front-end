import Image from 'next/image';

/**
 *
 * @param {Icon} icon Icon yang muncul pada tombol, harus berupa Icon yang diimport dari icons/index.js
 * @param {string} alt Kalimat/kata yang muncul jika icon tidak terload dengan baik
 * @param {string} text Kalimat/Kata yang muncul pada buttonnya
 * @returns
 */
export default function ButtonLink({ icon, alt, text }) {
  let flag = false;
  if (icon) {
    flag = true;
  }

  return (
    <div className="flex flex-row justify-start gap-1.5 items-start">
      {flag && (
        <Image
          src={icon.src}
          alt={alt}
          width={icon.width}
          height={icon.height}
        />
      )}
      {text === '' ? (
        <></>
      ) : (
        <p className="color-text-primary text-lg text-justify">{text}</p>
      )}
    </div>
  );
}
