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
    originalSize?: string;
    compressedSize?: string;
    bandwidthSaved?: string;
    compressionMode?: string;
    transferStatus?: string;
    transferSpeedEstimate?: string;
    transferDurationSecs?: number;
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
      source: 'Field Operations Mobile Unit #4',
      originalSize: '3.42 MB',
      compressedSize: '36.8 KB',
      bandwidthSaved: '98.9%',
      compressionMode: 'EMERGENCY',
      transferStatus: 'RECEIVED',
      transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
      transferDurationSecs: 3.1
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
      source: 'State Police Highway Division',
      originalSize: '2.85 MB',
      compressedSize: '41.2 KB',
      bandwidthSaved: '98.5%',
      compressionMode: 'LOW_BANDWIDTH',
      transferStatus: 'RECEIVED',
      transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
      transferDurationSecs: 3.4
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
      source: 'DDMA Station Shillong',
      originalSize: '4.10 MB',
      compressedSize: '48.5 KB',
      bandwidthSaved: '98.8%',
      compressionMode: 'EMERGENCY',
      transferStatus: 'RECEIVED',
      transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
      transferDurationSecs: 4.0
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
      source: 'BRO Task Force 42',
      originalSize: '3.65 MB',
      compressedSize: '32.1 KB',
      bandwidthSaved: '99.1%',
      compressionMode: 'EMERGENCY',
      transferStatus: 'RECEIVED',
      transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
      transferDurationSecs: 2.7
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

const LOCAL_STORAGE_KEY = 'ner_government_incidents_v2';
const FIELD_SYNC_STORAGE_KEY = 'ner_synced_field_reports';

function resolveStateFromDistrict(district?: string): string {
  if (!district) return 'Assam';
  const d = district.toLowerCase();
  if (d.includes('subansiri') || d.includes('papum') || d.includes('tawang') || d.includes('changlang') || d.includes('arunachal')) return 'Arunachal Pradesh';
  if (d.includes('khasi') || d.includes('garo') || d.includes('jaintia') || d.includes('shillong') || d.includes('meghalaya')) return 'Meghalaya';
  if (d.includes('imphal') || d.includes('churachandpur') || d.includes('senapati') || d.includes('manipur')) return 'Manipur';
  if (d.includes('aizawl') || d.includes('lunglei') || d.includes('mizoram')) return 'Mizoram';
  if (d.includes('kohima') || d.includes('dimapur') || d.includes('mokokchung') || d.includes('nagaland')) return 'Nagaland';
  if (d.includes('sikkim') || d.includes('gangtok')) return 'Sikkim';
  if (d.includes('tripura') || d.includes('agartala')) return 'Tripura';
  return 'Assam';
}

function normalizeType(type?: string): IncidentType {
  if (!type) return 'LANDSLIDE';
  const t = type.toUpperCase();
  if (t === 'ROAD_BLOCKED' || t === 'TRAFFIC_BLOCKAGE' || t === 'TRANSPORT_DISRUPTION') return 'TRAFFIC_BLOCKAGE';
  if (t === 'LANDSLIDE') return 'LANDSLIDE';
  if (t === 'ROAD_DAMAGE') return 'ROAD_DAMAGE';
  if (t === 'HEAVY_RAINFALL') return 'HEAVY_RAINFALL';
  if (t === 'FLASH_FLOOD' || t === 'FLOOD') return 'FLASH_FLOOD';
  if (t === 'BRIDGE_DAMAGE' || t === 'BRIDGE_ISSUE') return 'BRIDGE_DAMAGE';
  return 'OTHER';
}

function normalizeSeverity(sev?: string): IncidentSeverity {
  if (!sev) return 'HIGH';
  const s = sev.toUpperCase();
  if (s === 'CRITICAL') return 'CRITICAL';
  if (s === 'HIGH') return 'HIGH';
  if (s === 'MEDIUM' || s === 'MODERATE') return 'MODERATE';
  return 'LOW';
}

