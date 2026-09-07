import type { Incident, WeatherRisk } from '../data/nerGisData';

const API_BASE = 'http://localhost:3001/api';

export interface StateRainfall {
  state: string;
  station: string;
  currentPrecipitationMm: number;
  status: string;
  alertLevel: string;
  accumulated24hMm: number;
  lat: number;
  lng: number;
}

export const nerApiService = {
  // 1. Live Weather & Natural Hazards
  getHazardsAndWeather: async (): Promise<{
    weatherOverview: WeatherRisk[];
    rainfallTelemetry?: StateRainfall[];
    currentTemp?: number;
    currentRain?: number;
    currentHumidity?: number;
    source: string;
  }> => {
    try {
      const res = await fetch(`${API_BASE}/hazards`);
      if (!res.ok) throw new Error('Failed to fetch hazards');
      const data = await res.json();
      return {
        weatherOverview: data.weatherOverview,
        rainfallTelemetry: data.rainfallTelemetry,
        currentTemp: data.currentTemp,
        currentRain: data.currentRain,
        currentHumidity: data.currentHumidity,
        source: data.source,
      };
    } catch {
      return {
        weatherOverview: [
          { type: 'Heavy Rainfall', count: '5 districts', riskLevel: 'Moderate - High', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'rain' },
          { type: 'Landslide Risk', count: '4 districts', riskLevel: 'High', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'mountain' },
          { type: 'Flood Risk', count: '2 districts', riskLevel: 'Moderate', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: 'flood' },
          { type: 'Temperature', count: '18°C – 32°C', riskLevel: '(NER avg)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: 'temp' },
        ],
        rainfallTelemetry: [
          { state: 'Meghalaya', station: 'Cherrapunji / Shillong Doppler', currentPrecipitationMm: 14.8, status: 'Heavy Downpour', alertLevel: 'ORANGE_ALERT', accumulated24hMm: 112.4, lat: 25.5788, lng: 91.8933 },
          { state: 'Assam', station: 'Cachar / Silchar Radar', currentPrecipitationMm: 6.2, status: 'Moderate Rain', alertLevel: 'YELLOW_WATCH', accumulated24hMm: 48.0, lat: 24.83, lng: 92.80 },
          { state: 'Arunachal Pradesh', station: 'Papum Pare / Itanagar', currentPrecipitationMm: 4.5, status: 'Intermittent Showers', alertLevel: 'YELLOW_WATCH', accumulated24hMm: 36.5, lat: 27.0844, lng: 93.6053 },
          { state: 'Nagaland', station: 'Kohima IMD Station', currentPrecipitationMm: 2.1, status: 'Light Rain / Mud Risk', alertLevel: 'WATCH', accumulated24hMm: 18.2, lat: 25.6751, lng: 94.1086 },
          { state: 'Manipur', station: 'Imphal Station', currentPrecipitationMm: 1.4, status: 'Overcast', alertLevel: 'NORMAL', accumulated24hMm: 12.0, lat: 24.8170, lng: 93.9368 },
          { state: 'Mizoram', station: 'Aizawl Station', currentPrecipitationMm: 3.2, status: 'Scattered Showers', alertLevel: 'WATCH', accumulated24hMm: 24.5, lat: 23.7271, lng: 92.7176 },
          { state: 'Tripura', station: 'Agartala Doppler', currentPrecipitationMm: 0.8, status: 'Passing Cloud', alertLevel: 'NORMAL', accumulated24hMm: 8.0, lat: 23.8315, lng: 91.2868 },
          { state: 'Sikkim', station: 'Gangtok IMD Station', currentPrecipitationMm: 5.0, status: 'High Altitude Rain', alertLevel: 'YELLOW_WATCH', accumulated24hMm: 42.1, lat: 27.3389, lng: 88.6065 },
        ],
        currentTemp: 25.5,
        currentRain: 1.2,
        currentHumidity: 88,
        source: 'Local Cache',
      };
    }
  },

  // 2. Incident Ground Reports (with dynamic filtering)
  getIncidents: async (filters?: { state?: string; status?: string; severity?: string; type?: string }): Promise<Incident[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.state && filters.state !== 'All States') params.append('state', filters.state);
      if (filters?.status && filters.status !== 'All Status') params.append('status', filters.status);
      if (filters?.severity && filters.severity !== 'All Severities') params.append('severity', filters.severity);
      if (filters?.type && filters.type !== 'All Types') params.append('type', filters.type);

      const url = `${API_BASE}/incidents${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch incidents');
      const data = await res.json();
      return data.incidents;
    } catch {
      return [];
    }
  },

  // 3. Dispatch Clearance / Resolve Incident
  resolveIncident: async (id: string, newStatus: 'OPEN' | 'RESTRICTED' | 'BLOCKED'): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 4. Dynamic KPI Metrics
  getMetrics: async () => {
    try {
      const res = await fetch(`${API_BASE}/metrics`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      return await res.json();
    } catch {
      return {
        accessibleRoadsKm: 1248,
        accessiblePercentage: 82,
        restrictedRoadsKm: 186,
        restrictedPercentage: 12,
        blockedRoadsKm: 93,
        blockedPercentage: 6,
        affectedBridges: 14,
        activeIncidents: 28,
        lastSync: '2 min ago',
      };
    }
  },

  // 5. Freight Convoys & Logistics Missions
  getLogistics: async () => {
    try {
      const res = await fetch(`${API_BASE}/logistics`);
      if (!res.ok) throw new Error('Failed to fetch logistics');
      return await res.json();
    } catch {
      return { activeConvoysCount: 3, convoys: [] };
    }
  },
};
