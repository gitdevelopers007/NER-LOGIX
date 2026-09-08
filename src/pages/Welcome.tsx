import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, ArrowRight, Activity, AlertTriangle, Route, 
  CloudRain, Mountain, Truck, Satellite, Radio, ExternalLink,
  ChevronRight, Play, Pause, Volume2, VolumeX, CheckCircle2,
  Clock, ShieldAlert, Layers
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { EmblemOfIndia } from '../components/EmblemOfIndia';
import { nerApiService, type StateRainfall } from '../services/nerApiService';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  // State for interactive hero console
  const [heroTab, setHeroTab] = useState<'radar' | 'corridors' | 'fleets'>('radar');
  
  // State for Interactive Corridor Simulator
  const [selectedCorridor, setSelectedCorridor] = useState<'NH-27' | 'NH-13' | 'NH-29' | 'NH-10'>('NH-13');

  // State for Problem vs Solution comparison
  const [compareMode, setCompareMode] = useState<'with' | 'without'>('with');

  // Video State for GSLV-F17 / EOS-05
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoFile, setHasVideoFile] = useState(false);

  // Live Telemetry from Backend
  const [currentTemp, setCurrentTemp] = useState<number>(25.5);
  const [rainfallData, setRainfallData] = useState<StateRainfall[]>([]);

  useEffect(() => {
    nerApiService.getHazardsAndWeather().then((data) => {
      if (data?.currentTemp) setCurrentTemp(data.currentTemp);
      if (data?.rainfallTelemetry) setRainfallData(data.rainfallTelemetry);
    });

    // Check if user has uploaded a custom video to /gslv-eos05.mp4
    fetch('/gslv-eos05.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasVideoFile(true);
      })
      .catch(() => {});
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Corridors Data for Simulator
  const corridorsData = {
    'NH-27': {
      name: 'NH-27 (East-West Highway Lifeline)',
      stretch: 'Guwahati – Nagaon – Lumding – Silchar',
      status: 'OPEN & PASSABLE',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      speed: '58 km/h avg',
      clearanceTime: 'Normal Transit',
      risk: 'Low (Surface runoff near Kaziranga)',
      detour: 'Primary arterial route optimal. No diversion needed.',
      elevation: '55m – 140m MSL',
      convoys: '12 Freight Missions Active',
    },
    'NH-13': {
      name: 'NH-13 (Trans-Arunachal Highway)',
      stretch: 'Potin – Banderdewa – Lower Subansiri',
      status: 'BLOCKED (Landslide Debris)',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
      speed: '0 km/h (Severed)',
      clearanceTime: '3.5 hrs (2 BRO Earthmovers Deployed)',
      risk: 'High (Debris displacement covering 45m)',
      detour: 'Auto-Reroute via NH-15 Bhalukpong bypass computed (+32 min).',
      elevation: '420m – 1,180m MSL',
      convoys: '3 Convoys Held at Checkpost',
    },
    'NH-29': {
      name: 'NH-29 (Dimapur to Kohima Corridor)',
      stretch: 'Dimapur Bypass – Chumukedima – Kohima',
      status: 'RESTRICTED (Slope Subsidence)',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      speed: '22 km/h (Single-Lane Controlled)',
      clearanceTime: 'Ongoing Stabilisation',
      risk: 'Moderate (Active ground fissure seepage)',
      detour: 'Heavy vehicles diverted via NH-129. Light 4x4 permitted.',
      elevation: '180m – 1,440m MSL',
      convoys: '6 Essential Convoys Escorted',
    },
    'NH-10': {
      name: 'NH-10 (Sikkim Supply Lifeline)',
      stretch: 'Sevoke – Teesta Bazaar – Rangpo – Gangtok',
      status: 'RESTRICTED (Axle Weight Limit)',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      speed: '28 km/h',
      clearanceTime: 'Controlled Alternating Queue',
      risk: 'Moderate (Teesta river gauge rising)',
      detour: 'Alternate routing via Lava-Reshi corridor available for light freight.',
      elevation: '210m – 1,650m MSL',
      convoys: '5 Medical & Oxygen Tankers In-Transit',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070f1e] text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP SOVEREIGN NAVIGATION HEADER */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-[#0b1a30]/95 backdrop-blur-md border-b border-blue-900/50 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand with Emblem of India */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="hidden sm:flex items-center justify-center p-1.5 bg-slate-900/90 border border-blue-800/60 rounded-lg shadow-sm">
              <EmblemOfIndia className="h-7 w-auto filter invert brightness-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <NerLogixLogo variant="white" className="h-6" />
                <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  SOVEREIGN GIS
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400 hidden md:block">
                North Eastern Region Logistics &amp; Accessibility Intelligence Platform
              </p>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#challenge" className="hover:text-white transition-colors">The Challenge</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution Pillars</a>
            <a href="#corridors" className="hover:text-white transition-colors">Corridor Simulator</a>
            <a href="#space-tech" className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-400">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>GSLV / EOS-05</span>
            </a>
            <a href="#portals" className="hover:text-white transition-colors">Portals</a>
            <a href="#team" className="hover:text-white transition-colors text-amber-300">Team</a>
          </nav>

          {/* Right Live Status Badge & Action CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>82% Passable • 18 Radars Live</span>
            </div>

            <button
              onClick={() => navigate('/government-command-center')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30"
            >
              <span>Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION — Sovereign Frontier Command */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-blue-900/40">
        
        {/* Subtle high-tech radial glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Top Government Seal Tag */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/90 border border-blue-500/40 text-blue-300 text-[11px] font-bold tracking-wider uppercase shadow-inner">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Ministry of Development of North Eastern Region (DoNER) • North Eastern Council</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>LIVE GIS TELEMETRY ACTIVE</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Unified Frontier Logistics &amp; <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Accessibility Intelligence
              </span> for Northeast India
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Guarding <strong>45+ million citizens</strong>, <strong>8 mountain states</strong>, and <strong>5,182 km of international frontiers</strong> against monsoon severance, devastating landslides, and single-corridor supply paralysis.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => navigate('/government-command-center')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center gap-2.5 cursor-pointer border border-blue-400/40"
              >
                <Activity className="w-4 h-4" />
                <span>Launch Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/live-map')}
                className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore Live GIS Map</span>
              </button>

              <button
                onClick={() => navigate('/access-portal')}
                className="px-5 py-3.5 bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 font-semibold text-sm rounded-xl border border-blue-800/60 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Select Access Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Live Macro Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-12 max-w-5xl mx-auto">
            
            <div className="bg-[#0b1a30]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Passable Corridors</span>
                <Route className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">1,248 km</div>
              <div className="text-[11px] text-emerald-400 font-bold mt-1">↑ 82% of Regional Lifelines</div>
            </div>

            <div className="bg-[#0b1a30]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>IMD Doppler Radars</span>
                <CloudRain className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">18 Stations</div>
              <div className="text-[11px] text-blue-400 font-bold mt-1">Streaming Live Precipitation</div>
            </div>

            <div className="bg-[#0b1a30]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Active Freight Convoys</span>
                <Truck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">28 Missions</div>
              <div className="text-[11px] text-cyan-400 font-bold mt-1">Fuel, Rice, Meds &amp; Defence</div>
            </div>

            <div className="bg-[#0b1a30]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Disaster Response Turnaround</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">&lt; 15 mins</div>
              <div className="text-[11px] text-amber-400 font-bold mt-1">Ground-to-Minister Dispatch</div>
            </div>

          </div>

          {/* Interactive Mission Control Preview Console */}
          <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-b from-[#0f223f] via-[#091528] to-[#060e1c] border border-blue-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            
            {/* Top scanning bar animation */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            {/* Console Nav Tabs */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-blue-900/60 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">NER-LOGIX // INTEGRATED OPERATIONAL STREAM</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setHeroTab('radar')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    heroTab === 'radar' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🌧️ Doppler Radar
                </button>
                <button
                  onClick={() => setHeroTab('corridors')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    heroTab === 'corridors' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🛣️ Mountain Lifelines
                </button>
                <button
                  onClick={() => setHeroTab('fleets')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    heroTab === 'fleets' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🚚 Freight Telemetry
                </button>
              </div>
            </div>

            {/* Tab 1: Doppler Rainfall Radar Feed */}
            {heroTab === 'radar' && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2 bg-[#06101f] border border-blue-900/80 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      Multi-Spectral Precipitation Radar Sweep
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">LIVE • 14.8 mm/h Peak</span>
                  </div>

                  {/* Simulated Radar Visual with SVG & Sweep */}
                  <div className="relative h-48 w-full mt-3 flex items-center justify-center bg-slate-950/90 rounded-lg overflow-hidden border border-blue-950">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                    
                    {/* Concentric rings */}
                    <div className="absolute w-44 h-44 rounded-full border border-blue-500/20"></div>
                    <div className="absolute w-32 h-32 rounded-full border border-blue-500/30"></div>
                    <div className="absolute w-16 h-16 rounded-full border border-cyan-400/40"></div>
                    
                    {/* Rotating radar line */}
                    <div className="absolute w-48 h-48 rounded-full border-t border-cyan-400/70 animate-radar-sweep pointer-events-none"></div>

                    {/* Radar Blips */}
                    <div className="absolute top-12 left-24 flex items-center gap-1 bg-red-950/80 border border-red-500/60 px-2 py-0.5 rounded text-[10px] text-red-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                      Cherrapunji: 14.8 mm/h (Downpour)
                    </div>
                    <div className="absolute bottom-10 right-28 flex items-center gap-1 bg-blue-950/80 border border-blue-500/60 px-2 py-0.5 rounded text-[10px] text-blue-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      Silchar: 6.2 mm/h (Rain)
                    </div>
                    <div className="absolute top-8 right-20 flex items-center gap-1 bg-amber-950/80 border border-amber-500/60 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      Itanagar: 4.5 mm/h
                    </div>
                  </div>
                </div>

                {/* Radar Telemetry Stats Side Card */}
                <div className="space-y-2.5">
                  <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-3.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hydrological Risk</div>
                    <div className="text-lg font-extrabold text-amber-400 mt-1">ORANGE ADVISORY</div>
                    <div className="text-xs text-slate-300 mt-1">
                      High saturation in East Khasi Hills and Papum Pare corridors. Landslide susceptibility coefficient: <strong>0.84</strong>.
                    </div>
                  </div>

                  <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-3.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Real-time Gateway</div>
                    <div className="text-xs text-slate-300 mt-1 space-y-1">
                      <div>• Current Temperature: <span className="text-white font-bold">{currentTemp}°C</span></div>
                      <div>• 24h Regional Accumulation: <span className="text-cyan-300 font-bold">78.2 mm</span></div>
                      <div>• Seismological Status: <span className="text-emerald-400 font-bold">Zone V Monitored</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Mountain Lifelines */}
            {heroTab === 'corridors' && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(corridorsData).map(([key, item]) => (
                  <div key={key} className="bg-[#0b1a30] border border-blue-900/70 rounded-xl p-3.5 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-white">{key}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.status.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">{item.stretch}</div>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
                      <span>Speed: {item.speed}</span>
                      <span className="text-cyan-400">{item.clearanceTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Freight Telemetry */}
            {heroTab === 'fleets' && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#0b1a30] border border-blue-900/70 rounded-xl p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>CONVOY-NE-104</span>
                    <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">In Transit</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Guwahati Logistics Park ➔ Kohima Depot</div>
                  <div className="text-xs text-slate-200 mt-2 font-medium">Cargo: Emergency Rice &amp; Pulses (14 Heavy Trucks)</div>
                  <div className="text-[11px] text-cyan-400 mt-1">ETA: 4 hrs 15 min (via NH-27 Corridor)</div>
                </div>

                <div className="bg-[#0b1a30] border border-blue-900/70 rounded-xl p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>CONVOY-NE-218</span>
                    <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">In Transit</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Silchar Railhead ➔ Agartala Central Hub</div>
                  <div className="text-xs text-slate-200 mt-2 font-medium">Cargo: Petroleum &amp; Medical Oxygen (8 Tankers)</div>
                  <div className="text-[11px] text-cyan-400 mt-1">ETA: 3 hrs 20 min (Smooth Corridor)</div>
                </div>

                <div className="bg-[#0b1a30] border border-blue-900/70 rounded-xl p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>CONVOY-NE-305</span>
                    <span className="text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">Diverted</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Tezpur Ordnance ➔ Tawang High-Altitude Base</div>
                  <div className="text-xs text-slate-200 mt-2 font-medium">Cargo: Bridge Reconstruction Steel (6 Axles)</div>
                  <div className="text-[11px] text-amber-400 mt-1">Rerouted via NH-15 due to Subansiri Landslide</div>
                </div>
              </div>
            )}

            {/* Bottom Footer Note inside Console */}
            <div className="mt-4 pt-3 border-t border-blue-900/40 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <span>● Encrypted Gov.in Central Data Link Connected</span>
              <button 
                onClick={() => navigate('/live-map')}
                className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Expand Full Map Telemetry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 3. SECTION: THE FRONTIER CHALLENGE — WHY NER IS CRUCIAL & THE PROBLEM */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="challenge" className="py-20 bg-[#050c18] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              The Strategic Ground Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Northeast India Requires Dedicated Intelligence
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Unlike flat plains with dense highway grids, the North Eastern Region faces unique geopolitical, geographical, and meteorological vulnerabilities.
            </p>
          </div>

          {/* 4 Pillars of Frontier Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Challenge 1 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-5 hover:border-blue-500/60 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  5,182 km International Border
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Surrounded by 5 countries (China, Myanmar, Bangladesh, Bhutan, Nepal). Over <strong>98% of NER's borders</strong> are international frontiers. Reliable logistics is fundamentally a matter of national sovereignty.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-slate-400">
                Strategic Border Corridors
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-5 hover:border-amber-500/60 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Route className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  The 22 km Siliguri Chokepoint
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The entire region of 45 million citizens is tethered through the narrow 22 km "Chicken’s Neck". Any severe rail or highway blockage isolates all eight states simultaneously from essential commodities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-slate-400">
                Single Umbilical Lifeline
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-5 hover:border-red-500/60 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-400">
                  <Mountain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
                  200+ Monsoon Landslides Yearly
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  World’s highest precipitation levels (Cherrapunji &amp; Mawsynram). Extreme rain causes catastrophic slope collapse on NH-13, NH-29, and NH-10, stranding supply convoys for days without advance warning.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-slate-400">
                Cherrapunji / Brahmaputra Basin
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-xl p-5 hover:border-cyan-500/60 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Information Silos &amp; Blind Spots
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  BRO, NHAI, state police, and disaster management traditionally operate in disconnected silos. Without unified real-time telemetry, relief trucks drive into roadblocks that occurred hours earlier.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-slate-400">
                Disconnected Agency Silos
              </div>
            </div>

          </div>

          {/* Interactive Comparison: Traditional Method vs NER-LOGIX */}
          <div className="mt-14 max-w-4xl mx-auto bg-[#0b1a30] border border-blue-900/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white">The Operational Shift</h4>
                <p className="text-xs text-slate-400">Comparing traditional response with NER-LOGIX real-time intelligence</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setCompareMode('without')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    compareMode === 'without' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Traditional Handling
                </button>
                <button
                  onClick={() => setCompareMode('with')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    compareMode === 'with' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  With NER-LOGIX
                </button>
              </div>
            </div>

            {compareMode === 'without' ? (
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-red-950/30 border border-red-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Reactive Notification</span>
                  </div>
                  <p className="text-slate-300">Officials learn about a mountain cut hours after trucks are already stranded in landslides.</p>
                </div>
                <div className="bg-red-950/30 border border-red-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Cloud Blindness</span>
                  </div>
                  <p className="text-slate-300">Optical satellites are blocked by dense monsoon cloud cover, leaving agencies blind during peak rainfall.</p>
                </div>
                <div className="bg-red-950/30 border border-red-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Multi-Day Delays</span>
                  </div>
                  <p className="text-slate-300">Heavy relief convoys carrying oxygen, food, and fuel remain immobile awaiting manual road clearance confirmations.</p>
                </div>
              </div>
            ) : (
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Predictive Precipitation</span>
                  </div>
                  <p className="text-slate-300">Live IMD Doppler and Open-Meteo telemetry warn of slope saturation thresholds before soil slips occur.</p>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5" />
                    <span>Auto Corridor Rerouting</span>
                  </div>
                  <p className="text-slate-300">Trucks are automatically diverted upstream via secondary arterial bypasses, avoiding bottleneck traps.</p>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-3.5 rounded-xl space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Closed-Loop Verification</span>
                  </div>
                  <p className="text-slate-300">Field engineers submit geo-tagged mobile photos; clearances instantly update the live GIS map for Ministers.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 4. SECTION: THE SOLUTION — FOUR PILLARS OF NER-LOGIX */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="solution" className="py-20 bg-[#070f1e] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              The NER-LOGIX Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Four Pillars of Sovereign Accessibility Intelligence
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Engineered as an end-to-end operational platform combining free open-source GIS, real-time meteorological models, and field-grade dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-2xl p-6 space-y-4 hover:border-blue-500/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Live Multi-Layer GIS Accessibility</h3>
                  <span className="text-xs text-emerald-400 font-semibold">100% Free Open-Source Cartography (Zero Watermarks)</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dynamically classifies every national highway, state road, and bridge across all 8 states into <strong>Passable (Green)</strong>, <strong>Restricted (Amber)</strong>, and <strong>Blocked (Red)</strong> with real-time route geometry.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">OpenStreetMap Basemap</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Dynamic Leaflet Vectors</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">State Node Navigation</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-2xl p-6 space-y-4 hover:border-blue-500/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 text-xl font-bold">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">IMD Doppler Rainfall &amp; Hazard Radar</h3>
                  <span className="text-xs text-blue-400 font-semibold">Live Telemetry Gateway (Open-Meteo + IMD Telemetry)</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ingests real-time precipitation rates (mm/hr), cloudburst warnings, and river basin inundation levels. Automated correlation flags steep corridors at risk before actual soil collapse.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">18 Doppler Radars</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Cherrapunji Peak Scan</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">River Basin Level Watch</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-2xl p-6 space-y-4 hover:border-blue-500/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl font-bold">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Corridor Intelligence &amp; Mountain Detours</h3>
                  <span className="text-xs text-cyan-400 font-semibold">Constraint-Aware Multi-State Rerouting Engine</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a landslide severs a main pass (e.g. NH-13 in Arunachal), the system computes alternate mountain bypasses, calculating vehicle weight limits, elevation profiles, and fuel requirements.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Multi-Modal Detours</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Bridge Axle Checking</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Convoy Safety Scores</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#0b1a30] border border-blue-900/60 rounded-2xl p-6 space-y-4 hover:border-blue-500/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 text-xl font-bold">
                  04
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Closed-Loop Ground-to-Minister Telemetry</h3>
                  <span className="text-xs text-purple-400 font-semibold">Integrated Field Ops Verification Mobile Pipeline</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Field engineers submit geo-tagged obstacle photos from their phones in under 30 seconds. Dispatches notify BRO earthmovers, updating regional KPI accessibility metrics in real time.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Field Mobile Reporting</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">GPS Photo Verification</span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">One-Click Dispatch</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 5. SECTION: INTERACTIVE CORRIDOR SIMULATOR (Jury Wow Factor!) */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="corridors" className="py-20 bg-[#050c18] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Interactive Operational Diagnostic
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test Real-Time Corridor Intelligence
            </h2>
            <p className="text-sm text-slate-400">
              Select an authentic North Eastern highway lifeline to inspect real-time passability, active hazards, and automated bypass routing.
            </p>
          </div>

          {/* Corridor Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(['NH-27', 'NH-13', 'NH-29', 'NH-10'] as const).map((corridor) => (
              <button
                key={corridor}
                onClick={() => setSelectedCorridor(corridor)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border ${
                  selectedCorridor === corridor
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                    : 'bg-[#0b1a30] text-slate-300 border-blue-900/60 hover:bg-slate-800'
                }`}
              >
                {corridorsData[corridor].name.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* Active Corridor Card */}
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#0b1a30] to-[#081325] border border-blue-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">National Highway Corridor Telemetry</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{corridorsData[selectedCorridor].name}</h3>
                <p className="text-xs text-slate-400 mt-1">Stretch: {corridorsData[selectedCorridor].stretch}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-xs font-bold border ${corridorsData[selectedCorridor].badgeColor}`}>
                  {corridorsData[selectedCorridor].status}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[10.5px]">Corridor Speed</div>
                <div className="text-white font-bold text-sm mt-0.5">{corridorsData[selectedCorridor].speed}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[10.5px]">Clearance Status</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">{corridorsData[selectedCorridor].clearanceTime}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[10.5px]">Terrain Elevation</div>
                <div className="text-white font-bold text-sm mt-0.5">{corridorsData[selectedCorridor].elevation}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[10.5px]">Convoy Missions</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">{corridorsData[selectedCorridor].convoys}</div>
              </div>
            </div>

            {/* Diagnostic Alert & Detour */}
            <div className="bg-[#061020] border border-blue-900/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Geotechnical Risk Assessment</span>
              </div>
              <p className="text-xs text-slate-300">
                {corridorsData[selectedCorridor].risk}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-blue-300 font-medium">
                <Route className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>AI Computed Recommendation:</strong> {corridorsData[selectedCorridor].detour}</span>
              </div>
            </div>

            {/* View on Map Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => navigate('/route-intelligence')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Run Detailed Route Intelligence Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 6. SECTION: LIVE REGIONAL TELEMETRY STRIP */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-gradient-to-r from-[#071326] via-[#091b36] to-[#071326] border-y border-blue-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-extrabold tracking-widest text-cyan-300 uppercase font-mono">
                8 NER States Live Precipitation &amp; Hydrology
              </span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono hidden md:block">
              Open-Meteo &amp; IMD Telemetry • Real-time Refresh
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mt-4">
            {(rainfallData.length > 0 ? rainfallData : [
              { state: 'Meghalaya', currentPrecipitationMm: 14.8, status: 'Downpour', alertLevel: 'ORANGE' },
              { state: 'Assam', currentPrecipitationMm: 6.2, status: 'Moderate', alertLevel: 'YELLOW' },
              { state: 'Arunachal', currentPrecipitationMm: 4.5, status: 'Showers', alertLevel: 'YELLOW' },
              { state: 'Nagaland', currentPrecipitationMm: 2.1, status: 'Light Rain', alertLevel: 'WATCH' },
              { state: 'Manipur', currentPrecipitationMm: 1.4, status: 'Overcast', alertLevel: 'NORMAL' },
              { state: 'Mizoram', currentPrecipitationMm: 3.2, status: 'Scattered', alertLevel: 'WATCH' },
              { state: 'Tripura', currentPrecipitationMm: 0.8, status: 'Passing Cloud', alertLevel: 'NORMAL' },
              { state: 'Sikkim', currentPrecipitationMm: 5.0, status: 'High Alt', alertLevel: 'YELLOW' },
            ]).map((st: any, idx: number) => (
              <div key={idx} className="bg-[#0b1a30]/90 border border-blue-900/60 rounded-lg p-2.5 flex flex-col justify-between">
                <div className="text-[11px] font-bold text-white truncate">{st.state}</div>
                <div className="text-xs font-extrabold text-cyan-300 mt-1">
                  {st.currentPrecipitationMm} mm/h
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
                  <span>🌧️</span>
                  <span>{st.status}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 7. SECTION: ISRO GSLV-F17 / EOS-05 EARTH-OBSERVATION SHOWCASE */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="space-tech" className="py-20 bg-[#060e1b] border-b border-blue-900/50 relative overflow-hidden">
        
        {/* Subtle aerospace glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-3xl -translate-y-1/2 pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 blur-3xl -translate-y-1/2 pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Top Aerospace Badge & Quote */}
          <div className="text-center max-w-4xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>ISRO Earth Observation Future Horizon</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 italic leading-relaxed">
              “A future-ready pathway for integrating Earth-observation intelligence into regional logistics and accessibility monitoring.”
            </h2>
          </div>

          {/* Two-Column Showcase: Left Video / Right Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            
            {/* LEFT COLUMN: GSLV-F17 / EOS-05 VIDEO PLAYER CONTAINER (6 of 12) */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#0e1e36] to-[#071224] border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-950/40 relative group">
              
              {/* Telemetry HUD Top Strip */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-900/70 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-cyan-300 font-bold">VEHICLE: GSLV-F17</span>
                </div>
                <div className="text-slate-400">
                  PAYLOAD: <strong className="text-white">EOS-05</strong>
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-blue-900/90">
                {hasVideoFile ? (
                  <video
                    ref={videoRef}
                    src="/gslv-eos05.mp4"
                    loop
                    muted={isMuted}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* High-Tech Aerospace Launch Telemetry Simulation Graphic when video is pending upload */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d274c] via-[#071328] to-[#020712]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    {/* Rocket Icon & Orbital Radii */}
                    <div className="relative z-10 w-24 h-24 rounded-full border border-cyan-400/40 flex items-center justify-center bg-blue-950/60 shadow-lg shadow-cyan-500/20">
                      <Satellite className="w-12 h-12 text-cyan-300 animate-pulse" />
                    </div>

                    <div className="relative z-10 mt-4 space-y-1">
                      <div className="text-sm font-extrabold text-white tracking-wider">
                        GSLV-F17 • EOS-05 MISSION READY
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono">
                        Sub-meter Synthetic Aperture Radar (SAR) Telemetry
                      </div>
                      <div className="text-[10px] text-slate-400 max-w-xs mx-auto pt-1">
                        Place your launch video file at <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">public/gslv-eos05.mp4</code> to stream live playback.
                      </div>
                    </div>

                    {/* HUD Coordinates Overlay */}
                    <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400">
                      ALT: 528 KM • INCL: 97.5°
                    </div>
                    <div className="absolute bottom-2 right-3 text-[9px] font-mono text-emerald-400">
                      STATUS: TELEMETRY READY
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleVideoMute}
                    className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

              {/* Bottom Specs Ticker */}
              <div className="mt-3 pt-3 border-t border-blue-900/70 flex flex-wrap items-center justify-between text-[11px] text-slate-300">
                <span>Satellite: <strong>Earth Observation Satellite-05</strong></span>
                <span className="text-cyan-400 font-mono">Payload: C-Band Active SAR</span>
              </div>

            </div>

            {/* RIGHT COLUMN: GSLV-F17 / EOS-05 STRATEGIC NARRATIVE (6 of 12) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono mb-1">
                  ISRO Launch Capability
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  GSLV-F17 / EOS-05
                </h3>
                <p className="text-base text-blue-300 font-medium mt-1">
                  India's Earth-observation capability for a more connected Northeast
                </p>
              </div>

              {/* TODAY vs TOMORROW Strategic Comparison Cards */}
              <div className="space-y-3.5">
                
                {/* TODAY CARD */}
                <div className="bg-[#0b1a30] border-l-4 border-l-blue-500 border border-blue-900/60 rounded-xl p-4 shadow-md space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
                      TODAY
                    </span>
                    <span className="text-xs font-bold text-white">Integrated Multi-Source Ground Intelligence</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    NER-LOGIX integrates available geospatial, weather, infrastructure and field intelligence.
                  </p>
                </div>

                {/* TOMORROW CARD */}
                <div className="bg-gradient-to-r from-[#0c2448] to-[#0b1a30] border-l-4 border-l-cyan-400 border border-cyan-500/40 rounded-xl p-4 shadow-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono">
                      TOMORROW
                    </span>
                    <span className="text-xs font-bold text-white">Next-Generation Earth Observation Downlink</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Earth-observation data can further strengthen regional monitoring, disruption assessment and accessibility intelligence.
                  </p>
                </div>

              </div>

              {/* 3 Space-Tech Capabilities */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11.5px]">
                <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg">
                  <div className="text-cyan-400 font-bold">Cloud Penetration</div>
                  <div className="text-slate-400 text-[10.5px] mt-0.5">24/7 radar sees through thick monsoon fog</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg">
                  <div className="text-cyan-400 font-bold">Slope Deformation</div>
                  <div className="text-slate-400 text-[10.5px] mt-0.5">Millimeter-scale satellite interferometry</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg">
                  <div className="text-cyan-400 font-bold">Frontier Security</div>
                  <div className="text-slate-400 text-[10.5px] mt-0.5">Continuous surveillance across 5,182 km border</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 8. SECTION: ROLE-BASED PORTALS (Access Pathways) */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <section id="portals" className="py-20 bg-[#050c18] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Operational Gateways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              One Unified System • Role-Based Portals
            </h2>
            <p className="text-sm text-slate-400">
              Designed for seamless coordination between Central Ministries, State Control Rooms, and Boots on the Ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Portal 1: Government Command Center */}
            <div 
              onClick={() => navigate('/government-command-center')}
              className="bg-[#0b1a30] hover:bg-[#0f2340] border border-blue-900/70 hover:border-blue-500/70 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Executive Command Center
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For Chief Ministers, Ministry of DoNER, NEC Secretaries, and Highway Directors. High-level regional accessibility indices, Doppler radar monitoring, and clearance authorizations.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-cyan-300">
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 2: Field Operations & Ground Reporting */}
            <div 
              onClick={() => navigate('/incidents')}
              className="bg-[#0b1a30] hover:bg-[#0f2340] border border-blue-900/70 hover:border-amber-500/70 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Field Operations &amp; Verification
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For Border Roads Organisation (BRO), State PWD, and District Disaster Management Units. Rapid mobile reporting of landslide cuts, GPS verification, and clearance dispatch logging.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>Access Field Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 3: Logistics & Freight Monitoring */}
            <div 
              onClick={() => navigate('/logistics')}
              className="bg-[#0b1a30] hover:bg-[#0f2340] border border-blue-900/70 hover:border-cyan-500/70 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Logistics &amp; Fleet Telematics
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For convoy operators, emergency medical transports, fuel supply chains, and civil food supplies. Tracking transit speeds, detour advisories, and vehicle status across corridors.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                <span>View Logistics Hub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* 9. SOVEREIGN GOVERNMENT FOOTER WITH PROJECT INFO & TEAM SECTION */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <footer id="team" className="bg-[#040813] text-slate-400 pt-16 pb-12 border-t border-blue-900/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* LEFT SIDE: Project Related Info (4 of 12) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-slate-900 border border-blue-800/60 rounded-md">
                  <EmblemOfIndia className="h-7 w-auto filter invert brightness-200" />
                </div>
                <NerLogixLogo variant="white" className="h-6" />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>NER-LOGIX</strong> is the unified sovereign logistics, route intelligence, and accessibility command platform for India’s eight North Eastern states (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura).
              </p>

              <div className="text-[11px] text-slate-500 space-y-1">
                <div>• Autonomous Public Prototype &amp; Operational Evaluation</div>
                <div>• Multi-Agency Geospatial Standard • Open-Meteo &amp; IMD Telemetry</div>
                <div>• Zero API Key Watermarks • 100% Free Open GIS Infrastructure</div>
              </div>
            </div>

            {/* MIDDLE: Quick Navigation Links (2 of 12) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-xs font-extrabold text-white tracking-wider uppercase font-mono">
                Platform
              </div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigate('/government-command-center')} className="hover:text-white transition-colors cursor-pointer">Command Center</button></li>
                <li><button onClick={() => navigate('/live-map')} className="hover:text-white transition-colors cursor-pointer">Live GIS Map</button></li>
                <li><button onClick={() => navigate('/route-intelligence')} className="hover:text-white transition-colors cursor-pointer">Route Intelligence</button></li>
                <li><button onClick={() => navigate('/incidents')} className="hover:text-white transition-colors cursor-pointer">Incident Reporting</button></li>
                <li><button onClick={() => navigate('/alerts')} className="hover:text-white transition-colors cursor-pointer">Emergency Alerts</button></li>
                <li><button onClick={() => navigate('/analytics')} className="hover:text-white transition-colors cursor-pointer">Regional Analytics</button></li>
              </ul>
            </div>

            {/* RIGHT SIDE: TEAM NAMES & ROLES INSIDE USER-REQUESTED BOX (6 of 12) */}
            <div className="lg:col-span-6">
              
              {/* THE EXACT FRAMED RED BOX SECTION REQUESTED BY USER */}
              <div className="bg-[#0b1a30]/90 border-2 border-blue-500/60 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                
                {/* Subtle corner badge */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-blue-900/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                      Project Team &amp; Engineering Leadership
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                    NER-LOGIX ARCHITECTS
                  </span>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Member 1: Lead Architect */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-sm shrink-0">
                      J
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Jayasimha</div>
                      <div className="text-[11px] text-cyan-300 font-semibold mt-0.5">Project Lead &amp; System Architect</div>
                      <div className="text-[10px] text-slate-400 mt-1">Full-Stack Architecture, GIS Pipelines &amp; Core Engine</div>
                    </div>
                  </div>

                  {/* Member 2: GIS Specialist */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-sm shrink-0">
                      T
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Team Member 2</div>
                      <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">GIS &amp; Cartography Specialist</div>
                      <div className="text-[10px] text-slate-400 mt-1">OpenStreetMap Vectors, Highway Topology &amp; Coordinates</div>
                    </div>
                  </div>

                  {/* Member 3: UI/UX & Frontend */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
                      T
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Team Member 3</div>
                      <div className="text-[11px] text-purple-300 font-semibold mt-0.5">Frontend &amp; UI/UX Engineer</div>
                      <div className="text-[10px] text-slate-400 mt-1">Sovereign Command Design System &amp; Responsive Layouts</div>
                    </div>
                  </div>

                  {/* Member 4: Telemetry & Infrastructure */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0">
                      T
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Team Member 4</div>
                      <div className="text-[11px] text-amber-300 font-semibold mt-0.5">Telemetry &amp; Data Engineer</div>
                      <div className="text-[10px] text-slate-400 mt-1">IMD Doppler Radar Gateway &amp; Real-time APIs</div>
                    </div>
                  </div>

                </div>

                {/* Team Footer Note */}
                <div className="mt-3.5 pt-2.5 border-t border-blue-900/50 flex items-center justify-between text-[10.5px] text-slate-400">
                  <span>Collaborative Innovation for Northeast Connectivity</span>
                  <span className="text-blue-400 font-mono">NER-LOGIX v1.0</span>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              © 2026 NER-LOGIX • Developed for North Eastern Region Logistics &amp; Frontier Intelligence.
            </div>
            <div className="flex items-center gap-4 text-[11.5px]">
              <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Gov.in Architecture</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">DoNER Compliance</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
