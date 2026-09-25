export type TimeRange = '24H' | '7D' | '30D';

export type DistrictStatus = 'OPEN' | 'RESTRICT' | 'BLOCKED';

export interface DistrictConnectivityItem {
  id: string;
  state: string;
  district: string;
  status: DistrictStatus;
  accessPct: number;
  primaryIssue: string;
}

export interface TrendDataPoint {
  label: string;
  value: number;
  highlight?: string;
}

export interface KeyIndicators {
  connectivity: number;
  connectivityDelta: string;
  routeDelays: number;
  delayHoursAvg: string;
  deliveries: number;
  deliveriesCount: string;
  incidents: number;
  incidentsActive: number;
}

export interface DeliveryCommodityItem {
  name: string;
  percentage: number;
  volumeTonnes: number;
  slaStatus: 'EXCELLENT' | 'GOOD' | 'WARNING';
}

export interface SupplyBottleneckItem {
  rank: number;
  region: string;
  factor: string;
  impactScore: number;
  affectedCorridor: string;
}

export interface IncidentTypeDistribution {
  name: string;
  count: number;
  percentage: number;
  severityGrade: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

export interface RegionalRiskItem {
  region: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  trend: 'INCREASING' | 'STABLE' | 'IMPROVING';
  trendSymbol: '↑' | '→' | '↓';
  trendText: 'Increasing' | 'Stable' | 'Improving';
  activeAlerts: number;
}

export interface PlanningInsightItem {
  id: string;
  corridor: string;
  region: string;
  recommendation: string;
  severity: 'WARNING' | 'ALERT' | 'INFO';
}

export interface AnalyticsReportTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  generatedDate: string;
  size: string;
}

export interface InfrastructureDeficitItem {
  id: string;
  district: string;
  state: string;
  accessibilityScore: number;
  gapScore: number; // 0-100
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  primaryDeficit: string;
  recommendedInterventions: string[];
  estimatedCostCr: number; // in Crores INR
  urgencyTimeline: string;
}

export interface ScenarioSimulationPreset {
  id: string;
  name: string;
  targetCorridor: string;
  hazardType: 'LANDSLIDE' | 'MONSOON_FLOOD' | 'DEMAND_SURGE' | 'BRIDGE_RESTRICTION';
  severityLevel: number; // 0 - 100
  description: string;
  kpiImpact: {
    isolatedDistricts: number;
    delayIncreaseHours: number;
    populationAffected: string;
    flowCapacityLossPct: number;
  };
  recommendedAction: string;
  alternateCorridor: string;
}

const DISTRICT_DATA: DistrictConnectivityItem[] = [
  { id: 'DIST-01', state: 'Assam', district: 'Dibrugarh', status: 'OPEN', accessPct: 94, primaryIssue: 'Traffic' },
  { id: 'DIST-02', state: 'Meghalaya', district: 'East Khasi Hills', status: 'RESTRICT', accessPct: 72, primaryIssue: 'Heavy Rainfall' },
  { id: 'DIST-03', state: 'Arunachal Pradesh', district: 'Lower Subansiri', status: 'BLOCKED', accessPct: 51, primaryIssue: 'Landslide' },
  { id: 'DIST-04', state: 'Manipur', district: 'Imphal West', status: 'OPEN', accessPct: 89, primaryIssue: 'Road Damage' },
  { id: 'DIST-05', state: 'Tripura', district: 'West Tripura', status: 'OPEN', accessPct: 96, primaryIssue: '—' },
  { id: 'DIST-06', state: 'Nagaland', district: 'Kohima', status: 'RESTRICT', accessPct: 68, primaryIssue: 'Slope Sinking' },
  { id: 'DIST-07', state: 'Sikkim', district: 'Mangan', status: 'RESTRICT', accessPct: 63, primaryIssue: 'Torrential Rain' },
  { id: 'DIST-08', state: 'Mizoram', district: 'Aizawl', status: 'OPEN', accessPct: 91, primaryIssue: 'Minor Debris' },
  { id: 'DIST-09', state: 'Assam', district: 'Kamrup Metro', status: 'OPEN', accessPct: 97, primaryIssue: 'Urban Congestion' },
  { id: 'DIST-10', state: 'Arunachal Pradesh', district: 'Papum Pare', status: 'RESTRICT', accessPct: 65, primaryIssue: 'Mudslide Debris' },
];

