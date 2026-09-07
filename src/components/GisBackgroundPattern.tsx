import React from 'react';

export const GisBackgroundPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Extremely subtle GIS / Topographic contour lines & logistics route nodes */}
      <svg
        className="w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="gis-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.5"
            />
            <circle cx="80" cy="0" r="1.5" fill="#38bdf8" />
          </pattern>
        </defs>

        {/* Faint coordinate grid */}
        <rect width="100%" height="100%" fill="url(#gis-grid)" />

        {/* Subtle Topographic Contours across background */}
        <path
          d="M-100 200 C 300 150, 600 400, 1100 250 S 1600 100, 2100 300"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.2"
          strokeDasharray="6 4"
        />
        <path
          d="M-100 350 C 400 280, 750 520, 1250 380 S 1750 220, 2100 450"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <path
          d="M-100 550 C 350 480, 800 680, 1300 520 S 1800 400, 2100 600"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="0.8"
          strokeDasharray="4 6"
        />
        <path
          d="M-100 750 C 450 620, 900 850, 1400 690 S 1900 580, 2100 780"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.2"
        />

        {/* Subtle logistics highway network nodes */}
        {/* Guwahati node */}
        <circle cx="340" cy="280" r="4" fill="#38bdf8" />
        <circle cx="340" cy="280" r="12" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
        
        {/* Shillong node */}
        <circle cx="420" cy="420" r="3.5" fill="#38bdf8" />
        
        {/* Tezpur / Itanagar node */}
        <circle cx="620" cy="220" r="3.5" fill="#38bdf8" />

        {/* Dimapur / Kohima node */}
        <circle cx="820" cy="360" r="4" fill="#38bdf8" />

        {/* Silchar / Agartala node */}
        <circle cx="560" cy="540" r="4" fill="#38bdf8" />

        {/* Network corridor lines */}
        <path
          d="M 340 280 L 420 420 L 560 540"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <path
          d="M 340 280 L 620 220 L 820 360"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <path
          d="M 620 220 L 560 540"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.75"
          strokeDasharray="3 3"
        />

        {/* Corner coordinates label */}
        <text x="24" y="98%" fill="#64748b" fontSize="10" fontFamily="monospace">
          26°11'N 91°44'E • GRID REF: NER-GIS-SYS-04
        </text>
      </svg>
    </div>
  );
};
