import React from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from './LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-gov-800/80 rounded-lg px-2 py-1 text-xs border border-gov-700">
      <Globe className="w-3.5 h-3.5 text-blue-300" />
      <select
        value={language}
        aria-label="Select Language"
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="bg-transparent text-white font-medium focus:outline-none cursor-pointer py-0.5"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gov-900 text-white">
            {compact ? lang.nativeLabel : `${lang.label} (${lang.nativeLabel})`}
          </option>
        ))}
      </select>
    </div>
  );
};
