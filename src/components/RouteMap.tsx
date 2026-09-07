import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Search, Layers, Plus, Minus, Crosshair, ChevronDown, Maximize,
  CloudRain, Waves, Mountain, AlertTriangle, Route
} from 'lucide-react';

interface RouteMapProps {
  selectedRoute: 'current' | 'alt1' | 'alt2';
  onSelectRoute: (route: 'current' | 'alt1' | 'alt2') => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  selectedRoute,
  onSelectRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const satelliteTileRef = useRef<L.TileLayer | null>(null);
  const terrainTileRef = useRef<L.TileLayer | null>(null);

  const [layersOpen, setLayersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBaseMap, setActiveBaseMap] = useState<'satellite' | 'map'>('satellite');
  const [activePill, setActivePill] = useState<string>('incidents');

  const [layers, setLayers] = useState({
    districtBoundaries: true,
    currentRoute: true,
    alt1Route: true,
    alt2Route: true,
    fieldIncidents: true,
    weather: true,
    landslideRisk: true,
    traffic: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered between Guwahati (26.14, 91.73) and Itanagar (27.08, 93.60)
    const map = L.map(mapContainerRef.current, {
      center: [26.65, 92.75],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
      minZoom: 6,
      maxZoom: 14,
    });

    mapInstanceRef.current = map;

    // 1. Esri World Imagery Satellite Tiles
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Esri Satellite',
      }
    );
    satelliteTileRef.current = satelliteLayer;
    satelliteLayer.addTo(map);

