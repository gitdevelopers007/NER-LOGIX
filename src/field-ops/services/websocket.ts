import { Alert } from '../types/alert';
import { getApiBaseUrl } from './api';

export type AlertEventHandler = (alert: Alert) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Set<AlertEventHandler> = new Set();
  private reconnectTimeout: any = null;
  private pingInterval: any = null;
  private isExplicitlyClosed = false;

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.isExplicitlyClosed = false;
    let wsBase = import.meta.env.VITE_WS_URL;
    if (!wsBase) {
      const apiBase = getApiBaseUrl();
      if (apiBase.startsWith('https://')) {
        wsBase = apiBase.replace('https://', 'wss://').replace(/\/api\/v1\/?$/, '/ws/alerts');
      } else if (apiBase.startsWith('http://')) {
        wsBase = apiBase.replace('http://', 'ws://').replace(/\/api\/v1\/?$/, '/ws/alerts');
      } else {
        wsBase = 'ws://localhost:8000/ws/alerts';
      }
    }
    const role = localStorage.getItem('demo_user_role') || 'FIELD_OFFICER';
    const district = localStorage.getItem('demo_user_district') || '';

    const url = new URL(wsBase);
    url.searchParams.set('role', role);
    if (district) url.searchParams.set('district', district);

    try {
      this.ws = new WebSocket(url.toString());

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected to alerts hub');
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.event === 'ALERT_CREATED' && payload.data) {
            const alertData: Alert = {
              id: payload.data.alert_id,
              type: payload.data.type,
              severity: payload.data.severity,
              title: payload.data.title,
              message: payload.data.message,
              location: payload.data.location,
              latitude: payload.data.latitude,
              longitude: payload.data.longitude,
              road_id: payload.data.road_id,
              district_id: payload.data.district_id,
              incident_id: payload.data.incident_id,
              target_role: payload.data.target_role || 'ALL',
              status: payload.data.status || 'UNREAD',
              is_demo: payload.data.is_demo || false,
              created_at: payload.data.created_at || new Date().toISOString(),
            };
            this.notifyListeners(alertData);
          }
        } catch (err) {
          console.error('[WebSocket] Parse error:', err);
        }
      };

      this.ws.onclose = () => {
        this.stopHeartbeat();
        if (!this.isExplicitlyClosed) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (err) => {
        console.warn('[WebSocket] Connection error:', err);
        this.ws?.close();
      };
    } catch (e) {
      console.error('[WebSocket] Init failed:', e);
      this.scheduleReconnect();
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'PING' }));
      }
    }, 25000);
  }

  private stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return;
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      this.connect();
    }, 3000);
  }

  subscribe(handler: AlertEventHandler): () => void {
    this.listeners.add(handler);
    return () => {
      this.listeners.delete(handler);
    };
  }

  private notifyListeners(alert: Alert) {
    this.listeners.forEach((fn) => fn(alert));
  }

  disconnect() {
    this.isExplicitlyClosed = true;
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();
