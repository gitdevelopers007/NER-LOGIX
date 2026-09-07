import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, User, Calendar, RefreshCw, MapPin, 
  AlertTriangle, Route, ShieldAlert, X, Home, 
  Truck, BarChart3, FileText, Database, Settings, CloudRain,
  ChevronDown, ArrowLeft, Eye, Clock, ShieldCheck, Thermometer,
  Waves, Mountain, Radio, Navigation, Share2
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { GisMap } from '../components/GisMap';
import { 
  INCIDENTS_DATA, DISTRICT_CONNECTIVITY, WEATHER_RISKS, 
  RECENT_UPDATES
} from '../data/nerGisData';
import type { Incident } from '../data/nerGisData';
import { nerApiService } from '../services/nerApiService';

export const GovernmentCommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('live-map');
  const [selectedIncident, setSelectedIncident] = useState<Incident>(INCIDENTS_DATA[0]);
  const [tableTab, setTableTab] = useState<'connectivity' | 'incidents' | 'vehicles'>('connectivity');

  // Filter States
  const [filterState, setFilterState] = useState('All States');
  const [filterDistrict, setFilterDistrict] = useState('All Districts');
  const [filterRoadStatus, setFilterRoadStatus] = useState('All Status');
  const [filterIncidentType, setFilterIncidentType] = useState('All Types');
  const [filterSeverity, setFilterSeverity] = useState('All Severities');

  // Action Modals
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  // Live Backend & Open-Meteo telemetry state
  const [weatherList, setWeatherList] = useState(WEATHER_RISKS);
  const [metrics, setMetrics] = useState({
    accessibleRoadsKm: 1248,
    accessiblePercentage: 82,
    restrictedRoadsKm: 186,
    restrictedPercentage: 12,
    blockedRoadsKm: 93,
    blockedPercentage: 6,
    affectedBridges: 14,
    activeIncidents: 28,
    lastSync: '2 min ago',
  });

  useEffect(() => {
    // Fetch live weather & hazard telemetry
    nerApiService.getHazardsAndWeather().then(data => {
      if (data?.weatherOverview) {
        setWeatherList(data.weatherOverview);
      }
    });

    // Fetch live KPI stats
    nerApiService.getMetrics().then(m => {
      if (m) setMetrics(m);
    });
  }, []);

  const handleApplyFilters = async () => {
    const list = await nerApiService.getIncidents({
      state: filterState,
      status: filterRoadStatus,
      severity: filterSeverity,
      type: filterIncidentType,
    });
    if (list && list.length > 0) {
      setSelectedIncident(list[0]);
    }
  };

  const handleClearFilters = async () => {
    setFilterState('All States');
    setFilterDistrict('All Districts');
    setFilterRoadStatus('All Status');
    setFilterIncidentType('All Types');
    setFilterSeverity('All Severities');
    const all = await nerApiService.getIncidents();
    if (all && all.length > 0) setSelectedIncident(all[0]);
  };

  const handleDispatchClearance = async () => {
    await nerApiService.resolveIncident(selectedIncident.id, 'OPEN');
    setSelectedIncident(prev => ({ ...prev, status: 'OPEN' }));
    const updated = await nerApiService.getMetrics();
    if (updated) setMetrics(updated);
    setDetailsModalOpen(false);
    alert(`Clearance crew mobilized for ${selectedIncident.road}. Status updated to OPEN in live database.`);
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSent(true);
    setTimeout(() => {
      setAlertModalOpen(false);
      setAlertSent(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-[#1e293b] antialiased font-sans select-none">
      
      {/* 1. TOP NAVBAR (Dark Navy #0b1a30) */}
      <header className="w-full bg-[#0b1a30] text-white border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
        
        {/* Left Branding */}
        <div className="flex items-center">
          <NerLogixLogo variant="white" className="cursor-pointer" />
          <div className="h-7 w-[1px] bg-slate-700/80 mx-4 hidden sm:block"></div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[12.5px] font-semibold text-slate-100 leading-tight">
              North Eastern Region Logistics &amp; Accessibility Intelligence
            </span>
            <span className="text-[10.5px] font-normal text-slate-400 leading-tight">
              Government Command Center
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3.5 text-xs font-medium">
          
          {/* Status Online indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="text-slate-200 font-semibold tracking-wide text-[11.5px]">System Online</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700"></div>

          {/* Bell Icon with badge */}
          <button 
            onClick={() => alert('3 Active Alerts: Heavy rainfall in Meghalaya, Landslide on NH-15, Bridge restriction in Sikkim.')}
            className="relative p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="3 Active Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700"></div>

          {/* Admin Officer Profile Card */}
          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 font-semibold text-xs border border-white/20">
              <User className="w-4 h-4 text-slate-700" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[11.5px] font-bold text-white leading-tight">
                Admin Officer
              </span>
              <span className="text-[9.5px] text-slate-400 leading-tight">
                Government User
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>

        </div>
      </header>

      {/* 2. BODY CONTAINER: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (White background) */}
        <aside className="w-56 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
          <div className="p-3 space-y-1">
            
            {/* Nav item 1: Overview */}
            <button
              onClick={() => navigate('/government-command-center')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Overview</span>
            </button>

            {/* Nav item 2: Live Map (ACTIVE in Screenshot) */}
            <button
              onClick={() => setActiveNav('live-map')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-left cursor-pointer ${activeNav === 'live-map' ? 'bg-[#1a56db] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>Live Map</span>
            </button>

            {/* Nav item 2b: Route Intelligence */}
            <button
              onClick={() => navigate('/route-intelligence')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Route Intelligence</span>
            </button>

            {/* Nav item 3: Incidents */}
            <button
              onClick={() => navigate('/incidents')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Incidents</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Nav item 4: Logistics */}
            <button
              onClick={() => navigate('/logistics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Truck className="w-4 h-4 text-slate-500" />
              <span>Logistics</span>
            </button>

            {/* Nav item 5: Alerts */}
            <button
              onClick={() => navigate('/alerts')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Alerts</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Nav item 6: Analytics */}
            <button
              onClick={() => setActiveNav('analytics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Analytics</span>
            </button>

            {/* Nav item 7: Reports */}
            <button
              onClick={() => setActiveNav('reports')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Reports</span>
            </button>

            {/* Nav item 8: Data Sources */}
            <button
              onClick={() => setActiveNav('data-sources')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Data Sources</span>
            </button>

            {/* Nav item 9: Administration */}
            <button
              onClick={() => setActiveNav('administration')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Administration</span>
            </button>

          </div>

          {/* Bottom Regional Branding Panel (Exact from Screenshot) */}
          <div className="p-3">
            <div className="bg-[#eaf3ff] border border-blue-100 rounded-xl p-3 flex items-center gap-2.5">
              <NerLogixLogo variant="blue" showText={false} className="shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#1e40af] leading-tight">
                  North Eastern Region
                </span>
                <span className="text-[10px] text-slate-600 leading-tight">
                  Stronger Connectivity
                </span>
                <span className="text-[9.5px] text-slate-500 leading-tight">
                  Safer Tomorrow
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          
          {/* A. PAGE HEADING ROW */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            
            {/* Title with Blue Folded Map Icon */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1a56db] shadow-2xs">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0f2547] tracking-tight leading-tight">
                  Live Accessibility Map
                </h1>
                <p className="text-[11.5px] text-slate-500 leading-tight mt-0.5">
                  Real-time monitoring of road, bridge and transport accessibility across districts and remote locations.
                </p>
              </div>
            </div>

            {/* Date and Sync Stamp */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Apr 26, 2025  14:32</span>
              </div>

              <button 
                onClick={async () => {
                  const m = await nerApiService.getMetrics();
                  if (m) setMetrics(m);
                  alert('Telemetry refreshed from IMD, BRO & Field units.');
                }}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 transition-colors cursor-pointer bg-white border border-slate-200 px-2 py-1 rounded-md shadow-2xs"
                title="Refresh Live Telemetry"
              >
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>Last updated: 2 min ago</span>
              </button>
            </div>

          </div>

          {/* B. TOP 5 METRIC CARDS (Exact proportions and values from screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* CARD 1: Accessible Roads */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Route className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500 truncate">Accessible Roads</div>
                <div className="text-lg font-bold text-slate-900 leading-tight">{metrics.accessibleRoadsKm.toLocaleString()} km</div>
                <div className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <span>↑ {metrics.accessiblePercentage}%</span>
                  <span className="text-slate-400 font-normal ml-1">of total</span>
                </div>
              </div>
            </div>

            {/* CARD 2: Restricted Roads */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500 truncate">Restricted Roads</div>
                <div className="text-lg font-bold text-slate-900 leading-tight">{metrics.restrictedRoadsKm} km</div>
                <div className="text-[10.5px] text-amber-600 font-semibold flex items-center gap-0.5">
                  <span>↑ {metrics.restrictedPercentage}%</span>
                  <span className="text-slate-400 font-normal ml-1">of total</span>
                </div>
              </div>
            </div>

            {/* CARD 3: Blocked Roads */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500 truncate">Blocked Roads</div>
                <div className="text-lg font-bold text-slate-900 leading-tight">{metrics.blockedRoadsKm} km</div>
                <div className="text-[10.5px] text-red-600 font-semibold flex items-center gap-0.5">
                  <span>↑ {metrics.blockedPercentage}%</span>
                  <span className="text-slate-400 font-normal ml-1">of total</span>
                </div>
              </div>
            </div>

            {/* CARD 4: Affected Bridges */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500 truncate">Affected Bridges</div>
                <div className="text-lg font-bold text-slate-900 leading-tight">{metrics.affectedBridges}</div>
                <div className="text-[10.5px] text-blue-600 font-semibold flex items-center gap-0.5">
                  <span>↑ 2%</span>
                  <span className="text-slate-400 font-normal ml-1">of total</span>
                </div>
              </div>
            </div>

            {/* CARD 5: Active Incidents */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500 truncate">Active Incidents</div>
                <div className="text-lg font-bold text-slate-900 leading-tight">{metrics.activeIncidents}</div>
                <div className="text-[10.5px] text-purple-600 font-semibold flex items-center gap-0.5">
                  <span>↑ 4%</span>
                  <span className="text-slate-400 font-normal ml-1">of total</span>
                </div>
              </div>
            </div>

          </div>

          {/* C. MIDDLE SECTION: GIS MAP (Left) + INCIDENT & FILTERS PANEL (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* GIS MAP CONTAINER (8 of 12 columns) */}
            <div className="lg:col-span-8">
              <GisMap 
                selectedIncident={selectedIncident}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
              />
            </div>

            {/* RIGHT SIDE PANEL: INCIDENT DETAILS + QUICK FILTERS (4 of 12 columns) */}
            <div className="lg:col-span-4 space-y-3">
              
              {/* 1. INCIDENT DETAILS CARD (Exact from Screenshot) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 space-y-3">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                    <span>Incident Details</span>
                  </div>
                  <button 
                    onClick={() => setSelectedIncident(INCIDENTS_DATA[0])}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Road Incident Red Banner */}
                <div className="flex items-center justify-between bg-red-50/70 border border-red-200/80 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-extrabold text-red-900 tracking-tight">
                      ROAD INCIDENT
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                    HIGH
                  </span>
                </div>

                {/* Details Grid & Image Thumbnail */}
                <div className="grid grid-cols-12 gap-2 text-xs">
                  
                  {/* Left Metadata (8 cols) */}
                  <div className="col-span-7 space-y-2 text-[11px]">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Location</span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs mt-0.5">
                        {selectedIncident.road}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <Route className="w-3 h-3 text-slate-400" />
                        <span>Road Status</span>
                      </div>
                      <div className="font-bold text-red-600 text-xs mt-0.5">
                        PARTIALLY BLOCKED
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <div>
                        <div className="text-[9.5px] text-slate-400 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                          <span>Reported</span>
                        </div>
                        <div className="font-semibold text-slate-700 text-[10.5px]">
                          {selectedIncident.reported}
                        </div>
                      </div>

                      <div>
                        <div className="text-[9.5px] text-slate-400 flex items-center gap-0.5">
                          <FileText className="w-2.5 h-2.5 text-slate-400" />
                          <span>Source</span>
                        </div>
                        <div className="font-semibold text-slate-700 text-[10.5px]">
                          {selectedIncident.source}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <div className="text-[9.5px] text-slate-400 flex items-center gap-0.5">
                          <CloudRain className="w-2.5 h-2.5 text-slate-400" />
                          <span>Weather</span>
                        </div>
                        <div className="font-semibold text-slate-700 text-[10.5px]">
                          Heavy Rain
                        </div>
                      </div>

                      <div>
                        <div className="text-[9.5px] text-slate-400 flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5 text-slate-400" />
                          <span>Risk Score</span>
                        </div>
                        <div className="font-bold text-red-600 text-[10.5px]">
                          78/100
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Image Thumbnail (5 cols) */}
                  <div className="col-span-5 flex items-center justify-center">
                    <img
                      src={selectedIncident.photoUrl}
                      alt="Incident Thumbnail"
                      className="w-full h-28 object-cover rounded-lg border border-slate-200 shadow-2xs"
                    />
                  </div>

                </div>

                {/* 3 Action Buttons (Exact from Screenshot) */}
                <div className="space-y-1.5 pt-1">
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* View Details button */}
                    <button
                      onClick={() => setDetailsModalOpen(true)}
                      className="py-1.5 px-2 bg-[#1a56db] hover:bg-blue-700 text-white rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    {/* Check Alternate Route button */}
                    <button
                      onClick={() => setRouteModalOpen(true)}
                      className="py-1.5 px-2 bg-white hover:bg-slate-50 text-[#1a56db] border border-blue-600 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Route className="w-3.5 h-3.5" />
                      <span>Check Alternate Route</span>
                    </button>
                  </div>

                  {/* Create Alert button */}
                  <button
                    onClick={() => setAlertModalOpen(true)}
                    className="w-full py-1.5 px-2 bg-white hover:bg-red-50 text-red-600 border border-red-400 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Create Alert</span>
                  </button>
                </div>

              </div>

              {/* 2. QUICK FILTERS CARD (Exact from Screenshot) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 space-y-2.5">
                
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>Quick Filters</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 mb-0.5">State</label>
                    <select
                      value={filterState}
                      onChange={(e) => setFilterState(e.target.value)}
                      className="w-full h-7.5 px-2 bg-white border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>All States</option>
                      <option>Arunachal Pradesh</option>
                      <option>Assam</option>
                      <option>Manipur</option>
                      <option>Meghalaya</option>
                      <option>Mizoram</option>
                      <option>Nagaland</option>
                      <option>Sikkim</option>
                      <option>Tripura</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 mb-0.5">District</label>
                    <select
                      value={filterDistrict}
                      onChange={(e) => setFilterDistrict(e.target.value)}
                      className="w-full h-7.5 px-2 bg-white border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>All Districts</option>
                      <option>Papum Pare</option>
                      <option>Kamrup</option>
                      <option>Kohima</option>
                      <option>East Khasi Hills</option>
                      <option>Mangan</option>
                      <option>Tamenglong</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Road Status</label>
                    <select
                      value={filterRoadStatus}
                      onChange={(e) => setFilterRoadStatus(e.target.value)}
                      className="w-full h-7.5 px-2 bg-white border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>All Status</option>
                      <option>Open</option>
                      <option>Restricted</option>
                      <option>Delayed</option>
                      <option>Blocked</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Incident Type</label>
                    <select
                      value={filterIncidentType}
                      onChange={(e) => setFilterIncidentType(e.target.value)}
                      className="w-full h-7.5 px-2 bg-white border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>All Types</option>
                      <option>Landslide</option>
                      <option>Road Damage</option>
                      <option>Bridge Damage</option>
                      <option>Heavy Rainfall</option>
                      <option>Flash Flood</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Severity</label>
                    <select
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="w-full h-7.5 px-2 bg-white border border-slate-200 rounded text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>All Severities</option>
                      <option>Critical</option>
                      <option>High Severity</option>
                      <option>Moderate</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleApplyFilters}
                    className="py-1.5 bg-[#1a56db] hover:bg-blue-700 text-white rounded text-[11.5px] font-semibold transition-colors cursor-pointer text-center"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-[11.5px] font-medium transition-colors cursor-pointer text-center"
                  >
                    Clear All
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* D. BOTTOM SECTION: DISTRICT CONNECTIVITY (Left) + WEATHER & RECENT UPDATES (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* LEFT: DISTRICT CONNECTIVITY TABLE (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              
              {/* Tab Header */}
              <div className="flex items-center justify-between px-4 pt-3 border-b border-slate-100">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setTableTab('connectivity')}
                    className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer relative ${
                      tableTab === 'connectivity'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    District Connectivity
                  </button>
                  <button
                    onClick={() => setTableTab('incidents')}
                    className={`pb-2.5 text-xs font-semibold transition-colors cursor-pointer relative ${
                      tableTab === 'incidents'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Recent Incidents
                  </button>
                  <button
                    onClick={() => setTableTab('vehicles')}
                    className={`pb-2.5 text-xs font-semibold transition-colors cursor-pointer relative ${
                      tableTab === 'vehicles'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Vehicle Movement
                  </button>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                {tableTab === 'connectivity' && (
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50/80 text-[10.5px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-2.5 px-4">State / District</th>
                        <th className="py-2.5 px-4">Connectivity Status</th>
                        <th className="py-2.5 px-4">Key Issues</th>
                        <th className="py-2.5 px-4 text-right">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DISTRICT_CONNECTIVITY.map((row) => {
                        const isNormal = row.status === 'Normal';
                        const isWatch = row.status === 'Watch';
                        const isCritical = row.status === 'Critical';

                        const badgeColor = isNormal 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : isWatch 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : isCritical ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200';

                        const dotColor = isNormal ? 'bg-emerald-500' : isWatch ? 'bg-amber-500' : 'bg-red-500';

                        return (
                          <tr key={row.state} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-2.5 px-4 font-semibold text-slate-900 text-[11.5px]">
                              {row.state}
                            </td>
                            <td className="py-2.5 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColor}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-600 text-[11px]">
                              {row.issues}
                            </td>
                            <td className="py-2.5 px-4 text-right text-slate-400 text-[10.5px]">
                              {row.lastUpdated}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {tableTab === 'incidents' && (
                  <div className="p-4 divide-y divide-slate-100 space-y-2">
                    {INCIDENTS_DATA.map((inc) => (
                      <div key={inc.id} className="pt-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800">{inc.title}</span> — {inc.road} ({inc.state})
                          <div className="text-[11px] text-slate-500">{inc.description}</div>
                        </div>
                        <span className="font-semibold text-red-600">{inc.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {tableTab === 'vehicles' && (
                  <div className="p-4 space-y-2 text-xs">
                    <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-blue-900">CONVOY-NE-104 (14 Vehicles)</div>
                        <div className="text-[11px] text-slate-600">Guwahati Logistics Park → Kohima Supply Depot</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-semibold text-[10px]">In Transit</span>
                    </div>
                    <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-blue-900">CONVOY-NE-218 (8 Vehicles)</div>
                        <div className="text-[11px] text-slate-600">Silchar Railhead → Agartala Central Hub</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-semibold text-[10px]">In Transit</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT: WEATHER & RISK OVERVIEW + RECENT UPDATES (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              
              {/* 1. WEATHER & RISK OVERVIEW */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                    <span>Weather &amp; Risk Overview</span>
                  </div>
                  <button 
                    onClick={() => alert('Detailed Meteorology: IMD radar stations at Guwahati, Mohanbari, and Agartala active.')}
                    className="text-[10.5px] text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    View Details
                  </button>
                </div>

                {/* 4 Mini Cards in a 2x2 or 4-row grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {weatherList.slice(0, 4).map((w, idx) => {
                    const Icon = idx === 0 ? CloudRain : idx === 1 ? Mountain : idx === 2 ? Waves : Thermometer;
                    const iconBg = idx === 0 ? 'bg-blue-100 text-blue-700' : idx === 1 ? 'bg-amber-100 text-amber-700' : idx === 2 ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700';
                    const riskColor = idx === 0 ? 'text-amber-600' : idx === 1 ? 'text-red-600' : idx === 2 ? 'text-emerald-600' : 'text-slate-500';
                    return (
                      <div key={w.type} className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-2 flex items-center gap-2">
                        <div className={`w-7 h-7 rounded ${iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-800 leading-tight">{w.type}</div>
                          <div className="text-[10px] text-slate-500">{w.count}</div>
                          <div className={`text-[9.5px] font-semibold ${riskColor}`}>{w.riskLevel}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. RECENT UPDATES (FIELD REPORTS) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Recent Updates (Field Reports)</span>
                  </div>
                  <button 
                    onClick={() => alert('Opening all 18 historical ground logs...')}
                    className="text-[10.5px] text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {RECENT_UPDATES.map((rpt) => (
                    <div 
                      key={rpt.id}
                      onClick={() => alert(`Opening ground dossier for ${rpt.title}`)}
                      className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={rpt.thumbnail}
                        alt="Report"
                        className="w-10 h-10 rounded object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 text-[11px] truncate">
                          {rpt.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {rpt.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </main>
      </div>

      {/* 3. BOTTOM OPERATIONAL STATUS BAR (Exact from Screenshot) */}
      <footer className="w-full bg-[#0b1a30] text-slate-300 py-1.5 px-4 text-[11px] font-mono border-t border-slate-800/90 flex flex-wrap items-center justify-between select-none z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Last data update: 2 min ago</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Active Incidents: 24</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-red-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Road blocks: 7</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-amber-400">
            <Mountain className="w-3.5 h-3.5" />
            <span>High-risk zones: 11</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <div className="hidden lg:flex items-center gap-1.5 text-blue-400">
            <Truck className="w-3.5 h-3.5" />
            <span>Tracked vehicles: 36</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 hidden xl:block">
          NER-LOGIX Autonomous Geospatial Grid v2.4 • Ministry of DoNER
        </div>
      </footer>

      {/* MODAL: VIEW DETAILS */}
      {detailsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {selectedIncident.title} • {selectedIncident.id}
              </h3>
              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img 
              src={selectedIncident.photoUrl} 
              alt="Enlarged Incident" 
              className="w-full h-44 object-cover rounded-lg border border-slate-200 shadow-xs"
            />

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div><strong>Highway:</strong> {selectedIncident.road}</div>
              <div><strong>State:</strong> {selectedIncident.state}</div>
              <div><strong>District:</strong> {selectedIncident.district}</div>
              <div><strong>Reported:</strong> {selectedIncident.reported}</div>
              <div><strong>Status:</strong> <span className="text-red-600 font-bold">{selectedIncident.status}</span></div>
              <div><strong>Severity:</strong> <span className="text-red-600 font-bold">{selectedIncident.severity}</span></div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedIncident.description}
            </p>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleDispatchClearance}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Dispatch Clearance Team (Mark OPEN)
              </button>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHECK ALTERNATE ROUTE */}
      {routeModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Route className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Alternate Route Calculation
                </h3>
              </div>
              <button 
                onClick={() => setRouteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                <strong>Blocked Corridor:</strong> {selectedIncident.road} ({selectedIncident.state})
              </p>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-1">
                <div className="font-bold text-blue-900 text-xs">Recommended Detour Corridor:</div>
                <div className="text-slate-700">Via NH-27 East Bypass → State Highway 12</div>
                <div className="text-[11px] text-slate-500 mt-1">Est. delay: +42 minutes • Distance: +28 km • Heavy Vehicle Safe: Yes</div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Detour instructions transmitted to highway patrol for ${selectedIncident.road}.`);
                setRouteModalOpen(false);
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Broadcast Detour to Transporters
            </button>
          </div>
        </div>
      )}

      {/* MODAL: CREATE ALERT */}
      {alertModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Broadcast Public Safety Alert
                </h3>
              </div>
              <button 
                onClick={() => setAlertModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {alertSent ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900 text-sm">High Priority Alert Broadcasted!</div>
                <div className="text-xs text-slate-500">Transmitted to National Disaster Management &amp; State Emergency Portals.</div>
              </div>
            ) : (
              <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target Corridor</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedIncident.road} (${selectedIncident.state})`}
                    className="w-full h-8 px-2.5 bg-slate-100 border border-slate-200 rounded text-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Alert Headline</label>
                  <input
                    type="text"
                    defaultValue={`CRITICAL ROAD HAZARD: ${selectedIncident.road} Blocked`}
                    className="w-full h-8 px-2.5 bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Broadcast Channels</label>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                      <span>Transporter Mobile SMS &amp; GPS Advisory</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                      <span>State Disaster Response &amp; BRO Gateways</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg cursor-pointer"
                  >
                    Transmit Emergency Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
