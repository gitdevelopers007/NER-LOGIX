import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, Calendar, RefreshCw, MapPin, 
  AlertTriangle, Route, ShieldAlert, Home, 
  Truck, BarChart3, FileText, Database, Settings, CloudRain,
  ChevronDown, ArrowRight, ShieldCheck, Activity, Layers, CheckCircle2, Mountain, Share2
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';

export const GovernmentOverview: React.FC = () => {
  const navigate = useNavigate();

  const stateSummaries = [
    { state: 'Assam', capital: 'Dispur', accessibility: '92%', status: 'Normal', issues: '2 road blocks, heavy rainfall', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { state: 'Arunachal Pradesh', capital: 'Itanagar', accessibility: '68%', status: 'Watch', issues: '5 road blocks, landslide risk (NH-15)', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { state: 'Manipur', capital: 'Imphal', accessibility: '62%', status: 'Critical', issues: '1 road block, heavy rainfall (NH-37)', color: 'text-red-700 bg-red-50 border-red-200' },
    { state: 'Meghalaya', capital: 'Shillong', accessibility: '88%', status: 'Normal', issues: 'Heavy rain alert in East Khasi Hills', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { state: 'Mizoram', capital: 'Aizawl', accessibility: '79%', status: 'Watch', issues: '1 road block, monsoon seepage', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { state: 'Nagaland', capital: 'Kohima', accessibility: '74%', status: 'Normal', issues: 'Subsidence watch on NH-29', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { state: 'Tripura', capital: 'Agartala', accessibility: '85%', status: 'Watch', issues: '2 delayed freight deliveries', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { state: 'Sikkim', capital: 'Gangtok', accessibility: '89%', status: 'Normal', issues: 'NH-10 single-lane commercial restriction', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-[#1e293b] antialiased font-sans select-none">
      
      {/* 1. TOP NAVBAR */}
      <header className="w-full bg-[#0b1a30] text-white border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
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

        <div className="flex items-center gap-3.5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="text-slate-200 font-semibold tracking-wide text-[11.5px]">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-700"></div>
          <button 
            onClick={() => alert('3 Active Alerts across NER.')}
            className="relative p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="3 Active Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <div className="h-4 w-[1px] bg-slate-700"></div>
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

      {/* 2. BODY CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-56 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
          <div className="p-3 space-y-1">
            
            {/* Overview -> ACTIVE */}
            <button
              onClick={() => navigate('/government-command-center')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a56db] text-white shadow-xs text-left cursor-pointer"
            >
              <Home className="w-4 h-4 text-white" />
              <span>Overview</span>
            </button>

            {/* Live Map -> Click goes to Page 5 */}
            <button
              onClick={() => navigate('/incidents')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Live Map</span>
            </button>

            {/* Route Intelligence -> Click goes to Page 6 */}
            <button
              onClick={() => navigate('/route-intelligence')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Route Intelligence</span>
            </button>

            <button
              onClick={() => navigate('/live-map')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Incidents</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
            </button>

            <button
              onClick={() => navigate('/logistics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Truck className="w-4 h-4 text-slate-500" />
              <span>Logistics</span>
            </button>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Alerts</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => alert('Regional SITREP Reports')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => alert('Data Sources')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Data Sources</span>
            </button>

            <button
              onClick={() => alert('Administration Settings')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Administration</span>
            </button>
          </div>

          <div className="p-3">
            <div className="bg-[#eaf3ff] border border-blue-100 rounded-xl p-3 flex items-center gap-2.5">
              <NerLogixLogo variant="blue" showText={false} className="shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#1e40af] leading-tight">North Eastern Region</span>
                <span className="text-[10px] text-slate-600 leading-tight">Stronger Connectivity</span>
                <span className="text-[9.5px] text-slate-500 leading-tight">Safer Tomorrow</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          
          {/* A. PAGE TITLE ROW */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1a56db] shadow-2xs">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0f2547] tracking-tight leading-tight">
                  Government Command Center — Executive Overview
                </h1>
                <p className="text-[12px] text-slate-500 leading-tight mt-0.5">
                  High-level operational intelligence, state connectivity indices, active freight corridors, and emergency readiness across all 8 North Eastern States.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-md shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Apr 26, 2025  14:32</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>Last updated: 2 min ago</span>
              </div>
            </div>
          </div>

          {/* B. TOP 4 MACRO STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Regional Accessibility Index</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">82%</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">
                1,248 km Passable <span className="text-slate-400 font-normal ml-1">• 93 km Blocked</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Active Freight &amp; Relief Convoys</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">28 Missions</div>
              <div className="text-xs text-blue-600 font-semibold mt-1">
                36 Tracked Vehicles <span className="text-slate-400 font-normal ml-1">in transit</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Infrastructure Watch</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Route className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">14 Bridges</div>
              <div className="text-xs text-amber-600 font-semibold mt-1">
                2 Axle Restrictions <span className="text-slate-400 font-normal ml-1">in Mangan &amp; Kohima</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Active Field Hazards</span>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">5 Incidents</div>
              <div className="text-xs text-red-600 font-semibold mt-1">
                2 Clearance Teams Dispatched <span className="text-slate-400 font-normal ml-1">(BRO &amp; PWD)</span>
              </div>
            </div>

          </div>

          {/* C. LAUNCH LIVE MAP SHOWCASE BANNER */}
          <div className="bg-gradient-to-r from-[#0b1a30] via-[#112340] to-[#1a365d] rounded-2xl p-6 text-white shadow-md flex items-center justify-between flex-wrap gap-4 border border-slate-800">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-blue-300" />
                <span>Page 5 Operational Intelligence</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Live Accessibility Map &amp; Weather Radar
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full-screen satellite GIS telemetry with live Doppler weather precipitation radar, interactive road blockage markers, route corridor bypass analytics, and district connectivity status.
              </p>
            </div>

            <button
              onClick={() => navigate('/live-map')}
              className="px-6 py-3 bg-[#1a56db] hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live GIS Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* D. 8 NORTH EASTERN STATES READINESS GRID */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">8 North Eastern States Connectivity Index</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time status breakdown across state capitals and transport lifelines</p>
              </div>
              <button 
                onClick={() => navigate('/live-map')}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View on Map →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stateSummaries.map((st) => (
                <div 
                  key={st.state}
                  onClick={() => navigate('/live-map')}
                  className="p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{st.state}</div>
                      <div className="text-[10.5px] text-slate-400">{st.capital}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${st.color}`}>
                      {st.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 text-[11px]">Passable Index:</span>
                    <span className="font-bold text-slate-800">{st.accessibility}</span>
                  </div>

                  <div className="text-[10.5px] text-slate-500 truncate pt-0.5 border-t border-slate-200/60">
                    {st.issues}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. EMERGENCY BULLETINS & PRIORITY CORRIDORS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Lifeline Corridors */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Arterial Freight Corridors</span>
                <span className="text-[10.5px] text-slate-400">IMD &amp; BRO Telemetry</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">NH-27 (Silchar Lifeline Corridor)</div>
                    <div className="text-[10.5px] text-slate-500">Guwahati → Nagaon → Silchar</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10.5px]">Open / Passable</span>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">NH-29 (Dimapur–Kohima Corridor)</div>
                    <div className="text-[10.5px] text-slate-500">Hillside seepage subsidence under surveillance</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10.5px]">Restricted</span>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">NH-15 (Arunachal Border Highway)</div>
                    <div className="text-[10.5px] text-slate-500">45m rockfall debris flow near Papum Pare</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold text-[10.5px]">Blocked (Landslide)</span>
                </div>
              </div>
            </div>

            {/* Weather Alert Feeds */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Active Weather &amp; Natural Threat Warnings</span>
                <span className="text-[10.5px] text-blue-600 font-semibold cursor-pointer" onClick={() => navigate('/live-map')}>View Radar →</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/60 flex items-start gap-2.5">
                  <CloudRain className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-blue-900">Heavy Rainfall Watch — Meghalaya &amp; Southern Assam</div>
                    <div className="text-[10.5px] text-slate-600">Precipitation rates up to 48mm/hr recorded. Waterlogging along low-lying culverts.</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/60 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-900">High Landslide Risk — Arunachal Pradesh &amp; Manipur</div>
                    <div className="text-[10.5px] text-slate-600">Saturated slope instability along cut slopes. BRO Quick Reaction Teams mobilized.</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">Seismic Telemetry — Zone V Stable</div>
                    <div className="text-[10.5px] text-slate-600">National Center for Seismology telemetry normal over past 24 hours.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* 3. BOTTOM OPERATIONAL STATUS BAR */}
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

    </div>
  );
};
