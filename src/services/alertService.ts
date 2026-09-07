export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  category: 'LANDSLIDE' | 'FLOOD' | 'DELIVERY_DELAY' | 'WEATHER' | 'BRIDGE';
  state: string;
  district: string;
  road: string;
  roadCondition: 'BLOCKED' | 'RESTRICTED' | 'SLOWDOWN' | 'CAUTION' | 'NORMAL';
  affectedArea: string;
  source: string;
  reportedAgo: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  incidentId?: string;
  routeId?: string;
  recommendedResponse: string[];
  responseStages: {
    alertGenerated: boolean;
    fieldTeamNotified: boolean;
    routeAnalysisComplete: boolean;
    responseStatus: 'IN_PROGRESS' | 'COMPLETED' | 'STANDBY';
  };
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-2026-0089',
    severity: 'CRITICAL',
    status: 'ACTIVE',
    title: 'Landslide affecting NH-13',
    category: 'LANDSLIDE',
    state: 'Arunachal Pradesh',
    district: 'Lower Subansiri',
    road: 'NH-13 (Trans-Arunachal Highway)',
    roadCondition: 'BLOCKED',
    affectedArea: '2 districts (Lower Subansiri, Papum Pare)',
    source: 'Field Report + Risk Engine',
    reportedAgo: '08 min ago',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    latitude: 27.4285,
    longitude: 93.7542,
    incidentId: 'INC-2026-00482',
    routeId: 'RT-NER-002-NH15',
    recommendedResponse: [
      'Restrict NH-13 corridor traffic at Potin checkpost',
      'Check alternate corridor via Tezpur northern bypass',
      'Monitor 2 nearby logistics vehicles heading northbound',
      'Notify BRO Task Force 42 and Lower Subansiri district police'
    ],
    responseStages: {
      alertGenerated: true,
      fieldTeamNotified: true,
      routeAnalysisComplete: true,
      responseStatus: 'IN_PROGRESS'
    }
  },
  {
    id: 'ALT-2026-0088',
    severity: 'HIGH',
    status: 'ACTIVE',
    title: 'Flood Risk — Assam Riverine Basin',
    category: 'FLOOD',
    state: 'Assam',
    district: 'Dhemaji & Lakhimpur',
    road: 'NH-15 Corridor',
    roadCondition: 'RESTRICTED',
    affectedArea: '3 districts (Dhemaji, Lakhimpur, Biswanath)',
    source: 'IMD Doppler Radar + CWC Hydrology Feeds',
    reportedAgo: '21 min ago',
    timestamp: new Date(Date.now() - 21 * 60000).toISOString(),
    latitude: 27.4800,
    longitude: 94.5500,
    incidentId: 'INC-2026-00479',
    recommendedResponse: [
      'Issue warning to heavy freight convoys over Subansiri crossway',
      'Maintain continuous water level telemetry with Central Water Commission',
      'Standby SDRF rescue rafts at Dhemaji sub-division depot'
    ],
    responseStages: {
      alertGenerated: true,
      fieldTeamNotified: true,
      routeAnalysisComplete: false,
      responseStatus: 'IN_PROGRESS'
    }
  },
  {
    id: 'ALT-2026-0087',
    severity: 'HIGH',
    status: 'ACTIVE',
    title: 'Delivery Delay — Meghalaya Medical Supplies',
    category: 'DELIVERY_DELAY',
    state: 'Meghalaya',
    district: 'Ri-Bhoi',
    road: 'NH-6 Guwahati-Shillong Highway',
    roadCondition: 'SLOWDOWN',
    affectedArea: '1 transit corridor (Guwahati to Shillong)',
    source: 'Vehicle Telemetry + Field Patrol Report',
    reportedAgo: '34 min ago',
    timestamp: new Date(Date.now() - 34 * 60000).toISOString(),
    latitude: 25.7535,
    longitude: 91.9020,
    incidentId: 'INC-2026-00480',
    routeId: 'RT-NER-001-NH6',
    recommendedResponse: [
      'Reroute refrigerated vaccine carrier AS-01-DM-1001 via Eastern Valley bypass',
      'Buffer additional +25 minutes to Shillong Civil Hospital delivery window',
      'Verify cold-chain temperature telemetry logs remain nominal'
    ],
    responseStages: {
      alertGenerated: true,
      fieldTeamNotified: true,
      routeAnalysisComplete: true,
      responseStatus: 'IN_PROGRESS'
    }
  },
  {
    id: 'ALT-2026-0086',
    severity: 'MEDIUM',
    status: 'ACKNOWLEDGED',
    title: 'Heavy Rainfall & Mud Accumulation — Nagaland',
    category: 'WEATHER',
    state: 'Nagaland',
    district: 'Kohima',
    road: 'NH-29 Dimapur-Kohima Road',
    roadCondition: 'CAUTION',
    affectedArea: '1 district (Kohima mountain pass)',
    source: 'SDRF Nagaland Telemetry + State Police Patrol',
    reportedAgo: '52 min ago',
    timestamp: new Date(Date.now() - 52 * 60000).toISOString(),
    latitude: 25.6751,
    longitude: 94.1086,
    recommendedResponse: [
      'Single lane caution advisory issued to civilian transit',
      'Heavy earthmovers placed on standby at Chumoukedima checkpost'
    ],
    responseStages: {
      alertGenerated: true,
      fieldTeamNotified: true,
      routeAnalysisComplete: true,
      responseStatus: 'COMPLETED'
    }
  }
];

class AlertService {
  private alerts: AlertItem[] = [...INITIAL_ALERTS];

  public getAlerts(): AlertItem[] {
    return [...this.alerts];
  }

  public getAlertById(id: string): AlertItem | undefined {
    return this.alerts.find((a) => a.id === id);
  }

  public acknowledgeAlert(id: string): AlertItem | undefined {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return undefined;
    alert.status = 'ACKNOWLEDGED';
    return alert;
  }

  public dispatchEmergencyAction(id: string): AlertItem | undefined {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return undefined;
    alert.responseStages.responseStatus = 'IN_PROGRESS';
    alert.responseStages.fieldTeamNotified = true;
    return alert;
  }

  public getStats() {
    return {
      critical: 6,
      highPriority: 18,
      active: 32,
      acknowledged: 14
    };
  }
}

export const alertService = new AlertService();
