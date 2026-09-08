import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, HelpCircle, LogIn, 
  AlertTriangle, HardHat, BookOpen, Layers,
  Compass, Radio, Cpu, Satellite, CheckCircle2,
  ChevronDown, Play, Pause, Volume2, VolumeX, Maximize2
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#0c2340] font-sans antialiased selection:bg-[#1a56db] selection:text-white scroll-smooth">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. TOP NAVBAR (Exact match to reference mockup) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className={`w-full bg-[#0c2340] text-white px-4 sm:px-8 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg bg-[#0c2340]/95 backdrop-blur-md' : 'py-2.5 shadow-md'}`}>
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Mountain Logo + NER-LOGIX + Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <NerLogixLogo variant="white" className="h-7 w-auto" />
            
            {/* Divider line */}
            <div className="h-7 w-[1px] bg-slate-500/60 hidden sm:block mx-0.5"></div>
            
            {/* Subtitle */}
            <div className="hidden sm:flex flex-col text-[11px] leading-[1.2] text-slate-300 font-normal">
              <span>North Eastern Region Logistics &amp;</span>
              <span>Accessibility Intelligence</span>
            </div>
          </div>

          {/* Center Quick Anchors for the 6 Slides (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#challenge" className="hover:text-white transition-colors">The Challenge</a>
            <a href="#vision" className="hover:text-white transition-colors">Vision</a>
            <a href="#why" className="hover:text-white transition-colors">Why NER-LOGIX</a>
            <a href="#future" className="hover:text-white transition-colors">EOS-05 Ready</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
          </nav>

          {/* Right: System Online + Help + Enter Platform Button */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-200">
            
            {/* System Online Status */}
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399] animate-pulse"></span>
              <span className="hidden sm:inline text-slate-300">System Online</span>
            </div>

            {/* Help Button */}
            <button 
              onClick={() => alert('NER-LOGIX Help & Documentation: Operational control contact at support.ner@gov.in')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline font-medium">Help</span>
            </button>

            {/* Enter Platform Button (Exact outlined button from screenshot) */}
            <button
              onClick={() => navigate('/access-portal')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-400/60 hover:border-white text-white text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Enter Platform</span>
              <span className="text-[13px] leading-none">→</span>
            </button>

          </div>

        </div>
      </header>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 1: HERO SECTION (Exact layout & copy from screenshot) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="top" className="max-w-[1360px] w-full mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-10 flex flex-col justify-between">
        
        {/* Top Split Area: Left Copy + Right 3D Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (5 of 12) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Tag with horizontal line */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#1a56db]">
                SMART LOGISTICS PLATFORM
              </span>
              <div className="h-[2px] w-10 bg-[#1a56db]"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0c2340] tracking-tight leading-[1.12]">
              North Eastern Region Logistics &amp;<br />
              Accessibility Intelligence
            </h1>

            {/* Blue Sub-headline */}
            <div className="text-xl sm:text-2xl font-bold text-[#1a56db] tracking-tight">
              Smarter Access. Safer Routes. Stronger Connectivity.
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed pt-1">
              Government-grade logistics and accessibility intelligence for India's North Eastern Region.
            </p>

            {/* Action Buttons (Exact two buttons from screenshot) */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              
              {/* Button 1: Solid Blue ENTER PLATFORM */}
              <button
                onClick={() => navigate('/access-portal')}
                className="px-6 py-3.5 bg-[#0066d6] hover:bg-[#0055b8] active:bg-[#00479e] text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER PLATFORM</span>
                <span className="text-sm">→</span>
              </button>

              {/* Button 2: White with Blue Outline EXPLORE REGION */}
              <button
                onClick={() => navigate('/live-map')}
                className="px-6 py-3.5 bg-white hover:bg-blue-50/60 active:bg-blue-100/60 border border-[#1a56db] text-[#1a56db] font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center gap-2.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#1a56db]" />
                <span>EXPLORE REGION</span>
              </button>

            </div>

          </div>

          {/* Right Column: 3D Relief Terrain Map of Northeast India (7 of 12) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="relative w-full max-w-[680px] drop-shadow-xl transition-transform hover:scale-[1.01] duration-300 select-none">
              <img 
                src="/northeast-3d-map.png" 
                alt="North Eastern Region 3D GIS Accessibility Map" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

        </div>


        {/* 4 FEATURE CARDS (Exact match to screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-4">
          
          {/* CARD 1: Regional Connectivity */}
          <div 
            onClick={() => navigate('/route-intelligence')}
            className="bg-white hover:bg-blue-50/30 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19L8 5H16L20 19" />
                  <line x1="12" y1="8" x2="12" y2="11" strokeDasharray="2 2" />
                  <line x1="12" y1="14" x2="12" y2="17" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-[#1a56db] transition-colors truncate">
                  Regional Connectivity
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Monitor road networks, bridges and critical corridors.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 2: Live Accessibility */}
          <div 
            onClick={() => navigate('/live-map')}
            className="bg-white hover:bg-emerald-50/30 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-emerald-600 transition-colors truncate">
                  Live Accessibility
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Real-time road status, disruptions and accessibility levels.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 3: Risk Intelligence */}
          <div 
            onClick={() => navigate('/alerts')}
            className="bg-white hover:bg-amber-50/30 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-amber-600 transition-colors truncate">
                  Risk Intelligence
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Weather, landslide, flood and incident risk analysis.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 4: Field Operations */}
          <div 
            onClick={() => navigate('/incidents')}
            className="bg-white hover:bg-sky-50/30 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <HardHat className="w-5 h-5 text-sky-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-sky-600 transition-colors truncate">
                  Field Operations
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Ground reports, incident updates and field intelligence.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 2: THE CHALLENGE (Problem Statement & Disruption Flow) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="challenge" className="w-full bg-slate-100/80 border-t border-b border-slate-200 py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-[0.2em] text-[#1a56db] uppercase">
                  The Challenge
                </span>
                <div className="h-[2px] w-8 bg-[#1a56db]"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0c2340] tracking-tight leading-[1.12]">
                THE NORTHEAST IS CONNECTED BY COMPLEX ROUTES.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Difficult terrain, extreme monsoon weather, remote mountain passes, and frequent infrastructure blockages can make movement across the region unpredictable.
              </p>

              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Why Conventional Maps Fall Short in NER
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Standard consumer navigation tools assume uninterrupted highways. They lack real-time landslide warnings, bridge weight limits, localized cloudburst forecasts, and single-artery fallback bypasses.
                </p>
              </div>
            </div>

            {/* Right Disruption Breakdown Grid */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              {/* 4 Factor Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="block text-2xl mb-1 text-slate-700">⛰️</span>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-[#0c2340]">Difficult<br />Terrain</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Steep passes &amp; gorges</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="block text-2xl mb-1 text-slate-700">🌧️</span>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-[#0c2340]">Extreme<br />Weather</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Flash floods &amp; rain</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="block text-2xl mb-1 text-slate-700">📶</span>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-[#0c2340]">Limited<br />Connectivity</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Single choke-point corridors</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="block text-2xl mb-1 text-slate-700">⚠️</span>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-[#0c2340]">Road<br />Disruptions</div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Landslips &amp; washouts</span>
                </div>

              </div>

              {/* Down Arrow */}
              <div className="flex justify-center text-slate-400">
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>

              {/* Disrupted Result Banner */}
              <div className="bg-[#0c2340] text-white rounded-xl p-4 text-center shadow-md">
                <div className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-amber-400">
                  MOVEMENT GETS DISRUPTED
                </div>
                <p className="text-xs text-slate-300 mt-1.5 max-w-lg mx-auto">
                  Essential medicines and food supplies get delayed. Strategic routes become impassable. Administrative decision-makers lack unified real-time visibility.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 3: OUR VISION (One Connected View of the Region) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="vision" className="w-full bg-[#0c2340] text-white py-20 relative overflow-hidden">
        
        {/* Background glow lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-[0.2em] text-[#60a5fa] uppercase">
                  Our Vision
                </span>
                <div className="h-[2px] w-8 bg-[#60a5fa]"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                ONE CONNECTED VIEW<br />
                <span className="text-[#60a5fa]">OF THE ENTIRE REGION.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                NER-LOGIX brings together regional geospatial intelligence, real-time meteorological conditions, field patrol observations, and logistics corridor telemetry into one unified operational command center.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-200">
                    <strong className="block text-white">Proactive Rerouting</strong>
                    Reroutes before vehicles enter impassable corridors.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-200">
                    <strong className="block text-white">Multi-Agency Coordination</strong>
                    Synchronizes police, disaster teams, and supply convoys.
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/live-map')}
                  className="px-6 py-3.5 bg-[#0066d6] hover:bg-[#0055b8] text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>LAUNCH REGIONAL GIS MAP</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Architecture Visual */}
            <div className="lg:col-span-6 space-y-3.5">
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">01</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Real-Time IMD Telemetry Layer</h4>
                      <p className="text-[11px] text-slate-400">Live Doppler precipitation monitoring across all 8 Northeastern states</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">ACTIVE</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">02</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Geospatial Highway &amp; Arterial Graph</h4>
                      <p className="text-[11px] text-slate-400">Siliguri Corridor, NH-27, NH-10, NH-29 with live accessibility indexing</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">INDEXED</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">03</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Predictive AI Disruption Engine</h4>
                      <p className="text-[11px] text-slate-400">Forecasts mudslides, flash floods, and bridge structural strain</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">AI ACTIVE</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">04</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Ground Patrol &amp; Checkpoint Network</h4>
                      <p className="text-[11px] text-slate-400">Instant verification by police, border posts, and field inspectors</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">CONNECTED</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 4: WHY NER-LOGIX (4 Pillars) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="why" className="w-full bg-white py-20 border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#1a56db] uppercase">
                Why NER-LOGIX
              </span>
              <div className="h-[2px] w-6 bg-[#1a56db]"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c2340] tracking-tight leading-[1.15]">
              AN INTELLIGENCE LAYER, NOT JUST ANOTHER MAP.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Unlike generic satellite views, NER-LOGIX is engineered specifically for the logistical constraints of Northeast India's critical lifelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            
            {/* Pillar 1: AI */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1a56db] flex items-center justify-center font-black text-xl mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0c2340] mb-2 uppercase tracking-wide">
                AI Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Machine learning models analyze slope saturation, precipitation spikes, and terrain stability to calculate risk before blockades occur.
              </p>
            </div>

            {/* Pillar 2: GIS */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0c2340] mb-2 uppercase tracking-wide">
                GIS Topography
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate geospatial representation of mountainous corridors, river bridges, bypass tunnels, and regional border check-points.
              </p>
            </div>

            {/* Pillar 3: Field Intelligence */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-105 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0c2340] mb-2 uppercase tracking-wide">
                Field Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ground-truth reports from district authorities, patrol units, and fleet operators verified instantly into the regional map.
              </p>
            </div>

            {/* Pillar 4: Strategic Logistics */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0c2340] mb-2 uppercase tracking-wide">
                Logistics Visibility
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitors essential supply convoys, medical shipments, and commercial transport to guarantee life-saving regional continuity.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 5: FUTURE-READY / EOS-05 EARTH OBSERVATION SHOWCASE */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="future" className="w-full bg-[#081b29] text-white py-20 border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-extrabold tracking-[0.2em] text-[#24d6ad] uppercase">
              Future Ready / Earth Observation
            </span>
            <div className="h-[2px] w-8 bg-[#24d6ad]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Quote & Details */}
            <div className="lg:col-span-6 space-y-6">
              
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.1]">
                BUILT FOR TODAY.<br />
                <span className="text-[#24d6ad]">READY FOR TOMORROW.</span>
              </h2>

              {/* Lead User Quote */}
              <blockquote className="border-l-4 border-[#24d6ad] pl-4 py-1 text-base sm:text-lg text-slate-200 italic font-medium">
                “A future-ready pathway for integrating Earth-observation intelligence into regional logistics and accessibility monitoring.”
              </blockquote>

              {/* ISRO Mission Tag */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-[#24d6ad] uppercase">
                  <Satellite className="w-4 h-4" />
                  Vehicle: GSLV-F17 | Payload: EOS-05
                </div>
                <div className="text-sm font-bold text-white">
                  India's Earth-observation capability for a more connected Northeast
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Next-generation Earth-observation radar telemetry provides day-and-night all-weather monitoring through cloud cover, ideal for high-precipitation terrain.
                </p>
              </div>

              {/* Today vs Tomorrow Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">Today</span>
                  <p className="text-xs text-slate-300 leading-snug">
                    NER-LOGIX integrates available geospatial, weather, infrastructure and field intelligence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-[#24d6ad]/40">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#24d6ad] block mb-1">Tomorrow</span>
                  <p className="text-xs text-slate-300 leading-snug">
                    Earth-observation data can further strengthen regional monitoring, disruption assessment and accessibility intelligence.
                  </p>
                </div>

              </div>

            </div>

            {/* Right Column: Video Container - High-Tech Space Mission Console */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="relative rounded-2xl border border-[#24d6ad]/40 bg-[#061624] p-2.5 sm:p-3 shadow-[0_0_50px_rgba(36,214,173,0.18)] overflow-hidden group">
                
                {/* Futuristic corner brackets */}
                <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#24d6ad] z-20 pointer-events-none"></div>
                <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#24d6ad] z-20 pointer-events-none"></div>
                <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#24d6ad] z-20 pointer-events-none"></div>
                <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#24d6ad] z-20 pointer-events-none"></div>

                {/* Video Player Card */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-inner cursor-pointer" onClick={handleVideoToggle}>
                  <video 
                    ref={videoRef}
                    src="/space-eye.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Glassmorphism HUD Overlay */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-10 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white uppercase drop-shadow-sm">
                        LIVE SATELLITE FEED • EOS-05
                      </span>
                    </div>
                    <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#24d6ad]/20 border border-[#24d6ad]/40 text-[#24d6ad] font-bold">
                      GSLV-F17
                    </div>
                  </div>

                  {/* Center Play/Pause button when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-[#24d6ad]/90 text-[#06231e] flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom HUD Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between z-10 select-none" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2.5">
                      {/* Play / Pause Toggle */}
                      <button 
                        onClick={handleVideoToggle}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>

                      {/* Mute / Unmute Toggle */}
                      <button 
                        onClick={handleMuteToggle}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-[#24d6ad]" />}
                      </button>

                      <span className="text-[10px] text-slate-300 font-mono tracking-wider hidden sm:inline">
                        EARTH OBSERVATION TELEMETRY
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleFullscreen}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Telemetry HUD Bar */}
                <div className="grid grid-cols-3 gap-2 mt-2.5 px-2 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono">SENSOR SUITE</span>
                    <span className="text-[11px] font-bold text-white font-mono">C-Band SAR</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono">ORBITAL ALTITUDE</span>
                    <span className="text-[11px] font-bold text-[#24d6ad] font-mono">520 km SSPO</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono">REVISIT CYCLE</span>
                    <span className="text-[11px] font-bold text-white font-mono">24h Rapid Pass</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-2 text-center flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#24d6ad]"></span>
                  <span>ALL-WEATHER RADAR SURVEILLANCE • PENETRATES RAIN &amp; CLOUDS</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* SLIDE 6: TEAM SECTION (The 6 Members as requested) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="team" className="w-full bg-white py-20 border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#1a56db] uppercase">
                The Engineering Team
              </span>
              <div className="h-[2px] w-6 bg-[#1a56db]"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c2340] tracking-tight">
              BUILT BY A TEAM THAT CARES.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Six dedicated members. One unified regional intelligence platform for the Northeast.
            </p>
          </div>

          {/* 6 Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            
            {/* Member 1: Sai Ganesh */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] transition-colors shadow-xs">
                  SG
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    SAI GANESH
                  </h3>
                  <div className="text-xs font-bold text-[#1a56db]">
                    Team Lead &amp; System Integration
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    System architecture, core backend integration, and regional platform deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 2: Koushik Rahul */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] transition-colors shadow-xs">
                  KR
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    KOUSHIK RAHUL
                  </h3>
                  <div className="text-xs font-bold text-[#1a56db]">
                    AI &amp; Disruption Intelligence
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Predictive disruption models, risk matrix scoring, and real-time rerouting algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 3: GIS */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                  03
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    TEAM MEMBER
                  </h3>
                  <div className="text-xs font-bold text-slate-700">
                    GIS &amp; Route Intelligence
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Geospatial network topology, digital elevation mapping, and corridor choke-point indexing.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 4: Command Center */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                  04
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    TEAM MEMBER
                  </h3>
                  <div className="text-xs font-bold text-slate-700">
                    Government Command Dashboard
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Executive multi-level RBAC portal, administrative analytics, and cross-department telemetry.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 5: Logistics & Fleets */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                  05
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    TEAM MEMBER
                  </h3>
                  <div className="text-xs font-bold text-slate-700">
                    Logistics &amp; Vehicle Tracking
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Fleet GPS integration, critical supply convoy scheduling, and bridge weight limits.
                  </p>
                </div>
              </div>
            </div>

            {/* Member 6: Field Intelligence */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1a56db] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-sm group-hover:bg-[#1a56db] group-hover:text-white transition-colors">
                  06
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0c2340] uppercase tracking-wide">
                    TEAM MEMBER
                  </h3>
                  <div className="text-xs font-bold text-slate-700">
                    Field Intelligence &amp; Alerts
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ground incident reporting verification, road blockade alerts, and emergency response feeds.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* FINAL CALL TO ACTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0c2340] text-white py-20 text-center relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-extrabold tracking-[0.2em] text-[#60a5fa] uppercase">
              NER-LOGIX PLATFORM
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            MAKING THE NORTHEAST MORE CONNECTED.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Understand the disruption. Find the better route. Keep essential movement moving across all 8 Northeastern states.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/access-portal')}
              className="px-8 py-4 bg-[#0066d6] hover:bg-[#0055b8] text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-xl hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>ENTER PLATFORM NOW</span>
              <span className="text-base">→</span>
            </button>
            <button
              onClick={() => navigate('/live-map')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE LIVE GIS MAP</span>
            </button>
          </div>
        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* CIVIC-SERVICE FOOTER (Matching media_1788866319186.png with red box area) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#081827] text-slate-300 border-t border-slate-800 pt-16 pb-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Left Column (5 of 12): Brand & Project info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <NerLogixLogo variant="white" className="h-8 w-auto" />
              </div>
              <div className="text-xs font-semibold text-slate-200">
                North Eastern Region Logistics &amp; Accessibility Intelligence
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                An advanced civic-tech intelligence initiative engineered for high-altitude connectivity, disaster resilience, and critical supply chain mobility across Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Operational Status: All Services Nominal</span>
              </div>
            </div>

            {/* Middle Column (3 of 12): Product & Modules */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Product Modules
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigate('/live-map')} className="hover:text-white transition-colors cursor-pointer text-left">Live Accessibility Map</button></li>
                <li><button onClick={() => navigate('/route-intelligence')} className="hover:text-white transition-colors cursor-pointer text-left">Corridor Route Intelligence</button></li>
                <li><button onClick={() => navigate('/alerts')} className="hover:text-white transition-colors cursor-pointer text-left">Risk &amp; Weather Alerts</button></li>
                <li><button onClick={() => navigate('/incidents')} className="hover:text-white transition-colors cursor-pointer text-left">Field Incident Reporting</button></li>
                <li><button onClick={() => navigate('/command-center')} className="hover:text-white transition-colors cursor-pointer text-left">Executive Command Center</button></li>
              </ul>
            </div>

            {/* Right Column (4 of 12): Red box area from media_1788866319186.png -> Team Credentials & Governance */}
            <div className="md:col-span-4 p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Engineering Team</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">6 MEMBERS</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Sai Ganesh</span>
                  <span className="text-[11px] text-slate-400">Team Lead &amp; Integration</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Koushik Rahul</span>
                  <span className="text-[11px] text-slate-400">AI &amp; Disruption Intelligence</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>GIS &amp; Routes Team</span>
                  <span className="text-[11px] text-slate-500">Route Topography</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Logistics &amp; Field Ops</span>
                  <span className="text-[11px] text-slate-500">Field Telemetry</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Government RBAC
                </span>
                <button
                  onClick={() => navigate('/access-portal')}
                  className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  Access Portal →
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Copyright & Security Notice */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 NER-LOGIX • North Eastern Region Logistics &amp; Accessibility Intelligence
            </div>
            <div className="flex items-center gap-4">
              <span>Secure Government Platform</span>
              <span>•</span>
              <span>Data access is based on user role and authorization</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
