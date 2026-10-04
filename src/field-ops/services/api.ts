import { Incident, IncidentCreatePayload } from '../types/incident';
import { Alert } from '../types/alert';
import { SyncQueueItem } from '../types/sync';
import { UserProfile } from '../types/user';

export const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://ner-logix-backend-uhfu.onrender.com/api/v1';
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResult<T> {
  total: number;
  items: T[];
  limit: number;
  offset: number;
}

class ApiService {
  public getBaseUrl(): string {
    return getApiBaseUrl();
  }

  private getHeaders(): HeadersInit {
    const activeUserId = localStorage.getItem('demo_user_id') || 'usr_officer_01';
    const activeUserRole = localStorage.getItem('demo_user_role') || 'FIELD_OFFICER';

    return {
      'Content-Type': 'application/json',
      'x-user-id': activeUserId,
      'x-user-role': activeUserRole,
    };
  }

  async getMe(): Promise<UserProfile> {
    const res = await fetch(`${this.getBaseUrl()}/auth/me`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<UserProfile> = await res.json();
    return body.data;
  }

  async listDemoUsers(): Promise<UserProfile[]> {
    const res = await fetch(`${this.getBaseUrl()}/auth/users`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<UserProfile[]> = await res.json();
    return body.data;
  }

  async createIncident(payload: IncidentCreatePayload): Promise<Incident> {
    const res = await fetch(`${this.getBaseUrl()}/incidents`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP error ${res.status}`);
    }
    const body: ApiResponse<Incident> = await res.json();
    return body.data;
  }

  async getIncidents(params?: {
    district_id?: string;
    road_id?: string;
    status?: string;
    severity?: string;
    type?: string;
    limit?: number;
  }): Promise<PaginatedResult<Incident>> {
    const url = new URL(`${this.getBaseUrl()}/incidents`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.append(k, String(v));
      });
    }

    const res = await fetch(url.toString(), {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<PaginatedResult<Incident>> = await res.json();
    return body.data;
  }

  async getIncidentById(id: string): Promise<Incident> {
    const res = await fetch(`${this.getBaseUrl()}/incidents/${id}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<Incident> = await res.json();
    return body.data;
  }

  async verifyIncident(id: string, action: 'VERIFIED' | 'REJECTED', notes?: string): Promise<Incident> {
    const res = await fetch(`${this.getBaseUrl()}/incidents/${id}/verify`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ action, notes }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<Incident> = await res.json();
    return body.data;
  }

  async syncBatch(reports: IncidentCreatePayload[]): Promise<{
    synced_count: number;
    duplicate_count: number;
    failed_count: number;
    results: any[];
  }> {
    const res = await fetch(`${this.getBaseUrl()}/incidents/sync`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ reports }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<any> = await res.json();
    return body.data;
  }

  async getAlerts(params?: {
    district_id?: string;
    severity?: string;
    status?: string;
  }): Promise<PaginatedResult<Alert>> {
    const url = new URL(`${this.getBaseUrl()}/alerts`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.append(k, String(v));
      });
    }

    const res = await fetch(url.toString(), {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<PaginatedResult<Alert>> = await res.json();
    return body.data;
  }

  async acknowledgeAlert(id: string): Promise<Alert> {
    const res = await fetch(`${this.getBaseUrl()}/alerts/${id}/acknowledge`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({}),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<Alert> = await res.json();
    return body.data;
  }

  async simulateAlert(eventData: {
    event_type: string;
    severity: string;
    location: string;
    road_id: string;
    district_id: string;
    description: string;
  }): Promise<Alert> {
    const res = await fetch(`${this.getBaseUrl()}/alerts/simulate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body: ApiResponse<Alert> = await res.json();
    return body.data;
  }
}

export const api = new ApiService();
