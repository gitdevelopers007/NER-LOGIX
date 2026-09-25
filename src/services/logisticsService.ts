import type {
  Vehicle,
  Mission,
  LogisticsOverviewStats,
  TelemetryPoint,
  VehicleLocation
} from '../types/logistics';

// NH-6 Guwahati -> Shillong Corridor Waypoints
export const NH6_GEOMETRY: [number, number][] = [
  [26.1584, 91.7705], // GMCH Guwahati
  [26.1380, 91.8150], // Khanapara
  [26.1105, 91.8682], // Jorabat
  [26.0461, 91.8845], // Burnihat
  [25.9820, 91.8790], // Byrnihat Outpost
  [25.9015, 91.8810], // Nongpoh
  [25.8200, 91.8900], // Umran
  [25.7535, 91.9020], // Umsning (Disruption Choke Point)
  [25.6667, 91.9167], // Umiam / Barapani Lake
  [25.6120, 91.8980], // Mawlai
  [25.5700, 91.8833]  // Shillong Civil Hospital
];

// Alternate Bypass Route around Umsning Landslide
export const NH6_BYPASS_GEOMETRY: [number, number][] = [
  [26.1584, 91.7705],
  [26.1380, 91.8150],
  [26.1105, 91.8682],
  [26.0461, 91.8845],
  [25.9015, 91.8810],
  [25.8450, 91.9400], // Eastern Valley Bypass
  [25.7400, 91.9550], // Bypass around Umsning choke
  [25.6667, 91.9167], // Rejoin near Umiam
  [25.6120, 91.8980],
  [25.5700, 91.8833]
];

// Initial Vehicles
const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'DEMO-VH-001',
    vehicle_number: 'AS-01-DM-1001',
    vehicle_type: 'TRUCK',
    organization_id: 'ORG-NER-01',
    status: 'IN_TRANSIT',
    speed: 48.0,
    heading: 142.0,
    current_mission_id: 'DEMO-MSN-001',
    last_updated: new Date().toISOString(),
    location_source: 'SIMULATED_TELEMETRY',
    cargo_category: 'Medicines & Medical Supplies',
    cargo_item: 'Essential Medicine Kits & Trauma Bags',
    cargo_quantity: 500,
    cargo_unit: 'kits',
    origin_hub: 'Guwahati Depot',
    destination_hub: 'Itanagar Civil Hospital',
    current_location: {
      latitude: 26.0461,
      longitude: 91.8845,
      speed_kmh: 48.0,
      heading: 142.0,
      timestamp: new Date().toISOString(),
      source: 'SIMULATED_TELEMETRY',
      vehicle_id: 'DEMO-VH-001'
    }
  },
  {
    id: 'DEMO-VH-002',
    vehicle_number: 'ML-05-DM-2045',
    vehicle_type: 'UTILITY',
    organization_id: 'ORG-NER-01',
    status: 'IDLE',
    speed: 0.0,
    heading: 0.0,
    current_mission_id: null,
    last_updated: new Date().toISOString(),
    location_source: 'SIMULATED_TELEMETRY',
    cargo_category: 'Medicines & Medical Supplies',
    cargo_item: 'Insulin Vials & Cardiac Emergency Drugs',
    cargo_quantity: 180,
    cargo_unit: 'vials',
    origin_hub: 'Guwahati Civil Depot',
    destination_hub: 'Tezpur Base Hospital',
    current_location: {
      latitude: 25.5700,
      longitude: 91.8833,
      speed_kmh: 0.0,
      heading: 0.0,
      timestamp: new Date().toISOString(),
      source: 'SIMULATED_TELEMETRY',
      vehicle_id: 'DEMO-VH-002'
    }
  },
  {
    id: 'DEMO-VH-003',
    vehicle_number: 'AS-01-DM-3099',
    vehicle_type: 'AMBULANCE',
    organization_id: 'ORG-NER-01',
    status: 'IDLE',
    speed: 0.0,
    heading: 0.0,
    current_mission_id: null,
    last_updated: new Date().toISOString(),
    location_source: 'SIMULATED_TELEMETRY',
    cargo_category: 'Medicines & Medical Supplies',
    cargo_item: 'Cold Chain Vaccine Doses',
    cargo_quantity: 250,
    cargo_unit: 'doses',
    origin_hub: 'Jorhat Medical College',
    destination_hub: 'Kohima District Hospital',
    current_location: {
      latitude: 26.1584,
      longitude: 91.7705,
      speed_kmh: 0.0,
      heading: 0.0,
      timestamp: new Date().toISOString(),
      source: 'SIMULATED_TELEMETRY',
      vehicle_id: 'DEMO-VH-003'
    }
  },
  {
    id: 'DEMO-VH-004',
    vehicle_number: 'AR-01-TR-4412',
    vehicle_type: 'TRUCK',
    organization_id: 'ORG-NER-01',
    status: 'IN_TRANSIT',
    speed: 52.0,
    heading: 65.0,
    current_mission_id: 'DEMO-MSN-002',
    last_updated: new Date().toISOString(),
    location_source: 'SIMULATED_TELEMETRY',
    cargo_category: 'Food & Provisions',
    cargo_item: 'Relief Grain & Fortified Rice (FCI)',
    cargo_quantity: 2400,
    cargo_unit: 'bags (50kg)',
    origin_hub: 'Silchar Logistic Yard',
    destination_hub: 'Imphal Central Granary',
    current_location: {
      latitude: 26.6500,
      longitude: 92.8000,
      speed_kmh: 52.0,
      heading: 65.0,
      timestamp: new Date().toISOString(),
      source: 'SIMULATED_TELEMETRY',
      vehicle_id: 'DEMO-VH-004'
    }
  },
  {
    id: 'DEMO-VH-005',
    vehicle_number: 'NL-07-UT-8119',
    vehicle_type: 'SMALL_CARGO',
    organization_id: 'ORG-NER-01',
    status: 'DELIVERED',
    speed: 0.0,
    heading: 0.0,
    current_mission_id: null,
    last_updated: new Date().toISOString(),
    location_source: 'SIMULATED_TELEMETRY',
    cargo_category: 'Disaster Relief Materials',
    cargo_item: 'Emergency Potable Water Purification Packs',
    cargo_quantity: 800,
    cargo_unit: 'cartons',
    origin_hub: 'Shillong Disaster Depot',
    destination_hub: 'Agartala Relief Camp',
    current_location: {
      latitude: 25.6751,
      longitude: 94.1086,
      speed_kmh: 0.0,
      heading: 0.0,
      timestamp: new Date().toISOString(),
      source: 'SIMULATED_TELEMETRY',
      vehicle_id: 'DEMO-VH-005'
    }
  }
];

