import { GovernmentSidebar } from '../components/GovernmentSidebar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, Database, ChevronDown, 
  Search, Plus, CheckCircle2, X, Shield, Check
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { DataFlowDiagram } from '../components/DataFlowDiagram';
import { dataIntegrationService } from '../services/dataIntegrationService';
import type { DataSourceItem } from '../services/dataIntegrationService';

export const DataIntegrationPage: React.FC = () => {
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<'SOURCES' | 'SERVICES' | 'HEALTH' | 'SYNC'>('SOURCES');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data Sources & Services
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(dataIntegrationService.getDataSources());
  const apiServices = dataIntegrationService.getApiServices();
  const dataQuality = dataIntegrationService.getDataQuality();
  const stats = dataIntegrationService.getDataStats();

  // Modals & Feedback
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [governanceModal, setGovernanceModal] = useState<string | null>(null);

  // New Data Source Form
  const [newSource, setNewSource] = useState({
    source: '',
    type: 'GIS' as 'GIS' | 'API' | 'Platform' | 'GPS' | 'Government DB',
    endpoint: '',
    refreshFrequency: 'Every 15m',
    recordsCount: '1,000 records'
  });

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource.source || !newSource.endpoint) return;

    const created = dataIntegrationService.addDataSource(newSource);
    setDataSources([...dataIntegrationService.getDataSources()]);
    setShowAddModal(false);
    setNewSource({
      source: '',
      type: 'GIS',
      endpoint: '',
      refreshFrequency: 'Every 15m',
      recordsCount: '1,000 records'
    });
    setToastMessage(`Data Source "${created.source}" successfully integrated and connected.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredSources = dataSources.filter(s => 
    s.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER (DARK NAVY - ESTABLISHED GOVERNMENT DESIGN) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics &amp; Accessibility Intelligence Platform
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 hidden lg:inline">
            Data &amp; Integration
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Data Pipeline Operational</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button 
            onClick={() => navigate('/alerts')}
            className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer"
            title="View Alerts"
          >
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
        {/* LEFT SIDEBAR (LIGHT THEME - ESTABLISHED GOVERNMENT DESIGN) */}
        <GovernmentSidebar />

        {/* 3. MAIN WORKSPACE CONTAINER */}
        <main className="flex-1 overflow-y-auto flex flex-col p-4 md:p-6 space-y-6">
          
          {/* TOAST ALERT BANNER */}
          {toastMessage && (
            <div className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-lg shadow-md flex items-center justify-between animate-fadeIn transition-all">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200" />
                <span className="font-semibold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white ml-3 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Data &amp; Integration
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the datasets, APIs and live services powering NER-LOGIX.
              </p>
            </div>

            {/* TAB BUTTONS */}
            <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('SOURCES')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'SOURCES'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ Data Sources ]
              </button>
              <button
                onClick={() => setActiveTab('SERVICES')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'SERVICES'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ API Services ]
              </button>
              <button
                onClick={() => setActiveTab('HEALTH')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'HEALTH'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ Data Health ]
              </button>
              <button
                onClick={() => setActiveTab('SYNC')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'SYNC'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ Sync Status ]
              </button>
            </div>
          </div>

          {/* 4. SYSTEM DATA STATUS (4 CARDS) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. DATA SOURCES */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                DATA SOURCES
              </span>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {stats.dataSourcesCount}
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Connected
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-full" />
              </div>
            </div>

            {/* 2. LIVE SERVICES */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                LIVE SERVICES
              </span>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {stats.liveServicesCount}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                  Operational
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-full" />
              </div>
            </div>

            {/* 3. LAST SYNC */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                LAST SYNC
              </span>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {stats.lastSync}
                </div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                  Just now
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-full" />
              </div>
            </div>

            {/* 4. DATA HEALTH */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                DATA HEALTH
              </span>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {stats.dataHealthPct}%
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                  Healthy
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${stats.dataHealthPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* 5. DATA SOURCES TABLE */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  DATA SOURCES
                </h3>
                <p className="text-[11px] text-slate-500">
                  Authoritative multi-agency telemetry feeds integrated into the regional platform
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search source..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-2.5 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-400 w-44"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>[ + ADD DATA SOURCE ]</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">SOURCE</th>
                    <th className="py-2.5 px-4">TYPE</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">LAST UPDATED</th>
                    <th className="py-2.5 px-4 text-right">TELEMETRY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSources.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        {item.source}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          ● Connected
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 text-xs">
                        {item.lastUpdated}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-500 font-mono text-[11px]">
                        {item.recordsCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. LIVE API SERVICES TABLE */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  LIVE API SERVICES
                </h3>
                <p className="text-[11px] text-slate-500">
                  Internal core microservices orchestrating GIS routing, risk analysis, and alert processing
                </p>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                7 / 7 Online
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">SERVICE</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">RESPONSE</th>
                    <th className="py-2.5 px-4 text-right">UPTIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apiServices.map((api) => (
                    <tr key={api.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        {api.service}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          ● ONLINE
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-800">
                        {api.responseMs} ms
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-700 font-semibold">
                        {api.uptimePct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. DATA FLOW DIAGRAM */}
          <section className="space-y-1">
            <DataFlowDiagram />
          </section>

          {/* 8. DATA QUALITY SECTION */}
          <section className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  DATA QUALITY
                </h3>
                <p className="text-[11px] text-slate-500">
                  Coordinate integrity, schema compliance and real-time accuracy indexes
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 font-mono">
                Average Quality: 96.6%
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {dataQuality.map((dq) => (
                <div key={dq.category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-800">{dq.category}</span>
                    <span className="font-mono font-bold text-slate-900">{dq.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dq.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. SYNC & CONNECTIVITY (2 COLUMNS) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* COLUMN 1: REAL-TIME SYSTEMS */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  REAL-TIME SYSTEMS
                </h3>
                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Sub-second Latency
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Vehicle GPS</span>
                  <span className="text-slate-400 text-[11px] ml-auto">WebSocket 5s pulse</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Alerts</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Immediate event push</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Weather</span>
                  <span className="text-slate-400 text-[11px] ml-auto">IMD radar polling 10m</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Road status</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Dynamic GIS topology</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Route intelligence</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Live graph re-calculation</span>
                </li>
              </ul>
            </div>

            {/* COLUMN 2: REMOTE / LOW-NETWORK SYSTEMS */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  REMOTE / LOW-NETWORK SYSTEMS
                </h3>
                <span className="text-[10.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Offline Tolerant (IndexedDB)
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">Offline field reports</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Encrypted local storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">Queued incident uploads</span>
                  <span className="text-slate-400 text-[11px] ml-auto">FIFO transactional queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">Background synchronization</span>
                  <span className="text-slate-400 text-[11px] ml-auto">ServiceWorker active</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">Photo synchronization</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Compressed thumbnail chunking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">Retry on network recovery</span>
                  <span className="text-slate-400 text-[11px] ml-auto">Exponential backoff</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 10. DATA GOVERNANCE ACTIONS */}
          <section className="space-y-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                DATA GOVERNANCE &amp; CONTROLS
              </h3>
              <p className="text-[11px] text-slate-500">
                Security policies, access keys, synchronization logs and compliance audits
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { label: 'API ACCESS', desc: 'Manage bearer tokens and scopes' },
                { label: 'DATA PERMISSIONS', desc: 'RBAC field level ACLs' },
                { label: 'AUDIT LOG', desc: 'Data alteration trails' },
                { label: 'SYNC HISTORY', desc: 'Historical feed sync records' },
                { label: 'SOURCE CONFIGURATION', desc: 'Adjust endpoints & polling' },
                { label: 'SYSTEM HEALTH', desc: 'Hardware, disk & socket metrics' },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={() => setGovernanceModal(b.label)}
                  className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      [ {b.label} ]
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {b.desc}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-semibold text-blue-600">
                    Open →
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 11. FOOTER */}
          <footer className="mt-auto pt-4 pb-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-4">
              <span className="font-mono text-slate-600">
                Last System Sync: <strong>20:41 IST</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span>Connected Sources: <strong>18 / 18</strong></span>
              <span className="text-slate-300">|</span>
              <span>API Services: <strong>14 / 14</strong></span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Data Pipeline: <strong>Operational</strong></span>
              </div>
            </div>

            <div className="text-[10.5px] text-slate-400 font-mono">
              NER-LOGIX Data Lake v3.1 • Node ID: NIC-GHY-01
            </div>
          </footer>
        </main>
      </div>

      {/* MODAL: ADD DATA SOURCE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Add Government Data Source</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSource} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Source Name / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mizoram State Disaster Management Feed"
                  value={newSource.source}
                  onChange={(e) => setNewSource({ ...newSource, source: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                  >
                    <option value="GIS">GIS Layer</option>
                    <option value="API">REST API</option>
                    <option value="Government DB">Government DB</option>
                    <option value="GPS">GPS Telemetry</option>
                    <option value="Platform">Platform Stream</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Polling Frequency</label>
                  <select
                    value={newSource.refreshFrequency}
                    onChange={(e) => setNewSource({ ...newSource, refreshFrequency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                  >
                    <option value="Real-time WebSocket">Real-time WebSocket</option>
                    <option value="Every 5m">Every 5 min</option>
                    <option value="Every 15m">Every 15 min</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Secure Endpoint URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://api.disaster.gov.in/feed/v1"
                  value={newSource.endpoint}
                  onChange={(e) => setNewSource({ ...newSource, endpoint: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-mono"
                />
              </div>

              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg text-[11px] flex items-center gap-2 border border-blue-200">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Source will be validated via NIC SSL certificates and verified for GIS schema compliance.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Connect &amp; Validate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GOVERNANCE ITEM DETAILS */}
      {governanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">[ {governanceModal} ]</h3>
              </div>
              <button
                onClick={() => setGovernanceModal(null)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed text-slate-600">
                All data governance policies for <strong>{governanceModal}</strong> are strictly enforced per the Ministry of Electronics and Information Technology (MeitY) guidelines.
              </p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Access Scope:</span>
                  <span className="font-bold text-slate-800">State &amp; Central GIS Gateways</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Encryption:</span>
                  <span className="text-emerald-700 font-bold">TLS 1.3 / AES-256 GCM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Compliance Status:</span>
                  <span className="text-emerald-700 font-bold">100% Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Audit trail logged to central government ledger.</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setGovernanceModal(null)}
                className="px-4 py-1.5 rounded-lg bg-[#1a56db] text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                Acknowledge &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
