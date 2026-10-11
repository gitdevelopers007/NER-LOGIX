import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { Globe, Shield, Radio, Compass, Truck, HeartPulse, LogOut } from 'lucide-react';
import { SupportedLanguage } from '../../services/portalTranslations';

export const TravelerHeader: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('preferred_language') as SupportedLanguage) || 'en';
  });

  const activeRole = localStorage.getItem('traveler_user_role') || 'CITIZEN_COMMUTER';
  const activeName = localStorage.getItem('traveler_user_name') || 'Guest Traveler';

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('preferred_language', newLang);
    window.dispatchEvent(new CustomEvent('ner_language_change', { detail: newLang }));
  };

  const getPersonaBadge = () => {
    switch (activeRole) {
      case 'COMMERCIAL_FREIGHT':
        return {
          label: 'Commercial Freight Carrier',
          icon: Truck,
          className: 'bg-amber-950/70 text-amber-300 border-amber-700/60'
        };
      case 'EMERGENCY_MEDICAL':
        return {
          label: 'Emergency Medical Convoy',
          icon: HeartPulse,
          className: 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
        };
      default:
        return {
          label: 'Citizen / Public Commuter',
          icon: Compass,
          className: 'bg-blue-950/70 text-blue-300 border-blue-700/60'
        };
    }
  };

  const badge = getPersonaBadge();
  const Icon = badge.icon;

  return (
    <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0 select-none border-b border-slate-800">
      {/* Left: Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/traveler')}>
          <NerLogixLogo variant="white" />
        </div>
        <span className="text-slate-500 hidden sm:inline">|</span>
        <span className="text-xs text-slate-300 font-medium hidden md:inline">
          North Eastern Region Logistics &amp; Accessibility Intelligence
        </span>
        <span className="text-slate-500 hidden lg:inline">|</span>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800 hidden lg:inline flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-emerald-400" />
          Public Logistics &amp; Traveler Portal
        </span>
      </div>

      {/* Right: Active Role, Telemetry Status & Controls */}
      <div className="flex items-center gap-3">
        {/* Active Persona Pill */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate max-w-[150px]">{badge.label}</span>
        </div>

        {/* Live Satellite/Doppler Feed Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ISRO / IMD Live</span>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {[
            { code: 'en', label: 'EN' },
            { code: 'as', label: 'অসমীয়া' },
            { code: 'bn', label: 'বাংলা' },
            { code: 'hi', label: 'हिन्दी' },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code as SupportedLanguage)}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                lang === l.code
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Switch Persona / Logout */}
        <button
          onClick={() => navigate('/traveler-login')}
          title="Switch Traveler Profile / Log Out"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
