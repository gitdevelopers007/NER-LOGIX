import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { getAllLocalIncidents } from '../services/indexedDb';
import { api } from '../services/api';
import { Incident, IncidentStatus } from '../types/incident';
import { StatusBadge, SeverityBadge } from '../components/StatusBadge';
import { formatRelativeTime, formatCoordinates } from '../utils/formatters';
import {
  FileText,
  Filter,
  ChevronRight,
  Clock,
  Camera,
  Layers,
  MapPin,
} from 'lucide-react';

const FILTER_TABS: { key: string; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'QUEUED', label: 'Queued' },
  { key: 'SUBMITTED', label: 'Submitted' },
  { key: 'VERIFIED', label: 'Verified' },
  { key: 'RESOLVED', label: 'Resolved' },
];

export const MyReports: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();

  const [reports, setReports] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const local = await getAllLocalIncidents();
        if (isOnline) {
          try {
            const remote = await api.getIncidents({ limit: 50 });
            // Merge by client_generated_id
            const mergedMap = new Map<string, Incident>();
            local.forEach((i) => mergedMap.set(i.client_generated_id, i));
            remote.items.forEach((i) => mergedMap.set(i.client_generated_id, i));
            const sorted = Array.from(mergedMap.values()).sort(
              (a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
            );
            setReports(sorted);
          } catch {
            setReports(local);
          }
        } else {
          setReports(local);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [isOnline]);

  const filteredReports = reports.filter((r) => {
    if (activeFilter === 'ALL') return true;
    return r.status === activeFilter;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">{t('nav_my_reports')}</h2>
          <p className="text-xs text-slate-500">
            Field submissions, local offline queue, and command verification
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
          {filteredReports.length} records
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Cards List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading reports...</div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm space-y-2">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Reports Found</h4>
          <p className="text-xs text-slate-500">
            {activeFilter === 'ALL'
              ? 'No field incident reports filed yet.'
              : `No reports with status '${activeFilter}'.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredReports.map((report) => (
            <div
              key={report.client_generated_id}
              onClick={() =>
                navigate(`/field/reports/${report.id || report.client_generated_id}`)
              }
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 hover:border-blue-300 cursor-pointer transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">
                      {t(`type_${report.type}`, report.type.replace('_', ' '))}
                    </span>
                    <SeverityBadge severity={report.severity} />
                    {report.is_demo && (
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded">
                        DEMO
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {report.road_id || 'Corridor'} • {report.district_id || 'Assam / NER'}
                    </span>
                  </div>
                </div>

                <StatusBadge status={report.status} />
              </div>

              {/* Description Preview */}
              {report.description && (
                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 font-sans">
                  {report.description}
                </p>
              )}

              {/* Card Footer: Photo indicator, Coords, Timestamp */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-100 pt-2">
                <div className="flex items-center space-x-2">
                  <span>{formatCoordinates(report.latitude, report.longitude)}</span>
                  {report.photos && report.photos.length > 0 && (
                    <span className="flex items-center gap-0.5 text-slate-500 font-sans font-medium text-[10px] bg-slate-100 px-1.5 py-0.2 rounded">
                      <Camera className="w-3 h-3" />
                      Photo
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 font-sans text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{formatRelativeTime(report.reported_at)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
