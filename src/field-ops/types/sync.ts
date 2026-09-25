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

export type PhotoTransferStatus = 
  | 'PENDING'
  | 'COMPRESSING'
  | 'QUEUED'
  | 'UPLOADING'
  | 'PAUSED'
  | 'RETRYING'
  | 'UPLOADED'
  | 'FAILED';

export interface PhotoQueueItem {
  incidentId: string;
  imageId: string;
  originalSize: number;
  compressedSize: number;
  compressionMode: 'EMERGENCY' | 'LOW' | 'NORMAL' | 'ORIGINAL';
  status: PhotoTransferStatus;
  retryCount: number;
  createdAt: string;
  latitude: number;
  longitude: number;
  base64Data?: string;
  filename: string;
  estimatedTransferSecs: number;
}
