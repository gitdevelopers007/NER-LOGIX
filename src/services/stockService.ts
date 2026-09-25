import type { EssentialStockItem, StockDepletionSummary } from '../types/stock';

const INITIAL_STOCK_DATABASE: EssentialStockItem[] = [
  {
    id: 'STK-001',
    location: 'Kohima',
    state: 'Nagaland',
    item: 'Vaccine Doses (Cold Chain)',
    category: 'Medicines & Medical Supplies',
    current_quantity: 45,
    unit: 'vials',
    daily_consumption: 60,
    days_remaining: 0.75, // 18 hours left!
    risk_level: 'Critical',
    incoming_vehicle_id: 'NER-003',
    incoming_vehicle_type: 'Refrigerated Medical Van',
    incoming_cargo_qty: 250,
    incoming_origin: 'Jorhat Hub',
    incoming_distance_km: 310,
    incoming_eta_days: 1.15, // ~27.6 hours
    will_arrive_in_time: false, // Fails! ETA > days_remaining
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-002',
    location: 'Tawang',
    state: 'Arunachal Pradesh',
    item: 'Medical Oxygen Cylinders (D-Type)',
    category: 'Medicines & Medical Supplies',
    current_quantity: 18,
    unit: 'cylinders',
    daily_consumption: 24,
    days_remaining: 0.75,
    risk_level: 'Critical',
    incoming_vehicle_id: null, // No vehicle currently assigned
    incoming_vehicle_type: null,
    incoming_cargo_qty: null,
    incoming_origin: null,
    incoming_distance_km: null,
    incoming_eta_days: null,
    will_arrive_in_time: false,
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-003',
    location: 'Itanagar',
    state: 'Arunachal Pradesh',
    item: 'Essential Antibiotics & Trauma Kits',
    category: 'Medicines & Medical Supplies',
    current_quantity: 220,
    unit: 'kits',
    daily_consumption: 110,
    days_remaining: 2.0,
    risk_level: 'Warning',
    incoming_vehicle_id: 'NER-001',
    incoming_vehicle_type: 'Heavy 4x4 Supply Truck',
    incoming_cargo_qty: 500,
    incoming_origin: 'Guwahati Depot',
    incoming_distance_km: 325,
    incoming_eta_days: 0.95,
    will_arrive_in_time: true, // Arrives in time!
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-004',
    location: 'Aizawl',
    state: 'Mizoram',
    item: 'Commercial Diesel & Generator Fuel',
    category: 'Fuel & Energy',
    current_quantity: 4200,
    unit: 'litres',
    daily_consumption: 3800,
    days_remaining: 1.1,
    risk_level: 'Critical',
    incoming_vehicle_id: 'NER-007',
    incoming_vehicle_type: 'Fuel Tanker 12KL',
    incoming_cargo_qty: 12000,
    incoming_origin: 'Silchar Refinery Point',
    incoming_distance_km: 175,
    incoming_eta_days: 0.65,
    will_arrive_in_time: true,
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-005',
    location: 'Tezpur',
    state: 'Assam',
    item: 'Insulin Vials & Cardiac Emergency Drugs',
    category: 'Medicines & Medical Supplies',
    current_quantity: 35,
    unit: 'vials',
    daily_consumption: 25,
    days_remaining: 1.4,
    risk_level: 'Warning',
    incoming_vehicle_id: 'NER-002',
    incoming_vehicle_type: 'Express Medical Utility',
    incoming_cargo_qty: 180,
    incoming_origin: 'Guwahati Civil Depot',
    incoming_distance_km: 180,
    incoming_eta_days: 0.55,
    will_arrive_in_time: true,
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-006',
    location: 'Imphal',
    state: 'Manipur',
    item: 'Relief Grain & Fortified Rice (FCI)',
    category: 'Food & Provisions',
    current_quantity: 1200,
    unit: 'bags (50kg)',
    daily_consumption: 650,
    days_remaining: 1.85,
    risk_level: 'Warning',
    incoming_vehicle_id: 'NER-004',
    incoming_vehicle_type: 'Multi-Axle Cargo Truck',
    incoming_cargo_qty: 2400,
    incoming_origin: 'Silchar Logistic Yard',
    incoming_distance_km: 260,
    incoming_eta_days: 2.1,
    will_arrive_in_time: false, // NH-37 landslide delay makes ETA > stock remaining
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-007',
    location: 'Agartala',
    state: 'Tripura',
    item: 'Emergency Potable Water Purification Packs',
    category: 'Disaster Relief Materials',
    current_quantity: 1850,
    unit: 'cartons',
    daily_consumption: 420,
    days_remaining: 4.4,
    risk_level: 'Adequate',
    incoming_vehicle_id: 'NER-005',
    incoming_vehicle_type: 'Cargo Van',
    incoming_cargo_qty: 800,
    incoming_origin: 'Shillong Hub',
    incoming_distance_km: 340,
    incoming_eta_days: 1.2,
    will_arrive_in_time: true,
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  },
  {
    id: 'STK-008',
    location: 'Gangtok',
    state: 'Sikkim',
    item: 'Extreme Cold Weather Emergency Blankets',
    category: 'Disaster Relief Materials',
    current_quantity: 3200,
    unit: 'blankets',
    daily_consumption: 280,
    days_remaining: 11.4,
    risk_level: 'Adequate',
    incoming_vehicle_id: null,
    incoming_vehicle_type: null,
    incoming_cargo_qty: null,
    incoming_origin: null,
    incoming_distance_km: null,
    incoming_eta_days: null,
    will_arrive_in_time: true,
    escalation_status: 'NONE',
    last_updated: new Date().toISOString()
  }
];

