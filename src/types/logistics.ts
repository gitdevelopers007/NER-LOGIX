export type LocationSource = 'LIVE_GPS' | 'SIMULATED_TELEMETRY';

export type VehicleType = 'TRUCK' | 'AMBULANCE' | 'UTILITY' | 'SMALL_CARGO' | 'OTHER';

export type VehicleStatus =
  | 'IDLE'
  | 'ASSIGNED'
  | 'IN_TRANSIT'
  | 'DELAYED'
  | 'STOPPED'
  | 'DELIVERED'
  | 'OFFLINE';

export interface VehicleLocation {
  latitude: number;
  longitude: number;
  speed_kmh: number;
  heading: number;
  timestamp: string;
  source: LocationSource;
  vehicle_id?: string;
}

export interface Vehicle {
  id: string;
  vehicle_number: string;
  vehicle_type: VehicleType;
  organization_id: string;
  status: VehicleStatus;
  current_location?: VehicleLocation;
  speed: number;
  heading: number;
  current_mission_id?: string | null;
  last_updated: string;
  location_source: LocationSource;
  cargo_category?: string;
  cargo_item?: string;
  cargo_quantity?: number;
  cargo_unit?: string;
  origin_hub?: string;
  destination_hub?: string;
}

export type CargoType =
  | 'MEDICINES'
  | 'ESSENTIAL_COMMODITIES'
  | 'AGRICULTURAL_PRODUCE'
  | 'CONSTRUCTION_MATERIALS'
  | 'OTHER';

export type MissionPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export type MissionStatus =
  | 'PLANNED'
  | 'ASSIGNED'
  | 'IN_TRANSIT'
  | 'DELAYED'
  | 'DELIVERED'
  | 'CANCELLED';

export type MissionEventType =
  | 'MISSION_CREATED'
  | 'VEHICLE_ASSIGNED'
  | 'ROUTE_SELECTED'
  | 'DEPARTURE'
  | 'ROUTE_CHANGED'
  | 'DELAY_DETECTED'
  | 'INCIDENT_AFFECTED'
  | 'DELIVERY_COMPLETED';

export interface MissionTimelineEvent {
  id: string;
  event_type: MissionEventType;
  timestamp: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface LocationPoint {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  district?: string;
  state?: string;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface RouteRisk {
  score: number;
  level: RiskLevel;
  reason: string;
}

export interface RouteReference {
  route_id: string;
  name: string;
  distance_km: number;
  duration_minutes: number;
  risk?: RouteRisk;
  geometry: [number, number][]; // [lat, lng] array
  is_blocked?: boolean;
}

export interface RouteComparison {
  previous_route_name: string;
  new_route_name: string;
  previous_distance_km: number;
  new_distance_km: number;
  previous_eta: string;
  new_eta: string;
  eta_difference_minutes: number;
  reason: string;
}

export interface Mission {
  id: string;
  mission_number: string;
  organization_id: string;
  cargo_type: CargoType;
  cargo_description: string;
  cargo_quantity: number;
  cargo_unit: string;
  priority: MissionPriority;
  origin: LocationPoint;
  destination: LocationPoint;
  vehicle_id?: string | null;
  status: MissionStatus;
  current_route_id?: string | null;
  active_route?: RouteReference | null;
  previous_route?: RouteReference | null;
  recent_route_comparison?: RouteComparison | null;
  created_at: string;
  departed_at?: string | null;
  eta?: string | null;
  completed_at?: string | null;
  delay_minutes: number;
  delay_reason?: string | null;
  timeline: MissionTimelineEvent[];
}

export interface TelemetryPoint {
  id: string;
  vehicle_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
  source: LocationSource;
}

export interface LogisticsOverviewStats {
  active_missions: number;
  in_transit_vehicles: number;
  delayed_deliveries: number;
  critical_missions: number;
  completed_today: number;
}
