import type { IncidentCreatePayload } from "./incident";

export type SyncItemStatus = 'QUEUED' | 'SYNCING' | 'SYNCED' | 'FAILED';

export interface SyncQueueItem {
  queue_id: string;
  client_generated_id: string;
  payload: IncidentCreatePayload;
  status: SyncItemStatus;
  attempts: number;
  last_attempt_at?: string;
  error_message?: string;
  created_at: string;
}
