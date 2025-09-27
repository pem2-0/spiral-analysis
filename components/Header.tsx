
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center bg-black/20 p-4 rounded-xl border border-indigo-500/20 shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 tracking-wider">
        Spiral Analysis – Quantum Kick Cosmogenesis
      </h1>
      <p className="text-sm text-indigo-300/70 mt-2">
        By Quincy Allen Jones
      </p>
    </header>
  );
};

export default Header;
