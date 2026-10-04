import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { LanguageSelector } from '../features/language/LanguageSelector';
import { Shield, Wifi, WifiOff, SlidersHorizontal, User } from 'lucide-react';

interface HeaderProps {
  onOpenDemo: () => void;
  userRole?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  userRole = 'FIELD_OFFICER',
  userName = 'Field Officer',
}) => {
  const { isOnline } = useNetworkStatus();

  return (
    <header className="bg-gov-900 text-white sticky top-0 z-40 shadow-md border-b border-gov-800">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo & National/Gov Identification */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center shadow-inner border border-blue-500/40">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-sm text-white">
                NER-LOGIX
              </span>
              <span className="text-[10px] font-semibold bg-emerald-700/80 text-emerald-100 px-1.5 py-0.2 rounded border border-emerald-500/40 uppercase">
                FIELD APP
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              NE Disruption & Accessibility Platform
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex items-center space-x-2">
          {/* Online/Offline Pill */}
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-mono font-medium ${
              isOnline
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                : 'bg-amber-950/80 text-amber-400 border border-amber-800/60 animate-pulse'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-[11px]">ONLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span className="text-[11px]">OFFLINE</span>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <LanguageSelector compact={true} />

          {/* Operational Controls Button */}
          <button
            onClick={onOpenDemo}
            title="Field Diagnostics &amp; Network Console"
            aria-label="Operations Console"
            className="p-1.5 bg-gov-800 hover:bg-gov-700 active:bg-gov-600 rounded-lg text-slate-300 hover:text-white border border-gov-700 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