const TREND_7D: TrendDataPoint[] = [
  { label: 'Mon', value: 80, highlight: 'Monsoon baseline' },
  { label: 'Tue', value: 92, highlight: 'Optimal weather corridor' },
  { label: 'Wed', value: 81, highlight: 'Afternoon rain front' },
  { label: 'Thu', value: 74, highlight: 'NH-13 disruption' },
  { label: 'Fri', value: 68, highlight: 'Lowest: Meghalaya squall' },
  { label: 'Sat', value: 85, highlight: 'Emergency detour active' },
  { label: 'Sun', value: 82, highlight: 'Current regional average' },
];

const TREND_24H: TrendDataPoint[] = [
  { label: '00:00', value: 88 },
  { label: '04:00', value: 86 },
  { label: '08:00', value: 83 },
  { label: '12:00', value: 79 },
  { label: '16:00', value: 80 },
  { label: '20:00', value: 82 },
];

const TREND_30D: TrendDataPoint[] = [
  { label: 'Wk 1', value: 89 },
  { label: 'Wk 2', value: 84 },
  { label: 'Wk 3', value: 75 },
  { label: 'Wk 4', value: 82 },
];

const DELIVERY_COMMODITIES: DeliveryCommodityItem[] = [
  { name: 'Essential Commodities', percentage: 94, volumeTonnes: 1420, slaStatus: 'EXCELLENT' },
  { name: 'Medicines & Medical Supplies', percentage: 91, volumeTonnes: 380, slaStatus: 'EXCELLENT' },
  { name: 'Agricultural Produce', percentage: 88, volumeTonnes: 2150, slaStatus: 'GOOD' },
  { name: 'Construction Materials', percentage: 86, volumeTonnes: 4300, slaStatus: 'GOOD' },
];

const SUPPLY_BOTTLENECKS: SupplyBottleneckItem[] = [
  {
    rank: 1,
    region: 'Arunachal Pradesh',
    factor: 'Route accessibility',
    impactScore: 88,
    affectedCorridor: 'NH-13 Potin-Pangin sector'
  },
  {
    rank: 2,
    region: 'Meghalaya',
    factor: 'Heavy rainfall',
    impactScore: 74,
    affectedCorridor: 'NH-206 Shillong-Dawki bypass'
  },
  {
    rank: 3,
    region: 'Assam',
    factor: 'Corridor congestion',
    impactScore: 65,
    affectedCorridor: 'NH-27 Guwahati-Jorhat trunk'
  }
];

const INCIDENT_TYPES: IncidentTypeDistribution[] = [
  { name: 'Landslide', count: 94, percentage: 38, severityGrade: 'CRITICAL' },
  { name: 'Heavy Rainfall', count: 68, percentage: 28, severityGrade: 'HIGH' },
  { name: 'Flood', count: 42, percentage: 17, severityGrade: 'HIGH' },
  { name: 'Road Damage', count: 29, percentage: 12, severityGrade: 'MODERATE' },
  { name: 'Bridge Damage', count: 14, percentage: 5, severityGrade: 'CRITICAL' },
];

