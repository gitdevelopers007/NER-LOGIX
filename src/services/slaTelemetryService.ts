export interface UserCensusStats {
  totalRegisteredUsers: number;
  concurrentActiveUsers: number;
  personas: {
    commandOfficers: {
      active: number;
      total: number;
      connectedEOCs: number; // Emergency Operation Centers
      agencies: string[];
    };
    fieldWorkers: {
      onDutyNow: number;
      registeredTotal: number;
      offlineModeUnits: number;
      syncSuccessRatePct: number;
      reportsFiledToday: number;
    };
    freightDrivers: {
      activelyTracked: number;
      advisoriesDispatchedToday: number;
      convoysRerouted: number;
    };
    citizensTravelers: {
      dailyQueries: number;
      activeCorridorAlertsServed: number;
      safetyLookupsPerMin: number;
    };
  };
  stateAdoption: Array<{
    state: string;
    fieldPersonnel: number;
    commandUsers: number;
    dailyQueries: number;
    adoptionIndex: number; // 0 - 100
  }>;
}

export interface LifecycleStage {
  stageNumber: number;
  code: string;
  name: string;
  description: string;
  actor: 'CITIZEN_SENSOR' | 'AI_ENGINE' | 'COMMAND_CENTER' | 'FIELD_MOBILE' | 'FIELD_FIRST_RESPONDER' | 'ENGINEERING_CREW';
  avgTimeMinutes: number;
  targetSlaMinutes: number;
  complianceRatePct: number;
  status: 'EXCELLENT' | 'GOOD' | 'NEEDS_ATTENTION';
}

export interface AgencyScorecardItem {
  id: string;
  agencyName: string;
  shortCode: string;
  jurisdiction: string;
  primaryMandate: string;
  activeGroundTeams: number;
  heavyMachineryCount: number;
  incidentsHandledThisMonth: number;
  avgReactionTimeMins: number; // From command order to boots on ground
  resolutionTimeHoursAvg: number;
  slaCompliancePct: number;
  ratingGrade: 'A+' | 'A' | 'B+' | 'B';
}

export type SlaStatus = 'ON_SCHEDULE' | 'WARNING' | 'BREACHED' | 'ESCALATED';

export interface ActiveIncidentSlaItem {
  id: string;
  title: string;
  corridor: string;
  district: string;
  state: string;
  hazardType: 'LANDSLIDE' | 'FLOOD' | 'BRIDGE_ISSUE' | 'MUD_FLOW' | 'TRAFFIC_GRIDLOCK';
  assignedAgency: string;
  reportedAt: string;
  elapsedMinutes: number;
  targetMaxMinutes: number;
  currentStage: string;
  currentStageIndex: number; // 1 to 6
  slaStatus: SlaStatus;
  escalatedToDm: boolean;
  escalationTimestamp?: string;
  leadOfficer: string;
  fieldUnitCallsign: string;
  notes: string;
}

