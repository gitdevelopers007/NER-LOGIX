import { useState, useEffect } from 'react';
import { syncEngine } from '../services/syncService';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(!syncEngine.isOffline());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(
    localStorage.getItem('demo_simulated_offline') === 'true'
  );

  useEffect(() => {
    const update = () => {
      setIsOnline(!syncEngine.isOffline());
      setIsSimulatedOffline(localStorage.getItem('demo_simulated_offline') === 'true');
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    const interval = setInterval(update, 1000);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      clearInterval(interval);
    };
  }, []);

  const toggleSimulatedOffline = (simulate: boolean) => {
    syncEngine.setSimulatedOffline(simulate);
    setIsSimulatedOffline(simulate);
    setIsOnline(!syncEngine.isOffline());
  };

  return {
    isOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
  };
};
