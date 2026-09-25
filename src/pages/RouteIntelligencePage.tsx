import { GovernmentSidebar } from '../components/GovernmentSidebar';
import React, { useState } from 'react';

import { 
  Bell, User, MapPin, AlertTriangle, Route, ShieldAlert, Truck, ChevronDown, 
  Search, Sparkles, Clock, ShieldCheck, Layers, X, Info,
  Compass, Mountain, Loader2, Share2, Cpu, Activity, Zap
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { RouteMap } from '../components/RouteMap';
import { routingEngine, type OptimizationResult } from '../services/routingAlgorithms';

export const RouteIntelligencePage: React.FC = () => {
  

  // Route Planning Inputs
  const [origin, setOrigin] = useState('Guwahati');
  const [destination, setDestination] = useState('Itanagar');
  const [missionType, setMissionType] = useState('Essential Supplies');
  const [priority, setPriority] = useState('High');

  // Algorithm Engine & Simulation Inputs
  const [algorithm, setAlgorithm] = useState<'Quantum PSO' | 'Dijkstra' | 'Disaster-Resilient A*'>('Quantum PSO');
  const [simulateDisruption, setSimulateDisruption] = useState<boolean>(true);
  const [optResult, setOptResult] = useState<OptimizationResult>(
    routingEngine.solveQuantumPSO('Guwahati', 'Itanagar', true)
  );

  // Selected Route state
  const [selectedRoute, setSelectedRoute] = useState<'current' | 'alt1' | 'alt2'>('alt1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisToast, setAnalysisToast] = useState(false);

  // Modals
  const [factorsModalOpen, setFactorsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleAnalyzeRoute = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let res: OptimizationResult;
      if (algorithm === 'Quantum PSO') {
        res = routingEngine.solveQuantumPSO(origin, destination, simulateDisruption);
      } else if (algorithm === 'Disaster-Resilient A*') {
        res = routingEngine.solveDisasterResilientAStar(origin, destination, simulateDisruption);
      } else {
        res = routingEngine.solveDijkstra(origin, destination, simulateDisruption);
      }
      setOptResult(res);
      setIsAnalyzing(false);
      setAnalysisToast(true);
      setTimeout(() => setAnalysisToast(false), 3000);
    }, 750);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-[#1e293b] antialiased font-sans select-none">
      
      {/* 1. TOP NAVBAR (Dark Navy #0b1a30) */}
      <header className="w-full bg-[#0b1a30] text-white border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center">
          <NerLogixLogo variant="white" className="cursor-pointer" />
          <div className="h-7 w-[1px] bg-slate-700/80 mx-4 hidden sm:block"></div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[12.5px] font-semibold text-slate-100 leading-tight">
              North Eastern Region Logistics &amp; Accessibility Intelligence Platform
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
        <GovernmentSidebar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5">
          
          {/* A. PAGE TITLE ROW */}
          <div>
            <h1 className="text-xl font-bold text-[#0f2547] tracking-tight uppercase">
              Route Intelligence
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI-assisted route assessment &amp; disruption analysis</span>
            </div>
          </div>

          {/* B. ROUTE INPUT FORM STRIP */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              
              {/* Origin */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Origin (NER Hub)
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full h-8.5 pl-8 pr-7 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Destination */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Destination (NER Hub)
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-8.5 pl-8 pr-7 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Mission Type */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Mission Type
                </label>
                <select
                  value={missionType}
                  onChange={(e) => setMissionType(e.target.value)}
                  className="w-full h-8.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                >
                  <option>Essential Supplies</option>
                  <option>Essential Medicines</option>
                  <option>Disaster Relief Cargo</option>
                  <option>Petroleum &amp; Fuel</option>
                  <option>General Freight</option>
                </select>
              </div>

              {/* Priority */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full h-8.5 px-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                >
                  <option>High</option>
                  <option>Emergency</option>
                  <option>Standard</option>
                </select>
              </div>

              {/* ANALYZE ROUTE Button */}
              <div className="md:col-span-2">
                <button
                  onClick={handleAnalyzeRoute}
                  disabled={isAnalyzing}
                  className="w-full h-8.5 bg-[#1a56db] hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>OPTIMIZING...</span>
                    </>
                  ) : (
                    <>
                      <Route className="w-3.5 h-3.5" />
                      <span>OPTIMIZE ROUTE</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* ROW 2: ALGORITHM SELECTOR & DYNAMIC TERRAIN SIMULATION */}
            <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Algorithm Engine Selector */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span>Optimization Engine:</span>
                  </div>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as any)}
                    className="h-7.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-blue-900 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                  >
                    <option value="Quantum PSO">Quantum-Inspired PSO (Q-PSO Probabilistic Search)</option>
                    <option value="Dijkstra">Classical Dijkstra (Minimum Distance)</option>
                    <option value="Disaster-Resilient A*">Disaster-Resilient A* (ISRO + IMD Terrain Risk)</option>
                  </select>
                </div>

                {/* Dynamic Traffic / Landslide Toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={simulateDisruption}
                    onChange={(e) => setSimulateDisruption(e.target.checked)}
                    className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Dynamic Monsoon &amp; Landslide Perturbation
                  </span>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                    LIVE SIMULATION
                  </span>
                </label>

              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Algorithm Convergence: <strong>Active</strong></span>
              </div>
            </div>

          </div>

          {/* Analysis Notification Toast */}
          {analysisToast && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-lg flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Multi-corridor GIS telemetry updated: 3 alternative paths evaluated against live weather &amp; road obstructions.</span>
              </div>
              <span className="text-[10.5px] font-semibold text-emerald-700">100% Data Confidence</span>
            </div>
          )}

          {/* C. ROUTE ASSESSMENT 3 CARDS (Exact from Screenshot) */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Route Assessment
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* CARD 1: CURRENT ROUTE */}
              <div 
                onClick={() => setSelectedRoute('current')}
                className={`bg-white rounded-xl border p-3.5 shadow-2xs cursor-pointer transition-all space-y-2.5 ${
                  selectedRoute === 'current' 
                    ? 'border-red-400 ring-2 ring-red-200' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                  <Route className="w-4 h-4 text-red-600" />
                  <span>CURRENT ROUTE</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10.5px] text-slate-400 font-medium">Distance</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">340 km</div>
                    <div className="text-[10.5px] text-slate-400 font-medium mt-1.5">Estimated Time</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">9h 05m</div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div>
                      <div className="text-[10.5px] text-slate-400 font-medium text-right mb-0.5">Risk</div>
                      <span className="px-2.5 py-0.5 rounded text-[10.5px] font-bold bg-red-600 text-white">
                        HIGH
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-[10.5px] text-slate-400 font-medium">Delay</div>
                      <div className="text-xs font-bold text-red-600">+1h 45m</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: ALTERNATIVE 1 (RECOMMENDED) */}
              <div 
                onClick={() => setSelectedRoute('alt1')}
                className={`bg-white rounded-xl border p-3.5 shadow-2xs cursor-pointer transition-all space-y-2.5 ${
                  selectedRoute === 'alt1' 
                    ? 'border-emerald-500 ring-2 ring-emerald-200 border-2' 
                    : 'border-emerald-500/80 border-2'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <span>ALTERNATIVE 1</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10.5px] text-slate-400 font-medium">Distance</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">372 km</div>
                    <div className="text-[10.5px] text-slate-400 font-medium mt-1.5">Estimated Time</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">8h 10m</div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div>
                      <div className="text-[10.5px] text-slate-400 font-medium text-right mb-0.5">Risk</div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-amber-950">
                        MODERATE
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-[10.5px] text-slate-400 font-medium mb-0.5">Status</div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        RECOMMENDED
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: ALTERNATIVE 2 (AVAILABLE) */}
              <div 
                onClick={() => setSelectedRoute('alt2')}
                className={`bg-white rounded-xl border p-3.5 shadow-2xs cursor-pointer transition-all space-y-2.5 ${
                  selectedRoute === 'alt2' 
                    ? 'border-blue-400 ring-2 ring-blue-200' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Route className="w-4 h-4 text-blue-600" />
                  <span>ALTERNATIVE 2</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10.5px] text-slate-400 font-medium">Distance</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">401 km</div>
                    <div className="text-[10.5px] text-slate-400 font-medium mt-1.5">Estimated Time</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">8h 45m</div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div>
                      <div className="text-[10.5px] text-slate-400 font-medium text-right mb-0.5">Risk</div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        LOW
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-[10.5px] text-slate-400 font-medium mb-0.5">Status</div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        AVAILABLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* D. MIDDLE SECTION: GIS MAP (Left) + AI RISK & RECOMMENDATION (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Left GIS Corridor Map (8 cols) */}
            <div className="lg:col-span-8">
              <RouteMap 
                selectedRoute={selectedRoute}
                onSelectRoute={setSelectedRoute}
              />
            </div>

            {/* Right Assessment Panels (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              
              {/* 1. ROUTE RISK ASSESSMENT CARD */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800">Route Risk Assessment</h3>
                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[10.5px] font-bold text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span>HIGH RISK</span>
                  </div>
                </div>

                {/* Why is this route risky list */}
                <div>
                  <div className="text-[11px] font-bold text-slate-800 mb-2">
                    Why is this route risky?
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <span className="text-slate-700 text-[11.5px]">Heavy rainfall detected</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <span className="text-slate-700 text-[11.5px]">Elevated landslide probability</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <span className="text-slate-700 text-[11.5px]">Recent road damage report</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        4
                      </span>
                      <span className="text-slate-700 text-[11.5px]">Traffic slowdown detected</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Delay & Confidence Score */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Estimated Delay</span>
                    </div>
                    <div className="text-sm font-bold text-red-600 mt-0.5">+1h 45m</div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-slate-400" />
                      <span>Risk Confidence</span>
                    </div>
                    <div className="text-sm font-bold text-amber-600 mt-0.5">84%</div>
                  </div>
                </div>
              </div>

              {/* 2. AI RECOMMENDATION CARD */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1a56db]">
                  <Compass className="w-4 h-4 text-[#1a56db]" />
                  <span>AI Recommendation</span>
                </div>
                <p className="text-[11.5px] text-slate-700 leading-relaxed font-normal">
                  <strong>Alternative 1</strong> is currently recommended due to lower disruption risk and shorter estimated travel time.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setFactorsModalOpen(true)}
                  className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer text-center"
                >
                  View Factors
                </button>
                <button
                  onClick={() => setDetailsModalOpen(true)}
                  className="py-2 px-2 bg-[#1a56db] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer text-center"
                >
                  Assessment Details
                </button>
              </div>

            </div>

          </div>

          {/* E. ADVANCED ALGORITHM OUTPUT & CONVERGENCE METRICS */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Multi-Algorithm Path Solution: <span className="text-blue-600 font-extrabold">{optResult.algorithm}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">Selected Path:</span>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 font-mono">
                  {optResult.route.length > 0 ? optResult.route.join(' → ') : `${origin} → ${destination}`}
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Effective Travel Distance</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">{optResult.distanceKm} km</div>
                <div className="text-[9.5px] text-slate-400">Terrain &amp; traffic weighted</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Projected Fleet ETA</div>
                <div className="text-lg font-black text-blue-600 mt-0.5">{optResult.etaHours} hrs</div>
                <div className="text-[9.5px] text-slate-400">Avg speed 35 km/h in hills</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Corridor Risk Index</div>
                <div className={`text-lg font-black mt-0.5 ${
                  optResult.riskLevel === 'Critical' ? 'text-rose-600' :
                  optResult.riskLevel === 'High' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {optResult.riskScore}%
                </div>
                <div className="text-[9.5px] text-slate-400">{optResult.riskLevel} Disruption Likelihood</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Algorithm Heuristic</div>
                <div className="text-sm font-bold text-indigo-700 mt-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{optResult.algorithm === 'Quantum PSO' ? '30 Particles / 25 Iter' : 'A* Geo-Heuristic'}</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Probabilistic perturbation active</div>
              </div>
            </div>

            {/* QUANTUM CONVERGENCE CHART (Renders when Quantum PSO is selected) */}
            {optResult.algorithm === 'Quantum PSO' && optResult.convergence.length > 0 && (
              <div className="bg-gradient-to-r from-slate-900 to-[#0b1a30] text-white p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-100">Quantum-Inspired PSO Convergence Curve</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Swarm Optimality: 100% Converged
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 font-sans">
                  The heuristic simulates a 30-particle quantum probability wave packet across 25 iterative generations, perturbing road impedances ($\beta \in [0.75, 1.25]$) to escape local minima in mountainous multi-path topologies.
                </div>

                {/* SVG Convergence Curve */}
                <div className="pt-2">
                  <div className="h-16 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 60" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="15" x2="500" y2="15" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
                      <line x1="0" y1="45" x2="500" y2="45" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
                      
                      {/* Polyline of convergence */}
                      {(() => {
                        const min = Math.min(...optResult.convergence);
                        const max = Math.max(...optResult.convergence) || min + 1;
                        const points = optResult.convergence.map((val, idx) => {
                          const x = (idx / (optResult.convergence.length - 1)) * 500;
                          const y = 50 - ((val - min) / (max - min || 1)) * 40;
                          return `${x},${y}`;
                        }).join(' ');
                        return (
                          <>
                            <polyline
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={points}
                            />
                            {optResult.convergence.map((val, idx) => {
                              const x = (idx / (optResult.convergence.length - 1)) * 500;
                              const y = 50 - ((val - min) / (max - min || 1)) * 40;
                              if (idx === 0 || idx === optResult.convergence.length - 1 || idx === 12) {
                                return (
                                  <circle key={idx} cx={x} cy={y} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                                );
                              }
                              return null;
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9.5px] font-mono text-slate-400 mt-1">
                    <span>Gen 1 (Initial Swarm)</span>
                    <span>Gen 12 (Quantum Perturbation)</span>
                    <span>Gen 25 (Global Minimum: {optResult.distanceKm} km)</span>
                  </div>
                </div>

              </div>
            )}

            {/* CORRIDOR SEGMENT HEALTH TABLE */}
            {optResult.segments && optResult.segments.length > 0 && (
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Segment-by-Segment Corridor Health Manifest</span>
                  <span className="text-[10px] text-slate-500 font-normal">{optResult.segments.length} highway sections evaluated</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-2 px-3">From</th>
                        <th className="py-2 px-3">To</th>
                        <th className="py-2 px-3">Distance</th>
                        <th className="py-2 px-3">Traffic State</th>
                        <th className="py-2 px-3">Segment Risk</th>
                        <th className="py-2 px-3 text-right">Highway Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {optResult.segments.map((seg, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2 px-3 font-semibold text-slate-900">{seg.from}</td>
                          <td className="py-2 px-3 font-semibold text-slate-900">{seg.to}</td>
                          <td className="py-2 px-3 font-mono">{seg.distanceKm} km</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              seg.traffic === 'High' ? 'bg-rose-100 text-rose-700' :
                              seg.traffic === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {seg.traffic}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono text-slate-800">{seg.segmentRisk}%</td>
                          <td className="py-2 px-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              seg.status === 'RESTRICTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              seg.status === 'CAUTION' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {seg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* F. BOTTOM CARD: ASSESSMENT DATA SOURCES (Exact from Screenshot) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Assessment Data Sources</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">GIS Road Network</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Available</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Weather Data</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Live</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Field Reports</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Updated</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Road Conditions</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Updated</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Traffic Data</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Available</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Risk Prediction Model</div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Active</span>
                </div>
                <div className="text-[9.5px] text-slate-400">Last updated: 15:32 IST</div>
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

      {/* MODAL: VIEW FACTORS */}
      {factorsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Disruption Factors Breakdown</h3>
              </div>
              <button onClick={() => setFactorsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-200">
                <div className="font-bold text-red-900">Precipitation Intensity: 42 mm/hr</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Heavy convective cells detected over Jamugurihat–Papum Pare boundary.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
                <div className="font-bold text-amber-900">Slope Saturation Index: 0.82 (Critical)</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Geotechnical sensors report heightened mudslide susceptibility on NH-15 cut slopes.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Corridor Freight Congestion</div>
                <div className="text-[11px] text-slate-600 mt-0.5">38 trucks stalled behind debris clearing zone. Average speed reduced to 8 km/h.</div>
              </div>
            </div>

            <button
              onClick={() => setFactorsModalOpen(false)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer"
            >
              Close Factors
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ASSESSMENT DETAILS */}
      {detailsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#1a56db]" />
                <h3 className="font-bold text-slate-900 text-sm">Full Route Comparison Assessment</h3>
              </div>
              <button onClick={() => setDetailsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="font-bold text-emerald-900">Alternative 1 (Recommended Corridor)</div>
                <div className="text-[11.5px] text-slate-700 mt-1">
                  Guwahati → Baihata Chariali → Mangaldai → Tezpur Bypass → Biswanath → Itanagar.
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  ✓ 55 min faster overall • Safe from major landslide warnings • 2 lane bituminous pavement
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-800">Dispatch Authorization Advisory</div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Recommended route provides continuous clearance for heavy transport carrying <em>{missionType}</em>. Real-time GPS advisory can be transmitted directly to drivers.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Route instructions for Alternative 1 dispatched to convoy drivers for mission: ${missionType}`);
                  setDetailsModalOpen(false);
                }}
                className="flex-1 py-2 bg-[#1a56db] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer"
              >
                Authorize &amp; Transmit Route
              </button>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
