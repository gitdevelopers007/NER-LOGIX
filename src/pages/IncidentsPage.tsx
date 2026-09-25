import { GovernmentSidebar } from '../components/GovernmentSidebar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, MapPin, AlertTriangle, ChevronDown, 
  Search, RefreshCw, CheckCircle2, XCircle, Clock, 
  Camera, Sparkles, ExternalLink, Shield, Users,
  Wifi, Zap
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { IncidentMiniMap } from '../components/IncidentMiniMap';
import { incidentService } from '../services/incidentService';
import type { Incident, IncidentSeverity } from '../services/incidentService';

export const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState<Incident[]>(incidentService.getIncidents());
  const [selectedIncident, setSelectedIncident] = useState<Incident>(
    incidents[0] || incidentService.getIncidents()[0]
  );
  const [stats, setStats] = useState(incidentService.getStats());

  // Search & Filters
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const refreshData = () => {
    const list = incidentService.getIncidents();
    setIncidents(list);
    setStats(incidentService.getStats());
    if (selectedIncident) {
      const updated = incidentService.getIncidentById(selectedIncident.id);
      if (updated) setSelectedIncident(updated);
    }
  };

  const handleVerify = (id: string) => {
    const verified = incidentService.verifyIncident(id);
    if (verified) {
      setSelectedIncident({ ...verified });
      refreshData();
      setToastMessage(`Incident ${id} verified! Road marked as BLOCKED. Route Intelligence and Alert Engine notified.`);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleReject = (id: string) => {
    const rejected = incidentService.rejectIncident(id, 'Deemed non-critical / clearing crews already on site');
    if (rejected) {
      setSelectedIncident({ ...rejected });
      refreshData();
      setToastMessage(`Incident ${id} marked as REJECTED.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (stateFilter !== 'ALL' && inc.state !== stateFilter) return false;
    if (typeFilter !== 'ALL' && inc.type !== typeFilter) return false;
    if (severityFilter !== 'ALL' && inc.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && inc.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.road.toLowerCase().includes(q) ||
        inc.district.toLowerCase().includes(q) ||
        inc.state.toLowerCase().includes(q) ||
        inc.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  

  const getSeverityBadge = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300 font-bold';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
      case 'MODERATE':
        return 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
      case 'LOW':
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER (DARK NAVY - ESTABLISHED PAST DESIGN) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
            <span className="font-bold text-lg tracking-wider text-white">NER-LOGIX</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics &amp; Accessibility Intelligence Platform
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 hidden lg:inline">
            Incidents &amp; Field Reports
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Online</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 font-semibold text-xs border border-white/20">
              <User className="w-4 h-4 text-slate-700" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[11.5px] font-bold text-white leading-tight">Admin Officer</span>
              <span className="text-[9.5px] text-slate-400 leading-tight">Government User</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER: SIDEBAR + MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (LIGHT THEME - ESTABLISHED PAST DESIGN) */}
        <GovernmentSidebar />

        {/* MAIN VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
          {/* TOAST NOTIFICATION */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
                ✕
              </button>
            </div>
          )}

          {/* 1. HEADER ROW */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>INCIDENTS &amp; FIELD REPORTS</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor, verify and manage field-reported incidents across all 8 North Eastern states
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Last updated: <strong className="text-slate-700">14:32</strong></span>
              </div>

              <button
                onClick={refreshData}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 font-medium shadow-2xs cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh ↻</span>
              </button>
            </div>
          </div>

          {/* 2. SEARCH & FILTERS BAR */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by incident ID, road, district, state, reporter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs">
                {/* State */}
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All States</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Sikkim">Sikkim</option>
                </select>

                {/* Incident Type */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Types</option>
                  <option value="LANDSLIDE">Landslide</option>
                  <option value="ROAD_DAMAGE">Road Damage</option>
                  <option value="HEAVY_RAINFALL">Heavy Rainfall</option>
                  <option value="FLASH_FLOOD">Flash Flood</option>
                  <option value="BRIDGE_DAMAGE">Bridge Damage</option>
                </select>

                {/* Severity */}
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Severities</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MODERATE">Moderate</option>
                  <option value="LOW">Low</option>
                </select>

                {/* Status */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending Verification</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. FOUR SUMMARY CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                Active Incidents
              </span>
              <div className="text-2xl font-black text-slate-900">{stats.activeIncidents}</div>
              <div className="text-[10px] text-slate-500">Across Northeast corridors</div>
            </div>

            <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wider">
                Pending Verification
              </span>
              <div className="text-2xl font-black text-amber-900">{stats.pendingVerification}</div>
              <div className="text-[10px] text-amber-700">Awaiting officer sign-off</div>
            </div>

            <div className="bg-emerald-50/50 rounded-xl border border-emerald-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">
                Verified Today
              </span>
              <div className="text-2xl font-black text-emerald-900">{stats.verifiedToday}</div>
              <div className="text-[10px] text-emerald-700">Authoritative platform records</div>
            </div>

            <div className="bg-red-50/50 rounded-xl border border-red-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-red-800 uppercase tracking-wider">
                Critical
              </span>
              <div className="text-2xl font-black text-red-900">{stats.critical}</div>
              <div className="text-[10px] text-red-700">Full corridor closures</div>
            </div>
          </div>

          {/* 4. MAIN TWO-COLUMN WORKLOAD DESIGN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN: INCIDENT LIST (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Incident Feed ({filteredIncidents.length})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Live Ground Telemetry</span>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[720px]">
                {filteredIncidents.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No matching incidents found with current filters.
                  </div>
                ) : (
                  filteredIncidents.map((inc) => {
                    const isSelected = selectedIncident.id === inc.id;
                    const isPending = inc.status === 'PENDING';
                    const isVerified = inc.status === 'VERIFIED';

                    return (
                      <div
                        key={inc.id}
                        onClick={() => setSelectedIncident(inc)}
                        className={`p-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-l-4 border-blue-600 shadow-2xs'
                            : 'hover:bg-slate-50 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                inc.severity === 'CRITICAL'
                                  ? 'bg-red-600 animate-pulse'
                                  : inc.severity === 'HIGH'
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            <span className="font-bold text-xs text-slate-900 uppercase tracking-tight">
                              {inc.type.replace('_', ' ')}
                            </span>
                          </div>

                          <span
                            className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold ${
                              isPending
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : isVerified
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {inc.status}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
                          {inc.title}
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>{inc.state} • {inc.district}</span>
                          <span className="font-mono text-[10px] text-slate-400">{inc.timeAgo}</span>
                        </div>

                        <div className="text-[10px] text-blue-700 font-mono mt-1 font-semibold flex items-center justify-between">
                          <span>{inc.road}</span>
                          <span className={`px-1.5 py-0.2 rounded ${getSeverityBadge(inc.severity)}`}>
                            {inc.severity}
                          </span>
                        </div>

                        {inc.corroborationCount && inc.corroborationCount > 1 && (
                          <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-slate-100/80 text-[9.5px]">
                            <span className="bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded border border-purple-200 flex items-center gap-1">
                              <Shield className="w-2.5 h-2.5 text-purple-700" />
                              <span>{inc.corroborationCount} Corroborated</span>
                            </span>
                            <span className="text-slate-400 font-mono">
                              ({inc.confidenceScore}% Conf.)
                            </span>
                            {inc.duplicateReportsMerged && (
                              <span className="bg-slate-100 text-slate-600 font-medium px-1 py-0.2 rounded ml-auto">
                                +{inc.duplicateReportsMerged} Merged
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: SELECTED INCIDENT DETAILS (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* PRIMARY DETAILS CARD */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                        {selectedIncident.type.replace('_', ' ')}
                      </h2>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded border ${getSeverityBadge(selectedIncident.severity)}`}>
                        ● {selectedIncident.severity}
                      </span>
                      <span
                        className={`text-[10.5px] px-2 py-0.5 rounded font-bold ${
                          selectedIncident.status === 'VERIFIED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : selectedIncident.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {selectedIncident.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Incident ID: <strong className="text-slate-700">{selectedIncident.id}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Current Road Status
                    </span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mt-0.5">
                      {selectedIncident.currentRoadStatus}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {selectedIncident.description}
                </div>

                {/* AI MULTI-SOURCE CORROBORATION & DEDUPLICATION CLUSTER */}
                {selectedIncident.corroborationCount && selectedIncident.corroborationCount > 1 && (
                  <div className="bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50/40 border border-purple-200 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-purple-900 uppercase tracking-wide flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-700" />
                          Multi-Source Corroboration Cluster ({selectedIncident.corroborationCount} Units)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                          AI Verification Confidence: {selectedIncident.confidenceScore}%
                        </span>
                        {selectedIncident.duplicateReportsMerged && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            +{selectedIncident.duplicateReportsMerged} Redundant Reports Merged
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Automated geo-temporal clustering identified <strong>{selectedIncident.corroborationCount} corroborating reports</strong> within a 2-hour window on this 10-km highway sector. Redundant submissions were merged to prevent duplicate dispatch of clearing personnel.
                    </p>

                    {/* Clustered Ground Unit Reports */}
                    {selectedIncident.corroboratingReports && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Corroborating Ground Units:
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {selectedIncident.corroboratingReports.map((rep) => (
                            <div key={rep.id} className="bg-white/90 p-2.5 rounded-lg border border-purple-100/80 flex items-start justify-between text-xs gap-3">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-800 text-[11px]">{rep.reportedBy}</span>
                                  <span className="text-[9px] font-mono font-semibold bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded border border-purple-200">
                                    {rep.sourceType}
                                  </span>
                                </div>
                                <div className="text-[10.5px] text-slate-600 italic">
                                  "{rep.notes}"
                                </div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">{rep.timeAgo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">State / Region</span>
                    <strong className="text-slate-800">{selectedIncident.state}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">District</span>
                    <strong className="text-slate-800">{selectedIncident.district}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Road / Corridor</span>
                    <strong className="text-slate-800 font-mono">{selectedIncident.road}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Coordinates</span>
                    <strong className="text-slate-800 font-mono text-[11px]">
                      {selectedIncident.latitude.toFixed(4)}° N, {selectedIncident.longitude.toFixed(4)}° E
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Reported By</span>
                    <strong className="text-slate-800 text-[11px]">{selectedIncident.reportedBy}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Report Timestamp</span>
                    <strong className="text-slate-800 font-mono text-[11px]">{selectedIncident.reportedTime}</strong>
                  </div>
                </div>

                {/* FIELD PHOTOGRAPH EVIDENCE BOX */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Camera className="w-3.5 h-3.5 text-blue-600" />
                      <span>FIELD EVIDENCE PHOTOGRAPH</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        GPS VERIFIED
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-semibold flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-blue-600" />
                        2G CORRIDOR LINK
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-44 rounded-lg overflow-hidden border border-slate-300 shadow-inner bg-slate-900 relative group">
                    <img
                      src={selectedIncident.photoUrl}
                      alt="Field evidence"
                      className="w-full h-full object-cover"
                    />
                    {/* Top overlay badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>2G COMPRESSED PACKET</span>
                    </div>

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/85 backdrop-blur-md text-blue-100 font-mono text-[10px] border border-blue-400/40">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>{selectedIncident.photoMetadata.bandwidthSaved || '98.9%'} Bandwidth Saved</span>
                    </div>
                  </div>

                  {/* LOW-BANDWIDTH PIPELINE TELEMETRY METRIC STRIP */}
                  <div className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg border border-slate-200 text-center font-mono">
                    <div className="p-1 rounded bg-slate-50 border border-slate-100">
                      <span className="text-[9px] text-slate-400 block uppercase">Raw Camera</span>
                      <span className="text-[11px] font-bold text-slate-600 line-through">
                        {selectedIncident.photoMetadata.originalSize || '3.50 MB'}
                      </span>
                    </div>
                    <div className="p-1 rounded bg-emerald-50 border border-emerald-200">
                      <span className="text-[9px] text-emerald-600 block uppercase font-bold">2G Transfer Size</span>
                      <span className="text-[11px] font-extrabold text-emerald-700">
                        {selectedIncident.photoMetadata.compressedSize || '38.4 KB'}
                      </span>
                    </div>
                    <div className="p-1 rounded bg-blue-50 border border-blue-200">
                      <span className="text-[9px] text-blue-600 block uppercase font-bold">Saved</span>
                      <span className="text-[11px] font-extrabold text-blue-700">
                        {selectedIncident.photoMetadata.bandwidthSaved || '98.9%'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {selectedIncident.photoMetadata.transferSpeedEstimate || '~12 KB/min 2G Mountain Link'}
                    </span>
                    <span>Source: {selectedIncident.photoMetadata.source}</span>
                  </div>
                </div>

                {/* GEOGRAPHIC POSITION & MAP */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span>GEOGRAPHIC POSITION (NH-13 CORRIDOR)</span>
                    </div>
                    <button
                      onClick={() => navigate('/live-map')}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <span>[ VIEW ON LIVE MAP ]</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <IncidentMiniMap
                    latitude={selectedIncident.latitude}
                    longitude={selectedIncident.longitude}
                    title={selectedIncident.title}
                    road={selectedIncident.road}
                    severity={selectedIncident.severity}
                    className="h-44 w-full rounded-xl overflow-hidden border border-slate-200"
                  />
                </div>

                {/* AUTHORITATIVE VERIFICATION CONTROLS */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {selectedIncident.status === 'PENDING' ? (
                    <>
                      <div className="text-xs text-slate-500">
                        Awaiting Government Review. Unverified reports do not restrict corridors.
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReject(selectedIncident.id)}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 cursor-pointer transition-colors"
                        >
                          ✕ Reject Report
                        </button>
                        <button
                          onClick={() => handleVerify(selectedIncident.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>✓ VERIFY INCIDENT</span>
                        </button>
                      </div>
                    </>
                  ) : selectedIncident.status === 'VERIFIED' ? (
                    <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>VERIFIED AUTHORITATIVE PLATFORM DATA</span>
                      </div>
                      <span className="text-[11px] text-emerald-700">Road Status: BLOCKED</span>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between bg-slate-100 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-700 font-semibold">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-slate-500" />
                        <span>Report Discarded by Government Officer</span>
                      </div>
                      <span className="text-[11px] text-slate-500">No road restrictions active</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TWO BOTTOM PANELS: TIMELINE & SECONDARY AI ASSESSMENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* VERIFICATION TIMELINE / AUDIT TRAIL */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Incident Audit Timeline</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    {selectedIncident.timeline.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10.5px] text-blue-700 font-bold">{step.time}</span>
                            <span className="font-bold text-slate-800">{step.title}</span>
                          </div>
                          <div className="text-[10.5px] text-slate-500 leading-tight">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECONDARY AI ASSESSMENT CARD (NOT DOMINATING) */}
                <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>AI Incident Advisory (Secondary)</span>
                    </div>
                    <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono uppercase">
                      Advisory Only
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Possible Hazard:</span>
                      <strong className="text-slate-800">{selectedIncident.aiAssessment.possibleIncident}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Severity:</span>
                      <strong className="text-amber-700">{selectedIncident.aiAssessment.estimatedSeverity}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Impact:</span>
                      <span className="text-slate-700 text-right">{selectedIncident.aiAssessment.potentialImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Affected Corridor:</span>
                      <strong className="text-blue-700 font-mono">{selectedIncident.aiAssessment.affectedCorridor}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Suggested Action:</span>
                      <span className="text-slate-700 text-right">{selectedIncident.aiAssessment.suggestedAction}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[9.5px] text-slate-400 italic">
                      AI is advisory. Government officer remains the sole authority.
                    </span>
                    <button
                      onClick={() => setAiModalOpen(true)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      [ VIEW AI ANALYSIS ]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI ANALYSIS MODAL */}
          {aiModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Automated Incident Evaluation</h3>
                      <p className="text-[11px] text-slate-500">NER Geospatial Risk Engine v2.4</p>
                    </div>
                  </div>
                  <button onClick={() => setAiModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                  <p>
                    <strong>Sensor Correlation:</strong> The reported blockage on {selectedIncident.road} correlates with an IMD precipitation telemetry spike (+88mm/hr) recorded at regional radar stations over the past 3 hours.
                  </p>
                  <p>
                    <strong>Slope Vulnerability Index:</strong> NRSC Bhuvan terrain contours identify this sector as a Grade 4 high-susceptibility landslide slope.
                  </p>
                  <p>
                    <strong>Logistics Impact:</strong> 2 medical supply convoys scheduled on this corridor have been flagged for alternate route evaluation.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setAiModalOpen(false)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Close Analysis
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
