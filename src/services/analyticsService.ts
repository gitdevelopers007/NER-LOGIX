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
}

export const analyticsService = new AnalyticsService();
