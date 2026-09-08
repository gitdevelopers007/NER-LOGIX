import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isCompact, setIsCompact] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Reveal animation with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Check for custom video file
    fetch('/gslv-eos05.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasVideo(true);
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-[#0b1d2d] font-sans antialiased selection:bg-[#24d6ad] selection:text-[#06231e]">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. TOP NAVBAR */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#081825]/92 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          isCompact ? 'py-2.5 shadow-md' : 'py-4'
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
          
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3 text-white font-extrabold tracking-wide select-none group">
            <span className="w-7 h-7 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
                <path d="M3 34 18 7l7 12 5-8 8 23H3Z" fill="#24d6ad" />
                <path d="m18 7 7 12-9 4-4-7Z" fill="#77f3d8" />
              </svg>
            </span>
            <span className="text-base sm:text-lg font-black tracking-wider text-white">NER-LOGIX</span>
            <small className="hidden sm:block text-[10px] leading-tight text-[#aebdca] font-normal border-l border-[#536471] pl-3 max-w-[175px]">
              Northeast Logistics &amp;<br />Accessibility Intelligence
            </small>
          </a>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-[13px] text-[#c9d4dc]">
            <a href="#vision" className="hidden md:inline-block hover:text-white transition-colors">Platform</a>
            <a href="#challenge" className="hidden md:inline-block hover:text-white transition-colors">About</a>
            <a href="#future" className="hidden md:inline-block hover:text-white transition-colors">EOS-05</a>
            <a href="#team" className="hidden md:inline-block hover:text-white transition-colors">Team</a>
            
            <button
              onClick={() => navigate('/access-portal')}
              className="px-4 py-2 border border-[#6c8493] hover:border-white text-white font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Enter Platform</span>
              <span>→</span>
            </button>
          </nav>

        </div>
      </header>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section 
        id="top"
        className="relative min-h-[700px] pt-28 pb-16 text-white overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 82% 38%, rgba(36,214,173,0.12), transparent 28%),
            linear-gradient(90deg, rgba(5,20,31,0.96) 0%, rgba(5,20,31,0.84) 48%, rgba(5,20,31,0.46) 100%),
            linear-gradient(135deg, #0a2636, #123b50 55%, #071a27)
          `
        }}
      >
        {/* Subtle grid background mask */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '70px 70px'
          }}
        />

        <div className="relative max-w-[1180px] mx-auto px-6 sm:px-8 min-h-[580px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-5 reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#24d6ad] uppercase">
              Northeast India
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-[-0.04em] leading-[0.98] text-white">
              INTELLIGENCE FOR <br />
              <span className="text-[#24d6ad]">EVERY ROUTE.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#d1dce3] max-w-[500px] leading-relaxed">
              AI-powered logistics and accessibility intelligence for the North Eastern Region.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => navigate('/access-portal')}
                className="px-6 py-3.5 bg-[#24d6ad] hover:bg-[#1fd0a7] text-[#06231e] font-extrabold text-xs tracking-wider rounded-lg shadow-lg hover:shadow-[#24d6ad]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                ENTER PLATFORM →
              </button>
              <a
                href="#challenge"
                className="px-6 py-3.5 border border-[#6c8493] hover:border-white text-white font-bold text-xs tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center"
              >
                EXPLORE NER ↓
              </a>
            </div>
          </div>

          {/* Right Hero GIS Vector Map */}
          <div className="lg:col-span-6 flex items-center justify-center relative reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            
            {/* Circular halo behind map */}
            <div className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full border border-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(24,181,154,0.12),transparent_68%)]"></div>

              {/* Exact Stylized SVG Map of Northeast India */}
              <svg 
                className="w-full max-w-[520px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] relative z-10" 
                viewBox="0 0 560 560" 
                aria-label="Stylized Northeast India GIS visualization"
              >
                {/* Region Polygon */}
                <path 
                  className="fill-[rgba(29,142,126,0.35)] stroke-[#74f0d4] stroke-[2]" 
                  d="M175 74 235 54 290 80 330 64 371 94 421 88 451 126 431 165 463 197 440 231 457 272 423 300 430 345 394 365 379 411 337 398 306 431 269 407 242 425 217 389 183 386 170 350 139 336 150 299 119 270 136 232 114 197 147 171 139 130Z"
                />

                {/* Road Corridor Lines with animated dashes */}
                <path 
                  className="fill-none stroke-[#d9fff6] stroke-[2] opacity-80" 
                  strokeDasharray="8 8"
                  d="M168 112 C235 156 287 128 347 165 S401 239 366 286 300 347 257 391"
                />
                <path 
                  className="fill-none stroke-[#d9fff6] stroke-[2] opacity-80" 
                  strokeDasharray="8 8"
                  d="M145 222 C210 210 267 248 318 222 S389 188 440 205"
                />
                <path 
                  className="fill-none stroke-[#d9fff6] stroke-[2] opacity-80" 
                  strokeDasharray="8 8"
                  d="M221 84 C212 150 239 190 221 244 S202 323 247 401"
                />
                <path 
                  className="fill-none stroke-[#d9fff6] stroke-[2] opacity-80" 
                  strokeDasharray="8 8"
                  d="M310 90 C298 145 332 180 319 232 S348 303 392 352"
                />

                {/* Capital & Corridor Nodes */}
                <g>
                  <circle cx="177" cy="113" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="239" cy="151" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="337" cy="165" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="420" cy="151" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="367" cy="286" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="258" cy="248" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="221" cy="322" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="309" cy="366" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                  <circle cx="394" cy="352" r="6" className="fill-[#24d6ad] stroke-white stroke-[2]" />
                </g>

                {/* State Labels */}
                <text x="390" y="108" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">ARUNACHAL PRADESH</text>
                <text x="315" y="140" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">ASSAM</text>
                <text x="116" y="205" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">MEGHALAYA</text>
                <text x="385" y="218" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">NAGALAND</text>
                <text x="384" y="258" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">MANIPUR</text>
                <text x="353" y="330" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">MIZORAM</text>
                <text x="120" y="292" className="fill-[#d6e3e9] text-[11px] font-bold tracking-wider">TRIPURA</text>
              </svg>

            </div>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. SECTION: THE CHALLENGE */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="challenge" className="py-24 bg-[#f5f7f6]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#24d6ad] uppercase">
              The Challenge
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[1.04] text-[#0b1d2d] mt-3 mb-5">
              THE NORTHEAST IS CONNECTED BY COMPLEX ROUTES.
            </h2>
            <p className="text-base sm:text-lg text-[#5d6f7d] leading-relaxed">
              Difficult terrain, extreme weather, remote locations and infrastructure disruptions can make movement across the region unpredictable.
            </p>
          </div>

          {/* Right Disruption Flow */}
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              <div className="border-t-2 border-[#0b1d2d] pt-4 font-black text-xs uppercase tracking-wider text-[#0b1d2d]">
                <span className="block text-[#70818e] text-2xl mb-2 font-light">⌁</span>
                Difficult<br />Terrain
              </div>

              <div className="border-t-2 border-[#0b1d2d] pt-4 font-black text-xs uppercase tracking-wider text-[#0b1d2d]">
                <span className="block text-[#70818e] text-2xl mb-2 font-light">☁</span>
                Extreme<br />Weather
              </div>

              <div className="border-t-2 border-[#0b1d2d] pt-4 font-black text-xs uppercase tracking-wider text-[#0b1d2d]">
                <span className="block text-[#70818e] text-2xl mb-2 font-light">⌁</span>
                Limited<br />Connectivity
              </div>

              <div className="border-t-2 border-[#0b1d2d] pt-4 font-black text-xs uppercase tracking-wider text-[#0b1d2d]">
                <span className="block text-[#70818e] text-2xl mb-2 font-light">△</span>
                Road<br />Disruptions
              </div>

              <div className="col-span-full py-2 text-[#71818c] text-2xl font-light">
                ↓
              </div>

              <div className="col-span-full bg-[#0b1d2d] text-white rounded-full py-3.5 px-6 font-extrabold text-xs tracking-widest uppercase shadow-md">
                MOVEMENT GETS DISRUPTED
              </div>

            </div>

            <p className="text-xs sm:text-sm text-[#5c6f7c] text-center max-w-[540px] mx-auto mt-4 leading-relaxed">
              Essential goods can be delayed. Routes can become inaccessible. Decision-making becomes harder when conditions change.
            </p>
          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. SECTION: OUR VISION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section 
        id="vision" 
        className="py-24 bg-[#0b1d2d] text-white relative overflow-hidden"
      >
        <div 
          className="absolute right-[-8%] top-[-30%] w-[60%] h-[150%] pointer-events-none opacity-30 transform -skew-x-12"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(36,214,173,0.12))'
          }}
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#24d6ad] uppercase">
              Our Vision
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[1.04] text-white mt-3 mb-5">
              ONE CONNECTED VIEW OF THE REGION.
            </h2>
            <p className="text-base sm:text-lg text-[#b7c6cf] leading-relaxed">
              NER-LOGIX brings together regional geospatial intelligence, environmental conditions, field observations and logistics visibility to support better decisions across the Northeast.
            </p>

            <button
              onClick={() => navigate('/access-portal')}
              className="mt-6 px-6 py-3.5 bg-[#24d6ad] hover:bg-[#1fd0a7] text-[#06231e] font-extrabold text-xs tracking-wider rounded-lg shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>ENTER NER-LOGIX</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Visual Graphic */}
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            <div className="h-[340px] border border-white/12 rounded-xl bg-gradient-to-br from-[#0e2c3d] to-[#153f50] relative overflow-hidden shadow-2xl">
              
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 70% 25%, rgba(255,255,255,0.12), transparent 18%),
                    linear-gradient(160deg, transparent 44%, rgba(255,255,255,0.08) 45%, transparent 46%),
                    linear-gradient(20deg, transparent 51%, rgba(36,214,173,0.55) 52%, transparent 53%)
                  `
                }}
              />

              {/* Road line curve */}
              <div className="absolute w-[80%] h-[100px] border-t-4 border-[#d7e5e2] rounded-[50%] right-[-10%] bottom-[8%] transform -rotate-8" />
              
              <div className="absolute bottom-5 left-6 text-[11px] font-mono tracking-widest text-[#24d6ad] uppercase">
                // NER-LOGIX GEOSPATIAL CORRIDOR INTELLIGENCE
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. SECTION: WHY NER-LOGIX */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#0e8d78] uppercase">
              Why NER-LOGIX
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[1.04] text-[#0b1d2d] mt-3">
              AN INTELLIGENCE LAYER, NOT JUST ANOTHER MAP.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 border-t border-b border-[#d8e0e5] divide-y sm:divide-y-0 sm:divide-x divide-[#d8e0e5] reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            
            <article className="p-7 sm:py-9 space-y-2">
              <div className="text-2xl text-[#0e8d78] font-bold">◈</div>
              <h3 className="text-sm font-black tracking-wider text-[#0b1d2d] uppercase">AI</h3>
              <p className="text-xs sm:text-[13px] text-[#667886] leading-relaxed">
                Understand changing conditions and potential disruption.
              </p>
            </article>

            <article className="p-7 sm:py-9 space-y-2">
              <div className="text-2xl text-[#0e8d78] font-bold">⌖</div>
              <h3 className="text-sm font-black tracking-wider text-[#0b1d2d] uppercase">GIS</h3>
              <p className="text-xs sm:text-[13px] text-[#667886] leading-relaxed">
                See accessibility and connectivity in geographic context.
              </p>
            </article>

            <article className="p-7 sm:py-9 space-y-2">
              <div className="text-2xl text-[#0e8d78] font-bold">◎</div>
              <h3 className="text-sm font-black tracking-wider text-[#0b1d2d] uppercase">FIELD INTELLIGENCE</h3>
              <p className="text-xs sm:text-[13px] text-[#667886] leading-relaxed">
                Bring ground-level observations into the regional picture.
              </p>
            </article>

            <article className="p-7 sm:py-9 space-y-2">
              <div className="text-2xl text-[#0e8d78] font-bold">◇</div>
              <h3 className="text-sm font-black tracking-wider text-[#0b1d2d] uppercase">LOGISTICS</h3>
              <p className="text-xs sm:text-[13px] text-[#667886] leading-relaxed">
                Understand how disruptions affect movement and essential supplies.
              </p>
            </article>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. SECTION: FUTURE READY / EOS-05 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section 
        id="future"
        className="py-24 text-white bg-gradient-to-r from-[#081b29] to-[#102e3d]"
      >
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#24d6ad] uppercase">
              Future Ready / EOS-05
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[1.04] text-white mt-3 mb-5">
              BUILT FOR TODAY.<br />
              <span className="text-[#24d6ad]">READY FOR TOMORROW.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#bdcbd2] leading-relaxed">
              Future integration of additional Earth-observation and geospatial data can further strengthen regional monitoring, disruption assessment and accessibility intelligence.
            </p>
          </div>

          {/* Right Video / Interactive Placeholder */}
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            <div 
              onClick={handleVideoClick}
              className="min-h-[340px] border border-white/16 rounded-xl relative bg-[#102c3a] flex items-center justify-center overflow-hidden shadow-2xl group cursor-pointer"
            >
              {hasVideo ? (
                <video
                  ref={videoRef}
                  src="/gslv-eos05.mp4"
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute text-7xl font-black text-white/[0.04] transform -rotate-12 select-none">
                    EOS-05
                  </div>
                  <div className="w-[72px] h-[72px] rounded-full border border-white/45 flex items-center justify-center text-2xl text-white bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors z-10 shadow-lg">
                    {isPlaying ? '❚❚' : '▶'}
                  </div>
                </>
              )}

              <div className="absolute left-5 bottom-4 text-[11px] tracking-[0.1em] text-[#b9c9d2] uppercase font-mono">
                GSLV-F17 / EOS-05 · Earth Observation
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 7. SECTION: TEAM */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#0e8d78] uppercase">
              Team
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[1.04] text-[#0b1d2d] mt-3 mb-2">
              BUILT BY A TEAM THAT <span className="text-[#0e8d78]">CARES.</span>
            </h2>
            <p className="text-base text-[#5d6f7d]">
              Six members. One connected platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-12 reveal-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-150">
            
            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                SG
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">SAI GANESH</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">Team Lead &amp; System Integration</span>
            </article>

            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                KR
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">KOUSHIK RAHUL</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">AI &amp; Disruption Intelligence</span>
            </article>

            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                03
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">TEAM MEMBER</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">GIS &amp; Route Intelligence</span>
            </article>

            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                04
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">TEAM MEMBER</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">Government Command Dashboard</span>
            </article>

            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                05
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">TEAM MEMBER</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">Logistics &amp; Vehicle Tracking</span>
            </article>

            <article className="border border-[#d8e0e5] p-6 rounded-lg min-h-[145px] hover:border-[#0e8d78] transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#dfe8ec] flex items-center justify-center mb-4 text-[#587080] font-black text-sm">
                06
              </div>
              <strong className="block text-sm font-bold text-[#0b1d2d]">TEAM MEMBER</strong>
              <span className="text-xs text-[#6b7c87] mt-0.5 block">Field Intelligence &amp; Alerts</span>
            </article>

          </div>

        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8. SECTION: CLOSING CALL TO ACTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section 
        id="platform"
        className="py-28 bg-[#0a1f2e] text-white text-center relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 50% 100%, rgba(36,214,173,0.15), transparent 50%),
            linear-gradient(180deg, rgba(10,31,46,0.92), rgba(10,31,46,0.98))
          `
        }}
      >
        <div className="relative max-w-[1180px] mx-auto px-6 sm:px-8 space-y-4">
          <div className="text-[11px] tracking-[0.28em] font-extrabold text-[#24d6ad] uppercase">
            NER-LOGIX
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-[-0.04em] text-white max-w-[760px] mx-auto leading-tight">
            MAKING THE NORTHEAST MORE CONNECTED.
          </h2>
          <p className="text-base sm:text-lg text-[#b8c7cf] max-w-[580px] mx-auto">
            Understand the disruption. Find the better route. Keep essential movement moving.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate('/access-portal')}
              className="px-7 py-3.5 bg-[#24d6ad] hover:bg-[#1fd0a7] text-[#06231e] font-black text-xs tracking-wider rounded-lg shadow-lg hover:shadow-[#24d6ad]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              ENTER PLATFORM →
            </button>
          </div>
        </div>
      </section>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 9. FOOTER */}
      {/* ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#071824] text-[#aab8c0] border-t border-white/8 py-10">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div>
              <strong className="text-white text-base font-extrabold tracking-wider">NER-LOGIX</strong>
              <div className="text-xs text-[#c0cdd6] mt-1 font-medium">
                Northeast Logistics &amp; Accessibility Intelligence Platform
              </div>
              <div className="text-xs text-[#8a9ca7] mt-2.5 max-w-[390px] leading-relaxed">
                AI-powered logistics and accessibility intelligence for the North Eastern Region.
              </div>
            </div>

            <nav className="flex items-center gap-6 text-xs text-[#c9d4dc]">
              <a href="#vision" className="hover:text-white transition-colors">Platform</a>
              <a href="#team" className="hover:text-white transition-colors">Team</a>
              <button onClick={() => navigate('/access-portal')} className="hover:text-white transition-colors cursor-pointer font-semibold">
                Enter Platform
              </button>
            </nav>
          </div>

          <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#788a96] gap-2">
            <span>Built for the North Eastern Region</span>
            <span>© 2026 NER-LOGIX</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
