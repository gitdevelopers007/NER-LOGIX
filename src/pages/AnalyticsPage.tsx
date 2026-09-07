import { GovernmentSidebar } from '../components/GovernmentSidebar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, AlertTriangle, BarChart3, ChevronDown, 
  Search, Download, TrendingUp, TrendingDown, Minus,
  FileText, CheckCircle2, Layers, RefreshCw, X, ArrowUpRight
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { ConnectivityTrendChart } from '../components/ConnectivityTrendChart';
import { analyticsService } from '../services/analyticsService';
import type { 
  TimeRange, 
  AnalyticsReportTemplate
} from '../services/analyticsService';

export const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  // Filters & State
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [districtSearch, setDistrictSearch] = useState<string>('');
  
  // Interactive Report Modal & Toast
  const [selectedReport, setSelectedReport] = useState<AnalyticsReportTemplate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Data fetching from analyticsService
  const indicators = analyticsService.getKeyIndicators(timeRange);
  const trendData = analyticsService.getTrendData(timeRange);
  const districtList = analyticsService.getDistrictConnectivity(selectedState, districtSearch);
  const commodities = analyticsService.getDeliveryCommodities();
  const bottlenecks = analyticsService.getSupplyBottlenecks();
  const incidentDist = analyticsService.getIncidentTypes();
  const regionalRisk = analyticsService.getRegionalRisk();
  const reportTemplates = analyticsService.getReportTemplates();

  const stateOptions = [
    { value: 'ALL', label: 'All States (8 Regional)' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Sikkim', label: 'Sikkim' },
  ];

  const handleExportClick = (report?: AnalyticsReportTemplate) => {
    setIsExporting(true);
    const target = report || reportTemplates[0];
    setTimeout(() => {
      setIsExporting(false);
      setSelectedReport(null);
      setToastMessage(`Official Dossier "${target.title}" successfully exported (${target.format})`);
      setTimeout(() => setToastMessage(null), 4500);
    }, 1200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            OPEN
          </span>
        );
      case 'RESTRICT':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            RESTRICT
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
            BLOCKED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
      case 'HIGH':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'LOW':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTrendIcon = (symbol: string) => {
    switch (symbol) {
      case '↑':
        return <TrendingUp className="w-3.5 h-3.5 text-red-600 inline mr-1" />;
      case '↓':
        return <TrendingDown className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />;
      case '→':
      default:
        return <Minus className="w-3.5 h-3.5 text-slate-500 inline mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER (DARK NAVY - ESTABLISHED GOVERNMENT DESIGN) */}
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
            Analytics &amp; Planning
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Analytics Engine Operational</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button 
            onClick={() => navigate('/alerts')}
            className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer"
            title="View Active Alerts"
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

          {/* PAGE HEADER & CONTROLS */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Analytics &amp; Planning
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Regional connectivity, logistics performance and infrastructure intelligence.
              </p>
            </div>

            {/* TIME RANGE & FILTERS TOOLBAR */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Time Range Tabs */}
              <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                {(['24H', '7D', '30D'] as TimeRange[]).map((tr) => (
                  <button
                    key={tr}
                    onClick={() => setTimeRange(tr)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      timeRange === tr
                        ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tr === '24H' ? 'LAST 24 HOURS ▼' : tr === '7D' ? 'LAST 7 DAYS ▼' : 'LAST 30 DAYS ▼'}
                  </button>
                ))}
              </div>

              {/* State Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('');
                  }}
                  className="appearance-none bg-white border border-slate-200 text-xs font-medium text-slate-700 py-1.5 pl-2.5 pr-7 rounded-lg shadow-xs hover:border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  {stateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.value === 'ALL' ? 'STATE ▼' : opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
              </div>

              {/* District Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setDistrictSearch(e.target.value);
                  }}
                  className="appearance-none bg-white border border-slate-200 text-xs font-medium text-slate-700 py-1.5 pl-2.5 pr-7 rounded-lg shadow-xs hover:border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="">DISTRICT ▼</option>
                  {districtList.map((d) => (
                    <option key={d.id} value={d.district}>
                      {d.district} ({d.state})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
              </div>

              {/* Export Report Action Button */}
              <button
                onClick={() => setSelectedReport(reportTemplates[0])}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 bg-[#1a56db] hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* 4. KEY INDICATORS (4 CARDS) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. CONNECTIVITY */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CONNECTIVITY
                </span>
                <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {indicators.connectivityDelta}
                </span>
              </div>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {indicators.connectivity}%
                </div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                  Regional
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${indicators.connectivity}%` }}
                />
              </div>
            </div>

            {/* 2. ROUTE DELAYS */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  ROUTE DELAYS
                </span>
                <span className="text-[10.5px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                  {indicators.delayHoursAvg}
                </span>
              </div>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {indicators.routeDelays}%
                </div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                  Avg. delay
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, indicators.routeDelays * 3)}%` }}
                />
              </div>
            </div>

            {/* 3. DELIVERIES */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  DELIVERIES
                </span>
                <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {indicators.deliveriesCount}
                </span>
              </div>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {indicators.deliveries}%
                </div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                  On-time
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${indicators.deliveries}%` }}
                />
              </div>
            </div>

            {/* 4. INCIDENTS */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  INCIDENTS
                </span>
                <span className="text-[10.5px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                  {indicators.incidentsActive} Active
                </span>
              </div>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {indicators.incidents}
                </div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">
                  Reported
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: '65%' }}
                />
              </div>
            </div>
          </div>

          {/* 5. REGIONAL CONNECTIVITY TREND (SVG CHART) */}
          <section className="space-y-1">
            <ConnectivityTrendChart data={trendData} currentAverage={indicators.connectivity} />
          </section>

          {/* 6. DISTRICT CONNECTIVITY TABLE */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  DISTRICT CONNECTIVITY
                </h3>
                <p className="text-[11px] text-slate-500">
                  Real-time transport corridor status and primary vulnerability bottlenecks by district
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search district..."
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-2.5 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-400 w-44"
                  />
                  {districtSearch && (
                    <button
                      onClick={() => setDistrictSearch('')}
                      className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {districtList.length} districts listed
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">STATE / DISTRICT</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">ACCESS %</th>
                    <th className="py-2.5 px-4">PRIMARY ISSUE</th>
                    <th className="py-2.5 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districtList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-slate-800">
                        <span className="text-slate-500 font-normal">{item.state} / </span>
                        <span className="font-semibold text-slate-900">{item.district}</span>
                      </td>
                      <td className="py-2.5 px-4">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.accessPct >= 90
                                  ? 'bg-emerald-500'
                                  : item.accessPct >= 70
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${item.accessPct}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-slate-800 text-xs">
                            {item.accessPct}%
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {item.primaryIssue === '—' ? (
                          <span className="text-slate-400 font-mono">—</span>
                        ) : (
                          <span className="font-medium text-slate-700">{item.primaryIssue}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => navigate('/live-map')}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                        >
                          View Map →
                        </button>
                      </td>
                    </tr>
                  ))}
                  {districtList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400 text-xs">
                        No districts match current filter parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. LOGISTICS PERFORMANCE (2 COLUMNS) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* COLUMN 1: DELIVERY PERFORMANCE */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    DELIVERY PERFORMANCE
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Overall 91% Fulfillment
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-4">
                  On-time delivery success rates across key strategic supply categories
                </p>

                <div className="space-y-3.5">
                  {commodities.map((c) => (
                    <div key={c.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{c.name}</span>
                        <span className="font-bold font-mono text-slate-900">{c.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${c.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Telemetry linked to active vehicle GPS units
                </span>
                <button
                  onClick={() => navigate('/logistics')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>[ View Logistics Analysis ]</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* COLUMN 2: SUPPLY BOTTLENECKS */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    SUPPLY BOTTLENECKS
                  </h3>
                  <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    Top 3 Critical Corridors
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-4">
                  Primary geographical and meteorological chokepoints throttling freight flow
                </p>

                <div className="space-y-3">
                  {bottlenecks.map((b) => (
                    <div
                      key={b.rank}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                            {b.rank}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {b.region}
                          </span>
                        </div>
                        <span className="text-[10.5px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          Impact {b.impactScore}/100
                        </span>
                      </div>
                      <div className="mt-1 pl-7 text-[11.5px] text-slate-700">
                        <span className="font-semibold text-slate-800">{b.factor}</span> — {b.affectedCorridor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Calculated via Live Traffic &amp; Road Blockage Telemetry</span>
                <button
                  onClick={() => navigate('/route-intelligence')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Bypass Options →
                </button>
              </div>
            </div>
          </section>

          {/* 8. INCIDENT & RISK ANALYSIS (3 COLUMNS) */}
          <section className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="mb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                INCIDENT &amp; RISK ANALYSIS
              </h3>
              <p className="text-[11px] text-slate-500">
                Distribution of field disruptions and state-level vulnerability trend trajectories
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1">
              {/* SUB-COLUMN 1: INCIDENT TYPES */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                  INCIDENT TYPES
                </div>
                <div className="space-y-2.5">
                  {incidentDist.map((inc) => (
                    <div key={inc.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{inc.name}</span>
                        <span className="font-mono font-bold text-slate-900">{inc.count} ({inc.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            inc.severityGrade === 'CRITICAL'
                              ? 'bg-red-500'
                              : inc.severityGrade === 'HIGH'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${inc.percentage * 2.2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUB-COLUMN 2: RISK LEVEL BY REGION */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                  RISK LEVEL BY REGION
                </div>
                <div className="space-y-2">
                  {regionalRisk.map((r) => (
                    <div
                      key={r.region}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-50"
                    >
                      <span className="font-medium text-slate-800">{r.region}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRiskBadge(r.riskLevel)}`}>
                        {r.riskLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUB-COLUMN 3: TREND */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                  TREND
                </div>
                <div className="space-y-2">
                  {regionalRisk.map((r) => (
                    <div
                      key={r.region}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-50"
                    >
                      <span className="text-slate-500 text-[11px]">{r.region}</span>
                      <div className="flex items-center text-xs font-semibold">
                        {getTrendIcon(r.trendSymbol)}
                        <span
                          className={`${
                            r.trend === 'INCREASING'
                              ? 'text-red-700'
                              : r.trend === 'IMPROVING'
                              ? 'text-emerald-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {r.trendText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 9. PLANNING INSIGHTS (AI / DECISION SUPPORT CARD) */}
          <section className="bg-slate-50 rounded-lg border border-blue-200/80 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  AI / ANALYTICS DECISION SUPPORT
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 italic">
                Advisory decision assistance for logistics planners
              </span>
            </div>

            <div className="my-3 p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-amber-900">
                ⚠ 3 corridors show increasing disruption risk
              </span>
            </div>

            <ul className="space-y-2 mb-4 text-xs text-slate-700 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Arunachal</strong> — NH-13 requires alternate-route planning
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Meghalaya</strong> — rainfall may affect deliveries in the next period
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Assam</strong> — congestion is increasing around key logistics corridors
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/80">
              <button
                onClick={() => navigate('/route-intelligence')}
                className="bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                [ VIEW ROUTE ANALYSIS ]
              </button>
              <button
                onClick={() => navigate('/live-map')}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                [ VIEW RISK MAP ]
              </button>
              <button
                onClick={() => setSelectedReport(reportTemplates[0])}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                [ CREATE REPORT ]
              </button>
            </div>
          </section>

          {/* 10. REPORTS SECTION */}
          <section className="space-y-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                REPORTS
              </h3>
              <p className="text-[11px] text-slate-500">
                Generate standardized multi-agency briefs for NEC, MHA, and State Disaster Authorities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {reportTemplates.map((rep) => (
                <button
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-[9.5px] font-mono text-slate-400 font-semibold">{rep.format.split(' ')[0]}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      [ {rep.title} ]
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {rep.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{rep.size}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      Generate →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 11. FOOTER STATUS BAR */}
          <footer className="mt-auto pt-4 pb-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-4">
              <span className="font-mono text-slate-600">
                Data Updated: <strong>20:41 IST</strong>
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Analytics Engine: <strong>Operational</strong></span>
              </div>
              <span className="text-slate-300 hidden md:inline">|</span>
              <div className="hidden md:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>GIS Services: <strong>Connected</strong></span>
              </div>
              <span className="text-slate-300 hidden md:inline">|</span>
              <div className="hidden md:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Weather Data: <strong>Connected</strong></span>
              </div>
            </div>

            <div className="text-[10.5px] text-slate-400 font-mono">
              NER-LOGIX Operations v2.4 • Node ID: NEC-ANL-09
            </div>
          </footer>
        </main>
      </div>

      {/* MODAL: REPORT PREVIEW & EXPORT DIALOG */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold">{selectedReport.title}</h3>
                  <p className="text-[10.5px] text-slate-300">{selectedReport.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed">
                {selectedReport.description}
              </p>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Report Reference:</span>
                  <span className="font-bold text-slate-800">{selectedReport.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Export Scope:</span>
                  <span className="text-slate-800">8 North Eastern States (NEC Jurisdiction)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Timeframe:</span>
                  <span className="text-slate-800">
                    {timeRange === '24H' ? 'Last 24 Hours' : timeRange === '7D' ? 'Last 7 Days (Consolidated)' : 'Last 30 Days (Monthly Baseline)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Telemetry Feeds:</span>
                  <span className="text-emerald-700 font-bold">IMD Radar + ISRO Bhuvan + BRO Reports</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated File Size:</span>
                  <span className="text-slate-800">{selectedReport.size}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes digital signature verification for official departmental use.</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExportClick(selectedReport)}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 bg-[#1a56db] hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating Dossier...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report ({selectedReport.format.split(' ')[0]})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
