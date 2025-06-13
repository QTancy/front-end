'use client';
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import '@fontsource/poppins';
import '@fontsource/tilt-warp';
import '@fontsource/tilt-neon';

const faqs = [
  {
    question: 'Apa Itu QTancy?',
    answer:
      'Qtancy sebuah website yang didesain untuk membantu UMKM mengatur biaya operasi meraka dengan lebih efektif. QTancy menawarkan alat yang memudahkan untuk memindai tanda terima dan mengubahnya menjadi data yang terorganisir dan terstruktur, membantu pemilik bisnis menghemat waktu dan fokus pada pertumbuhan bisnis mereka.',
  },
  {
    question: 'Bagaimana cara kerja Qtancy?',
    answer: 'Qtancy menggunakan machine learning untuk mengotomatisasi proses pengorganisasian data struk.',
  },
  {
    question: 'Apakah Qtancy aman?',
    answer: 'Ya, semua data dienkripsi dan ditangani dengan aman.',
  },
  {
    question: 'Siapa yang dapat menggunakan Qtancy?',
    answer: 'Qtancy dirancang untuk usaha kecil hingga menengah dan wirausahawan.',
  },
  {
    question: 'Bisakah Qtancy membantu meningkatkan bisnis saya?',
    answer: 'Ya, dengan mengotomatisasi tugas, Qtancy memungkinkan Anda menghemat waktu dan fokus pada pertumbuhan.',
  },
];

export default function FaqNewSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-white py-12 px-6 md:py-20 md:px-16"> {/* Sesuaikan padding vertikal dan horizontal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start"> {/* Sesuaikan gap, gunakan grid-cols-1 di mobile, grid-cols-2 di desktop */}
        {/* Left Content (Text) */}
        {/* Hilangkan ml-30 dan mt-16 yang tetap. Gunakan padding/margin responsif dari parent grid/flex */}
        <div className="w-full text-center md:text-left md:max-w-md mx-auto md:mx-0"> {/* Tengah di mobile, rata kiri di desktop. Atur max-width untuk konten teks agar tidak terlalu lebar */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 text-black leading-tight" // Sesuaikan ukuran font dan line-height
            style={{ fontFamily: '"Tilt Warp", sans-serif' }}
          >
            Frequently Asked <br />
            <span className="text-[var(--secondary)]">Questions</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-black leading-relaxed" // Sesuaikan ukuran font dan line-height
            style={{ fontFamily: '"Tilt Neon", sans-serif' }}
          >
            Temukan jawaban atas pertanyaan umum tentang bagaimana Qtancy membantu bisnis kecil menyederhanakan tugas-tugas seperti memindai struk dan mengorganisir data, membuat manajemen bisnis lebih mudah dan efisien.
          </p>
        </div>

        {/* Right Accordion */}
        <div className="flex flex-col gap-4 w-full md:max-w-xl mx-auto md:mx-0"> {/* Sesuaikan gap dan max-width accordion */}
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#E4FFF7] border-2 rounded-xl transition-all duration-300 border-[var(--secondary)] overflow-hidden" // Tambahkan overflow-hidden untuk transisi jawaban
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`flex justify-between items-center w-full px-4 py-3 font-semibold text-left text-base md:text-lg transition-all duration-300`} // Sesuaikan ukuran font
                style={{ fontFamily: 'Poppins, sans-serif', color: 'black' }}
              >
                {faq.question}
                <ChevronUp
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${ // Tambahkan flex-shrink-0
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {/* Transisi jawaban menggunakan max-height atau Tailwind's group/open */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div 
                  className="overflow-hidden px-4 pb-3 text-sm md:text-base" // Sesuaikan ukuran font
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'black' }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}