const REGIONAL_RISK: RegionalRiskItem[] = [
  { region: 'Arunachal Pradesh', riskLevel: 'HIGH', trend: 'INCREASING', trendSymbol: '↑', trendText: 'Increasing', activeAlerts: 4 },
  { region: 'Assam', riskLevel: 'MEDIUM', trend: 'STABLE', trendSymbol: '→', trendText: 'Stable', activeAlerts: 2 },
  { region: 'Meghalaya', riskLevel: 'HIGH', trend: 'INCREASING', trendSymbol: '↑', trendText: 'Increasing', activeAlerts: 3 },
  { region: 'Manipur', riskLevel: 'LOW', trend: 'IMPROVING', trendSymbol: '↓', trendText: 'Improving', activeAlerts: 1 },
  { region: 'Tripura', riskLevel: 'LOW', trend: 'STABLE', trendSymbol: '→', trendText: 'Stable', activeAlerts: 0 },
  { region: 'Nagaland', riskLevel: 'MEDIUM', trend: 'STABLE', trendSymbol: '→', trendText: 'Stable', activeAlerts: 2 },
];

const PLANNING_INSIGHTS: PlanningInsightItem[] = [
  {
    id: 'INS-01',
    region: 'Arunachal Pradesh',
    corridor: 'NH-13 (Trans-Arunachal)',
    recommendation: 'Arunachal — NH-13 requires alternate-route planning via Tezpur north bypass',
    severity: 'WARNING'
  },
  {
    id: 'INS-02',
    region: 'Meghalaya',
    corridor: 'NH-206 (Cherrapunji-Dawki)',
    recommendation: 'Meghalaya — rainfall may affect deliveries in the next period; enforce high-clearance 4x4 convoys',
    severity: 'ALERT'
  },
  {
    id: 'INS-03',
    region: 'Assam',
    corridor: 'NH-27 (Guwahati logistics hub)',
    recommendation: 'Assam — congestion is increasing around key logistics corridors; schedule heavy freight off-peak (21:00-05:00)',
    severity: 'INFO'
  }
];

const REPORT_TEMPLATES: AnalyticsReportTemplate[] = [
  {
    id: 'REP-CONN-01',
    title: 'Regional Connectivity Report',
    category: 'Accessibility & Infrastructure',
    description: 'Comprehensive analysis of NH arterial corridors, bridge ratings, and hill state accessibility across the 8 NE states.',
    format: 'PDF / GIS GeoJSON',
    generatedDate: 'Today, 20:30 IST',
    size: '4.2 MB'
  },
  {
    id: 'REP-LOG-02',
    title: 'Logistics Performance Report',
    category: 'Supply Chain & Fleets',
    description: 'Mission SLA metrics, freight velocity, delay bottleneck breakdowns, and essential supplies delivery fulfillment rates.',
    format: 'PDF / CSV Data Table',
    generatedDate: 'Today, 19:45 IST',
    size: '2.8 MB'
  },
  {
    id: 'REP-DIS-03',
    title: 'Disaster Accessibility Report',
    category: 'Emergency & Hazards',
    description: 'Flash flood inundation zones, active landslide blockages, BRO clearance progress, and tactical detours for disaster response.',
    format: 'PDF / Satellite Overlay',
    generatedDate: 'Today, 20:15 IST',
    size: '6.1 MB'
  },
  {
    id: 'REP-INFRA-04',
    title: 'District-wise Infrastructure Report',
    category: 'District Administration',
    description: 'Detailed district-level operational status, road surface degradation indices, and vulnerable transport chokepoints.',
    format: 'PDF / Excel Dossier',
    generatedDate: 'Today, 18:00 IST',
    size: '3.5 MB'
  }
];

