import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { getLocalIncident } from '../services/indexedDb';
import { api, API_BASE_URL } from '../services/api';
import { Incident } from '../types/incident';
import { StatusBadge, SeverityBadge } from '../components/StatusBadge';
import { FieldLocationMap } from '../components/MapLibreViewer';
import { formatCoordinates, formatDate } from '../utils/formatters';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Camera,
  Info,
} from 'lucide-react';

export const ReportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [verifyNotes, setVerifyNotes] = useState<string>('');

  const userRole = localStorage.getItem('demo_user_role') || 'FIELD_OFFICER';
  const canVerify = userRole === 'GOVERNMENT_OPERATOR' || userRole === 'GOVERNMENT_ADMIN';

  useEffect(() => {
    if (!id) return;
    const fetchIncident = async () => {
      setLoading(true);
      try {
        // Try local IndexedDB first
        const local = await getLocalIncident(id);
        if (local) {
          setIncident(local);
        } else {
          const remote = await api.getIncidentById(id);
          setIncident(remote);
        }
      } catch {
        // Try remote fallback
        try {
          const remote = await api.getIncidentById(id);
          setIncident(remote);
        } catch (e) {
          console.error('Error fetching incident detail:', e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleVerify = async (action: 'VERIFIED' | 'REJECTED') => {
    if (!incident) return;
    setVerifying(true);
    try {
      const updated = await api.verifyIncident(incident.id, action, verifyNotes);
      setIncident(updated);
      alert(`Report marked as ${action}`);
    } catch (err: any) {
      alert(`Verification failed: ${err.message}`);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-xs text-slate-500">
        Loading incident details...
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm font-bold text-slate-700">Incident report not found</p>
        <button
          onClick={() => navigate('/field/reports')}
          className="text-xs text-blue-600 font-bold"
        >
          Return to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('btn_back')}</span>
        </button>
        <StatusBadge status={incident.status} />
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">
                {t(`type_${incident.type}`, incident.type.replace('_', ' '))}
              </h2>
              <SeverityBadge severity={incident.severity} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ref ID: <code className="font-mono text-slate-700">{incident.id || incident.client_generated_id}</code>
            </p>
          </div>
        </div>

        {/* Map View */}
        <FieldLocationMap
          latitude={incident.latitude}
          longitude={incident.longitude}
          accuracy={incident.location_accuracy}
          incidentType={incident.type}
          severity={incident.severity}
          roadName={incident.road_id || undefined}
          districtName={incident.district_id || undefined}
          height="220px"
          interactive={true}
        />

        {/* Location & Association Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">
              Road Association
            </span>
            <span className="font-bold text-slate-800">
              {incident.road_id ? incident.road_id : 'Road association pending'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">
              District
            </span>
            <span className="font-bold text-slate-800">
              {incident.district_id ? incident.district_id : 'GIS Boundary pending'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">
              GPS Coordinates
            </span>
            <span className="font-mono text-slate-700 font-semibold">
              {formatCoordinates(incident.latitude, incident.longitude)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">
              Reported At
            </span>
            <span className="text-slate-700 font-medium">
              {formatDate(incident.reported_at)}
            </span>
          </div>
        </div>

        {/* Description & Field Notes */}
        {incident.description && (
          <div className="space-y-1 pt-1">
            <span className="text-xs font-bold text-slate-700 block">Description</span>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-sans">
              {incident.description}
            </p>
          </div>
        )}

        {/* Optional details */}
        {(incident.nearby_landmark || incident.estimated_obstruction_length || incident.vehicle_accessibility) && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            {incident.nearby_landmark && (
              <div className="bg-slate-50 p-2 rounded-lg text-xs">
                <span className="text-[10px] text-slate-400 block">Landmark</span>
                <span className="font-semibold text-slate-800">{incident.nearby_landmark}</span>
              </div>
            )}
            {incident.estimated_obstruction_length && (
              <div className="bg-slate-50 p-2 rounded-lg text-xs">
                <span className="text-[10px] text-slate-400 block">Obstruction</span>
                <span className="font-semibold text-slate-800">
                  {incident.estimated_obstruction_length}
                </span>
              </div>
            )}
            {incident.vehicle_accessibility && (
              <div className="bg-slate-50 p-2 rounded-lg text-xs">
                <span className="text-[10px] text-slate-400 block">Access</span>
                <span className="font-semibold text-slate-800">
                  {incident.vehicle_accessibility}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Incident Photograph */}
        {incident.photos && incident.photos.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Incident Field Photograph</span>
            </span>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={
                  incident.photos[0].photo_url.startsWith('http')
                    ? incident.photos[0].photo_url
                    : `${api.getBaseUrl().replace('/api/v1', '')}${incident.photos[0].photo_url}`
                }
                alt="Field photograph"
                className="w-full max-h-72 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>MIME: {incident.photos[0].mime_type}</span>
              <span>Size: {(incident.photos[0].file_size / 1024).toFixed(0)} KB</span>
            </div>
          </div>
        )}
      </div>

      {/* Operator Verification Card */}
      {canVerify && incident.status === 'SUBMITTED' && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <div>
              <h4 className="text-xs font-bold text-blue-900">
                Government Operator Verification
              </h4>
              <p className="text-[11px] text-blue-700">
                Verify this report to trigger elevated regional logistics rerouting alerts.
              </p>
            </div>
          </div>

          <textarea
            value={verifyNotes}
            onChange={(e) => setVerifyNotes(e.target.value)}
            placeholder="Add verification notes / dispatch dispatch confirmation..."
            rows={2}
            className="w-full text-xs p-2.5 border border-blue-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleVerify('VERIFIED')}
              disabled={verifying}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Report</span>
            </button>
            <button
              onClick={() => handleVerify('REJECTED')}
              disabled={verifying}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject / Correction</span>
            </button>
          </div>
        </div>
      )}

      {/* Verification History / Log */}
      {incident.verified_at && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-700 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified by {incident.verified_by || 'Government Operator'}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Timestamp: {formatDate(incident.verified_at)}
          </div>
          {incident.verification_notes && (
            <div className="mt-1 text-slate-600 italic">
              "{incident.verification_notes}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
