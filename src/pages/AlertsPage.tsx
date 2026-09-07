import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, MapPin, AlertTriangle, Route, Home, 
  Truck, BarChart3, Database, Settings, ChevronDown, 
  Search, CheckCircle2, Share2, Volume2, Eye
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { EmergencySituationMap } from '../components/EmergencySituationMap';
import { alertService } from '../services/alertService';
import type { AlertItem, AlertSeverity } from '../services/alertService';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<AlertItem[]>(alertService.getAlerts());
  const [selectedAlert, setSelectedAlert] = useState<AlertItem>(
    alerts[0] || alertService.getAlerts()[0]
  );
  const [stats, setStats] = useState(alertService.getStats());

  // Filters & Search
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'ACTIVE'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshData = () => {
    setAlerts(alertService.getAlerts());
    setStats(alertService.getStats());
  };

  const handleSelectAlert = (id: string) => {
    const found = alertService.getAlertById(id);
    if (found) setSelectedAlert(found);
  };

  const handleAcknowledge = (id: string) => {
    const updated = alertService.acknowledgeAlert(id);
    if (updated) {
      setSelectedAlert({ ...updated });
      refreshData();
      setToastMessage(`Alert ${id} has been acknowledged and marked as under response.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleDispatchAction = (id: string) => {
    const updated = alertService.dispatchEmergencyAction(id);
    if (updated) {
      setSelectedAlert({ ...updated });
      refreshData();
      setToastMessage(`Emergency action dispatched for ${id}. Field teams and SDRF notified.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredAlerts = alerts.filter((alt) => {
    if (activeTab === 'CRITICAL' && alt.severity !== 'CRITICAL') return false;
    if (activeTab === 'HIGH' && alt.severity !== 'HIGH') return false;
    if (activeTab === 'ACTIVE' && alt.status !== 'ACTIVE') return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        alt.id.toLowerCase().includes(q) ||
        alt.title.toLowerCase().includes(q) ||
        alt.road.toLowerCase().includes(q) ||
        alt.district.toLowerCase().includes(q) ||
        alt.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityPill = (sev: AlertSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'LOW':
        return 'bg-slate-100 text-slate-700 border-slate-200';
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
            Alerts &amp; Emergency Response
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Alert Engine Operational</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 font-semibold text-xs border border-white/20">
              <User className="w-4 h-4 text-slate-700" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[11.5px] font-bold text-white leading-tight">Admin Officer</span>
              <span className="text-[9.5px] text-slate-400 leading-tight">Government Command Center</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER: SIDEBAR + MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (LIGHT THEME - ESTABLISHED PAST DESIGN) */}
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>

            <button
              onClick={() => navigate('/government-command-center')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => navigate('/live-map')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Live Accessibility Map</span>
            </button>

            <button
              onClick={() => navigate('/route-intelligence')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Route Intelligence</span>
            </button>

            <button
              onClick={() => navigate('/logistics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Truck className="w-4 h-4 text-slate-500" />
              <span>Logistics &amp; Vehicles</span>
            </button>

            <button
              onClick={() => navigate('/incidents')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Incidents &amp; Field Reports</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                8
              </span>
            </button>

            {/* ALERTS -> ACTIVE BLUE */}
            <button
              onClick={() => navigate('/alerts')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a56db] text-white shadow-xs text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-white" />
                <span>Alerts &amp; Emergency Response</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-white text-[#1a56db] text-[10px] font-bold flex items-center justify-center">
                6
              </span>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Analytics &amp; Planning</span>
            </button>

            <button
              onClick={() => navigate('/data-integration')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Database className="w-4 h-4 text-slate-500" />
              <span>Data &amp; Integration</span>
            </button>

            <button
              onClick={() => navigate('/live-map')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Administration</span>
            </button>
          </div>

          {/* Regional Branding Card */}
          <div className="mt-auto p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-center space-y-1">
            <div className="flex justify-center">
              <NerLogixLogo variant="blue" />
            </div>
            <div className="text-[11px] font-bold text-blue-950">North Eastern Region</div>
            <div className="text-[10px] text-blue-700/80 leading-tight">
              Stronger Connectivity<br />Safer Tomorrow
            </div>
          </div>
        </aside>

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

          {/* 1. PAGE HEADER */}
          <div className="space-y-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-red-600" />
                <span>Alerts &amp; Emergency Response</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor critical situations and coordinate response actions across the region.
              </p>
            </div>

            {/* FILTER TABS & SEARCH BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['ALL', 'CRITICAL', 'HIGH', 'ACTIVE'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {tab === 'ALL' ? 'ALL ALERTS' : tab}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 font-medium shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* 2. TOP STATUS CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-red-50/50 rounded-xl border border-red-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-red-800 uppercase tracking-wider">
                Critical
              </span>
              <div className="text-2xl font-black text-red-900">{String(stats.critical).padStart(2, '0')}</div>
              <div className="text-[10px] text-red-700">Immediate action</div>
            </div>

            <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wider">
                High Priority
              </span>
              <div className="text-2xl font-black text-amber-900">{String(stats.highPriority).padStart(2, '0')}</div>
              <div className="text-[10px] text-amber-700">Action needed</div>
            </div>

            <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-blue-800 uppercase tracking-wider">
                Active
              </span>
              <div className="text-2xl font-black text-blue-900">{String(stats.active).padStart(2, '0')}</div>
              <div className="text-[10px] text-blue-700">Under response</div>
            </div>

            <div className="bg-emerald-50/50 rounded-xl border border-emerald-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">
                Acknowledged
              </span>
              <div className="text-2xl font-black text-emerald-900">{String(stats.acknowledged).padStart(2, '0')}</div>
              <div className="text-[10px] text-emerald-700">Being handled</div>
            </div>
          </div>

          {/* 3. MAIN AREA: EMERGENCY SITUATION MAP + PRIORITY ALERT QUEUE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: EMERGENCY SITUATION MAP (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                    Emergency Situation Map
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Northeast India Operations Grid
                </div>
              </div>

              <EmergencySituationMap
                alerts={filteredAlerts}
                selectedAlertId={selectedAlert.id}
                onSelectAlert={handleSelectAlert}
                className="h-[420px] w-full rounded-xl overflow-hidden border border-slate-200"
              />
            </div>

            {/* RIGHT: PRIORITY ALERT QUEUE (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Priority Alert Queue
                  </span>
                </div>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded font-mono">
                  {filteredAlerts.length} Active
                </span>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[420px]">
                {filteredAlerts.map((alt) => {
                  const isSelected = selectedAlert.id === alt.id;
                  const isCritical = alt.severity === 'CRITICAL';

                  return (
                    <div
                      key={alt.id}
                      onClick={() => setSelectedAlert(alt)}
                      className={`p-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/70 border-l-4 border-blue-600 shadow-2xs'
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCritical ? 'bg-red-600 animate-pulse' : 'bg-amber-500'
                            }`}
                          />
                          <span className="font-bold text-xs text-slate-900 tracking-tight">
                            {alt.severity} ALERT
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{alt.reportedAgo}</span>
                      </div>

                      <div className="font-bold text-xs text-slate-800 mb-0.5">{alt.title}</div>
                      <div className="text-[11px] text-slate-500 mb-1.5">
                        {alt.state} • {alt.district}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono font-medium">
                        <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          {alt.roadCondition}
                        </span>
                        <span className="text-slate-400">{alt.road}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. SELECTED ALERT PANEL */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded font-bold border ${getSeverityPill(selectedAlert.severity)}`}>
                    ● {selectedAlert.severity} ALERT
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {selectedAlert.title}
                  </h2>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  Location: <strong className="text-slate-800">{selectedAlert.state}</strong> • District: <strong className="text-slate-800">{selectedAlert.district}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAcknowledge(selectedAlert.id)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 cursor-pointer transition-colors"
                >
                  ✓ Acknowledge Alert
                </button>
                <button
                  onClick={() => handleDispatchAction(selectedAlert.id)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dispatch Response</span>
                </button>
              </div>
            </div>

            {/* Status, Road Condition, Affected Area Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-[10.5px] text-slate-400 block uppercase font-medium">Status</span>
                <span className="font-bold text-slate-800 inline-flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>{selectedAlert.status}</span>
                </span>
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block uppercase font-medium">Road Condition</span>
                <span className="font-bold text-red-600 font-mono mt-0.5 block">
                  {selectedAlert.roadCondition}
                </span>
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block uppercase font-medium">Affected Area</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedAlert.affectedArea}</span>
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block uppercase font-medium">Report Source &amp; Time</span>
                <span className="font-medium text-slate-700 mt-0.5 block">
                  {selectedAlert.source} ({selectedAlert.reportedAgo})
                </span>
              </div>
            </div>

            {/* 3 Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => navigate('/incidents')}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>[ VIEW INCIDENT ]</span>
              </button>

              <button
                onClick={() => navigate('/live-map')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span>[ VIEW ON MAP ]</span>
              </button>

              <button
                onClick={() => navigate('/route-intelligence')}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Route className="w-3.5 h-3.5" />
                <span>[ ANALYZE ROUTE ]</span>
              </button>
            </div>

            {/* Recommended Response Checklist */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Recommended Response Actions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedAlert.recommendedResponse.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50/80 p-2 rounded-lg border border-slate-200/80">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. EMERGENCY RESPONSE STATUS PIPELINE */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
              Emergency Response Pipeline Status
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10.5px] font-bold text-emerald-800 uppercase block">Alert Generated</span>
                <span className="text-emerald-700 font-bold text-base">✓</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10.5px] font-bold text-emerald-800 uppercase block">Field Team</span>
                <span className="text-emerald-700 font-bold text-base">✓</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10.5px] font-bold text-emerald-800 uppercase block">Route Analysis</span>
                <span className="text-emerald-700 font-bold text-base">✓</span>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10.5px] font-bold text-blue-800 uppercase block">Response Status</span>
                <span className="text-blue-700 font-bold text-xs px-2 py-0.5 bg-white rounded border border-blue-300 inline-block">
                  IN PROGRESS
                </span>
              </div>
            </div>
          </div>

          {/* 6. ALERT SOURCES */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
              Multi-Agency Alert Telemetry Feeds
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                'FIELD REPORTS',
                'WEATHER',
                'RISK ENGINE',
                'ROAD STATUS',
                'VEHICLE SYSTEM',
                'GIS DATA',
                'GOVERNMENT FEEDS'
              ].map((src) => (
                <span
                  key={src}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold font-mono rounded-lg border border-slate-200 text-[10.5px]"
                >
                  [ {src} ]
                </span>
              ))}
            </div>
          </div>

          {/* 7. BOTTOM STATUS BAR */}
          <footer className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <div>Last Updated: <strong className="text-slate-800">20:41 IST</strong></div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Data Sources: Connected</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Alert Engine: Operational</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>GIS Services: Operational</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Weather Feed: Connected</span>
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
