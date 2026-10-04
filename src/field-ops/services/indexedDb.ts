import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Incident, IncidentCreatePayload } from '../types/incident';
import { SyncQueueItem } from '../types/sync';

interface FieldDB extends DBSchema {
  incidents: {
    key: string;
    value: Incident;
    indexes: {
      'by-status': string;
      'by-reported-at': string;
    };
  };
  photos: {
    key: string;
    value: {
      id: string;
      incident_id: string;
      base64_data: string;
      filename: string;
      mime_type: string;
      captured_at: string;
    };
    indexes: {
      'by-incident': string;
    };
  };
  sync_queue: {
    key: string;
    value: SyncQueueItem;
    indexes: {
      'by-status': string;
      'by-created-at': string;
      'by-client-id': string;
    };
  };
  app_state: {
    key: string;
    value: {
      key: string;
      value: any;
      updated_at: string;
    };
  };
}

const DB_NAME = 'ner_logix_field_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<FieldDB>> | null = null;

export const getDB = (): Promise<IDBPDatabase<FieldDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<FieldDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Incidents store
        if (!db.objectStoreNames.contains('incidents')) {
          const incStore = db.createObjectStore('incidents', { keyPath: 'client_generated_id' });
          incStore.createIndex('by-status', 'status');
          incStore.createIndex('by-reported-at', 'reported_at');
        }

        // Photos store
        if (!db.objectStoreNames.contains('photos')) {
          const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
          photoStore.createIndex('by-incident', 'incident_id');
        }

        // Sync Queue store
        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncStore = db.createObjectStore('sync_queue', { keyPath: 'queue_id' });
          syncStore.createIndex('by-status', 'status');
          syncStore.createIndex('by-created-at', 'created_at');
          syncStore.createIndex('by-client-id', 'client_generated_id');
        }

        // App state store
        if (!db.objectStoreNames.contains('app_state')) {
          db.createObjectStore('app_state', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
};

// ==================== INCIDENTS LOCAL API ====================
export const saveLocalIncident = async (incident: Incident): Promise<void> => {
  const db = await getDB();
  await db.put('incidents', incident);
};

export const getLocalIncident = async (clientGeneratedId: string): Promise<Incident | undefined> => {
  const db = await getDB();
  return db.get('incidents', clientGeneratedId);
};

export const getAllLocalIncidents = async (): Promise<Incident[]> => {
  const db = await getDB();
  return db.getAll('incidents');
};

export const updateLocalIncidentStatus = async (
  clientGeneratedId: string,
  status: Incident['status'],
  serverId?: string
): Promise<void> => {
  const db = await getDB();
  const item = await db.get('incidents', clientGeneratedId);
  if (item) {
    item.status = status;
    if (serverId) item.id = serverId;
    item.updated_at = new Date().toISOString();
    await db.put('incidents', item);
  }
};

// ==================== PHOTOS LOCAL API ====================
export const saveLocalPhoto = async (photo: {
  id: string;
  incident_id: string;
  base64_data: string;
  filename: string;
  mime_type: string;
  captured_at: string;
}): Promise<void> => {
  const db = await getDB();
  await db.put('photos', photo);
};

export const getLocalPhoto = async (id: string) => {
  const db = await getDB();
  return db.get('photos', id);
};

// ==================== SYNC QUEUE API ====================
export const enqueueSyncReport = async (payload: IncidentCreatePayload): Promise<SyncQueueItem> => {
  const db = await getDB();
  const queueItem: SyncQueueItem = {
    queue_id: `queue_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    client_generated_id: payload.client_generated_id,
    payload,
    status: 'QUEUED',
    attempts: 0,
    created_at: new Date().toISOString(),
  };
  await db.put('sync_queue', queueItem);
  return queueItem;
};

export const getQueuedSyncItems = async (): Promise<SyncQueueItem[]> => {
  const db = await getDB();
  const all = await db.getAll('sync_queue');
  return all.filter((item) => item.status === 'QUEUED' || item.status === 'FAILED');
};

export const getAllSyncItems = async (): Promise<SyncQueueItem[]> => {
  const db = await getDB();
  return db.getAll('sync_queue');
};

export const updateSyncItemStatus = async (
  queueId: string,
  status: SyncQueueItem['status'],
  errorMessage?: string
): Promise<void> => {
  const db = await getDB();
  const item = await db.get('sync_queue', queueId);
  if (item) {
    item.status = status;
    item.attempts += 1;
    item.last_attempt_at = new Date().toISOString();
    if (errorMessage) item.error_message = errorMessage;
    await db.put('sync_queue', item);
  }
};

export const removeSyncedItem = async (queueId: string): Promise<void> => {
  const db = await getDB();
  await db.delete('sync_queue', queueId);
};

// ==================== APP STATE API ====================
export const setAppState = async (key: string, value: any): Promise<void> => {
  const db = await getDB();
  await db.put('app_state', {
    key,
    value,
    updated_at: new Date().toISOString(),
  });
};

export const getAppState = async <T>(key: string): Promise<T | null> => {
  const db = await getDB();
  const entry = await db.get('app_state', key);
  return entry ? (entry.value as T) : null;
};