const USER_CENSUS: UserCensusStats = {
  totalRegisteredUsers: 44780,
  concurrentActiveUsers: 3412,
  personas: {
    commandOfficers: {
      active: 58,
      total: 76,
      connectedEOCs: 14,
      agencies: ['MDoNER HQ', 'Assam SDMA', 'Arunachal Disaster Cell', 'BRO Vartak Ops', 'NDMA Liaison']
    },
    fieldWorkers: {
      onDutyNow: 318,
      registeredTotal: 1480,
      offlineModeUnits: 92,
      syncSuccessRatePct: 98.8,
      reportsFiledToday: 146
    },
    freightDrivers: {
      activelyTracked: 462,
      advisoriesDispatchedToday: 2940,
      convoysRerouted: 22
    },
    citizensTravelers: {
      dailyQueries: 39820,
      activeCorridorAlertsServed: 12890,
      safetyLookupsPerMin: 48
    }
  },
  stateAdoption: [
    { state: 'Assam', fieldPersonnel: 114, commandUsers: 18, dailyQueries: 16200, adoptionIndex: 94 },
    { state: 'Arunachal Pradesh', fieldPersonnel: 58, commandUsers: 10, dailyQueries: 5900, adoptionIndex: 88 },
    { state: 'Meghalaya', fieldPersonnel: 42, commandUsers: 8, dailyQueries: 4800, adoptionIndex: 85 },
    { state: 'Manipur', fieldPersonnel: 36, commandUsers: 6, dailyQueries: 3950, adoptionIndex: 82 },
    { state: 'Nagaland', fieldPersonnel: 28, commandUsers: 6, dailyQueries: 3400, adoptionIndex: 79 },
    { state: 'Mizoram', fieldPersonnel: 22, commandUsers: 4, dailyQueries: 2800, adoptionIndex: 78 },
    { state: 'Tripura', fieldPersonnel: 12, commandUsers: 4, dailyQueries: 1970, adoptionIndex: 81 },
    { state: 'Sikkim', fieldPersonnel: 16, commandUsers: 4, dailyQueries: 800, adoptionIndex: 76 }
  ]
};

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    stageNumber: 1,
    code: 'T1_INGESTION',
    name: 'Incident Ingestion & Geo-Tagging',
    description: 'Report uploaded by citizen, mobile field officer, or satellite radar trigger',
    actor: 'CITIZEN_SENSOR',
    avgTimeMinutes: 0.1,
    targetSlaMinutes: 1.0,
    complianceRatePct: 99.8,
    status: 'EXCELLENT'
  },
  {
    stageNumber: 2,
    code: 'T2_CORROBORATION',
    name: 'AI Deduplication & Corroboration',
    description: 'Cross-verifies with IMD rain vectors, nearby field reports, and assigns confidence score',
    actor: 'AI_ENGINE',
    avgTimeMinutes: 1.6,
    targetSlaMinutes: 3.0,
    complianceRatePct: 98.4,
    status: 'EXCELLENT'
  },
  {
    stageNumber: 3,
    code: 'T3_DIRECTIVE',
    name: 'Command Review & Directive Issuance',
    description: 'EOC Command officer verifies bypass, assigns responsible field lab / rapid unit',
    actor: 'COMMAND_CENTER',
    avgTimeMinutes: 5.2,
    targetSlaMinutes: 10.0,
    complianceRatePct: 94.6,
    status: 'EXCELLENT'
  },
  {
    stageNumber: 4,
    code: 'T4_GROUND_ACK',
    name: 'Ground Unit Mobile Acknowledgment',
    description: 'Field officer accepts order via Field App; GPS waypoint routed to incident site',
    actor: 'FIELD_MOBILE',
    avgTimeMinutes: 8.4,
    targetSlaMinutes: 15.0,
    complianceRatePct: 92.1,
    status: 'GOOD'
  },
  {
    stageNumber: 5,
    code: 'T5_FIRST_RESPONSE',
    name: 'On-Scene First Responder Arrival',
    description: 'Machinery / quick-response team arrives at milepost to secure corridor (Mountain Golden Hour)',
    actor: 'FIELD_FIRST_RESPONDER',
    avgTimeMinutes: 34.6,
    targetSlaMinutes: 45.0,
    complianceRatePct: 89.5,
    status: 'GOOD'
  },
  {
    stageNumber: 6,
    code: 'T6_RESTORATION',
    name: 'Corridor Clearance / Safe Bypass Active',
    description: 'Obstacle removed or regulated single-lane convoy pilot active with road status updated live',
    actor: 'ENGINEERING_CREW',
    avgTimeMinutes: 168.0, // 2.8 hours
    targetSlaMinutes: 240.0, // 4 hours
    complianceRatePct: 87.2,
    status: 'GOOD'
  }
];

