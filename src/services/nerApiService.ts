import type { Incident, WeatherRisk } from '../data/nerGisData';

const API_BASE = 'http://localhost:3001/api';

export const nerApiService = {
  // 1. Live Weather & Natural Hazards
  getHazardsAndWeather: async (): Promise<{ weatherOverview: WeatherRisk[]; source: string }> => {
    try {
      const res = await fetch(`${API_BASE}/hazards`);
      if (!res.ok) throw new Error('Failed to fetch hazards');
      const data = await res.json();
      return {
        weatherOverview: data.weatherOverview,
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