export class AnalyticsService {
  getKeyIndicators(timeRange: TimeRange = '7D'): KeyIndicators {
    if (timeRange === '24H') {
      return {
        connectivity: 84,
        connectivityDelta: '+1.2%',
        routeDelays: 12.1,
        delayHoursAvg: '1.4 hrs avg',
        deliveries: 93,
        deliveriesCount: '48 / 52 runs',
        incidents: 38,
        incidentsActive: 14
      };
    }
    if (timeRange === '30D') {
      return {
        connectivity: 79,
        connectivityDelta: '-3.8%',
        routeDelays: 16.4,
        delayHoursAvg: '2.1 hrs avg',
        deliveries: 89,
        deliveriesCount: '580 / 651 runs',
        incidents: 892,
        incidentsActive: 88
      };
    }
    return {
      connectivity: 82,
      connectivityDelta: '-1.5% vs last week',
      routeDelays: 14.6,
      delayHoursAvg: '1.8 hrs avg',
      deliveries: 91,
      deliveriesCount: '148 / 162 missions',
      incidents: 247,
      incidentsActive: 23
    };
  }

  getTrendData(timeRange: TimeRange = '7D'): TrendDataPoint[] {
    switch (timeRange) {
      case '24H':
        return TREND_24H;
      case '30D':
        return TREND_30D;
      case '7D':
      default:
        return TREND_7D;
    }
  }

  getDistrictConnectivity(stateFilter: string = 'ALL', districtSearch: string = ''): DistrictConnectivityItem[] {
    return DISTRICT_DATA.filter((item) => {
      const matchesState = stateFilter === 'ALL' || item.state.toLowerCase() === stateFilter.toLowerCase();
      const matchesDistrict = !districtSearch || item.district.toLowerCase().includes(districtSearch.toLowerCase());
      return matchesState && matchesDistrict;
    });
  }

  getDeliveryCommodities(): DeliveryCommodityItem[] {
    return DELIVERY_COMMODITIES;
  }

  getSupplyBottlenecks(): SupplyBottleneckItem[] {
    return SUPPLY_BOTTLENECKS;
  }

  getIncidentTypes(): IncidentTypeDistribution[] {
    return INCIDENT_TYPES;
  }

  getRegionalRisk(): RegionalRiskItem[] {
    return REGIONAL_RISK;
  }

  getPlanningInsights(): PlanningInsightItem[] {
    return PLANNING_INSIGHTS;
  }

  getReportTemplates(): AnalyticsReportTemplate[] {
    return REPORT_TEMPLATES;
  }

  getInfrastructureDeficits(): InfrastructureDeficitItem[] {
    return INFRASTRUCTURE_GAPS;
  }

  getScenarioPresets(): ScenarioSimulationPreset[] {
    return SCENARIO_PRESETS;
  }
}

