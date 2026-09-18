import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { wsService } from '../services/websocket';
import type { Alert } from '../types/alert';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newAlertCount, setNewAlertCount] = useState<number>(0);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await api.getAlerts();
      setAlerts(data.items);
    } catch (e) {
      console.warn('Error fetching alerts:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    wsService.connect();

    const unsubscribe = wsService.subscribe((newAlert) => {
      console.log('[useAlerts] Received real-time alert:', newAlert);
      setAlerts((prev) => {
        // Prevent duplicate alert entries
        if (prev.some((a) => a.id === newAlert.id)) return prev;
        return [newAlert, ...prev];
      });
      setNewAlertCount((c) => c + 1);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchAlerts]);

  const acknowledgeAlert = async (id: string) => {
    try {
      const updated = await api.acknowledgeAlert(id);
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a))
      );
      return updated;
    } catch (e) {
      console.error('Failed to acknowledge alert:', e);
      throw e;
    }
  };

  return {
    alerts,
    loading,
    newAlertCount,
    refreshAlerts: fetchAlerts,
    acknowledgeAlert,
  };
};
