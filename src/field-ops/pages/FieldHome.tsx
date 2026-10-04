import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useSyncQueue } from '../hooks/useSyncQueue';
import { useAlerts } from '../hooks/useAlerts';
import { useGeolocation } from '../hooks/useGeolocation';
import { getAllLocalIncidents } from '../services/indexedDb';
import { api } from '../services/api';
import { Incident } from '../types/incident';
import { StatusBadge, SeverityBadge } from '../components/StatusBadge';
import { formatRelativeTime, formatCoordinates } from '../utils/formatters';
import {
  Navigation,
  Wifi,
  WifiOff,
  RefreshCw,
  PlusCircle,
  AlertTriangle,
  MapPin,
  Clock,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';

export const FieldHome: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();
  const { pendingCount, lastSyncedAt, triggerSync, isSyncing } = useSyncQueue();
  const { alerts } = useAlerts();
  const { position, captureGps, loading: gpsLoading } = useGeolocation();

  const [recentReports, setRecentReports] = useState<Incident[]>([]);
  const [loadingReports, setLoadingReports] = useState<boolean>(true);

  // Active user details
  const userName = localStorage.getItem('demo_user_name') || 'Field Officer';
  const assignedDistrict = localStorage.getItem('demo_user_district') || 'Kamrup Metropolitan';

  useEffect(() => {
    // Attempt GPS fix on initial home load
    captureGps();

    // Load recent reports (merge local IndexedDB with API if online)
    const loadReports = async () => {
      setLoadingReports(true);
      try {
        const local = await getAllLocalIncidents();
        if (isOnline) {
          try {
            const remote = await api.getIncidents({ limit: 10 });
            // Merge by client_generated_id
            const mergedMap = new Map<string, Incident>();
            local.forEach((item) => mergedMap.set(item.client_generated_id, item));
            remote.items.forEach((item) => mergedMap.set(item.client_generated_id, item));
            const sorted = Array.from(mergedMap.values()).sort(
              (a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
            );
            setRecentReports(sorted.slice(0, 5));
          } catch {
            setRecentReports(local.slice(0, 5));
          }
        } else {
          setRecentReports(local.slice(0, 5));
        }
      } catch (e) {
        console.error('Error loading reports for home:', e);
      } finally {
        setLoadingReports(false);
      }
    };

    loadReports();
  }, [isOnline, captureGps]);

  const criticalAlerts = alerts.filter(
    (a) => (a.severity === 'CRITICAL' || a.severity === 'HIGH') && a.status !== 'ACKNOWLEDGED'
  );

  return (
    <div className="space-y-4 pb-20">
      {/* Field Officer Banner */}
      <div className="bg-gradient-to-r from-gov-900 via-gov-800 to-gov-900 rounded-2xl p-4 text-white shadow-md border border-gov-700">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              OPERATIONAL OUTPOST • ASSAM / NER
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">{userName}</h2>
            <div className="flex items-center space-x-1 text-xs text-slate-300 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {t('ops_assigned_area')}: <strong>{assignedDistrict}</strong>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">
              {t('ops_last_sync')}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {formatRelativeTime(lastSyncedAt)}
            </span>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gov-700/60 text-center">
          {/* GPS Status */}
          <div className="bg-gov-800/80 rounded-xl p-2 border border-gov-700">
            <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 mb-0.5">
              <Navigation className="w-3 h-3 text-slate-300" />
              <span>{t('ops_gps_status')}</span>
            </div>
            <span
              className={`text-xs font-bold block ${
                position ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {position
                ? `±${position.accuracy.toFixed(0)}m Fix`
                : gpsLoading
                ? 'Acquiring...'
                : 'Pending'}
            </span>
          </div>

          {/* Network Status */}
          <div className="bg-gov-800/80 rounded-xl p-2 border border-gov-700">
            <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 mb-0.5">
              {isOnline ? (
                <Wifi className="w-3 h-3 text-emerald-400" />
              ) : (
                <WifiOff className="w-3 h-3 text-amber-400" />
              )}
              <span>{t('ops_conn_status')}</span>
            </div>
            <span
              className={`text-xs font-bold block ${
                isOnline ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
              }`}
            >
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          {/* Pending Sync */}
          <div
            onClick={() => navigate('/field/sync')}
            className="bg-gov-800/80 hover:bg-gov-700/80 cursor-pointer rounded-xl p-2 border border-gov-700 transition-colors"
          >
            <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 mb-0.5">
              <RefreshCw
                className={`w-3 h-3 text-sky-400 ${isSyncing ? 'animate-spin' : ''}`}
              />
              <span>{t('ops_pending_sync')}</span>
            </div>
            <span
              className={`text-xs font-extrabold block ${
                pendingCount > 0 ? 'text-amber-400' : 'text-slate-300'
              }`}
            >
              {pendingCount} queued
            </span>
          </div>
        </div>
      </div>

      {/* Critical Alert Warning (if active) */}
      {criticalAlerts.length > 0 && (
        <div
          onClick={() => navigate('/field/alerts')}
          className="bg-red-50 border-l-4 border-red-600 p-3.5 rounded-r-xl shadow-sm cursor-pointer hover:bg-red-100 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
                    {criticalAlerts[0].type.replace('_', ' ')}
                  </span>
                  <SeverityBadge severity={criticalAlerts[0].severity} />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mt-0.5">
                  {criticalAlerts[0].title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                  {criticalAlerts[0].message}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 mt-1" />
          </div>
        </div>
      )}

      {/* Primary Action CTA: Report Incident */}
      <button
        onClick={() => navigate('/field/report')}
        className="w-full bg-gov-900 hover:bg-gov-800 active:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-md border border-gov-700/60 flex items-center justify-center space-x-2 touch-target text-sm transition-all transform active:scale-[0.99]"
      >
        <PlusCircle className="w-5 h-5 text-emerald-400" />
        <span>{t('ops_quick_report')}</span>
      </button>

      {/* Recent Field Reports */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-800 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-gov-800" />
            <span>{t('ops_recent_reports')}</span>
          </h3>
          <button
            onClick={() => navigate('/field/reports')}
            className="text-xs text-gov-800 hover:text-gov-950 font-bold"
          >
            View All
          </button>
        </div>

        {loadingReports ? (
          <div className="py-6 text-center text-xs text-slate-400">Loading incident records...</div>
        ) : recentReports.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            {t('ops_no_recent_reports')}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentReports.map((inc) => (
              <div
                key={inc.client_generated_id}
                onClick={() => navigate(`/field/reports/${inc.id || inc.client_generated_id}`)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-lg px-1 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">
                      {t(`type_${inc.type}`, inc.type.replace('_', ' '))}
                    </span>
                    <SeverityBadge severity={inc.severity} />
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <span>{inc.road_id || 'Corridor'}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(inc.reported_at)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <StatusBadge status={inc.status} />
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
