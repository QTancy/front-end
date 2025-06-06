'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import '@fontsource/poppins';  
import '@fontsource/tilt-warp'; 
import '@fontsource/tilt-neon';

const faqs = [
  {
    question: 'What is Qtancy?',
    answer:
      'Qtancy is a website designed to help UMKM manage their operations more effectively. It offers tools that make it easy to scan receipts and convert them into organized, structured data, helping business owners save time and focus on growing their business.',
  },
  {
    question: 'How does Qtancy work?',
    answer: 'Qtancy uses machine learning to automate the process of organizing receipt data.',
  },
  {
    question: 'Is Qtancy secure?',
    answer: 'Yes, all data is encrypted and handled securely.',
  },
  {
    question: 'Who can use Qtancy?',
    answer: 'Qtancy is designed for small to medium-sized businesses and entrepreneurs.',
  },
  {
    question: 'Can Qtancy help improve my business?',
    answer: 'Yes, by automating tasks, it allows you to save time and focus on growth.',
  },
];

export default function FaqNewSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Content */}
        <div className="ml-30 max-w-md mt-16">
          <h2
            className="text-3xl md:text-5xl font-normal mb-2"
            style={{ fontFamily: '"Tilt Warp", sans-serif' }}
          >
            Frequently Asked <br />
            <span className="text-[var(--secondary)]">Questions</span>
          </h2>
          <p
            className="text-base md:text-lg text-black"
            style={{ fontFamily: '"Tilt Neon", sans-serif' }}
          >
            Find answers to common questions about how Qtancy helps small businesses simplify tasks
            like scanning receipts and organizing data, making business management easier and more
            efficient.
          </p>
        </div>

        {/* Right Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#E4FFF7] border-2 rounded-xl transition-all duration-300 border-[var(--secondary)] max-w-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`flex justify-between items-center w-full px-4 py-3 font-semibold text-left text-md md:text-lg transition-all duration-300 ${
                  activeIndex === index ? 'h-auto' : 'h-14'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', color: 'black' }}
              >
                {faq.question}
                <ChevronUp
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div
                  className="px-4 pb-3 text-sm md:text-base transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'black' }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