const INFRASTRUCTURE_GAPS: InfrastructureDeficitItem[] = [
  {
    id: 'GAP-01',
    district: 'Tawang',
    state: 'Arunachal Pradesh',
    accessibilityScore: 38,
    gapScore: 84,
    priority: 'CRITICAL',
    primaryDeficit: 'Single artery vulnerability (NH-13 Sela Pass prone to freeze/debris cutoffs)',
    recommendedInterventions: [
      'Establish forward cold-chain logistics staging depot at Dirang (₹120 Cr)',
      'Construct all-weather heavy drone delivery vertiport (₹35 Cr)',
      'Slope stabilization and snow-shed tunnels along western approach (₹380 Cr)'
    ],
    estimatedCostCr: 535,
    urgencyTimeline: 'Immediate / FY2026-27'
  },
  {
    id: 'GAP-02',
    district: 'Dima Hasao (Haflong)',
    state: 'Assam',
    accessibilityScore: 42,
    gapScore: 78,
    priority: 'CRITICAL',
    primaryDeficit: 'Extreme monsoonal mudflows and unstable cut slopes along NH-27 hill section',
    recommendedInterventions: [
      'Heavy geotechnical retaining soil nails & micropiles (₹240 Cr)',
      'Rail freight siding capacity enhancement at New Haflong (₹180 Cr)',
      'Multi-modal transshipment yard outside landslide zone (₹110 Cr)'
    ],
    estimatedCostCr: 530,
    urgencyTimeline: 'High Priority (Pre-Monsoon)'
  },
  {
    id: 'GAP-03',
    district: 'Tamenglong',
    state: 'Manipur',
    accessibilityScore: 35,
    gapScore: 82,
    priority: 'CRITICAL',
    primaryDeficit: 'Substandard single-lane culverts and unpaved feeder routes isolating valley villages',
    recommendedInterventions: [
      'Upgrade IT Road (Imphal-Tamenglong) to 2-lane paved national standard (₹420 Cr)',
      'All-weather grain and emergency medical storage godown (₹65 Cr)'
    ],
    estimatedCostCr: 485,
    urgencyTimeline: 'Immediate / Active Tender'
  },
  {
    id: 'GAP-04',
    district: 'Upper Subansiri (Daporijo)',
    state: 'Arunachal Pradesh',
    accessibilityScore: 44,
    gapScore: 73,
    priority: 'HIGH',
    primaryDeficit: 'Lack of emergency airstrip and severe bridge load restrictions on Bailey bridges',
    recommendedInterventions: [
      'Develop regional emergency air-logistics landing strip (₹160 Cr)',
      'Permanent steel-girder bridge replacement over Subansiri river (₹190 Cr)'
    ],
    estimatedCostCr: 350,
    urgencyTimeline: 'Medium Term / 18 Months'
  },
  {
    id: 'GAP-05',
    district: 'Kiphire',
    state: 'Nagaland',
    accessibilityScore: 48,
    gapScore: 69,
    priority: 'HIGH',
    primaryDeficit: 'Remote border district with >210 km distance from nearest major supply terminal (Dimapur)',
    recommendedInterventions: [
      'Establish sub-regional logistics hub with 500 MT buffer capacity (₹85 Cr)',
      'Feeder road blacktopping and drainage culvert widening (₹145 Cr)'
    ],
    estimatedCostCr: 230,
    urgencyTimeline: 'FY2026-27'
  },
  {
    id: 'GAP-06',
    district: 'Lawngtlai',
    state: 'Mizoram',
    accessibilityScore: 51,
    gapScore: 66,
    priority: 'HIGH',
    primaryDeficit: 'Kaladan Multi-Modal project road access bottleneck during monsoonal deluges',
    recommendedInterventions: [
      'Reinforced concrete bridge over Chhimtuipui River (₹140 Cr)',
      'Integrated cross-border logistics facilitation center (₹95 Cr)'
    ],
    estimatedCostCr: 235,
    urgencyTimeline: 'Active Interventions'
  },
  {
    id: 'GAP-07',
    district: 'South Garo Hills (Baghmara)',
    state: 'Meghalaya',
    accessibilityScore: 54,
    gapScore: 61,
    priority: 'MEDIUM',
    primaryDeficit: 'Frequent flooding of Simsang river approaches and lack of high-clearance bypass',
    recommendedInterventions: [
      'Elevated causeway over flood-prone Simsang basin (₹180 Cr)',
      'Decentralized agricultural and relief aggregation cold-room (₹45 Cr)'
    ],
    estimatedCostCr: 225,
    urgencyTimeline: 'Medium Term'
  }
];

