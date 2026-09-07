export interface DataSourceItem {
  id: string;
  source: string;
  type: 'GIS' | 'API' | 'Platform' | 'GPS' | 'Government DB';
  status: 'Connected' | 'Degraded' | 'Offline';
  lastUpdated: string;
  refreshFrequency: string;
  endpoint: string;
  recordsCount: string;
}

export interface ApiServiceItem {
  id: string;
  service: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  responseMs: number;
  uptimePct: number;
  protocol: 'REST / HTTPS' | 'WebSocket' | 'gRPC';
}

export interface DataQualityMetric {
  category: string;
  percentage: number;
  rating: 'EXCELLENT' | 'GOOD' | 'FAIR';
}

export interface SystemDataStats {
  dataSourcesCount: number;
  dataSourcesConnected: number;
  liveServicesCount: number;
  liveServicesOperational: number;
  lastSync: string;
  dataHealthPct: number;
}

const DATA_SOURCES: DataSourceItem[] = [
  { id: 'SRC-01', source: 'GIS / Road Network', type: 'GIS', status: 'Connected', lastUpdated: '20:40 IST', refreshFrequency: 'Every 5m', endpoint: 'https://bhuvan-app3.nrsc.gov.in/data/gis/roads', recordsCount: '12,480 km' },
  { id: 'SRC-02', source: 'Weather Data', type: 'API', status: 'Connected', lastUpdated: '20:39 IST', refreshFrequency: 'Every 10m', endpoint: 'https://mausam.imd.gov.in/api/v2/live/northeast', recordsCount: '142 stations' },
  { id: 'SRC-03', source: 'Rainfall Data', type: 'API', status: 'Connected', lastUpdated: '20:38 IST', refreshFrequency: 'Every 15m', endpoint: 'https://imd.gov.in/radar/telemetry/precipitation', recordsCount: '18 Doppler Radars' },
  { id: 'SRC-04', source: 'Field Reports', type: 'Platform', status: 'Connected', lastUpdated: '20:41 IST', refreshFrequency: 'Real-time WebSocket', endpoint: 'wss://ner-logix.gov.in/ws/field-operations', recordsCount: '482 reports' },
  { id: 'SRC-05', source: 'Vehicle GPS', type: 'GPS', status: 'Connected', lastUpdated: '20:41 IST', refreshFrequency: 'Every 5s', endpoint: 'https://ner-logix.gov.in/api/telemetry/gps-fleet', recordsCount: '64 active units' },
  { id: 'SRC-06', source: 'Road Infrastructure', type: 'Government DB', status: 'Connected', lastUpdated: '20:20 IST', refreshFrequency: 'Hourly', endpoint: 'https://morth.nic.in/db/bridge-corridors', recordsCount: '1,890 structures' },
  { id: 'SRC-07', source: 'Incident Data', type: 'Platform', status: 'Connected', lastUpdated: '20:41 IST', refreshFrequency: 'Real-time', endpoint: 'https://ner-logix.gov.in/api/incidents/stream', recordsCount: '247 incidents' },
  { id: 'SRC-08', source: 'Satellite / Remote Data', type: 'GIS', status: 'Connected', lastUpdated: '19:55 IST', refreshFrequency: 'Every 30m', endpoint: 'https://isro.bhuvan.gov.in/geoportal/optical-radar', recordsCount: '8 multispectral tiles' },
  { id: 'SRC-09', source: 'State Disaster Data (SDRF)', type: 'Government DB', status: 'Connected', lastUpdated: '20:15 IST', refreshFrequency: 'Every 30m', endpoint: 'https://asdma.gov.in/telemetry/feed', recordsCount: '8 state nodes' },
  { id: 'SRC-10', source: 'Border Roads Task Force Feed', type: 'Government DB', status: 'Connected', lastUpdated: '20:30 IST', refreshFrequency: 'Every 20m', endpoint: 'https://bro.nic.in/operations/project-vartak', recordsCount: '14 sectors' },
];

const API_SERVICES: ApiServiceItem[] = [
  { id: 'API-01', service: 'Weather Service', status: 'ONLINE', responseMs: 184, uptimePct: 99.98, protocol: 'REST / HTTPS' },
  { id: 'API-02', service: 'GIS / Map Service', status: 'ONLINE', responseMs: 121, uptimePct: 99.99, protocol: 'REST / HTTPS' },
  { id: 'API-03', service: 'Route Intelligence API', status: 'ONLINE', responseMs: 246, uptimePct: 99.94, protocol: 'REST / HTTPS' },
  { id: 'API-04', service: 'Risk Prediction API', status: 'ONLINE', responseMs: 318, uptimePct: 99.89, protocol: 'gRPC' },
  { id: 'API-05', service: 'Vehicle Tracking API', status: 'ONLINE', responseMs: 143, uptimePct: 99.99, protocol: 'WebSocket' },
  { id: 'API-06', service: 'Field Reporting API', status: 'ONLINE', responseMs: 162, uptimePct: 99.95, protocol: 'REST / HTTPS' },
  { id: 'API-07', service: 'Alert Engine', status: 'ONLINE', responseMs: 109, uptimePct: 100.0, protocol: 'WebSocket' },
];

const DATA_QUALITY: DataQualityMetric[] = [
  { category: 'Road Network Data', percentage: 98, rating: 'EXCELLENT' },
  { category: 'Weather Data', percentage: 94, rating: 'EXCELLENT' },
  { category: 'Field Reports', percentage: 97, rating: 'EXCELLENT' },
  { category: 'Vehicle GPS', percentage: 99, rating: 'EXCELLENT' },
  { category: 'Incident Data', percentage: 95, rating: 'EXCELLENT' },
];

export class DataIntegrationService {
  getDataStats(): SystemDataStats {
    return {
      dataSourcesCount: 18,
      dataSourcesConnected: 18,
      liveServicesCount: 14,
      liveServicesOperational: 14,
      lastSync: '20:41 IST',
      dataHealthPct: 96
    };
  }

  getDataSources(): DataSourceItem[] {
    return DATA_SOURCES;
  }

  getApiServices(): ApiServiceItem[] {
    return API_SERVICES;
  }

  getDataQuality(): DataQualityMetric[] {
    return DATA_QUALITY;
  }

  addDataSource(source: Omit<DataSourceItem, 'id' | 'status' | 'lastUpdated'>): DataSourceItem {
    const newItem: DataSourceItem = {
      ...source,
      id: `SRC-${String(DATA_SOURCES.length + 1).padStart(2, '0')}`,
      status: 'Connected',
      lastUpdated: 'Just now'
    };
    DATA_SOURCES.unshift(newItem);
    return newItem;
  }
}

export const dataIntegrationService = new DataIntegrationService();
