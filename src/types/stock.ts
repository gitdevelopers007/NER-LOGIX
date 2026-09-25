export type StockCategory = 
  | 'Medicines & Medical Supplies'
  | 'Food & Provisions'
  | 'Fuel & Energy'
  | 'Disaster Relief Materials'
  | 'Construction & Infrastructure';

export type StockRiskLevel = 'Critical' | 'Warning' | 'Adequate';

export interface EssentialStockItem {
  id: string;
  location: string;
  state: string;
  item: string;
  category: StockCategory;
  current_quantity: number;
  unit: string;
  daily_consumption: number;
  days_remaining: number;
  risk_level: StockRiskLevel;
  incoming_vehicle_id: string | null;
  incoming_vehicle_type: string | null;
  incoming_cargo_qty: number | null;
  incoming_origin: string | null;
  incoming_distance_km: number | null;
  incoming_eta_days: number | null;
  will_arrive_in_time: boolean | null;
  escalation_status?: 'NONE' | 'AIRDROP_REQUESTED' | 'CONVOY_REROUTED';
  last_updated: string;
}

export interface StockDepletionSummary {
  totalLocationsTracked: number;
  totalCriticalShortages: number;
  totalWarnings: number;
  totalAdequate: number;
  pendingResupplies: number;
  failingResupplies: number; // shipments arriving after stockout
}
