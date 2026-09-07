import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const GovernmentLoginHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#0a101d]/90 border-b border-slate-800/80 backdrop-blur-xs relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* LEFT: NER-LOGIX wordmark & mountain icon (No government seal/emblem) */}
        <div className="flex items-center gap-4">
          <Link 
            to="/access-portal" 
            className="flex items-center gap-2 group text-slate-400 hover:text-white transition-colors"
            title="Return to Access Portal selection"
          >
            {/* Subtle Back Arrow */}
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-transform group-hover:-translate-x-0.5" />
            
            {/* Mountain Geometric Icon */}
            <svg
              viewBox="0 0 48 36"
              className="h-7 w-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 32 L19 6 L31 26 L23 32 L4 32 Z" fill="#10b981" />
              <path d="M19 6 L26 18 L16 32 L4 32 Z" fill="#059669" />
              <path d="M27 16 L37 2 L45 32 L35 32 L31 24 Z" fill="#38bdf8" />
              <path d="M19 6 L23 32 L20 32 Z" fill="#ffffff" opacity="0.9" />
            </svg>

            {/* Brand Name */}
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              NER-LOGIX
            </span>
          </Link>
        </div>

        {/* RIGHT: GOVERNMENT PORTAL in small uppercase typography */}
        <div className="flex items-center">
          <span className="text-[11.5px] font-semibold tracking-[0.22em] text-slate-400 uppercase select-none">
            GOVERNMENT PORTAL
          </span>
        </div>

      </div>
    </header>
  );
};