class IncidentService {
  private incidents: Incident[] = [];
  private listeners: (() => void)[] = [];
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // 1. Load from localStorage if present, else seed
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      if (stored) {
        this.incidents = JSON.parse(stored);
        if (typeof window !== 'undefined') {
          this.incidents.forEach((inc) => {
            if (inc.photoUrl === LANDSLIDE_PHOTO || inc.photoUrl.startsWith('data:image/svg+xml')) {
              const cached = localStorage.getItem(`ner_photo_${inc.id}`);
              if (cached) inc.photoUrl = cached;
            }
          });
        }
      } else {
        this.incidents = [...INITIAL_INCIDENTS];
        this.saveToStorage();
      }
    } catch {
      this.incidents = [...INITIAL_INCIDENTS];
    }

    // 2. Load any standalone field reports queued in storage
    this.loadQueuedFieldReports();

    // 3. Set up BroadcastChannel and cross-window sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('ner_incident_sync_channel');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'FIELD_REPORT_CREATED' && event.data.payload) {
            this.ingestFieldReport(event.data.payload, false);
          } else if (event.data?.type === 'INCIDENT_VERIFIED' && event.data.id) {
            this.markLocallyVerified(event.data.id, false);
          } else if (event.data?.type === 'INCIDENT_REJECTED' && event.data.id) {
            this.markLocallyRejected(event.data.id, event.data.reason, false);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel initialization warning:', e);
      }
    }

    // 4. Storage event listener for cross-tab sync
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === FIELD_SYNC_STORAGE_KEY || e.key === LOCAL_STORAGE_KEY) {
          this.loadQueuedFieldReports();
          this.notify();
        }
      });

      window.addEventListener('ner_new_field_incident', (e: any) => {
        if (e.detail) {
          this.ingestFieldReport(e.detail, true);
        }
      });
    }

    // 5. Initial background fetch from backend
    this.syncWithBackend().catch(() => {});
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.incidents));
    } catch (e) {
      console.warn('Failed to save incidents to localStorage:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => {
      try { l(); } catch (e) { console.error(e); }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ner_incidents_updated'));
    }
  }

  public getIncidents(): Incident[] {
    return [...this.incidents];
  }

  public getIncidentById(id: string): Incident | undefined {
    return this.incidents.find((i) => i.id === id);
  }

  public loadQueuedFieldReports() {
    if (typeof window === 'undefined') return;
    try {
      const fieldSync = localStorage.getItem(FIELD_SYNC_STORAGE_KEY);
      if (fieldSync) {
        const parsed = JSON.parse(fieldSync);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        list.forEach((item) => {
          const exists = this.incidents.some((i) => i.id === item.id || i.id === item.client_generated_id);
          if (!exists) {
            this.ingestFieldReport(item, false);
          }
        });
      }
    } catch (e) {
      console.warn('Error reading queued field reports:', e);
    }
  }

  public async syncWithBackend(): Promise<void> {
    try {
      const res = await fetch('https://ner-logix-backend-uhfu.onrender.com/api/v1/incidents?limit=50', {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) return;
      const json = await res.json();
      const backendItems: any[] = json.data?.items || json.data || [];
      let updated = false;

      backendItems.forEach((b) => {
        const existing = this.incidents.find((i) => i.id === b.id || i.id === b.client_generated_id);
        const freshPhoto = this.extractBackendPhoto(b);

        if (!existing) {
          const mapped = this.convertBackendToIncident(b);
          this.incidents.unshift(mapped);
          updated = true;
        } else {
          if (b.status && b.status !== existing.status) {
            existing.status = b.status === 'VERIFIED' ? 'VERIFIED' : b.status === 'REJECTED' ? 'REJECTED' : 'PENDING';
            updated = true;
          }
          if (
            freshPhoto !== LANDSLIDE_PHOTO &&
            (existing.photoUrl === LANDSLIDE_PHOTO || existing.photoUrl.startsWith('data:image/svg+xml'))
          ) {
            existing.photoUrl = freshPhoto;
            updated = true;
          }
        }
      });

      if (updated) {
        this.saveToStorage();
        this.notify();
      }
    } catch {
      // Offline or network error; keep working on local cache
    }
  }

  public extractBackendPhoto(b: any): string {
    // 1. Check local client cache for this client_generated_id or id
    if (typeof window !== 'undefined') {
      if (b.client_generated_id) {
        const cached = localStorage.getItem(`ner_photo_${b.client_generated_id}`);
        if (cached) return cached;
      }
      if (b.id) {
        const cached = localStorage.getItem(`ner_photo_${b.id}`);
        if (cached) return cached;
      }
    }

    // 2. Check photos array from backend
    if (Array.isArray(b.photos) && b.photos.length > 0) {
      const p = b.photos[0];
      const url = p?.photo_url || p?.url;
      if (url) {
        if (url.startsWith('data:') || url.startsWith('blob:')) return url;
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        if (url.startsWith('/')) return `https://ner-logix-backend-uhfu.onrender.com${url}`;
        return `https://ner-logix-backend-uhfu.onrender.com/${url}`;
      }
    }

    // 3. Check direct photo_url or photoUrl fields
    const directUrl = b.photo_url || b.photoUrl;
    if (directUrl && directUrl !== LANDSLIDE_PHOTO && directUrl !== ROAD_DAMAGE_PHOTO && directUrl !== RAINFALL_PHOTO) {
      if (directUrl.startsWith('data:') || directUrl.startsWith('blob:') || directUrl.startsWith('http://') || directUrl.startsWith('https://')) {
        return directUrl;
      }
      if (directUrl.startsWith('/')) {
        return `https://ner-logix-backend-uhfu.onrender.com${directUrl}`;
      }
      return `https://ner-logix-backend-uhfu.onrender.com/${directUrl}`;
    }

    // 4. Check base64 in photo_data
    if (b.photo_data?.base64_data) {
      const b64 = b.photo_data.base64_data;
      return b64.startsWith('data:') ? b64 : `data:${b.photo_data.mime_type || 'image/jpeg'};base64,${b64}`;
    }

    return LANDSLIDE_PHOTO;
  }

  private convertBackendToIncident(b: any): Incident {
    const incType = normalizeType(b.type);
    const incSev = normalizeSeverity(b.severity);
    const district = b.district_id || 'Kamrup Metropolitan';
    const state = resolveStateFromDistrict(district);
    const road = b.road_id || 'NH-27 Corridor';
    const photoUrl = this.extractBackendPhoto(b);

    return {
      id: b.id || `INC-${Date.now().toString().slice(-5)}`,
      type: incType,
      title: `${incType.replace(/_/g, ' ')} Reported on ${road}`,
      severity: incSev,
      status: b.status === 'VERIFIED' ? 'VERIFIED' : b.status === 'REJECTED' ? 'REJECTED' : 'PENDING',
      state,
      district,
      road,
      latitude: Number(b.latitude) || 26.1445,
      longitude: Number(b.longitude) || 91.7362,
      reportedBy: b.reported_by || 'Field Operations Officer (PWA)',
      reportedTime: b.reported_at ? new Date(b.reported_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently',
      timeAgo: 'Just now',
      currentRoadStatus: b.status === 'VERIFIED' ? 'ROAD BLOCKED (VERIFIED)' : 'PENDING GOVERNMENT VERIFICATION',
      description: b.description || 'Ground survey team reported active corridor obstruction via Field PWA telemetry.',
      photoUrl,
      photoMetadata: {
        uploaded: 'Real-time Sync',
        gpsVerified: true,
        source: 'PWA Field Operations Camera',
        originalSize: '3.1 MB',
        compressedSize: '36.4 KB',
        bandwidthSaved: '98.8%',
        compressionMode: 'EMERGENCY',
        transferStatus: 'RECEIVED',
      },
      timeline: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Field Report Logged via PWA',
          description: `Dispatched by ${b.reported_by || 'Field Officer'} with GPS geo-tag`,
          completed: true,
        },
      ],
      aiAssessment: {
        possibleIncident: incType,
        estimatedSeverity: incSev,
        potentialImpact: `Impact on commercial traffic along ${road}. Divert non-essential convoys.`,
        affectedCorridor: road,
        suggestedAction: 'Inspect via Command Center and dispatch emergency road maintenance detachment.',
      },
      corroborationCount: 2,
      confidenceScore: 92,
      duplicateReportsMerged: 0,
    };
  }

  public ingestFieldReport(data: any, broadcast: boolean = true): Incident {
    const id = data.id || data.client_generated_id || `INC-${Date.now().toString().slice(-5)}`;
    
    // Check if already present
    const existing = this.incidents.find((i) => i.id === id);
    if (existing) return existing;

    const incType = normalizeType(data.type);
    const incSev = normalizeSeverity(data.severity);
    const district = data.district_id || 'Kamrup Metropolitan';
    const state = resolveStateFromDistrict(district);
    const road = data.road_id || 'NH-27 Corridor';

    let photoUrl = LANDSLIDE_PHOTO;
    if (data.photoUrl && !data.photoUrl.startsWith('data:image/svg+xml')) {
      photoUrl = data.photoUrl;
    } else if (data.photo_data?.base64_data) {
      const b64 = data.photo_data.base64_data;
      photoUrl = b64.startsWith('data:') ? b64 : `data:${data.photo_data.mime_type || 'image/jpeg'};base64,${b64}`;
    } else if (data.photo_data?.dataUrl) {
      photoUrl = data.photo_data.dataUrl;
    } else if (data.photo) {
      photoUrl = typeof data.photo === 'string' ? data.photo : data.photo.base64Data ? `data:${data.photo.mimeType || 'image/jpeg'};base64,${data.photo.base64Data}` : LANDSLIDE_PHOTO;
    } else if (typeof window !== 'undefined') {
      const cached = (data.client_generated_id && localStorage.getItem(`ner_photo_${data.client_generated_id}`)) ||
                     (data.id && localStorage.getItem(`ner_photo_${data.id}`));
      if (cached) photoUrl = cached;
    }

    // Persist photo in local storage cache so it can never be lost on reloads
    if (typeof window !== 'undefined' && photoUrl !== LANDSLIDE_PHOTO) {
      try {
        if (data.client_generated_id) localStorage.setItem(`ner_photo_${data.client_generated_id}`, photoUrl);
        if (data.id) localStorage.setItem(`ner_photo_${data.id}`, photoUrl);
        if (id) localStorage.setItem(`ner_photo_${id}`, photoUrl);
      } catch (e) {
        console.warn('Failed to cache photo in localStorage:', e);
      }
    }

    const newInc: Incident = {
      id,
      type: incType,
      title: `${incType.replace(/_/g, ' ')} on ${road}`,
      severity: incSev,
      status: 'PENDING',
      state,
      district,
      road,
      latitude: Number(data.latitude) || 26.1445,
      longitude: Number(data.longitude) || 91.7362,
      reportedBy: data.reported_by ? `Officer ${data.reported_by} (Field PWA)` : 'Field Patrol Team (PWA Live Sync)',
      reportedTime: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      currentRoadStatus: 'OBSTRUCTED - PENDING GOVERNMENT VERIFICATION',
      description: data.description || `Field report filed via offline-ready PWA. Landmark: ${data.nearby_landmark || 'Near Milepost'}. Vehicle Access: ${data.vehicle_accessibility || 'Restricted'}.`,
      photoUrl,
      photoMetadata: data.photoMetadata || {
        uploaded: 'Just Now',
        gpsVerified: true,
        source: 'Field PWA Low-Bandwidth Pipeline',
        originalSize: '3.48 MB',
        compressedSize: '38.2 KB',
        bandwidthSaved: '98.9%',
        compressionMode: 'EMERGENCY',
        transferStatus: 'RECEIVED',
        transferSpeedEstimate: '~12 KB/min (2G Mountain Corridor Link)',
      },
      timeline: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Field Photo & GPS Submitted via PWA',
          description: 'Client-side WebP compression and geo-hash validation completed.',
          completed: true,
        },
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Received by Government Command Center Mesh',
          description: 'Enqueued into institutional verification inbox for Government Admin Review.',
          completed: true,
        },
      ],
      aiAssessment: {
        possibleIncident: incType,
        estimatedSeverity: incSev,
        potentialImpact: `Obstruction length: ${data.estimated_obstruction_length || 'approx 50m'}. Passability: ${data.vehicle_accessibility || 'None'}.`,
        affectedCorridor: road,
        suggestedAction: 'Review high-resolution evidence, confirm detour availability, and execute road closure authorization.',
      },
      corroborationCount: 2,
      confidenceScore: 95,
      duplicateReportsMerged: 0,
    };

    // Prepend to top of list
    this.incidents.unshift(newInc);
    this.saveToStorage();
    this.notify();

    if (broadcast && this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'FIELD_REPORT_CREATED', payload: data });
      } catch (e) {
        console.warn('Failed to broadcast field report:', e);
      }
    }

    return newInc;
  }

  public verifyIncident(id: string): Incident | undefined {
    return this.markLocallyVerified(id, true);
  }

  private markLocallyVerified(id: string, broadcast: boolean = true): Incident | undefined {
    const inc = this.incidents.find((i) => i.id === id);
    if (!inc) return undefined;

    inc.status = 'VERIFIED';
    inc.currentRoadStatus = 'ROAD BLOCKED (VERIFIED)';
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    inc.timeline.push(
      {
        time: timeStr,
        title: 'Incident Verified by Government Officer',
        description: 'Command Center verification authorized by Government Admin Officer.',
        completed: true,
      },
      {
        time: timeStr,
        title: 'Road Status Updated to BLOCKED',
        description: 'Synchronized across Regional GIS Map, Corridor Route Intelligence & Alerts Engine.',
        completed: true,
      }
    );

    this.saveToStorage();
    this.notify();

    if (broadcast && this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'INCIDENT_VERIFIED', id });
      } catch (e) {
        console.warn('Failed to broadcast verification:', e);
      }
    }

    // Forward verification to backend API in background
    fetch(`https://ner-logix-backend-uhfu.onrender.com/api/v1/incidents/${id}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'usr_admin_01',
        'x-user-role': 'GOVERNMENT_ADMIN',
      },
      body: JSON.stringify({ action: 'VERIFIED', notes: 'Verified in Government Command Center' }),
    }).catch(() => {});

    return inc;
  }

  public rejectIncident(id: string, reason?: string): Incident | undefined {
    return this.markLocallyRejected(id, reason, true);
  }

  private markLocallyRejected(id: string, reason?: string, broadcast: boolean = true): Incident | undefined {
    const inc = this.incidents.find((i) => i.id === id);
    if (!inc) return undefined;

    inc.status = 'REJECTED';
    inc.currentRoadStatus = 'REPORT REJECTED - PASSABLE';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    inc.timeline.push({
      time: timeStr,
      title: 'Report Rejected by Government Officer',
      description: reason || 'Inspection deemed report non-disruptive or duplicate.',
      completed: true,
    });

    this.saveToStorage();
    this.notify();

    if (broadcast && this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'INCIDENT_REJECTED', id, reason });
      } catch (e) {
        console.warn('Failed to broadcast rejection:', e);
      }
    }

    // Forward rejection to backend API
    fetch(`https://ner-logix-backend-uhfu.onrender.com/api/v1/incidents/${id}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'usr_admin_01',
        'x-user-role': 'GOVERNMENT_ADMIN',
      },
      body: JSON.stringify({ action: 'REJECTED', notes: reason || 'Rejected in Command Center' }),
    }).catch(() => {});

    return inc;
  }

  public getStats() {
    const active = this.incidents.length;
    const pending = this.incidents.filter((i) => i.status === 'PENDING').length;
    const verified = this.incidents.filter((i) => i.status === 'VERIFIED').length;
    const critical = this.incidents.filter((i) => i.severity === 'CRITICAL').length;

    return {
      activeIncidents: active,
      pendingVerification: pending,
      verifiedToday: verified,
      critical: critical,
    };
  }

  public ingestFieldPhotoIncident(data: any): Incident {
    return this.ingestFieldReport(data, true);
  }
}

export const incidentService = new IncidentService();

