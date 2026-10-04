import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { generateUUID } from '../utils/idGenerator';
import { compressImage, CompressedImageResult } from '../utils/imageCompressor';
import { formatCoordinates } from '../utils/formatters';
import {
  saveLocalIncident,
  saveLocalPhoto,
  enqueueSyncReport,
} from '../services/indexedDb';
import { api } from '../services/api';
import { incidentService } from '../../services/incidentService';
import {
  IncidentType,
  IncidentSeverity,
  IncidentCreatePayload,
} from '../types/incident';
import { FieldLocationMap } from '../components/MapLibreViewer';
import {
  MapPin,
  Navigation,
  Camera,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

const INCIDENT_TYPES: { type: IncidentType; labelKey: string }[] = [
  { type: 'ROAD_BLOCKED', labelKey: 'type_ROAD_BLOCKED' },
  { type: 'LANDSLIDE', labelKey: 'type_LANDSLIDE' },
  { type: 'FLOOD', labelKey: 'type_FLOOD' },
  { type: 'ROAD_DAMAGE', labelKey: 'type_ROAD_DAMAGE' },
  { type: 'BRIDGE_ISSUE', labelKey: 'type_BRIDGE_ISSUE' },
  { type: 'HEAVY_RAINFALL', labelKey: 'type_HEAVY_RAINFALL' },
  { type: 'CONGESTION', labelKey: 'type_CONGESTION' },
  { type: 'TRANSPORT_DISRUPTION', labelKey: 'type_TRANSPORT_DISRUPTION' },
  { type: 'REMOTE_AREA_ACCESS_ISSUE', labelKey: 'type_REMOTE_AREA_ACCESS_ISSUE' },
  { type: 'OTHER', labelKey: 'type_OTHER' },
];

const SEVERITIES: { sev: IncidentSeverity; titleKey: string; descKey: string; color: string }[] = [
  {
    sev: 'LOW',
    titleKey: 'sev_low',
    descKey: 'sev_low_desc',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
  },
  {
    sev: 'MEDIUM',
    titleKey: 'sev_medium',
    descKey: 'sev_medium_desc',
    color: 'border-amber-500 bg-amber-50 text-amber-900',
  },
  {
    sev: 'HIGH',
    titleKey: 'sev_high',
    descKey: 'sev_high_desc',
    color: 'border-orange-500 bg-orange-50 text-orange-900',
  },
  {
    sev: 'CRITICAL',
    titleKey: 'sev_critical',
    descKey: 'sev_critical_desc',
    color: 'border-red-600 bg-red-50 text-red-950 font-bold',
  },
];

export const ReportIncident: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();
  const { position, loading: gpsLoading, error: gpsError, captureGps, setManualCoords } = useGeolocation();

  // Form State
  const [selectedType, setSelectedType] = useState<IncidentType>('ROAD_BLOCKED');
  const [selectedSeverity, setSelectedSeverity] = useState<IncidentSeverity>('HIGH');
  const [description, setDescription] = useState<string>('');
  const [roadName, setRoadName] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [obstructionLength, setObstructionLength] = useState<string>('');
  const [vehicleAccess, setVehicleAccess] = useState<string>('NONE');

  // Photo State
  const [photo, setPhoto] = useState<CompressedImageResult | null>(null);
  const [compressing, setCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    status: 'OFFLINE_SAVED' | 'ONLINE_SUBMITTED' | 'ERROR';
    message: string;
    incidentId?: string;
  } | null>(null);

  // Capture GPS on mount
  useEffect(() => {
    captureGps();
  }, [captureGps]);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      const result = await compressImage(file, 1600, 0.8);
      setPhoto(result);
    } catch (err: any) {
      alert(err.message || 'Error processing photo');
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!position) {
      alert('Location is required. Please capture GPS location before submitting.');
      return;
    }

    setIsSubmitting(true);
    const clientGeneratedId = generateUUID();
    const reportedAt = new Date().toISOString();
    const activeUserId = localStorage.getItem('demo_user_id') || 'usr_officer_01';

    const payload: IncidentCreatePayload = {
      client_generated_id: clientGeneratedId,
      type: selectedType,
      severity: selectedSeverity,
      latitude: position.latitude,
      longitude: position.longitude,
      location_accuracy: position.accuracy,
      district_id: localStorage.getItem('demo_user_district') || 'Kamrup Metropolitan',
      road_id: roadName.trim() || undefined,
      description: description.trim() || undefined,
      nearby_landmark: landmark.trim() || undefined,
      estimated_obstruction_length: obstructionLength.trim() || undefined,
      vehicle_accessibility: vehicleAccess,
      reported_at: reportedAt,
      photo_data: photo
        ? {
            filename: photo.filename,
            mime_type: photo.mimeType,
            base64_data: photo.base64Data,
            captured_at: reportedAt,
          }
        : undefined,
      is_demo: !position.isRealDeviceGps,
    };

    // Immediately ingest into Government Command Center Incident Service & Broadcast Mesh
    try {
      incidentService.ingestFieldReport(payload, true);
      const existing = JSON.parse(localStorage.getItem('ner_synced_field_reports') || '[]');
      localStorage.setItem('ner_synced_field_reports', JSON.stringify([payload, ...existing.slice(0, 50)]));
    } catch (e) {
      console.warn('Command center sync notice:', e);
    }

    try {
      // Check offline status
      if (!isOnline) {
        // 1. Durably save locally in IndexedDB as QUEUED
        await saveLocalIncident({
          id: clientGeneratedId,
          client_generated_id: clientGeneratedId,
          reported_by: activeUserId,
          type: selectedType,
          severity: selectedSeverity,
          latitude: position.latitude,
          longitude: position.longitude,
          location_accuracy: position.accuracy,
          district_id: payload.district_id,
          road_id: payload.road_id,
          description: payload.description,
          nearby_landmark: payload.nearby_landmark,
          estimated_obstruction_length: payload.estimated_obstruction_length,
          vehicle_accessibility: payload.vehicle_accessibility,
          status: 'QUEUED',
          source: payload.is_demo ? 'DEMO_SIMULATION' : 'FIELD_REPORT',
          reported_at: reportedAt,
          is_demo: !!payload.is_demo,
          created_at: reportedAt,
          updated_at: reportedAt,
        });

        // 2. Queue for future network sync
        await enqueueSyncReport(payload);

        setSubmitFeedback({
          status: 'OFFLINE_SAVED',
          message: t('msg_saved_offline'),
          incidentId: clientGeneratedId,
        });
      } else {
        // Online: directly send to API
        const created = await api.createIncident(payload);

        // Also cache locally with SUBMITTED status
        await saveLocalIncident(created);

        setSubmitFeedback({
          status: 'ONLINE_SUBMITTED',
          message: t('msg_report_submitted'),
          incidentId: created.id,
        });
      }
    } catch (err: any) {
      console.error('Submission failed, falling back to local queue:', err);
      // Even if network crashed during post, guarantee local offline persistence
      await saveLocalIncident({
        id: clientGeneratedId,
        client_generated_id: clientGeneratedId,
        reported_by: activeUserId,
        type: selectedType,
        severity: selectedSeverity,
        latitude: position.latitude,
        longitude: position.longitude,
        location_accuracy: position.accuracy,
        district_id: payload.district_id,
        road_id: payload.road_id,
        description: payload.description,
        status: 'QUEUED',
        source: 'FIELD_REPORT',
        reported_at: reportedAt,
        is_demo: false,
        created_at: reportedAt,
        updated_at: reportedAt,
      });
      await enqueueSyncReport(payload);

      setSubmitFeedback({
        status: 'OFFLINE_SAVED',
        message: t('msg_saved_offline'),
        incidentId: clientGeneratedId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submission Complete View
  if (submitFeedback) {
    const isQueued = submitFeedback.status === 'OFFLINE_SAVED';
    return (
      <div className="space-y-4 pb-20 pt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
              isQueued ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            {isQueued ? (
              <RotateCcw className="w-8 h-8 animate-spin-slow" />
            ) : (
              <CheckCircle2 className="w-8 h-8" />
            )}
          </div>

          <div>
            <span
              className={`text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full ${
                isQueued
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              {isQueued ? t('status_QUEUED') : t('status_SUBMITTED')}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {isQueued ? 'Report Queued Offline' : 'Report Successfully Submitted'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
              {submitFeedback.message}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-left text-xs font-mono space-y-1 text-slate-600 border border-slate-200">
            <div>Type: {selectedType}</div>
            <div>Severity: {selectedSeverity}</div>
            {position && (
              <div>Coords: {formatCoordinates(position.latitude, position.longitude)}</div>
            )}
            <div>Reference: {submitFeedback.incidentId}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => navigate('/field')}
              className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
            >
              Back to Operations
            </button>
            <button
              onClick={() => {
                setSubmitFeedback(null);
                setDescription('');
                setPhoto(null);
                captureGps();
              }}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow"
            >
              File Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-24">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">{t('report_title')}</h2>
          <p className="text-xs text-slate-500">
            Geo-tagged obstruction report for NER logistics corridor
          </p>
        </div>
      </div>

      {/* ================= STEP 1: LOCATION ================= */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-blue-600" />
            {t('step_location')}
          </span>
          {position?.isRealDeviceGps && (
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
              REAL DEVICE GPS
            </span>
          )}
        </div>

        {/* GPS Capture Button */}
        <button
          type="button"
          onClick={captureGps}
          disabled={gpsLoading}
          className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center space-x-2 touch-target transition-all"
        >
          <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span>{gpsLoading ? t('loc_retrying') : t('loc_btn_capture')}</span>
        </button>

        {/* Permission Denied / Error Handler */}
        {gpsError && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 space-y-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>GPS Error:</strong> {gpsError.message || t('loc_permission_denied')}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={captureGps}
                className="bg-rose-600 text-white px-2.5 py-1 rounded text-xs font-semibold"
              >
                {t('loc_retry_btn')}
              </button>
              {/* Honest demo coordinate option */}
              <button
                type="button"
                onClick={() => setManualCoords(26.1158, 91.9782, 8.0)}
                className="bg-slate-700 text-white px-2.5 py-1 rounded text-xs font-semibold"
              >
                Use Sonapur NH-27 Demo Pin
              </button>
            </div>
          </div>
        )}

        {/* Display Coordinates */}
        {position && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-sans">
                  {t('loc_lat')}
                </span>
                <span className="font-bold">{position.latitude.toFixed(5)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-sans">
                  {t('loc_lng')}
                </span>
                <span className="font-bold">{position.longitude.toFixed(5)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-sans">
                  {t('loc_accuracy')}
                </span>
                <span className="font-bold">±{position.accuracy.toFixed(1)} meters</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-sans">
                  {t('loc_time')}
                </span>
                <span className="text-[11px] truncate block">
                  {new Date(position.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Map Preview */}
            <FieldLocationMap
              latitude={position.latitude}
              longitude={position.longitude}
              accuracy={position.accuracy}
              incidentType={selectedType}
              severity={selectedSeverity}
              roadName={roadName}
              height="160px"
              interactive={false}
            />
          </div>
        )}
      </div>

      {/* ================= STEP 2: INCIDENT DETAILS ================= */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          {t('step_details')}
        </span>

        {/* Incident Type Grid */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">Incident Classification</label>
          <div className="grid grid-cols-2 gap-1.5">
            {INCIDENT_TYPES.map((it) => (
              <button
                key={it.type}
                type="button"
                onClick={() => setSelectedType(it.type)}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  selectedType === it.type
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t(it.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Options */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-700 block">{t('sev_label')}</label>
          <div className="grid grid-cols-2 gap-2">
            {SEVERITIES.map((s) => (
              <div
                key={s.sev}
                onClick={() => setSelectedSeverity(s.sev)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  selectedSeverity === s.sev
                    ? `${s.color} ring-2 ring-slate-800/10 shadow-sm`
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{t(s.titleKey)}</span>
                  {selectedSeverity === s.sev && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                  {t(s.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 pt-2">
          <label className="text-xs font-semibold text-slate-700 block">
            {t('desc_label')} <span className="text-slate-400 font-normal">(Brief)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('desc_placeholder')}
            rows={3}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Optional Corridor & Landmark Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
              {t('road_label')}
            </label>
            <input
              type="text"
              value={roadName}
              onChange={(e) => setRoadName(e.target.value)}
              placeholder={t('road_placeholder')}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
              {t('landmark_label')}
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder={t('landmark_placeholder')}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Obstruction Length & Vehicle Access */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
              {t('obstruction_length_label')}
            </label>
            <input
              type="text"
              value={obstructionLength}
              onChange={(e) => setObstructionLength(e.target.value)}
              placeholder={t('obstruction_placeholder')}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
              {t('accessibility_label')}
            </label>
            <select
              value={vehicleAccess}
              onChange={(e) => setVehicleAccess(e.target.value)}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white focus:outline-none"
            >
              <option value="NONE">{t('acc_none')}</option>
              <option value="4X4_ONLY">{t('acc_4x4_only')}</option>
              <option value="LIGHT_ONLY">{t('acc_light_only')}</option>
              <option value="ALL_SLOW">{t('acc_all')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= STEP 3: PHOTO ATTACHMENT ================= */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-emerald-600" />
          {t('step_photo')}
        </span>

        {/* Hidden inputs for camera capture and upload */}
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelect}
          className="hidden"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoSelect}
          className="hidden"
        />

        {photo ? (
          <div className="space-y-2">
            <div className="relative rounded-xl overflow-hidden border border-slate-200">
              <img
                src={photo.base64Data}
                alt="Field preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>{photo.filename}</span>
              <span>{(photo.fileSize / 1024).toFixed(0)} KB (Compressed)</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={compressing}
              className="py-3 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex flex-col items-center justify-center space-y-1 touch-target transition-all"
            >
              <Camera className="w-5 h-5 text-blue-600" />
              <span>{t('photo_btn_camera')}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={compressing}
              className="py-3 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex flex-col items-center justify-center space-y-1 touch-target transition-all"
            >
              <Upload className="w-5 h-5 text-emerald-600" />
              <span>{t('photo_btn_upload')}</span>
            </button>
          </div>
        )}

        {compressing && (
          <p className="text-xs text-blue-600 text-center animate-pulse">
            {t('photo_compressing')}
          </p>
        )}
      </div>

      {/* ================= SUBMIT ACTION ================= */}
      <button
        type="submit"
        disabled={isSubmitting || !position}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-extrabold py-4 px-4 rounded-2xl shadow-lg flex items-center justify-center space-x-2 touch-target text-sm transition-all"
      >
        <span>{isSubmitting ? t('submitting_report') : t('btn_submit_report')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Offline Guarantee Notice */}
      <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
        <Info className="w-3.5 h-3.5 text-slate-400" />
        <span>Reports persist locally in IndexedDB if offline and auto-sync when online.</span>
      </p>
    </form>
  );
};
