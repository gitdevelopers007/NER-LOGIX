export type IncidentType = 
  | 'LANDSLIDE' 
  | 'ROAD_DAMAGE' 
  | 'HEAVY_RAINFALL' 
  | 'FLASH_FLOOD' 
  | 'BRIDGE_DAMAGE' 
  | 'TRAFFIC_BLOCKAGE' 
  | 'OTHER';

export type IncidentSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type IncidentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface IncidentTimelineEntry {
  time: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface AiAssessment {
  possibleIncident: string;
  estimatedSeverity: IncidentSeverity;
  potentialImpact: string;
  affectedCorridor: string;
  suggestedAction: string;
}

export interface CorroboratingReport {
  id: string;
  reportedBy: string;
  sourceType: 'MOBILE_PWA' | 'BRO_RADIO' | 'CITIZEN_APP' | 'POLICE_VHF';
  timeAgo: string;
  notes: string;
}

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  state: string;
  district: string;
  road: string;
  latitude: number;
  longitude: number;
  reportedBy: string;
  reportedTime: string;
  timeAgo: string;
  currentRoadStatus: string;
  description: string;
  photoUrl: string;
  photoMetadata: {
    uploaded: string;
    gpsVerified: boolean;
    source: string;
  };
  timeline: IncidentTimelineEntry[];
  aiAssessment: AiAssessment;
  corroborationCount?: number;
  confidenceScore?: number;
  duplicateReportsMerged?: number;
  corroboratingReports?: CorroboratingReport[];
}

// Inline SVGs for authentic field evidence photos
const LANDSLIDE_PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='100%25' height='100%25'%3E%3Crect width='600' height='340' fill='%23334155'/%3E%3Cpath d='M0 240 L180 140 L320 200 L440 120 L600 220 L600 340 L0 340 Z' fill='%231e293b'/%3E%3Cpath d='M120 220 L280 290 L400 240 L520 310 L600 290 L600 340 L120 340 Z' fill='%23475569'/%3E%3Cpath d='M200 180 L290 270 L240 330 L160 300 Z' fill='%2378350f' opacity='0.85'/%3E%3Ccircle cx='230' cy='250' r='14' fill='%2392400e'/%3E%3Ccircle cx='260' cy='280' r='18' fill='%23713f12'/%3E%3Ccircle cx='210' cy='290' r='10' fill='%23854d0e'/%3E%3Crect x='20' y='20' width='160' height='32' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='41' fill='%23ef4444' font-family='monospace' font-size='12' font-weight='bold'%3E● FIELD EVIDENCE%3C/text%3E%3Crect x='20' y='285' width='230' height='35' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='302' fill='%23e2e8f0' font-family='sans-serif' font-size='10'%3ENH-13 KM-142 • LOWER SUBANSIRI%3C/text%3E%3Ctext x='30' y='314' fill='%2394a3b8' font-family='monospace' font-size='9'%3E27.4285° N, 93.7542° E%3C/text%3E%3C/svg%3E";

const ROAD_DAMAGE_PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='100%25' height='100%25'%3E%3Crect width='600' height='340' fill='%231e293b'/%3E%3Cpath d='M0 160 L600 160 L600 340 L0 340 Z' fill='%23334155'/%3E%3Cpath d='M150 210 L300 250 L270 320 L120 280 Z' fill='%230f172a'/%3E%3Cline x1='120' y1='220' x2='380' y2='270' stroke='%23f59e0b' stroke-width='4' stroke-dasharray='10,10'/%3E%3Crect x='20' y='20' width='160' height='32' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='41' fill='%23f59e0b' font-family='monospace' font-size='12' font-weight='bold'%3E● ROAD CRACK%3C/text%3E%3Crect x='20' y='285' width='220' height='35' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='302' fill='%23e2e8f0' font-family='sans-serif' font-size='10'%3ENH-37 CORRIDOR • ASSAM%3C/text%3E%3Ctext x='30' y='314' fill='%2394a3b8' font-family='monospace' font-size='9'%3E26.3540° N, 92.6840° E%3C/text%3E%3C/svg%3E";

