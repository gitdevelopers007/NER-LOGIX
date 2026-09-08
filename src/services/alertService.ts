import { liveGovtService } from './liveGovtService';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  category: 'LANDSLIDE' | 'FLOOD' | 'DELIVERY_DELAY' | 'WEATHER' | 'BRIDGE' | 'EARTHQUAKE';
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
  eventUrl?: string;
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
  private baseAlerts: AlertItem[] = [...INITIAL_ALERTS];
  private liveAlerts: AlertItem[] = [];

  constructor() {
    this.syncLiveGovtFeeds();
    liveGovtService.onModeChange(() => {
      this.syncLiveGovtFeeds();
    });
  }

  public async syncLiveGovtFeeds(): Promise<AlertItem[]> {
    if (liveGovtService.getMode() !== 'LIVE') {
      this.liveAlerts = [];
      return this.getAlerts();
    }

    try {
      const [quakes, landslides] = await Promise.all([
        liveGovtService.getEarthquakes(),
        liveGovtService.getLandslides()
      ]);

      const quakeAlerts: AlertItem[] = quakes.slice(0, 3).map((eq) => ({
        id: `NCS-EQ-${eq.id}`,
        severity: eq.magnitude >= 3.2 ? 'CRITICAL' : eq.magnitude >= 2.6 ? 'HIGH' : 'MEDIUM',
        status: 'ACTIVE',
        title: `Live Seismic Advisory (M ${eq.magnitude.toFixed(1)}) — ${eq.place}`,
        category: 'EARTHQUAKE',
        state: eq.region || 'North East Region',
        district: eq.place.split(',')[0] || 'Regional Epicenter',
        road: 'Arterial Mountain Transit Corridor',
        roadCondition: eq.magnitude >= 3.2 ? 'RESTRICTED' : 'CAUTION',
        affectedArea: `${eq.place} (Focal Depth: ${eq.depthKm} km)`,
        source: 'National Centre for Seismology / NESAC NERDRR',
        reportedAgo: 'Live NCS Bulletin',
        timestamp: eq.time,
        latitude: eq.latitude,
        longitude: eq.longitude,
        eventUrl: eq.eventUrl,
        recommendedResponse: [
          `Seismometer telemetry confirmed at depth ${eq.depthKm}km. Assess elevated pass culverts.`,
          'Verify bridge structural expansion joints with Border Roads Organisation',
          'Maintain situational awareness with State Disaster Management Authority'
        ],
        responseStages: {
          alertGenerated: true,
          fieldTeamNotified: true,
          routeAnalysisComplete: true,
          responseStatus: 'IN_PROGRESS'
        }
      }));

      const topLandslides: AlertItem[] = landslides
        .filter(l => l.area > 0)
        .slice(0, 2)
        .map((ls) => ({
          id: `NESAC-LS-${ls.state.replace(/\s+/g, '-').toUpperCase()}`,
          severity: ls.hazardLevel === 'Critical' ? 'CRITICAL' : 'HIGH',
          status: 'ACTIVE',
          title: `Satellite Landslide Warning — ${ls.state} (${ls.area} High-Risk Zones)`,
          category: 'LANDSLIDE',
          state: ls.state,
          district: `${ls.state} Hilly Corridors`,
          road: 'Primary Freight Corridors',
          roadCondition: ls.hazardLevel === 'Critical' ? 'BLOCKED' : 'RESTRICTED',
          affectedArea: `${ls.area} landslide displacement zones documented by NESAC satellite GIS`,
          source: 'NESAC / NERDRR Landslide Gateway',
          reportedAgo: 'ISRO Earth Observation',
          timestamp: new Date().toISOString(),
          latitude: ls.state === 'Assam' ? 26.24 : ls.state === 'Arunachal Pradesh' ? 27.35 : 25.57,
          longitude: ls.state === 'Assam' ? 92.40 : ls.state === 'Arunachal Pradesh' ? 93.68 : 91.89,
          recommendedResponse: [
            'Alert civil transport authorities of unstable cliff sections',
            'Mobilize regional quick-response earthmoving units for rapid clearance',
            'Reroute freight traffic to designated secondary lifelines'
          ],
          responseStages: {
            alertGenerated: true,
            fieldTeamNotified: true,
            routeAnalysisComplete: true,
            responseStatus: 'IN_PROGRESS'
          }
        }));

      this.liveAlerts = [...quakeAlerts, ...topLandslides];
      return this.getAlerts();
    } catch {
      return this.getAlerts();
    }
  }

  public getAlerts(): AlertItem[] {
    if (liveGovtService.getMode() === 'LIVE' && this.liveAlerts.length > 0) {
      return [...this.liveAlerts, ...this.baseAlerts];
    }
    return [...this.baseAlerts];
  }

  public getAlertById(id: string): AlertItem | undefined {
    return this.getAlerts().find((a) => a.id === id);
  }

  public acknowledgeAlert(id: string): AlertItem | undefined {
    const alert = this.getAlertById(id);
    if (!alert) return undefined;
    alert.status = 'ACKNOWLEDGED';
    return alert;
  }

  public dispatchEmergencyAction(id: string): AlertItem | undefined {
    const alert = this.getAlertById(id);
    if (!alert) return undefined;
    alert.responseStages.responseStatus = 'IN_PROGRESS';
    alert.responseStages.fieldTeamNotified = true;
    return alert;
  }

  public getStats() {
    const list = this.getAlerts();
    return {
      critical: list.filter(a => a.severity === 'CRITICAL').length,
      highPriority: list.filter(a => a.severity === 'HIGH').length,
      active: list.filter(a => a.status === 'ACTIVE').length,
      acknowledged: list.filter(a => a.status === 'ACKNOWLEDGED').length
    };
  }
}

export const alertService = new AlertService();