// Initial Missions
const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'DEMO-MSN-001',
    mission_number: 'NER-MSN-2026-001',
    organization_id: 'ORG-NER-01',
    cargo_type: 'MEDICINES',
    cargo_description: 'Emergency Cold-Chain Vaccines & Blood Units (DEMO DATA)',
    cargo_quantity: 250,
    cargo_unit: 'vials',
    priority: 'CRITICAL',
    origin: {
      name: 'Guwahati Medical College & Hospital (GMCH)',
      latitude: 26.1584,
      longitude: 91.7705,
      district: 'Kamrup Metro',
      state: 'Assam'
    },
    destination: {
      name: 'Shillong Civil Hospital Vaccine Repository',
      latitude: 25.5700,
      longitude: 91.8833,
      district: 'East Khasi Hills',
      state: 'Meghalaya'
    },
    vehicle_id: 'DEMO-VH-001',
    status: 'IN_TRANSIT',
    current_route_id: 'RT-NER-001-NH6',
    active_route: {
      route_id: 'RT-NER-001-NH6',
      name: 'NH-6 Primary Guwahati-Shillong Highway',
      distance_km: 98.4,
      duration_minutes: 150.0,
      risk: {
        score: 0.72,
        level: 'HIGH',
        reason: 'Monsoon landslide warning active at Umsning kilometer-mark 68'
      },
      geometry: NH6_GEOMETRY,
      is_blocked: false
    },
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    departed_at: new Date(Date.now() - 3600000).toISOString(),
    eta: new Date(Date.now() + 3600000 * 1.5).toISOString(),
    delay_minutes: 0,
    timeline: [
      {
        id: 'EVT-01',
        event_type: 'MISSION_CREATED',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        title: 'Mission Initialized',
        description: 'Authorized by MDoNER Emergency Logistics Cell (Guwahati hub).'
      },
      {
        id: 'EVT-02',
        event_type: 'VEHICLE_ASSIGNED',
        timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString(),
        title: 'Vehicle Assigned',
        description: 'Assigned AS-01-DM-1001 (Heavy Refrigerated Carrier).'
      },
      {
        id: 'EVT-03',
        event_type: 'DEPARTURE',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        title: 'Convoy Departed',
        description: 'Departed GMCH Depot via NH-6 southern connector.'
      }
    ]
  },
  {
    id: 'DEMO-MSN-002',
    mission_number: 'NER-MSN-2026-002',
    organization_id: 'ORG-NER-01',
    cargo_type: 'ESSENTIAL_COMMODITIES',
    cargo_description: 'Rice, Lentils & Water Purification Kits',
    cargo_quantity: 1200,
    cargo_unit: 'kg',
    priority: 'HIGH',
    origin: {
      name: 'Guwahati Civil Supply Depot',
      latitude: 26.1800,
      longitude: 91.7500,
      district: 'Kamrup Metro',
      state: 'Assam'
    },
    destination: {
      name: 'Itanagar Disaster Response Hub',
      latitude: 27.0844,
      longitude: 93.6053,
      district: 'Papum Pare',
      state: 'Arunachal Pradesh'
    },
    vehicle_id: 'DEMO-VH-004',
    status: 'IN_TRANSIT',
    current_route_id: 'RT-NER-002-NH15',
    active_route: {
      route_id: 'RT-NER-002-NH15',
      name: 'NH-15 Tezpur-Gohpur Northern Corridor',
      distance_km: 372.0,
      duration_minutes: 490.0,
      risk: {
        score: 0.35,
        level: 'MODERATE',
        reason: 'Wet road conditions, all bridges verified operational'
      },
      geometry: [
        [26.1800, 91.7500],
        [26.4000, 92.2000],
        [26.6500, 92.8000],
        [26.8800, 93.3000],
        [27.0844, 93.6053]
      ],
      is_blocked: false
    },
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    departed_at: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    eta: new Date(Date.now() + 3600000 * 5).toISOString(),
    delay_minutes: 0,
    timeline: [
      {
        id: 'EVT-04',
        event_type: 'MISSION_CREATED',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        title: 'Mission Dispatched',
        description: 'Relief convoy cleared for Papum Pare district.'
      }
    ]
  },
  {
    id: 'DEMO-MSN-003',
    mission_number: 'NER-MSN-2026-003',
    organization_id: 'ORG-NER-01',
    cargo_type: 'MEDICINES',
    cargo_description: 'Anti-Venom & Pediatric Vaccines',
    cargo_quantity: 400,
    cargo_unit: 'units',
    priority: 'HIGH',
    origin: {
      name: 'Silchar Medical Center',
      latitude: 24.8333,
      longitude: 92.7789,
      district: 'Cachar',
      state: 'Assam'
    },
    destination: {
      name: 'Aizawl District Hospital',
      latitude: 23.7271,
      longitude: 92.7176,
      district: 'Aizawl',
      state: 'Mizoram'
    },
    vehicle_id: null,
    status: 'PLANNED',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    delay_minutes: 0,
    timeline: [
      {
        id: 'EVT-05',
        event_type: 'MISSION_CREATED',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        title: 'Mission Scheduled',
        description: 'Awaiting transport vehicle allocation.'
      }
    ]
  }
];