const AGENCY_SCORECARDS: AgencyScorecardItem[] = [
  {
    id: 'AGY-BRO',
    agencyName: 'Border Roads Organisation (BRO)',
    shortCode: 'BRO Project Vartak / Arunank / Pushpak',
    jurisdiction: 'Arunachal Pradesh, Nagaland & Border Highways',
    primaryMandate: 'Mountain highway rockslide clearance, snow clearing & Bailey bridge maintenance',
    activeGroundTeams: 48,
    heavyMachineryCount: 44,
    incidentsHandledThisMonth: 126,
    avgReactionTimeMins: 28.2,
    resolutionTimeHoursAvg: 2.6,
    slaCompliancePct: 94.8,
    ratingGrade: 'A+'
  },
  {
    id: 'AGY-SDRF',
    agencyName: 'State Disaster Response Force (SDRF)',
    shortCode: 'SDRF Assam & Regional Battalions',
    jurisdiction: 'Brahmaputra Basin, Cachar & Lowland Flash Floods',
    primaryMandate: 'Flood evacuation, submerged roadway traffic cordoning & emergency relief transport',
    activeGroundTeams: 38,
    heavyMachineryCount: 26,
    incidentsHandledThisMonth: 184,
    avgReactionTimeMins: 22.4,
    resolutionTimeHoursAvg: 3.1,
    slaCompliancePct: 96.2,
    ratingGrade: 'A+'
  },
  {
    id: 'AGY-NHIDCL',
    agencyName: 'NHIDCL Regional Execution Office',
    shortCode: 'NHIDCL North East Zone',
    jurisdiction: 'National Highways & 2-Lane Arterials (NH-2, NH-13, NH-29)',
    primaryMandate: 'Slope stabilization, structural retaining walls & high-volume national corridor repairs',
    activeGroundTeams: 26,
    heavyMachineryCount: 32,
    incidentsHandledThisMonth: 94,
    avgReactionTimeMins: 38.6,
    resolutionTimeHoursAvg: 3.8,
    slaCompliancePct: 88.3,
    ratingGrade: 'A'
  },
  {
    id: 'AGY-POLICE',
    agencyName: 'State Police Highway Traffic Units',
    shortCode: 'Assam / Meghalaya / Nagaland Highway Police',
    jurisdiction: 'Inter-State Border Checkposts & Bottleneck Corridors',
    primaryMandate: 'Traffic diversion enforcement, commercial convoy escort & choke point clearance',
    activeGroundTeams: 92,
    heavyMachineryCount: 14,
    incidentsHandledThisMonth: 312,
    avgReactionTimeMins: 14.2,
    resolutionTimeHoursAvg: 1.4,
    slaCompliancePct: 98.4,
    ratingGrade: 'A+'
  },
  {
    id: 'AGY-FCS',
    agencyName: 'Department of Food & Civil Supplies',
    shortCode: 'State Civil Supplies & FCI NER',
    jurisdiction: 'Hill District Buffer Godowns & Essential Goods Stocking',
    primaryMandate: 'Immediate diversion of essential food & oxygen rakes during highway blockages',
    activeGroundTeams: 18,
    heavyMachineryCount: 8,
    incidentsHandledThisMonth: 58,
    avgReactionTimeMins: 48.0,
    resolutionTimeHoursAvg: 4.2,
    slaCompliancePct: 85.1,
    ratingGrade: 'B+'
  }
];

const INITIAL_ACTIVE_INCIDENTS: ActiveIncidentSlaItem[] = [
  {
    id: 'INC-SLA-101',
    title: 'NH-13 Sector 4 Landslide (KM-142)',
    corridor: 'NH-13 (Bhalukpong–Bomdila)',
    district: 'Lower Subansiri',
    state: 'Arunachal Pradesh',
    hazardType: 'LANDSLIDE',
    assignedAgency: 'Border Roads Organisation (BRO Project Vartak)',
    reportedAt: '36 mins ago',
    elapsedMinutes: 36,
    targetMaxMinutes: 45,
    currentStage: 'Stage 5: Heavy Machinery Clearing Debris on Ground',
    currentStageIndex: 5,
    slaStatus: 'ON_SCHEDULE',
    escalatedToDm: false,
    leadOfficer: 'Capt. R. K. Thapa (BRO)',
    fieldUnitCallsign: 'VARTAK-EOD-04',
    notes: '2 heavy wheel loaders active. One lane expected to open in 45 mins.'
  },
  {
    id: 'INC-SLA-102',
    title: 'NH-27 Embankment Waterlogging near Bijni',
    corridor: 'NH-27 (Guwahati–Siliguri Trunk Link)',
    district: 'Chirang',
    state: 'Assam',
    hazardType: 'FLOOD',
    assignedAgency: 'State Disaster Response Force (SDRF Assam)',
    reportedAt: '18 mins ago',
    elapsedMinutes: 18,
    targetMaxMinutes: 30,
    currentStage: 'Stage 4: Ground Rapid Response Team Dispatched from Bongaigaon',
    currentStageIndex: 4,
    slaStatus: 'ON_SCHEDULE',
    escalatedToDm: false,
    leadOfficer: 'Inspector D. Kalita (SDRF)',
    fieldUnitCallsign: 'SDRF-RIVER-09',
    notes: 'Inflatable barriers deployed to prevent water ingress onto carriageway.'
  },
  {
    id: 'INC-SLA-103',
    title: 'NH-2 Mao Gate Landslide Blockade',
    corridor: 'NH-2 (Kohima–Mao Gate–Imphal)',
    district: 'Senapati',
    state: 'Manipur',
    hazardType: 'LANDSLIDE',
    assignedAgency: 'NHIDCL North East Zone',
    reportedAt: '54 mins ago',
    elapsedMinutes: 54,
    targetMaxMinutes: 45,
    currentStage: 'Stage 5: Hydraulic Excavators En-Route via Dimapur',
    currentStageIndex: 5,
    slaStatus: 'WARNING',
    escalatedToDm: false,
    leadOfficer: 'Er. L. Singh (Executive Engineer NHIDCL)',
    fieldUnitCallsign: 'NHIDCL-SEN-02',
    notes: 'Slight delay due to narrow hill bends on approach road. 12 mins from site.'
  },
  {
    id: 'INC-SLA-104',
    title: 'NH-206 Cherrapunji Unstable Slope Mudflow',
    corridor: 'NH-206 (Sohra–Shella Road)',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    hazardType: 'MUD_FLOW',
    assignedAgency: 'Meghalaya PWD Roads & Traffic Unit',
    reportedAt: '72 mins ago',
    elapsedMinutes: 72,
    targetMaxMinutes: 45,
    currentStage: 'Stage 3: Awaiting Local Sub-Divisional Officer Directive',
    currentStageIndex: 3,
    slaStatus: 'BREACHED',
    escalatedToDm: false,
    leadOfficer: 'Sub-Divisional Magistrate Office Sohra',
    fieldUnitCallsign: 'EKH-HW-07',
    notes: 'Exceeded 45-minute first responder SLA window. Urgent DM intervention recommended.'
  },
  {
    id: 'INC-SLA-105',
    title: 'NH-37 Silchar-Kalain Culvert Submersion',
    corridor: 'NH-37 (Silchar–Badarpur Road)',
    district: 'Cachar',
    state: 'Assam',
    hazardType: 'FLOOD',
    assignedAgency: 'Assam PWD (NH Division) & SDRF',
    reportedAt: '28 mins ago',
    elapsedMinutes: 28,
    targetMaxMinutes: 45,
    currentStage: 'Stage 5: On-Scene Culvert Clearing & Pump Deployed',
    currentStageIndex: 5,
    slaStatus: 'ON_SCHEDULE',
    escalatedToDm: false,
    leadOfficer: 'Er. Anupam Roy (PWD NH)',
    fieldUnitCallsign: 'CACHAR-FLOOD-03',
    notes: 'Water level receding by 4 inches/hr. Light commercial vehicles being piloted.'
  }
];