const SCENARIO_PRESETS: ScenarioSimulationPreset[] = [
  {
    id: 'SCEN-01',
    name: 'NH-13 Sela Pass Catastrophic Landslide',
    targetCorridor: 'NH-13 (Bhalukpong–Bomdila–Tawang)',
    hazardType: 'LANDSLIDE',
    severityLevel: 92,
    description: 'Debris flow and rockslide severing 18 km of NH-13 western hill corridor near Sela Tunnel western portal under continuous 160mm precipitation.',
    kpiImpact: {
      isolatedDistricts: 2,
      delayIncreaseHours: 24.5,
      populationAffected: '115,000 citizens',
      flowCapacityLossPct: 88
    },
    recommendedAction: 'Enact Emergency Air-Drop Protocol; divert light emergency freight via Tezpur–Balemu–Kalaktang alternate military alignment.',
    alternateCorridor: 'Guwahati → Tezpur → Balemu → Kalaktang → Dirang Bypass'
  },
  {
    id: 'SCEN-02',
    name: 'Barak Valley Monsoonal Flooding & Embankment Breach',
    targetCorridor: 'NH-37 / NH-44 (Silchar–Badarpur Junction)',
    hazardType: 'MONSOON_FLOOD',
    severityLevel: 85,
    description: 'Barak River exceeds extreme danger mark by 2.1m. Overtopping at Badarpur creates 3.4km submerged road corridor halting heavy freight to Mizoram and Tripura.',
    kpiImpact: {
      isolatedDistricts: 4,
      delayIncreaseHours: 19.0,
      populationAffected: '2,400,000 citizens',
      flowCapacityLossPct: 76
    },
    recommendedAction: 'Activate inland water logistics barges on National Waterway-16 (Barak River) & route essential fuel rakes via Lumding–Badarpur railway line.',
    alternateCorridor: 'Guwahati → Lumding Rail Transfer → Silchar Port Terminal'
  },
  {
    id: 'SCEN-03',
    name: 'NH-2 Mao Gate Landslide & Corridor Blockade',
    targetCorridor: 'NH-2 (Kohima–Mao Gate–Imphal Lifeline)',
    hazardType: 'LANDSLIDE',
    severityLevel: 88,
    description: 'Major slope collapse at Mao Gate on Manipur border blocking both lanes; critical LPG, petrol, and surgical oxygen supply to Imphal Valley compromised.',
    kpiImpact: {
      isolatedDistricts: 5,
      delayIncreaseHours: 32.0,
      populationAffected: '1,850,000 citizens',
      flowCapacityLossPct: 94
    },
    recommendedAction: 'Immediately mobilize Silchar–Jiribam–Imphal highway (NH-37) as primary national supply arterial under CRPF highway escort.',
    alternateCorridor: 'Silchar Logistics Hub → Jiribam → Noney → Imphal Valley (NH-37)'
  },
  {
    id: 'SCEN-04',
    name: 'Brahmaputra Basin Flash Flood Surge (Lower Assam)',
    targetCorridor: 'NH-27 / NH-127B (Barpeta–Dhubri River Basin)',
    hazardType: 'MONSOON_FLOOD',
    severityLevel: 79,
    description: 'Manas and Beki rivers inundate low-lying arterial bypasses in Barpeta. High-axle food and grain transport restricted.',
    kpiImpact: {
      isolatedDistricts: 3,
      delayIncreaseHours: 11.5,
      populationAffected: '1,100,000 citizens',
      flowCapacityLossPct: 62
    },
    recommendedAction: 'Divert commercial trucks through elevated Northern Foothills Highway (NH-127A via Bhutan border corridor).',
    alternateCorridor: 'Guwahati → Rangia → Bijni → Kokrajhar Northern Link'
  },
  {
    id: 'SCEN-05',
    name: 'Festival Demand & Supply Shock (+65% Surge)',
    targetCorridor: 'Guwahati Multimodal Logistics Park → Northeast Capitals',
    hazardType: 'DEMAND_SURGE',
    severityLevel: 65,
    description: 'Simultaneous festive season stocking and winter replenishment creating 65% freight volume surge at Guwahati staging yards, risking warehouse stockouts.',
    kpiImpact: {
      isolatedDistricts: 0,
      delayIncreaseHours: 8.2,
      populationAffected: 'Whole Regional Network',
      flowCapacityLossPct: 35
    },
    recommendedAction: 'Enforce 24/7 off-peak green corridors for essential freight convoys; commission temporary buffer yards at Changsari & Amingaon.',
    alternateCorridor: 'Direct 24/7 Night Freight Clearance via Jalukbari Bypass'
  }
];

export const analyticsService = new AnalyticsService();