const RAINFALL_PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='100%25' height='100%25'%3E%3Crect width='600' height='340' fill='%231e3a8a'/%3E%3Crect width='600' height='340' fill='%230f172a' opacity='0.6'/%3E%3Cpath d='M0 260 L600 240 L600 340 L0 340 Z' fill='%23172554'/%3E%3Crect x='20' y='20' width='180' height='32' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='41' fill='%2338bdf8' font-family='monospace' font-size='12' font-weight='bold'%3E● HEAVY PRECIPITATION%3C/text%3E%3Crect x='20' y='285' width='230' height='35' rx='6' fill='%230f172a' opacity='0.85'/%3E%3Ctext x='30' y='302' fill='%23e2e8f0' font-family='sans-serif' font-size='10'%3EEAST KHASI HILLS • MEGHALAYA%3C/text%3E%3Ctext x='30' y='314' fill='%2394a3b8' font-family='monospace' font-size='9'%3E25.5700° N, 91.8833° E%3C/text%3E%3C/svg%3E";

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-00482',
    type: 'LANDSLIDE',
    title: 'Major Landslide on NH-13 Lower Subansiri',
    severity: 'CRITICAL',
    status: 'PENDING',
    state: 'Arunachal Pradesh',
    district: 'Lower Subansiri',
    road: 'NH-13 (Trans-Arunachal Highway)',
    latitude: 27.4285,
    longitude: 93.7542,
    reportedBy: 'Field Operations Team (Officer T. Ronya)',
    reportedTime: '29 Aug 2026, 14:18',
    timeAgo: '14 min ago',
    currentRoadStatus: 'ROAD POSSIBLY BLOCKED',
    description: 'Heavy slope failure triggered by continuous downpour. Massive rock debris and mud blocking both carriageways near kilometer-mark 142. Two supply trucks halted on northbound side. BRO clearing detachment requested.',
    photoUrl: LANDSLIDE_PHOTO,
    photoMetadata: {
      uploaded: '29 Aug 2026, 14:20',
      gpsVerified: true,
      source: 'Field Operations Mobile Unit #4'
    },
    timeline: [
      { time: '14:18', title: 'Field report submitted', description: 'Filed by Officer T. Ronya via Mobile App', completed: true },
      { time: '14:19', title: 'GPS location received', description: 'High precision fix ±3.2m at 27.4285, 93.7542', completed: true },
      { time: '14:20', title: 'Photograph uploaded', description: 'Field evidence photo verified by local timestamp', completed: true },
      { time: '14:22', title: 'System processed report', description: 'Corridor associated with NH-13 sector 4', completed: true },
      { time: '14:25', title: 'Government officer notified', description: 'Priority alert sent to State Disaster Operations Cell', completed: true }
    ],
    aiAssessment: {
      possibleIncident: 'LANDSLIDE',
      estimatedSeverity: 'HIGH',
      potentialImpact: 'Road accessibility severely affected',
      affectedCorridor: 'NH-13',
      suggestedAction: 'Review alternate routes via Tezpur bypass'
    },
    corroborationCount: 3,
    confidenceScore: 98,
    duplicateReportsMerged: 2,
    corroboratingReports: [
      {
        id: 'CR-001',
        reportedBy: 'BRO Detachment 753 (Radio Dispatch)',
        sourceType: 'BRO_RADIO',
        timeAgo: '9 min ago',
        notes: 'Boulders & debris confirmed at KM-142. Heavy earthmover dispatched from Ziro depot.'
      },
      {
        id: 'CR-002',
        reportedBy: 'Officer T. Ronya (Field Unit #4)',
        sourceType: 'MOBILE_PWA',
        timeAgo: '14 min ago',
        notes: 'Slope failure across both lanes. 2 supply trucks stopped on north side.'
      },
      {
        id: 'CR-003',
        reportedBy: 'Civilian Driver (NER-LOGIX Citizen App)',
        sourceType: 'CITIZEN_APP',
        timeAgo: '3 min ago',
        notes: 'Mud slurry spreading across culvert. Vehicles cannot cross.'
      }
    ]
  },
  {
    id: 'INC-2026-00481',
    type: 'ROAD_DAMAGE',
    title: 'Carriageway Subsidence on NH-37 Nagaon Bypass',
    severity: 'HIGH',
    status: 'VERIFIED',
    state: 'Assam',
    district: 'Nagaon',
    road: 'NH-37 Corridor',
    latitude: 26.3540,
    longitude: 92.6840,
    reportedBy: 'Highway Patrol Team #2',
    reportedTime: '29 Aug 2026, 14:04',
    timeAgo: '28 min ago',
    currentRoadStatus: 'SINGLE LANE OPERATIONAL (RESTRICTED)',
    description: 'Asphalt collapse on left lane due to underground culvert seepage. Single lane traffic operating under manual police regulation. Heavy freight vehicles diverted via NH-715.',
    photoUrl: ROAD_DAMAGE_PHOTO,
    photoMetadata: {
      uploaded: '29 Aug 2026, 14:06',
      gpsVerified: true,
      source: 'State Police Highway Division'
    },
    timeline: [
      { time: '14:04', title: 'Field report submitted', description: 'Filed by Sub-Inspector D. Das', completed: true },
      { time: '14:05', title: 'GPS location received', description: 'Fixed at 26.3540, 92.6840', completed: true },
      { time: '14:06', title: 'Photograph uploaded', description: 'Evidence photo confirmed culvert sinkhole', completed: true },
      { time: '14:12', title: 'Incident verified', description: 'Verified by PWD Executive Engineer', completed: true },
      { time: '14:15', title: 'Road status updated', description: 'Marked as RESTRICTED (Single-lane only)', completed: true }
    ],
    aiAssessment: {
      possibleIncident: 'ROAD SUBSIDENCE',
      estimatedSeverity: 'HIGH',
      potentialImpact: 'Slowdown expected for commercial freight',
      affectedCorridor: 'NH-37',
      suggestedAction: 'Reroute heavy trucks to southern corridor'
    },
    corroborationCount: 2,
    confidenceScore: 94,
    duplicateReportsMerged: 1,
    corroboratingReports: [
      {
        id: 'CR-004',
        reportedBy: 'Assam Highway Patrol (Unit 12)',
        sourceType: 'POLICE_VHF',
        timeAgo: '28 min ago',
        notes: 'Transverse pavement crack expanding across westbound lane near KM-68.'
      },
      {
        id: 'CR-005',
        reportedBy: 'PWD Inspector B. Gogoi',
        sourceType: 'MOBILE_PWA',
        timeAgo: '35 min ago',
        notes: 'Culvert structural seepage confirmed. Sandbags deployed.'
      }
    ]
  },
  {
    id: 'INC-2026-00480',
    type: 'HEAVY_RAINFALL',
    title: 'Flash Flood Watch & Heavy Rainfall at East Khasi Hills',
    severity: 'MODERATE',
    status: 'PENDING',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    road: 'SH-5 Cherrapunji Connector',
    latitude: 25.5700,
    longitude: 91.8833,
    reportedBy: 'District Disaster Management Authority (DDMA)',
    reportedTime: '29 Aug 2026, 13:51',
    timeAgo: '41 min ago',
    currentRoadStatus: 'CAUTION ADVISED - LOW VISIBILITY',
    description: 'Torrential rainfall exceeding 85mm/hr. Dense fog causing visibility drop below 15 meters on mountain curves. Surface runoff across lower road bends.',
    photoUrl: RAINFALL_PHOTO,
    photoMetadata: {
      uploaded: '29 Aug 2026, 13:53',
      gpsVerified: true,
      source: 'DDMA Station Shillong'
    },
    timeline: [
      { time: '13:51', title: 'Field report submitted', description: 'Weather warning logged by DDMA Shillong', completed: true },
      { time: '13:52', title: 'GPS location received', description: 'Fixed at 25.5700, 91.8833', completed: true },
      { time: '13:53', title: 'Photograph uploaded', description: 'Doppler station radar snippet attached', completed: true }
    ],
    aiAssessment: {
      possibleIncident: 'HEAVY PRECIPITATION',
      estimatedSeverity: 'MODERATE',
      potentialImpact: 'Transit speed reduced by 40%',
      affectedCorridor: 'SH-5',
      suggestedAction: 'Issue advisory to medical convoys'
    }
  },
  {
    id: 'INC-2026-00479',
    type: 'BRIDGE_DAMAGE',
    title: 'Pier Scour Detected on Subansiri River Bridge',
    severity: 'CRITICAL',
    status: 'VERIFIED',
    state: 'Assam',
    district: 'Dhemaji',
    road: 'NH-15 River Crossway',
    latitude: 27.4800,
    longitude: 94.5500,
    reportedBy: 'Border Roads Organisation (BRO) Inspection Cell',
    reportedTime: '29 Aug 2026, 13:15',
    timeAgo: '1h 17m ago',
    currentRoadStatus: 'ROAD BLOCKED - CONVOYS DIVERTED',
    description: 'Water velocity caused severe bed scour under central Pier #3. Heavy vehicle crossing suspended immediately by safety inspectors. Structural engineers deployed from Guwahati.',
    photoUrl: LANDSLIDE_PHOTO,
    photoMetadata: {
      uploaded: '29 Aug 2026, 13:17',
      gpsVerified: true,
      source: 'BRO Task Force 42'
    },
    timeline: [
      { time: '13:15', title: 'Field report submitted', description: 'Filed by BRO Chief Engineer', completed: true },
      { time: '13:17', title: 'GPS location received', description: 'Fixed at 27.4800, 94.5500', completed: true },
      { time: '13:20', title: 'Incident verified', description: 'Emergency closure confirmed by District Collector', completed: true },
      { time: '13:22', title: 'Alert broadcast dispatched', description: 'Convoy halt issued for all outbound trucks', completed: true }
    ],
    aiAssessment: {
      possibleIncident: 'STRUCTURAL DAMAGE',
      estimatedSeverity: 'CRITICAL',
      potentialImpact: 'Total inter-state corridor severed',
      affectedCorridor: 'NH-15',
      suggestedAction: 'Divert to Bogibeel rail-road bridge corridor'
    }
  }
];

