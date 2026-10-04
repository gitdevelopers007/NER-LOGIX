import { useState, useEffect, useCallback } from 'react';
import { getAllSyncItems, getAppState } from '../services/indexedDb';
import { syncEngine } from '../services/syncService';
import { SyncQueueItem } from '../types/sync';

export const useSyncQueue = () => {
  const [items, setItems] = useState<SyncQueueItem[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const refreshQueue = useCallback(async () => {
    try {
      const all = await getAllSyncItems();
      setItems(all);
      const pending = all.filter((i) => i.status === 'QUEUED' || i.status === 'FAILED').length;
      setPendingCount(pending);

      const lastSync = await getAppState<string>('last_synced_at');
      if (lastSync) setLastSyncedAt(lastSync);
    } catch (e) {
      console.warn('Error fetching local sync items:', e);
    }
  }, []);

  useEffect(() => {
    refreshQueue();
    const unsubscribe = syncEngine.subscribe((syncing) => {
      setIsSyncing(syncing);
      refreshQueue();
    });

    const interval = setInterval(refreshQueue, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [refreshQueue]);

  const triggerSync = async () => {
    setIsSyncing(true);
    const res = await syncEngine.syncPendingReports();
    await refreshQueue();
    setIsSyncing(false);
    return res;
  };

  return {
    items,
    pendingCount,
    isSyncing,
    lastSyncedAt,
    refreshQueue,
    triggerSync,
  };
};
