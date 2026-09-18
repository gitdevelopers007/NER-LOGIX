export type IncidentType =
  | 'ROAD_BLOCKED'
  | 'ROAD_DAMAGE'
  | 'LANDSLIDE'
  | 'FLOOD'
  | 'HEAVY_RAINFALL'
  | 'BRIDGE_ISSUE'
  | 'CONGESTION'
  | 'TRANSPORT_DISRUPTION'
  | 'REMOTE_AREA_ACCESS_ISSUE'
  | 'OTHER';

export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IncidentStatus =
  | 'DRAFT'
  | 'QUEUED'
  | 'SYNCING'
  | 'SUBMITTED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'RESOLVED';

export type IncidentSource = 'FIELD_REPORT' | 'DEMO_SIMULATION';

export interface IncidentPhoto {
  id: string;
  incident_id: string;
  photo_url: string;
  mime_type: string;
  file_size: number;
  captured_at?: string;
  created_at: string;
}

export interface Incident {
  id: string;
  client_generated_id: string;
  reported_by: string;
  type: IncidentType;
  severity: IncidentSeverity;
  latitude: number;
  longitude: number;
  location_accuracy?: number;
  district_id?: string | null;
  road_id?: string | null;
  description?: string;
  nearby_landmark?: string;
  estimated_obstruction_length?: string;
  vehicle_accessibility?: string;
  status: IncidentStatus;
  source: IncidentSource;
  reported_at: string;
  verified_at?: string;
  verified_by?: string;
  verification_notes?: string;
  resolved_at?: string;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
  photos?: IncidentPhoto[];
}

export interface IncidentCreatePayload {
  client_generated_id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  latitude: number;
  longitude: number;
  location_accuracy?: number;
  district_id?: string;
  road_id?: string;
  description?: string;
  nearby_landmark?: string;
  estimated_obstruction_length?: string;
  vehicle_accessibility?: string;
  reported_at?: string;
  photo_data?: {
    filename: string;
    mime_type: string;
    base64_data: string;
    captured_at?: string;
  };
  is_demo?: boolean;
}