class IncidentService {
  private incidents: Incident[] = [...INITIAL_INCIDENTS];

  public getIncidents(): Incident[] {
    return [...this.incidents];
  }

  public getIncidentById(id: string): Incident | undefined {
    return this.incidents.find((i) => i.id === id);
  }

  public verifyIncident(id: string): Incident | undefined {
    const inc = this.incidents.find((i) => i.id === id);
    if (!inc) return undefined;

    inc.status = 'VERIFIED';
    inc.currentRoadStatus = 'ROAD BLOCKED (VERIFIED)';
    
    // Append verification audit steps
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    inc.timeline.push(
      {
        time: timeStr,
        title: 'Incident verified by Government Officer',
        description: 'Command center verification authorized by Admin Officer (DoNER Ops)',
        completed: true
      },
      {
        time: timeStr,
        title: 'Road status updated to BLOCKED',
        description: 'GIS database updated. Route Intelligence & Alert Engine signaled.',
        completed: true
      }
    );

    return inc;
  }

  public rejectIncident(id: string, reason?: string): Incident | undefined {
    const inc = this.incidents.find((i) => i.id === id);
    if (!inc) return undefined;

    inc.status = 'REJECTED';
    inc.currentRoadStatus = 'REPORT REJECTED - PASSABLE';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    inc.timeline.push({
      time: timeStr,
      title: 'Report rejected by Government Officer',
      description: reason || 'Inspection deemed report non-disruptive or duplicate.',
      completed: true
    });

    return inc;
  }

  public getStats() {
    const active = this.incidents.length + 19;
    const pending = this.incidents.filter((i) => i.status === 'PENDING').length + 6;
    const verified = this.incidents.filter((i) => i.status === 'VERIFIED').length + 9;
    const critical = this.incidents.filter((i) => i.severity === 'CRITICAL').length + 2;

    return {
      activeIncidents: active,
      pendingVerification: pending,
      verifiedToday: verified,
      critical: critical
    };
  }
}

export const incidentService = new IncidentService();
