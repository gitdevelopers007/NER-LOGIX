import { api } from './api';
import {
  getQueuedSyncItems,
  updateSyncItemStatus,
  updateLocalIncidentStatus,
  setAppState,
  removeSyncedItem,
} from './indexedDb';
import { SyncQueueItem } from '../types/sync';

export type SyncStateCallback = (syncing: boolean, count: number) => void;

class SyncService {
  private isSyncing = false;
  private listeners: Set<SyncStateCallback> = new Set();
  private simulatedOffline = false;

  constructor() {
    // Check if simulation state was saved
    this.simulatedOffline = localStorage.getItem('demo_simulated_offline') === 'true';

    // Auto sync on online event
    window.addEventListener('online', () => {
      if (!this.simulatedOffline) {
        console.log('[SyncService] Device reconnected to network. Triggering auto-sync.');
        this.syncPendingReports();
      }
    });
  }

  setSimulatedOffline(offline: boolean) {
    this.simulatedOffline = offline;
    localStorage.setItem('demo_simulated_offline', String(offline));
    if (!offline) {
      this.syncPendingReports();
    }
  }

  isOffline(): boolean {
    if (this.simulatedOffline) return true;
    return !navigator.onLine;
  }

  subscribe(callback: SyncStateCallback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isSyncing, 0));
  }

  async syncPendingReports(): Promise<{
    processed: number;
    synced: number;
    failed: number;
  }> {
    if (this.isOffline()) {
      console.warn('[SyncService] Sync aborted: device is offline or in simulated offline mode.');
      return { processed: 0, synced: 0, failed: 0 };
    }

    if (this.isSyncing) {
      return { processed: 0, synced: 0, failed: 0 };
    }

    this.isSyncing = true;
    this.notify();

    let synced = 0;
    let failed = 0;

    try {
      const items = await getQueuedSyncItems();
      if (items.length === 0) {
        this.isSyncing = false;
        this.notify();
        return { processed: 0, synced: 0, failed: 0 };
      }

      console.log(`[SyncService] Starting sync for ${items.length} queued items`);

      // Process reports sequentially with exponential backoff if error
      for (const item of items) {
        try {
          await updateSyncItemStatus(item.queue_id, 'SYNCING');
          await updateLocalIncidentStatus(item.client_generated_id, 'SYNCING');

          // Submit single or batch
          const res = await api.createIncident(item.payload);

          // Success: update status to SUBMITTED and server id
          await updateLocalIncidentStatus(item.client_generated_id, 'SUBMITTED', res.id);
          await updateSyncItemStatus(item.queue_id, 'SYNCED');
          await removeSyncedItem(item.queue_id);
          synced++;
        } catch (err: any) {
          failed++;
          console.error(`[SyncService] Error syncing queue item ${item.queue_id}:`, err);
          await updateSyncItemStatus(item.queue_id, 'FAILED', err.message || 'Sync failed');
          await updateLocalIncidentStatus(item.client_generated_id, 'QUEUED');
        }
      }

      await setAppState('last_synced_at', new Date().toISOString());
      return { processed: items.length, synced, failed };
    } finally {
      this.isSyncing = false;
      this.notify();
    }
  }
}

export const syncEngine = new SyncService();