    // 2. OpenStreetMap standard terrain/road layer
    const terrainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution: 'OpenStreetMap',
      }
    );
    terrainTileRef.current = terrainLayer;

    // 3. CartoDB Voyager Labels & Boundaries overlay
    const labelsLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 19,
      }
    );
    labelsLayer.addTo(map);

    const routesGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);
    routesLayerGroupRef.current = routesGroup;
    markersLayerGroupRef.current = markersGroup;

    // State / City Labels
    const labels = [
      { name: 'ASSAM', capital: 'Guwahati / Dispur', coords: [26.14, 91.73] as [number, number] },
      { name: 'ARUNACHAL PRADESH', capital: 'Itanagar', coords: [27.08, 93.60] as [number, number] },
      { name: 'MEGHALAYA', capital: 'Shillong', coords: [25.57, 91.89] as [number, number] },
      { name: 'NAGALAND', capital: 'Kohima', coords: [25.67, 94.10] as [number, number] },
    ];

    labels.forEach((l) => {
      const icon = L.divIcon({
        className: 'route-map-label',
        html: `<div style="text-align: center; pointer-events: none; user-select: none;">
          <div style="color: #ffffff; font-weight: 800; font-size: 12px; text-shadow: 0 1px 4px #000, 0 0 8px #000; letter-spacing: 0.05em;">${l.name}</div>
          <div style="color: rgba(255,255,255,0.85); font-size: 10px; text-shadow: 0 1px 3px #000;">${l.capital}</div>
        </div>`,
        iconSize: [140, 30],
        iconAnchor: [70, 15],
      });
      L.marker(l.coords, { icon, interactive: false }).addTo(map);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route Polylines and Obstacles based on selectedRoute & layers
  useEffect(() => {
    const routesGroup = routesLayerGroupRef.current;
    const markersGroup = markersLayerGroupRef.current;
    if (!routesGroup || !markersGroup) return;

    routesGroup.clearLayers();
    markersGroup.clearLayers();

    // Coordinates:
    // Origin: Guwahati [26.14, 91.73]
    // Destination: Itanagar [27.08, 93.60]

    // 1. ROUTE 1: CURRENT ROUTE (Blue line, with red hazard segment)
    if (layers.currentRoute) {
      const isCurSelected = selectedRoute === 'current';
      
      // Clear segment: Guwahati -> Nagaon -> Jamugurihat
      const curSafe = L.polyline(
        [
          [26.14, 91.73],
          [26.25, 92.15],
          [26.35, 92.68],
          [26.65, 92.95],
          [26.85, 93.25],
        ],
        {
          color: '#2563eb',
          weight: isCurSelected ? 6 : 4,
          opacity: isCurSelected ? 0.95 : 0.65,
        }
      ).addTo(routesGroup);
      curSafe.bindTooltip('Current Route: 340 km (Baseline)', { sticky: true });
      curSafe.on('click', () => onSelectRoute('current'));

      // Blocked / Risky segment: Jamugurihat -> NH-15 Border -> Itanagar
      const curHazard = L.polyline(
        [
          [26.85, 93.25],
          [27.00, 93.45],
          [27.08, 93.60],
        ],
        {
          color: '#dc2626',
          weight: isCurSelected ? 6.5 : 4.5,
          opacity: 0.95,
          dashArray: '8, 6',
        }
      ).addTo(routesGroup);
      curHazard.bindTooltip('CRITICAL HAZARD: NH-15 Landslide & Subsidence (+1h 45m delay)', { sticky: true });
      curHazard.on('click', () => onSelectRoute('current'));
    }

    // 2. ROUTE 2: ALTERNATIVE 1 (RECOMMENDED - Bright Green bypass)
    if (layers.alt1Route) {
      const isAlt1Selected = selectedRoute === 'alt1';
      const alt1 = L.polyline(
        [
          [26.14, 91.73], // Guwahati
          [26.40, 91.80], // Baihata Chariali
          [26.62, 92.35], // Mangaldai
          [26.75, 92.80], // Tezpur Bridge Bypass
          [26.92, 93.15], // Biswanath
          [27.05, 93.45], // Gohpur
          [27.08, 93.60], // Itanagar
        ],
        {
          color: '#10b981',
          weight: isAlt1Selected ? 6.5 : 4.5,
          opacity: isAlt1Selected ? 0.95 : 0.75,
        }
      ).addTo(routesGroup);
      alt1.bindTooltip('Alternative 1 (RECOMMENDED): 372 km • 8h 10m • Low Disruption', { sticky: true });
      alt1.on('click', () => onSelectRoute('alt1'));
    }

    // 3. ROUTE 3: ALTERNATIVE 2 (AVAILABLE - Gray / Amber long detour)
    if (layers.alt2Route) {
      const isAlt2Selected = selectedRoute === 'alt2';
      const alt2 = L.polyline(
        [
          [26.14, 91.73], // Guwahati
          [26.15, 92.70], // Nagaon south
          [26.30, 93.30], // Bokakhat
          [26.60, 93.75], // Numaligarh
          [26.85, 93.90], // North Lakhimpur corridor
          [27.08, 93.60], // Itanagar
        ],
        {
          color: '#94a3b8',
          weight: isAlt2Selected ? 6 : 3.5,
          opacity: isAlt2Selected ? 0.9 : 0.6,
          dashArray: '4, 4',
        }
      ).addTo(routesGroup);
      alt2.bindTooltip('Alternative 2 (AVAILABLE): 401 km • 8h 45m • Long Detour', { sticky: true });
      alt2.on('click', () => onSelectRoute('alt2'));
    }

    // 4. ORIGIN MARKER (Guwahati)
    const originIcon = L.divIcon({
      className: 'origin-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background: #1a56db; color: #ffffff; font-weight: bold; font-size: 10px; padding: 2px 6px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.5); white-space: nowrap; margin-bottom: 2px;">
            ORIGIN: Guwahati
          </div>
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #1a56db; border: 3px solid #ffffff; box-shadow: 0 0 10px #3b82f6;"></div>
        </div>
      `,
      iconSize: [110, 36],
      iconAnchor: [55, 34],
    });
    L.marker([26.14, 91.73], { icon: originIcon }).addTo(markersGroup);

    // 5. DESTINATION MARKER (Itanagar)
    const destIcon = L.divIcon({
      className: 'dest-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background: #10b981; color: #ffffff; font-weight: bold; font-size: 10px; padding: 2px 6px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.5); white-space: nowrap; margin-bottom: 2px;">
            DESTINATION: Itanagar
          </div>
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #10b981; border: 3px solid #ffffff; box-shadow: 0 0 10px #10b981;"></div>
        </div>
      `,
      iconSize: [120, 36],
      iconAnchor: [60, 34],
    });
    L.marker([27.08, 93.60], { icon: destIcon }).addTo(markersGroup);

    // 6. HAZARD OBSTACLE MARKERS (Along Current Route)
    if (layers.fieldIncidents) {
      // Landslide on NH-15
      const landslideIcon = L.divIcon({
        className: 'landslide-marker',
        html: `
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #dc2626; border: 2px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: #ffffff;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker([26.95, 93.38], { icon: landslideIcon })
        .addTo(markersGroup)
        .bindTooltip('<b>Hazard: Landslide Debris</b><br/>NH-15 Papum Pare (+1h 45m delay)', { direction: 'top' });

      // Heavy Rainfall Storm Icon
      const rainIcon = L.divIcon({
        className: 'rain-marker',
        html: `
          <div style="width: 26px; height: 26px; border-radius: 50%; background: #0284c7; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: #ffffff;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M16 14v6" />
              <path d="M8 14v6" />
              <path d="M12 16v6" />
            </svg>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });
      L.marker([26.88, 93.10], { icon: rainIcon })
        .addTo(markersGroup)
        .bindTooltip('<b>Precipitation Alert: 42 mm/hr</b>', { direction: 'top' });
    }

  }, [selectedRoute, layers]);

  // Base map toggle
  const handleBaseMapChange = (type: 'satellite' | 'map') => {
    setActiveBaseMap(type);
    const map = mapInstanceRef.current;
    if (!map || !satelliteTileRef.current || !terrainTileRef.current) return;

    if (type === 'satellite') {
      if (map.hasLayer(terrainTileRef.current)) map.removeLayer(terrainTileRef.current);
      if (!map.hasLayer(satelliteTileRef.current)) satelliteTileRef.current.addTo(map);
    } else {
      if (map.hasLayer(satelliteTileRef.current)) map.removeLayer(satelliteTileRef.current);
      if (!map.hasLayer(terrainTileRef.current)) terrainTileRef.current.addTo(map);
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetCenter = () => mapInstanceRef.current?.setView([26.65, 92.75], 8);
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.parentElement?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-950 font-sans">
      
      {/* Real Interactive Leaflet Viewport */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 1. TOP OVERLAY: Search + Pills + Base Toggle */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
        
        {/* Search Field */}
        <div className="pointer-events-auto w-64">
          <div className="relative shadow-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search location, district, road..."
              className="w-full h-8 pl-8.5 pr-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-md text-[11.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-md border border-slate-200 shadow-sm">
          <button
            onClick={() => { setActivePill('weather'); toggleLayer('weather'); }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.weather ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Weather</span>
          </button>
          <button
            onClick={() => setActivePill('flood')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activePill === 'flood' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-600" />
            <span>Flood</span>
          </button>
          <button
            onClick={() => { setActivePill('landslide'); toggleLayer('landslideRisk'); }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.landslideRisk ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>Landslide</span>
          </button>
          <button
            onClick={() => { setActivePill('incidents'); toggleLayer('fieldIncidents'); }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.fieldIncidents ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            <span>Incidents</span>
          </button>
          <button
            onClick={() => setActivePill('roads')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activePill === 'roads' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Route className="w-3.5 h-3.5 text-slate-600" />
            <span>Roads</span>
          </button>
        </div>

        {/* Base Map Switcher: Map vs Satellite */}
        <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-xs p-0.5 rounded-md border border-slate-200 shadow-sm text-xs font-medium">
          <button
            onClick={() => handleBaseMapChange('map')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeBaseMap === 'map' ? 'bg-[#1a365d] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => handleBaseMapChange('satellite')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeBaseMap === 'satellite' ? 'bg-[#1a365d] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite
          </button>
        </div>

      </div>

      {/* 2. FLOATING LAYERS BUTTON */}
      <div className="absolute top-14 left-4 z-20 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg shadow-lg overflow-hidden text-xs w-[170px]">
          <button
            onClick={() => setLayersOpen(!layersOpen)}
            className="flex items-center justify-between px-3 py-1.5 text-slate-800 font-semibold hover:bg-slate-50 transition-colors w-full cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[11.5px] font-bold">Layers</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${layersOpen ? 'rotate-180' : ''}`} />
          </button>

          {layersOpen && (
            <div className="px-3 pb-2.5 pt-1 border-t border-slate-100 space-y-1 text-slate-700 text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input 
                  type="checkbox" 
                  checked={layers.currentRoute} 
                  onChange={() => toggleLayer('currentRoute')} 
                  className="rounded text-blue-600 cursor-pointer"
                />
                <span>Current Route (Blue/Red)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input 
                  type="checkbox" 
                  checked={layers.alt1Route} 
                  onChange={() => toggleLayer('alt1Route')} 
                  className="rounded text-emerald-600 cursor-pointer"
                />
                <span>Alternative 1 (Green)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input 
                  type="checkbox" 
                  checked={layers.alt2Route} 
                  onChange={() => toggleLayer('alt2Route')} 
                  className="rounded text-slate-600 cursor-pointer"
                />
                <span>Alternative 2 (Gray)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input 
                  type="checkbox" 
                  checked={layers.fieldIncidents} 
                  onChange={() => toggleLayer('fieldIncidents')} 
                  className="rounded text-red-600 cursor-pointer"
                />
                <span>Hazard Obstacles</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAP NAVIGATION TOOLS */}
      <div className="absolute top-26 left-4 z-20 flex flex-col gap-1 shadow-md pointer-events-auto" style={{ top: layersOpen ? '200px' : '65px' }}>
        <button
          onClick={handleZoomIn}
          className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-t-md flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 border-x border-b border-slate-200 rounded-b-md flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetCenter}
          className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md flex items-center justify-center transition-colors cursor-pointer mt-1"
          title="Recenter Route Corridor"
        >
          <Crosshair className="w-3.5 h-3.5 text-blue-600" />
        </button>
        <button
          onClick={handleFullscreen}
          className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md flex items-center justify-center transition-colors cursor-pointer"
          title="Fullscreen"
        >
          <Maximize className="w-3 h-3 text-slate-600" />
        </button>
      </div>

      {/* 4. MAP SCALE INDICATOR */}
      <div className="absolute bottom-3 left-4 z-20 bg-white/90 backdrop-blur-xs text-slate-800 px-2.5 py-1 rounded text-[10px] font-mono border border-slate-300 shadow-xs flex items-center gap-2 select-none">
        <div className="h-1.5 w-16 border-b-2 border-l-2 border-r-2 border-slate-800"></div>
        <span>0  50  100  150  200 km</span>
      </div>

      {/* 5. INDIA OVERVIEW INSET MAP */}
      <div className="absolute bottom-3 right-4 z-20 bg-white/95 backdrop-blur-xs border border-slate-300 p-2 rounded-lg shadow-lg select-none flex items-center gap-2">
        <div className="relative">
          <svg viewBox="0 0 95 95" className="w-18 h-18">
            <path
              d="M42 6 L48 9 L54 16 L50 24 L58 26 L55 32 L48 37 L51 47 L45 62 L48 76 L40 88 L34 76 L30 63 L24 46 L16 36 L24 26 L34 21 Z"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="0.8"
            />
            <path
              d="M55 24 L65 20 L78 20 L86 30 L82 40 L71 47 L65 42 L58 34 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="1.2"
            />
            <circle cx="71" cy="30" r="1.5" fill="#ffffff" />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center pr-1">
          <div className="text-[9.5px] font-bold text-slate-700">N</div>
          <svg width="10" height="20" viewBox="0 0 10 20">
            <polygon points="5,2 9,10 5,7" fill="#ef4444" />
            <polygon points="5,2 1,10 5,7" fill="#dc2626" />
            <polygon points="5,18 9,10 5,13" fill="#64748b" />
            <polygon points="5,18 1,10 5,13" fill="#94a3b8" />
          </svg>
        </div>
      </div>

    </div>
  );
};
