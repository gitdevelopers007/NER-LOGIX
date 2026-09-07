import React from 'react';

interface NerLogixLogoProps {
  className?: string;
  variant?: 'white' | 'navy' | 'blue';
  showText?: boolean;
  textSize?: string;
}

export const NerLogixLogo: React.FC<NerLogixLogoProps> = ({ 
  className = "",
  variant = "navy",
  showText = true,
  textSize = "text-[21px]"
}) => {
  const isWhite = variant === 'white';
  const isBlue = variant === 'blue';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Mountain Geometric Icon */}
      <svg
        viewBox="0 0 54 36"
        className="h-8 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Peak */}
        <polygon
          points="6,32 22,6 35,28 26,32"
          fill={isWhite ? "#ffffff" : isBlue ? "#2563eb" : "#10b981"}
          opacity={isWhite ? "0.95" : "1"}
        />
        {/* Right Peak */}
        <polygon
          points="28,18 39,2 48,32 38,32 34,25"
          fill={isWhite ? "#ffffff" : isBlue ? "#1d4ed8" : "#0f2942"}
          opacity={isWhite ? "0.75" : "1"}
        />
        {/* Inner geometric slope cuts */}
        <path
          d="M22 6 L26 32 L24 32 Z"
          fill={isWhite ? "#0f233a" : "#ffffff"}
          opacity={isWhite ? "0.6" : "0.9"}
        />
        <path
          d="M39 2 L42 32 L40 32 Z"
          fill={isWhite ? "#0f233a" : "#ffffff"}
          opacity={isWhite ? "0.6" : "0.9"}
        />
        <polygon
          points="14,32 22,6 27,20"
          fill={isWhite ? "#e2e8f0" : isBlue ? "#60a5fa" : "#059669"}
          opacity="0.45"
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span className={`${textSize} font-extrabold tracking-tight font-sans ${isWhite ? 'text-white' : isBlue ? 'text-[#1e40af]' : 'text-[#0f2942]'}`}>
          NER-LOGIX
        </span>
      )}
    </div>
  );
};

