import React from 'react';

// Card 1: Government Command Center (Capitol/Pillared Building)
export const GovBuildingIcon: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} style={{ color: '#1e40af' }}>
      {/* Top Finial / Flag */}
      <rect x="30.5" y="6" width="3" height="6" rx="1.5" />
      <path d="M32 6 C35 6, 37 9, 37 12 L27 12 C27 9, 29 6, 32 6 Z" />
      
      {/* Triangular Pediment */}
      <path d="M12 21 L32 12 L52 21 Z" />
      <rect x="10" y="21" width="44" height="4" rx="1" />

      {/* 4 Classical Pillars */}
      {/* Pillar 1 */}
      <rect x="14" y="27" width="5" height="19" rx="1" />
      {/* Pillar 2 */}
      <rect x="24" y="27" width="5" height="19" rx="1" />
      {/* Pillar 3 */}
      <rect x="35" y="27" width="5" height="19" rx="1" />
      {/* Pillar 4 */}
      <rect x="45" y="27" width="5" height="19" rx="1" />

      {/* Stepped Base (2 steps) */}
      <rect x="10" y="47" width="44" height="4" rx="1" />
      <rect x="6" y="52" width="52" height="4" rx="1.5" />
    </svg>
  );
};

// Card 2: Field Operations (Engineer with Hardhat & Location Marker)
export const FieldOpsIcon: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} style={{ color: '#0284c7' }}>
      {/* Officer Head & Safety Hardhat */}
      {/* Hardhat dome */}
      <path d="M22 19 C22 13, 27 9, 34 9 C41 9, 46 13, 46 19 Z" />
      {/* Hardhat ridge */}
      <rect x="32" y="7" width="4" height="8" rx="1.5" fill="#e0f2fe" opacity="0.4" />
      {/* Hardhat brim */}
      <rect x="19" y="19" width="30" height="4" rx="2" />
      {/* Face */}
      <circle cx="34" cy="27" r="6" />
      {/* Neck */}
      <rect x="31" y="33" width="6" height="4" />
      {/* Shoulders / Torso with safety vest collar */}
      <path d="M18 48 C18 39, 24 37, 34 37 C44 37, 50 39, 50 48 L18 48 Z" />

      {/* Location Pin Marker on right */}
      <g transform="translate(14, 0)">
        <path
          d="M36 21 C36 16.5, 39.5 13, 44 13 C48.5 13, 52 16.5, 52 21 C52 27, 44 35, 44 35 C44 35, 36 27, 36 21 Z"
          fill="#0369a1"
        />
        <circle cx="44" cy="21" r="2.8" fill="#ffffff" />
      </g>
    </svg>
  );
};

// Card 3: Traveler & Public Access (Folded Map with Route Pin)
export const TravelerMapIcon: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={{ color: '#1d4ed8' }}>
      {/* Folded Map outline */}
      <path
        d="M12 18 L24 13 L40 18 L52 13 L52 46 L40 51 L24 46 L12 51 Z"
        stroke="#1d4ed8"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fold lines */}
      <path
        d="M24 13 L24 46"
        stroke="#1d4ed8"
        strokeWidth="2.5"
        strokeDasharray="2 2"
      />
      <path
        d="M40 18 L40 51"
        stroke="#1d4ed8"
        strokeWidth="2.5"
        strokeDasharray="2 2"
      />

      {/* Map route path */}
      <path
        d="M18 38 Q28 28 34 38 T44 30"
        stroke="#60a5fa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />

      {/* Large Target Location Pin */}
      <g>
        <path
          d="M38 12 C38 6.5, 42.5 2, 48 2 C53.5 2, 58 6.5, 58 12 C58 19, 48 28, 48 28 C48 28, 38 19, 38 12 Z"
          fill="#1e40af"
        />
        <circle cx="48" cy="12" r="3.5" fill="#ffffff" />
      </g>
    </svg>
  );
};

// Checkmark Circle Icon
export const CheckBadge: React.FC<{ colorClass?: string }> = ({ colorClass = "text-[#2563eb]" }) => {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 shrink-0 ${colorClass}`}>
      <circle cx="10" cy="10" r="9" />
      <path
        d="M6.5 10 L8.8 12.3 L13.5 7.6"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
