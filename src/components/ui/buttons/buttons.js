/**
 * 
 * @param {string} color Menentukan warna (bisa : primary, secondary, background, dan foreground)
 * @param {string} text Kalimat/kata yang muncul pada Button
 *
 */

export default function Button({ color, text }) {
  return (
    <button
      className={`custom-button-${color}  p-2.5 w-full rounded-full font-2xl font-bold border-none cursor-default hover:cursor-pointer hover:scale-105 focus:outline-none`}
    >
      {text}
    </button>
  );
}
