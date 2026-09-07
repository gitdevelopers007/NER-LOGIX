import React from 'react';

export const EmblemOfIndia: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Authentic Indian State Emblem (Lion Capital of Ashoka) */}
      <svg 
        viewBox="0 0 100 125" 
        className="h-10 w-auto"
        fill="currentColor"
        style={{ color: '#1a2332' }}
      >
        {/* Top 3 visible Lions */}
        {/* Central Lion */}
        <path d="M44 8 C44 5, 56 5, 56 8 C57 11, 56 15, 54 18 C58 19, 58 24, 55 27 C57 30, 55 35, 53 38 C55 42, 53 47, 50 48 C47 47, 45 42, 47 38 C45 35, 43 30, 45 27 C42 24, 42 19, 46 18 C44 15, 43 11, 44 8 Z" fill="#1b2a41" />
        {/* Left Lion */}
        <path d="M34 14 C32 11, 26 12, 27 16 C25 18, 25 23, 28 26 C26 29, 28 34, 31 36 C30 40, 33 44, 38 46 C41 43, 41 38, 39 35 C41 32, 41 27, 38 25 C41 22, 40 17, 36 16 C36 13, 35 12, 34 14 Z" fill="#1b2a41" />
        {/* Right Lion */}
        <path d="M66 14 C68 11, 74 12, 73 16 C75 18, 75 23, 72 26 C74 29, 72 34, 69 36 C70 40, 67 44, 62 46 C59 43, 59 38, 61 35 C59 32, 59 27, 62 25 C59 22, 60 17, 64 16 C64 13, 65 12, 66 14 Z" fill="#1b2a41" />

        {/* Lion Details: Manes and faces */}
        <circle cx="50" cy="14" r="2.5" fill="#f8fafc" />
        <circle cx="48" cy="13.5" r="0.8" fill="#1b2a41" />
        <circle cx="52" cy="13.5" r="0.8" fill="#1b2a41" />
        <circle cx="34" cy="20" r="1.5" fill="#f8fafc" />
        <circle cx="66" cy="20" r="1.5" fill="#f8fafc" />

        {/* Abacus / Base Platform */}
        <path d="M22 52 L78 52 L76 56 L24 56 Z" fill="#1b2a41" />
        
        {/* Ashoka Chakra in center of abacus */}
        <circle cx="50" cy="62" r="7" stroke="#1b2a41" strokeWidth="1.8" fill="none" />
        <circle cx="50" cy="62" r="1.5" fill="#1b2a41" />
        {/* 24 spokes (represented with clean cross lines) */}
        <line x1="50" y1="55" x2="50" y2="69" stroke="#1b2a41" strokeWidth="0.8" />
        <line x1="43" y1="62" x2="57" y2="62" stroke="#1b2a41" strokeWidth="0.8" />
        <line x1="45" y1="57" x2="55" y2="67" stroke="#1b2a41" strokeWidth="0.8" />
        <line x1="45" y1="67" x2="55" y2="57" stroke="#1b2a41" strokeWidth="0.8" />

        {/* Horse on left */}
        <path d="M26 60 Q32 58 35 63 Q37 66 33 66 Q29 66 26 60 Z" fill="#1b2a41" />
        {/* Bull on right */}
        <path d="M74 60 Q68 58 65 63 Q63 66 67 66 Q71 66 74 60 Z" fill="#1b2a41" />

        {/* Bell-shaped Lotus pedestal */}
        <path d="M20 70 C24 67, 76 67, 80 70 L77 74 C70 76, 30 76, 23 74 Z" fill="#1b2a41" />
        <path d="M28 75 C35 80, 65 80, 72 75 L70 78 C62 82, 38 82, 30 78 Z" fill="#1b2a41" />
      </svg>
      {/* Motto: Satyameva Jayate in Devanagari */}
      <span className="text-[8px] font-bold tracking-widest text-[#1b2a41] -mt-1 scale-90">
        सत्यमेव जयते
      </span>
    </div>
  );
};
