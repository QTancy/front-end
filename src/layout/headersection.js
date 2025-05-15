'use client';

import React, { useState } from 'react';
import './headersection.css'; // buat styling custom di sini

function HeaderSection() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleNav}>
          &#9776;
        </button>
        <h1 className="logo">|||QTANCY|||</h1>
      </div>

      <div className="header-right">
        <div className="notification">
          <span className="notif-icon">🔔</span>
          <span className="notif-badge">1</span>
        </div>
        <img src="/assets/profile.jpg" alt="profile" className="profile-pic" />
      </div>

      {isNavOpen && (
        <nav className="side-nav">
          <h3>Page</h3>
          <button>🏠 Home</button>
          <button>➕ QCap</button>
          <button>⏳ History</button>
          <button>📄 QRep</button>
          <button>⚙️ Account & Profile</button>
        </nav>
      )}
    </header>
  );
}

export default HeaderSection;