class SlaTelemetryService {
  private activeIncidents: ActiveIncidentSlaItem[] = [...INITIAL_ACTIVE_INCIDENTS];

  public getUserCensus(): UserCensusStats {
    return USER_CENSUS;
  }

  public getLifecycleStages(): LifecycleStage[] {
    return LIFECYCLE_STAGES;
  }

  public getAgencyScorecards(): AgencyScorecardItem[] {
    return AGENCY_SCORECARDS;
  }

  public getActiveIncidents(): ActiveIncidentSlaItem[] {
    return this.activeIncidents;
  }

  public escalateIncident(incidentId: string): { success: boolean; message: string; incident?: ActiveIncidentSlaItem } {
    const inc = this.activeIncidents.find(i => i.id === incidentId);
    if (!inc) {
      return { success: false, message: 'Incident not found' };
    }

    inc.escalatedToDm = true;
    inc.slaStatus = 'ESCALATED';
    inc.escalationTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    inc.notes = `🚨 FLASH ESCALATION: Notified District Magistrate (${inc.district}) & Chief Secretary Disaster Cell. Priority upgraded to Code-1 Emergency.`;

    return {
      success: true,
      message: `Incident ${inc.id} escalated to District Magistrate (${inc.district}) with priority override.`,
      incident: inc
    };
  }

  public advanceStage(incidentId: string): { success: boolean; message: string; incident?: ActiveIncidentSlaItem } {
    const inc = this.activeIncidents.find(i => i.id === incidentId);
    if (!inc) return { success: false, message: 'Incident not found' };

    if (inc.currentStageIndex < 6) {
      inc.currentStageIndex += 1;
      const stage = LIFECYCLE_STAGES.find(s => s.stageNumber === inc.currentStageIndex);
      if (stage) {
        inc.currentStage = `Stage ${stage.stageNumber}: ${stage.name}`;
      }
      if (inc.currentStageIndex === 6) {
        inc.slaStatus = 'ON_SCHEDULE';
        inc.notes = '✅ Corridor fully restored and verified by on-scene engineering team.';
      }
      return {
        success: true,
        message: `Incident ${inc.id} progressed to ${inc.currentStage}`,
        incident: inc
      };
    }

    return { success: false, message: 'Incident already at final resolution stage.' };
  }
}

export const slaTelemetryService = new SlaTelemetryService();
