export type AlertType =
  | 'ROAD_BLOCKED'
  | 'ROAD_RESTRICTED'
  | 'HIGH_RISK_CORRIDOR'
  | 'LANDSLIDE_WARNING'
  | 'FLOOD_WARNING'
  | 'HEAVY_RAIN_WARNING'
  | 'BRIDGE_ACCESS_WARNING'
  | 'DELIVERY_DELAY'
  | 'ROUTE_CHANGED'
  | 'INACCESSIBLE_REGION'
  | 'FIELD_INCIDENT'
  | 'SYSTEM';

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AlertStatus = 'UNREAD' | 'READ' | 'ACKNOWLEDGED' | 'EXPIRED';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  road_id?: string | null;
  district_id?: string | null;
  mission_id?: string | null;
  incident_id?: string | null;
  target_role: string;
  status: AlertStatus;
  is_demo: boolean;
  created_at: string;
  expires_at?: string | null;
}