// Helper calculations


function calculateBearing(p1: [number, number], p2: [number, number]): number {
  const lat1 = (p1[0] * Math.PI) / 180;
  const lat2 = (p2[0] * Math.PI) / 180;
  const dLon = ((p2[1] - p1[1]) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

class LogisticsService {
  private vehicles: Vehicle[] = [...INITIAL_VEHICLES];
  private missions: Mission[] = [...INITIAL_MISSIONS];
  private simProgress: Record<string, number> = { 'DEMO-MSN-001': 0.35 }; // 35% along route
  private simRunning: Record<string, boolean> = { 'DEMO-MSN-001': false };
  private simSpeed: Record<string, number> = { 'DEMO-MSN-001': 5.0 };
  private intervalIds: Record<string, any> = {};

  // Stats
  public getOverviewStats(): LogisticsOverviewStats {
    const activeMissions = this.missions.filter(
      (m) => m.status === 'ASSIGNED' || m.status === 'IN_TRANSIT'
    ).length;
    const inTransitVehicles = this.vehicles.filter((v) => v.status === 'IN_TRANSIT').length;
    const delayed = this.missions.filter((m) => m.delay_minutes > 0).length;
    const critical = this.missions.filter((m) => m.priority === 'CRITICAL').length;
    const delivered = this.missions.filter((m) => m.status === 'DELIVERED').length;

    return {
      active_missions: activeMissions,
      in_transit_vehicles: inTransitVehicles,
      delayed_deliveries: delayed,
      critical_missions: critical,
      completed_today: delivered + 3 // demo completed counter
    };
  }

  // Missions
  public getMissions(): Mission[] {
    return [...this.missions];
  }

  public getMission(id: string): Mission | undefined {
    return this.missions.find((m) => m.id === id);
  }

  public createMission(payload: Partial<Mission>): Mission {
    const newId = `DEMO-MSN-${String(this.missions.length + 1).padStart(3, '0')}`;
    const newNum = `NER-MSN-2026-${String(this.missions.length + 1).padStart(3, '0')}`;

    const newMission: Mission = {
      id: newId,
      mission_number: newNum,
      organization_id: 'ORG-NER-01',
      cargo_type: payload.cargo_type || 'MEDICINES',
      cargo_description: payload.cargo_description || 'Emergency Relief Cargo',
      cargo_quantity: payload.cargo_quantity || 100,
      cargo_unit: payload.cargo_unit || 'boxes',
      priority: payload.priority || 'HIGH',
      origin: payload.origin || {
        name: 'Guwahati Depot',
        latitude: 26.1584,
        longitude: 91.7705,
        state: 'Assam'
      },
      destination: payload.destination || {
        name: 'Shillong Depot',
        latitude: 25.5700,
        longitude: 91.8833,
        state: 'Meghalaya'
      },
      vehicle_id: null,
      status: 'PLANNED',
      created_at: new Date().toISOString(),
      delay_minutes: 0,
      timeline: [
        {
          id: `EVT-${Date.now()}`,
          event_type: 'MISSION_CREATED',
          timestamp: new Date().toISOString(),
          title: 'Mission Created',
          description: `Created supply mission for ${payload.cargo_description}`
        }
      ]
    };

    this.missions.unshift(newMission);
    return newMission;
  }

  public assignVehicle(missionId: string, vehicleId: string): Mission | undefined {
    const mission = this.getMission(missionId);
    if (!mission) return undefined;

    mission.vehicle_id = vehicleId;
    mission.status = 'ASSIGNED';
    mission.timeline.push({
      id: `EVT-${Date.now()}`,
      event_type: 'VEHICLE_ASSIGNED',
      timestamp: new Date().toISOString(),
      title: 'Vehicle Assigned',
      description: `Allocated vehicle ${vehicleId} to supply mission.`
    });

    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      vehicle.status = 'ASSIGNED';
      vehicle.current_mission_id = missionId;
    }

    return mission;
  }

  public rerouteMission(missionId: string, reason: string): Mission | undefined {
    const mission = this.getMission(missionId);
    if (!mission) return undefined;

    const previousRoute = mission.active_route ? { ...mission.active_route } : null;

    mission.previous_route = previousRoute;
    mission.active_route = {
      route_id: 'RT-NER-001-BYPASS',
      name: 'NH-6 Eastern Valley Landslide Bypass',
      distance_km: 106.8,
      duration_minutes: 175.0,
      risk: {
        score: 0.28,
        level: 'LOW',
        reason: 'Valley detour bypassing Umsning mudslide zone'
      },
      geometry: NH6_BYPASS_GEOMETRY,
      is_blocked: false
    };

    mission.recent_route_comparison = {
      previous_route_name: previousRoute?.name || 'NH-6 Primary',
      new_route_name: 'NH-6 Eastern Valley Landslide Bypass',
      previous_distance_km: previousRoute?.distance_km || 98.4,
      new_distance_km: 106.8,
      previous_eta: mission.eta || new Date(Date.now() + 3600000).toISOString(),
      new_eta: new Date(Date.now() + 3600000 * 2).toISOString(),
      eta_difference_minutes: 25,
      reason: reason
    };

    mission.delay_minutes = 25;
    mission.delay_reason = reason;

    mission.timeline.push({
      id: `EVT-${Date.now()}`,
      event_type: 'ROUTE_CHANGED',
      timestamp: new Date().toISOString(),
      title: 'Corridor Diversion Activated',
      description: `Bypass applied: ${reason}. Added +25m buffer.`
    });

    return mission;
  }

  // Vehicles
  public getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  public getVehicle(id: string): Vehicle | undefined {
    return this.vehicles.find((v) => v.id === id);
  }

  public getVehicleLocations(vehicleId: string, limit: number = 20): TelemetryPoint[] {
    const v = this.getVehicle(vehicleId);
    if (!v || !v.current_location) return [];

    const pts: TelemetryPoint[] = [];
    const baseLat = v.current_location.latitude;
    const baseLng = v.current_location.longitude;

    for (let i = 0; i < limit; i++) {
      pts.push({
        id: `TLM-${vehicleId}-${i}`,
        vehicle_id: vehicleId,
        latitude: baseLat - i * 0.008,
        longitude: baseLng - i * 0.004,
        speed: Math.max(20, v.speed - (i % 5)),
        heading: v.heading,
        timestamp: new Date(Date.now() - i * 60000 * 3).toISOString(),
        source: v.location_source
      });
    }

    return pts;
  }

  // Simulation Engine (Client-side deterministic traversal)
  public startSimulation(missionId: string, onTick?: (loc: VehicleLocation) => void): void {
    const mission = this.getMission(missionId);
    if (!mission || !mission.vehicle_id) return;

    this.simRunning[missionId] = true;
    mission.status = 'IN_TRANSIT';

    const vehicle = this.getVehicle(mission.vehicle_id);
    if (vehicle) vehicle.status = 'IN_TRANSIT';

    if (this.intervalIds[missionId]) {
      clearInterval(this.intervalIds[missionId]);
    }

    this.intervalIds[missionId] = setInterval(() => {
      if (!this.simRunning[missionId]) return;

      const progress = this.simProgress[missionId] || 0;
      const speedMult = this.simSpeed[missionId] || 5.0;
      // Step increment: 0.008 * speed multiplier
      let nextProgress = progress + 0.003 * speedMult;
      if (nextProgress >= 1.0) {
        nextProgress = 1.0;
        this.simRunning[missionId] = false;
        mission.status = 'DELIVERED';
        if (vehicle) vehicle.status = 'DELIVERED';
        clearInterval(this.intervalIds[missionId]);
      }
      this.simProgress[missionId] = nextProgress;

      // Calculate coordinates from geometry
      const geom = mission.active_route?.geometry || NH6_GEOMETRY;
      const totalSegments = geom.length - 1;
      const exactIndex = nextProgress * totalSegments;
      const segIndex = Math.min(Math.floor(exactIndex), totalSegments - 1);
      const segT = exactIndex - segIndex;

      const p1 = geom[segIndex];
      const p2 = geom[segIndex + 1] || p1;

      const currentLat = p1[0] + (p2[0] - p1[0]) * segT;
      const currentLng = p1[1] + (p2[1] - p1[1]) * segT;
      const heading = calculateBearing(p1, p2);

      const newLoc: VehicleLocation = {
        latitude: currentLat,
        longitude: currentLng,
        speed_kmh: Math.round(45 + Math.random() * 8),
        heading: Math.round(heading),
        timestamp: new Date().toISOString(),
        source: 'SIMULATED_TELEMETRY',
        vehicle_id: mission.vehicle_id || undefined
      };

      if (vehicle) {
        vehicle.current_location = newLoc;
        vehicle.speed = newLoc.speed_kmh;
        vehicle.heading = newLoc.heading;
        vehicle.last_updated = newLoc.timestamp;
      }

      onTick?.(newLoc);
    }, 1000);
  }

  public pauseSimulation(missionId: string): void {
    this.simRunning[missionId] = false;
    if (this.intervalIds[missionId]) {
      clearInterval(this.intervalIds[missionId]);
    }
  }

  public resetSimulation(missionId: string): void {
    this.pauseSimulation(missionId);
    this.simProgress[missionId] = 0;
    const mission = this.getMission(missionId);
    if (!mission) return;

    mission.status = 'ASSIGNED';
    mission.delay_minutes = 0;
    mission.recent_route_comparison = null;
    mission.active_route = {
      route_id: 'RT-NER-001-NH6',
      name: 'NH-6 Primary Guwahati-Shillong Highway',
      distance_km: 98.4,
      duration_minutes: 150.0,
      risk: {
        score: 0.72,
        level: 'HIGH',
        reason: 'Monsoon landslide warning active at Umsning kilometer-mark 68'
      },
      geometry: NH6_GEOMETRY,
      is_blocked: false
    };

    if (mission.vehicle_id) {
      const v = this.getVehicle(mission.vehicle_id);
      if (v) {
        v.status = 'ASSIGNED';
        v.current_location = {
          latitude: NH6_GEOMETRY[0][0],
          longitude: NH6_GEOMETRY[0][1],
          speed_kmh: 0,
          heading: 135,
          timestamp: new Date().toISOString(),
          source: 'SIMULATED_TELEMETRY',
          vehicle_id: v.id
        };
      }
    }
  }

  public setSimulationSpeed(missionId: string, speedMultiplier: number): void {
    this.simSpeed[missionId] = speedMultiplier;
  }

  public injectDisruption(missionId: string): void {
    this.rerouteMission(
      missionId,
      'Landslide detected near Umsning km-68. Rerouting via Eastern Valley Bypass.'
    );
  }

  public getSimulationState(missionId: string) {
    return {
      progress: this.simProgress[missionId] || 0,
      isRunning: !!this.simRunning[missionId],
      speedMultiplier: this.simSpeed[missionId] || 5.0
    };
  }
}

export const logisticsService = new LogisticsService();
