import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, X, Phone, Mail } from 'lucide-react';
import { EmblemOfIndia } from './EmblemOfIndia';
import { NerLogixLogo } from './NerLogixLogo';
import { LiveTelemetryToggle } from './LiveTelemetryToggle';

interface HeaderProps {
  onHelpClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [helpOpen, setHelpOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
        
        {/* Left Branding Group */}
        <div className="flex items-center">
          {/* Indian Government Emblem */}
          <EmblemOfIndia className="pr-4" />

          {/* Divider */}
          <div className="h-9 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* NER-LOGIX Logo */}
          <div className="pl-4 pr-4">
            <NerLogixLogo />
          </div>

          {/* Divider */}
          <div className="h-9 w-[1px] bg-slate-200 hidden md:block"></div>

          {/* Platform Title */}
          <div className="pl-4 hidden md:flex flex-col justify-center text-left">
            <span className="text-[13px] leading-tight font-semibold text-slate-800 tracking-normal">
              North Eastern Region Logistics &amp;
            </span>
            <span className="text-[13px] leading-tight font-semibold text-slate-800 tracking-normal">
              Accessibility Intelligence
            </span>
          </div>
        </div>

        {/* Right Status & Tools Group */}
        <div className="flex items-center text-[13px] text-slate-700 font-medium">
          {/* Live Government Telemetry Toggle */}
          <LiveTelemetryToggle className="mr-3" />

          {/* System Online Indicator */}
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-700 text-xs sm:text-[13px]">System Online</span>
          </div>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-slate-200 mx-3 sm:mx-4"></div>

          {/* Help Button */}
          <button 
            onClick={() => setHelpOpen(true)}
            className="flex items-center gap-1.5 hover:text-blue-700 transition-colors cursor-pointer"
            title="Help & Support Desk"
          >
            <HelpCircle className="w-4 h-4 text-slate-600" />
            <span className="hidden xs:inline text-xs sm:text-[13px]">Help</span>
          </button>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-slate-200 mx-3 sm:mx-4"></div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 hover:text-blue-700 transition-colors cursor-pointer py-1"
            >
              <span className="text-xs sm:text-[13px]">{selectedLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Language Dropdown */}
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-left">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.name);
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                      selectedLang === lang.name ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.native} ({lang.name})</span>
                    {selectedLang === lang.name && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Help Modal */}
      {helpOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="bg-[#0f2547] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-300" />
                <h3 className="font-semibold text-base">NER-LOGIX Help &amp; Support</h3>
              </div>
              <button 
                onClick={() => setHelpOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm text-slate-600">
              <p>
                The <strong>North Eastern Region Logistics &amp; Accessibility Intelligence (NER-LOGIX)</strong> platform provides unified spatial intelligence across all 8 NE states (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura).
              </p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-2 text-xs">
                <div className="font-semibold text-blue-900">National &amp; Regional Helplines:</div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Phone className="w-3.5 h-3.5" /> Disaster Management (NDMA): <strong>1070 / 1078</strong>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Phone className="w-3.5 h-3.5" /> Emergency Highway Assistance: <strong>1033</strong>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Mail className="w-3.5 h-3.5" /> Nodal Support: <strong>support@nerlogix.gov.in</strong>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-semibold text-slate-800 text-xs mb-1">Access Roles Overview:</h4>
                <ul className="text-xs list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>Government Command Center:</strong> Reserved for designated ministry officials, BRO, NHIDCL, PWD, and district authorities.</li>
                  <li><strong>Field Operations:</strong> Dedicated reporting portal for highway engineers and disaster assessment personnel.</li>
                  <li><strong>Traveler &amp; Public Access:</strong> Open information portal for citizens, freight transporters, and passengers.</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setHelpOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Close Support
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