class StockService {
  private stockList: EssentialStockItem[] = [...INITIAL_STOCK_DATABASE];

  public getAllStock(): EssentialStockItem[] {
    return [...this.stockList];
  }

  public getSummary(): StockDepletionSummary {
    const totalLocations = new Set(this.stockList.map(s => s.location)).size;
    const critical = this.stockList.filter(s => s.risk_level === 'Critical').length;
    const warning = this.stockList.filter(s => s.risk_level === 'Warning').length;
    const adequate = this.stockList.filter(s => s.risk_level === 'Adequate').length;
    const pendingResupplies = this.stockList.filter(s => s.incoming_vehicle_id !== null).length;
    const failingResupplies = this.stockList.filter(s => s.incoming_vehicle_id && s.will_arrive_in_time === false).length;

    return {
      totalLocationsTracked: totalLocations,
      totalCriticalShortages: critical,
      totalWarnings: warning,
      totalAdequate: adequate,
      pendingResupplies,
      failingResupplies
    };
  }

  public escalateToAirdrop(stockId: string): void {
    const item = this.stockList.find(s => s.id === stockId);
    if (item) {
      item.escalation_status = 'AIRDROP_REQUESTED';
      item.incoming_vehicle_id = 'IAF-MI-17-DRONE-01';
      item.incoming_vehicle_type = 'Heavy Cargo UAV / IAF Rotary Wing';
      item.incoming_eta_days = 0.25; // 6 hours by air
      item.will_arrive_in_time = true;
      item.last_updated = new Date().toISOString();
    }
  }

  public rerouteConvoy(stockId: string): void {
    const item = this.stockList.find(s => s.id === stockId);
    if (item && item.incoming_distance_km) {
      item.escalation_status = 'CONVOY_REROUTED';
      // Priority green corridor rerouting saves 35% transit time
      item.incoming_eta_days = Math.max(0.3, Math.round((item.incoming_eta_days! * 0.65) * 100) / 100);
      item.will_arrive_in_time = item.incoming_eta_days <= item.days_remaining;
      item.last_updated = new Date().toISOString();
    }
  }
}

export const stockService = new StockService();
