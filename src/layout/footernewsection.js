import React from "react";
import Image from "next/image";
import "@fontsource/tilt-warp";
import { AppLogo2, QTancyFooterLogo } from "@/icons";

const FooterSection = () => {
  return (
    <div className="mt-20">
      {/* CTA Section */}
      <section className="bg-[#4356E0] text-white py-16 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div>
            <Image src={QTancyFooterLogo} alt="QTANCY Logo" width={240} height={40} />
          </div>

          {/* Heading */}
          <h2 className="text-lg md:text-xl font-light font-['Tilt_Warp'] text-white">
            Mulai bangun bisnis anda dengan <br /> personal AI manajer 
          </h2>

          {/* Email Form */}
          <div className="flex justify-center items-center gap-4 px-4 flex-col md:flex-row">
            <div className="flex items-center bg-white rounded-full px-4 py-2 w-[300px] md:w-[400px]">
              <span className="text-gray-400 mr-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Masukkan Email Anda!"
                className="outline-none w-full text-black bg-transparent"
              />
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 mt-2 md:mt-0">
              Coba Sekarang!
            </button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      

      {/* Footer Section */}
      <footer className="bg-black text-white text-sm">
        <div className="w-full mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo kiri */}
          <div className="mb-4 md:mb-0">
            <Image src={QTancyFooterLogo} alt="QTANCY Logo" width={100} height={40} />
          </div>

          {/* Hak Cipta tengah */}
          <div className="text-center mb-4 md:mb-0">
            ©2025 QTancy. All rights reserved.
          </div>

          {/* Sosial Media kanan */}
          <div className="flex gap-4">
            {/* Twitter */}
            <a href="#" title="Twitter">
              <svg fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53C21.14 2.47 20.08 2 19 2c-2.21 0-4 1.79-4 4 0 .31.03.61.1.9C10.96 6.79 7.64 4.91 5.34 2.12a4 4 0 00-.54 2.02c0 1.39.71 2.62 1.8 3.34A4 4 0 014 7.29v.05a4.01 4.01 0 003.21 3.92A4.01 4.01 0 014.8 12v.05a4 4 0 003.75 3.73A8.03 8.03 0 012 19.54 11.3 11.3 0 008.29 21c7.55 0 11.68-6.25 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0023 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" title="Instagram">
              <svg fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" title="Facebook">
              <svg fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
