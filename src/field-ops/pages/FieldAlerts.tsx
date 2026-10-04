import React, { useState } from 'react';
import { useLanguage } from '../features/language/LanguageContext';
import { useAlerts } from '../hooks/useAlerts';
import { Alert, AlertSeverity } from '../types/alert';
import { SeverityBadge } from '../components/StatusBadge';
import { formatRelativeTime, formatCoordinates } from '../utils/formatters';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Clock,
  Radio,
  Filter,
  Check,
  ShieldAlert,
} from 'lucide-react';

export const FieldAlerts: React.FC = () => {
  const { t } = useLanguage();
  const { alerts, loading, acknowledgeAlert, refreshAlerts } = useAlerts();
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(null);

  const handleAcknowledge = async (id: string) => {
    setAcknowledgingId(id);
    try {
      await acknowledgeAlert(id);
    } catch (e: any) {
      alert(`Failed to acknowledge alert: ${e.message}`);
    } finally {
      setAcknowledgingId(null);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter === 'ALL') return true;
    return alert.severity === severityFilter;
  });

  const unreadCount = alerts.filter((a) => a.status === 'UNREAD').length;

  return (
    <div className="space-y-4 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900">{t('alerts_title')}</h2>
            <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              {t('alert_realtime_badge')}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Automated disruption alerts dispatched from NER Alert Engine
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="text-xs font-mono font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Severity Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              severityFilter === sev
                ? 'bg-gov-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sev === 'ALL' ? 'All Alerts' : sev}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading live alerts...</div>
      ) : filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm space-y-2">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">{t('alert_no_active')}</h4>
          <p className="text-xs text-slate-500">
            All regional transport routes in your district are currently normal.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isAck = alert.status === 'ACKNOWLEDGED';
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border transition-all space-y-3 ${
                  isCritical
                    ? 'border-red-400 ring-1 ring-red-200 bg-gradient-to-br from-red-50/40 to-white'
                    : isHigh
                    ? 'border-orange-300 ring-1 ring-orange-100'
                    : 'border-slate-200'
                }`}
              >
                {/* Header row: Alert Type, Severity, Time */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
                        {alert.type.replace('_', ' ')}
                      </span>
                      <SeverityBadge severity={alert.severity} />
                      {alert.is_demo && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded">
                          DEMO
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{alert.location || `${alert.district_id || 'Corridor'}`}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatRelativeTime(alert.created_at)}
                  </span>
                </div>

                {/* Title & Message */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {alert.message}
                  </p>
                </div>

                {/* Road / Targeting Metadata */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span>
                    Corridor:{' '}
                    <strong className="text-slate-700 font-sans">
                      {alert.road_id || 'Access Route'}
                    </strong>
                  </span>
                  <span>Target: {alert.target_role}</span>
                </div>

                {/* Footer: Acknowledge Button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">
                    Status:{' '}
                    <strong className={isAck ? 'text-emerald-700' : 'text-slate-600'}>
                      {isAck ? t('alert_ack_done') : 'Active Alert'}
                    </strong>
                  </span>

                  {isAck ? (
                    <span className="flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('alert_ack_done')}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      disabled={acknowledgingId === alert.id}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {acknowledgingId === alert.id ? 'Saving...' : t('alert_ack_btn')}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
