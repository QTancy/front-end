'use client';

import React from 'react';

export default function FooterTeam() {
  return (
    <footer className="w-full bg-[#E6FFFA] py-10 flex justify-center">
      {/* Kontainer tengah agar lebar konsisten */}
      <div className="w-full max-w-screen-xl px-4 flex flex-col items-center justify-center gap-6">
        {/* Tombol tim */}
        <button className="px-6 py-3 border border-[var(--secondary)] bg-white text-[var(--secondary)] rounded-full text-lg font-medium hover:bg-gray-100 transition">
          Made by CC25-CF269
        </button>

        {/* Daftar nama anggota */}
        <div className="flex flex-wrap justify-center gap-10 text-[var(--secondary)] font-bold text-lg text-center">
          <span>Pandu Persada</span>
          <span>Rachelle Melody</span>
          <span>Ulayya Thifal</span>
          <span>Ghiffari Kenang</span>
          <span>M. Hafidz Rizki</span>
          <span>I Wayan Satya</span>
        </div>
      </div>
    </footer>
  );
}
