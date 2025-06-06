import React from "react";
import Image from 'next/image';
import { AppLogo2 } from '@/icons'; // asumsi ini file gambar PNG/SVG, bukan komponen

const Footer = () => {
  return (
    <footer className="bg-[var(--secondary)] text-white text-sm">
      <div className="container px-6 py-16 mx-auto">
        <div className="flex flex-wrap md:text-left text-center gap-8 justify-between">
          {/* Logo */}
          <div className="w-full md:w-1/2 lg:w-1/5 flex justify-center md:justify-start mb-8 md:mb-0">
            <Image
              src={AppLogo2}
              alt="QTANCY Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Kolom Link 1 */}
          <div className="w-1/2 sm:w-auto">
            <h2 className="font-semibold tracking-wider text-sm mb-3">PRODUCTS</h2>
            <ul className="space-y-2">
              {["Feature One", "Feature Two", "Feature Three", "Feature Four"].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline hover:text-gray-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Link 2 */}
          <div className="w-1/2 sm:w-auto">
            <h2 className="font-semibold tracking-wider text-sm mb-3">COMPANY</h2>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Contact"].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline hover:text-gray-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="w-full lg:w-2/5">
            <h2 className="font-semibold tracking-wider text-sm mb-3">SUBSCRIBE</h2>
            <p className="mb-2">Get the latest updates and offers</p>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded border border-white bg-white bg-opacity-10 text-white placeholder-white focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-5 py-2 rounded bg-black text-white hover:bg-white hover:text-black transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black bg-opacity-10">
        <div className="container px-6 py-5 mx-auto flex flex-col sm:flex-row items-center justify-between">
          {/* Logo and Text */}
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Image src={AppLogo2} alt="QTANCY Logo" width={28} height={28} />
            <span className="text-base font-medium">QTANCY</span>
            <span className="text-sm text-white/70">© 2025 QTANCY. All rights reserved.</span>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            {[
              { title: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { title: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53..." },
              { title: "Instagram", path: "M16 11.37A4 4 0 1112.63 8..." },
              { title: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7..." },
            ].map(({ title, path }, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-gray-300 transition"
                title={title}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
