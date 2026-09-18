import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useLanguage } from '../features/language/LanguageContext';
import { WifiOff } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline, isSimulatedOffline } = useNetworkStatus();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="bg-amber-600 text-white px-3 py-1.5 text-xs font-medium flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
        <span>
          {isSimulatedOffline ? (
            <strong className="bg-amber-800 px-1 py-0.5 rounded text-[10px] mr-1">
              DEMO SIMULATION
            </strong>
          ) : null}
          {t('msg_saved_offline')}
        </span>
      </div>
      <span className="text-[11px] uppercase tracking-wider bg-amber-700/80 px-1.5 py-0.5 rounded font-mono">
        OFFLINE MODE
      </span>
    </div>
  );
};
