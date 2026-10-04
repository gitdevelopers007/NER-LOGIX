import { GovernmentSidebar } from '../../components/GovernmentSidebar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, AlertTriangle, Truck, 
  Flame, ArrowRight, Package, Clock, 
  Plane, RefreshCw, Filter, CheckCircle2, Download, Activity
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { stockService } from '../../services/stockService';
import type { EssentialStockItem } from '../../types/stock';

export const StockDepletionPage: React.FC = () => {
  const navigate = useNavigate();
  const [stockList, setStockList] = useState<EssentialStockItem[]>(stockService.getAllStock());
  const [summary, setSummary] = useState(stockService.getSummary());
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [escalationToast, setEscalationToast] = useState<string | null>(null);

  const refreshData = () => {
    setStockList(stockService.getAllStock());
    setSummary(stockService.getSummary());
  };

  const handleEscalateAirdrop = (id: string, itemTitle: string, location: string) => {
    stockService.escalateToAirdrop(id);
    refreshData();
    setEscalationToast(`IAF Heavy UAV / Air-Drop Requisition initiated for ${itemTitle} to ${location}. ETA revised to 6.0 hrs.`);
    setTimeout(() => setEscalationToast(null), 4000);
  };

  const handleRerouteConvoy = (id: string, itemTitle: string) => {
    stockService.rerouteConvoy(id);
    refreshData();
    setEscalationToast(`Green Corridor Priority activated for ${itemTitle}. Convoy transit speed expedited.`);
    setTimeout(() => setEscalationToast(null), 4000);
  };

  const filteredItems = stockList.filter(item => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (riskFilter !== 'ALL' && item.risk_level !== riskFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.item.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none">
      
      {/* 1. TOP NAVBAR (DARK NAVY #0b1a30) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics &amp; Accessibility Intelligence
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 hidden lg:inline flex items-center gap-1.5">
            <Activity className="w-3 h-3 animate-pulse" />
            Essential Goods &amp; Stock Depletion Engine
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/alerts')}
            className="relative p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {summary.totalCriticalShortages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {summary.totalCriticalShortages}
              </span>
            )}
          </button>

          <div className="h-4 w-[1px] bg-slate-700"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold border border-slate-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">Supply Officer</span>
              <span className="text-[10px] text-slate-400 leading-tight">Logistics Command</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <GovernmentSidebar />

        {/* MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-5 space-y-5">
          
          {/* TOAST NOTIFICATION */}
          {escalationToast && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-sm animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{escalationToast}</span>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                <span>Logistics &amp; Fleet Operations</span>
                <span>/</span>
                <span className="text-[#1a56db] font-semibold">Essential Goods Depletion Engine</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Critical Stock &amp; Supply Depletion Predictor</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Live Resupply Gap Analysis
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Monitors vital stock reserves (Oxygen, Cold Chain Vaccines, Food, Fuel) across high-altitude and isolated Northeast districts. Automatically correlates destination daily consumption with live inbound convoy ETA to prevent stockouts.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={refreshData}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Feeds</span>
              </button>
              
              <button 
                onClick={() => alert('Official Situation Report (SitRep) generated for Disaster Management Authority (SDMA).')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a56db] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export SDMA SitRep</span>
              </button>
            </div>
          </div>

          {/* NAVIGATION TABS */}
          <LogisticsNavigationTabs />

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            
            {/* Card 1: Critical Shortages */}
            <div className="bg-white rounded-xl border border-rose-200 p-4 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Critical Stockouts</span>
                <Flame className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700">{summary.totalCriticalShortages}</div>
              <div className="text-[10.5px] text-slate-500 mt-1 font-medium">
                Stock &lt; 24h of consumption remaining
              </div>
            </div>

            {/* Card 2: Resupply Delay Risk */}
            <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Resupply ETA Gaps</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700">{summary.failingResupplies}</div>
              <div className="text-[10.5px] text-slate-500 mt-1 font-medium">
                Shipment ETA &gt; Depletion deadline
              </div>
            </div>

            {/* Card 3: Monitored Hubs */}
            <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Monitored Hubs</span>
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{summary.totalLocationsTracked}</div>
              <div className="text-[10.5px] text-slate-500 mt-1 font-medium">
                All 8 Northeast State lifelines active
              </div>
            </div>

            {/* Card 4: Active Convoys */}
            <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Inbound Convoys</span>
                <Truck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700">{summary.pendingResupplies}</div>
              <div className="text-[10.5px] text-slate-500 mt-1 font-medium">
                Active shipments tracked via telemetry
              </div>
            </div>

          </div>

          {/* FILTER TOOLBAR */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Category Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Medicines &amp; Medical Supplies">Medicines &amp; Medical Supplies</option>
                  <option value="Food &amp; Provisions">Food &amp; Provisions</option>
                  <option value="Fuel &amp; Energy">Fuel &amp; Energy</option>
                  <option value="Disaster Relief Materials">Disaster Relief Materials</option>
                </select>
              </div>

              {/* Urgency Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-600">Urgency:</span>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                >
                  <option value="ALL">All Urgency Levels</option>
                  <option value="Critical">Critical (&lt;1 Day Left)</option>
                  <option value="Warning">Warning (1-3 Days Left)</option>
                  <option value="Adequate">Adequate (&gt;3 Days)</option>
                </select>
              </div>

            </div>

            {/* Search Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search location, item, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* ACTIVE SHORTAGE ALERT CARDS */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Regional Stock Depletion &amp; Convoy Match Manifest ({filteredItems.length})
              </h2>
              <span className="text-[11px] text-slate-500">
                Formula: Days Remaining = Quantity ÷ Daily Consumption
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {filteredItems.map((stock) => {
                const isCritical = stock.risk_level === 'Critical';
                const isWarning = stock.risk_level === 'Warning';
                const willFail = stock.will_arrive_in_time === false;

                return (
                  <div 
                    key={stock.id}
                    className={`bg-white rounded-xl border p-4.5 shadow-2xs transition-all ${
                      isCritical 
                        ? 'border-rose-300 ring-1 ring-rose-200/70 hover:border-rose-400' 
                        : isWarning 
                        ? 'border-amber-200 hover:border-amber-300' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Location & Item Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900">
                            {stock.location}, {stock.state}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isCritical 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : isWarning 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {stock.risk_level.toUpperCase()} SHORTAGE
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {stock.category}
                          </span>
                          {stock.escalation_status === 'AIRDROP_REQUESTED' && (
                            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Plane className="w-2.5 h-2.5" />
                              IAF UAV / Air-Drop Dispatched
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-blue-600" />
                          <span>{stock.item}</span>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap pt-0.5">
                          <span>Current Stock: <strong className="text-slate-800">{stock.current_quantity.toLocaleString()} {stock.unit}</strong></span>
                          <span>•</span>
                          <span>Daily Burn Rate: <strong className="text-slate-800">{stock.daily_consumption} {stock.unit}/day</strong></span>
                          <span>•</span>
                          <span>Buffer Time: <strong className={isCritical ? 'text-rose-600' : 'text-slate-800'}>{stock.days_remaining} days ({Math.round(stock.days_remaining * 24)}h)</strong></span>
                        </div>

                        {/* Visual Countdown Depletion Bar */}
                        <div className="w-full max-w-md pt-1">
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <div 
                              className={`h-full rounded-full ${
                                isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, (stock.days_remaining / 4) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Resupply Vehicle & ETA Details */}
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 min-w-[280px] lg:w-80 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <Truck className="w-3 h-3 text-blue-600" />
                            {stock.incoming_vehicle_id ? stock.incoming_vehicle_id : 'No Assigned Convoy'}
                          </span>
                          {stock.incoming_vehicle_id && (
                            <span className="text-[10px] text-slate-400">
                              {stock.incoming_origin}
                            </span>
                          )}
                        </div>

                        {stock.incoming_vehicle_id ? (
                          <>
                            <div className="text-[11px] text-slate-700">
                              Cargo: <strong>{stock.incoming_cargo_qty} {stock.unit}</strong> via {stock.incoming_vehicle_type}
                            </div>
                            <div className="flex items-center justify-between text-[10.5px] pt-0.5">
                              <span className="text-slate-500">
                                Road Distance: {stock.incoming_distance_km} km
                              </span>
                              <span className="font-bold text-slate-800 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                ETA: {stock.incoming_eta_days} days ({Math.round(stock.incoming_eta_days! * 24)}h)
                              </span>
                            </div>

                            {/* Evaluation Flag */}
                            <div className={`mt-1 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 ${
                              willFail 
                                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {willFail ? (
                                <>
                                  <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                                  <span>CRITICAL: Shipment arrives AFTER stockout!</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span>Safe: Shipment arrives before depletion buffer.</span>
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="text-[11px] text-rose-600 font-medium py-1">
                            ⚠️ Zero active resupply convoys in transit. Immediate requisition required.
                          </div>
                        )}
                      </div>

                      {/* Right: Emergency Actions */}
                      <div className="flex lg:flex-col gap-2 justify-end lg:w-44">
                        {willFail || !stock.incoming_vehicle_id ? (
                          <>
                            <button
                              onClick={() => handleEscalateAirdrop(stock.id, stock.item, stock.location)}
                              className="w-full h-8 px-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <Plane className="w-3 h-3" />
                              <span>Request IAF UAV</span>
                            </button>

                            {stock.incoming_vehicle_id && (
                              <button
                                onClick={() => handleRerouteConvoy(stock.id, stock.item)}
                                className="w-full h-8 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3" />
                                <span>Expedite Corridor</span>
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={() => navigate('/logistics/vehicles')}
                            className="w-full h-8 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10.5px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3 h-3 text-slate-500" />
                            <span>Track Vehicle</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FULL REGIONAL STOCK REGISTRY TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>Civil Supplies &amp; Medical Reserve Ledger (All 8 Northeast States)</span>
              </h3>
              <span className="text-[10.5px] text-slate-500">
                Audited against GSI elevation &amp; road blockage feeds
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-[10.5px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-2.5 px-3.5">Hub / Location</th>
                    <th className="py-2.5 px-3.5">Category</th>
                    <th className="py-2.5 px-3.5">Essential Item</th>
                    <th className="py-2.5 px-3.5">Current Stock</th>
                    <th className="py-2.5 px-3.5">Daily Burn</th>
                    <th className="py-2.5 px-3.5">Days Left</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5">Assigned Vehicle</th>
                    <th className="py-2.5 px-3.5 text-right">Convoy ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {stockList.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3.5 font-bold text-slate-900">
                        {row.location} ({row.state})
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-600">{row.category}</td>
                      <td className="py-2.5 px-3.5 font-semibold text-slate-800">{row.item}</td>
                      <td className="py-2.5 px-3.5">{row.current_quantity.toLocaleString()} {row.unit}</td>
                      <td className="py-2.5 px-3.5">{row.daily_consumption} {row.unit}/d</td>
                      <td className="py-2.5 px-3.5 font-bold">
                        <span className={row.days_remaining <= 1.0 ? 'text-rose-600' : row.days_remaining <= 3.0 ? 'text-amber-600' : 'text-emerald-600'}>
                          {row.days_remaining} d
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.risk_level === 'Critical' ? 'bg-rose-100 text-rose-700' :
                          row.risk_level === 'Warning' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {row.risk_level}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-[11px]">
                        {row.incoming_vehicle_id || <span className="text-slate-400 italic">None</span>}
                      </td>
                      <td className="py-2.5 px-3.5 text-right font-semibold">
                        {row.incoming_eta_days ? `${row.incoming_eta_days} d (${Math.round(row.incoming_eta_days * 24)}h)` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};
