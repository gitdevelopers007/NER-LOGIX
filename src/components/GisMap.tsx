import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Search, Layers, Plus, Minus, Crosshair, ChevronDown, Maximize,
  CloudRain, Waves, Mountain, AlertTriangle, Truck, Route, Info
} from 'lucide-react';
import { INCIDENTS_DATA, NER_NODES } from '../data/nerGisData';
import type { Incident } from '../data/nerGisData';
import { liveGovtService, type LiveEarthquake, type LiveRainPoint, type DataMode } from '../services/liveGovtService';

interface GisMapProps {
  selectedIncident: Incident;
  onSelectIncident: (inc: Incident) => void;
  searchQuery?: string;
}

export const GisMap: React.FC<GisMapProps> = ({
  selectedIncident,
  onSelectIncident,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routesGroupRef = useRef<L.LayerGroup | null>(null);
  const radarOverlayRef = useRef<L.ImageOverlay | null>(null);
  const satelliteTileRef = useRef<L.TileLayer | null>(null);
  const terrainTileRef = useRef<L.TileLayer | null>(null);

  const [layersOpen, setLayersOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBaseMap, setActiveBaseMap] = useState<'satellite' | 'terrain'>('satellite');
  const [activePill, setActivePill] = useState<string>('weather');
  const [dataMode, setDataMode] = useState<DataMode>(liveGovtService.getMode());
  const [liveEarthquakes, setLiveEarthquakes] = useState<LiveEarthquake[]>([]);
  const [liveRainPoints, setLiveRainPoints] = useState<LiveRainPoint[]>([]);

  useEffect(() => {
    const sync = () => {
      const m = liveGovtService.getMode();
      setDataMode(m);
      if (m === 'LIVE') {
        liveGovtService.getEarthquakes().then(setLiveEarthquakes);
        liveGovtService.getRainAlerts().then(setLiveRainPoints);
      } else {
        setLiveEarthquakes([]);
        setLiveRainPoints([]);
      }
    };
    sync();
    const unsub = liveGovtService.onModeChange(sync);
    return () => unsub();
  }, []);

  // Layer visibility toggles (exact 13 layers from screenshot)
  const [layers, setLayers] = useState({
    districtBoundaries: true,
    roads: true,
    bridges: true,
    roadAccessibility: true,
    traffic: false,
    fieldIncidents: true,
    floodRisk: false,
    landslideRisk: false,
    heavyRainfall: true,
    weather: true,
    vehicles: true,
    emergencyRoutes: false,
    satelliteImagery: true,
    earthquakes: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize real Leaflet map centered on North East Region
    const map = L.map(mapContainerRef.current, {
      center: [26.15, 92.85],
      zoom: 7,
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
        attribution: 'Esri, Maxar, Earthstar Geographics',
      }
    );
    satelliteTileRef.current = satelliteLayer;
    satelliteLayer.addTo(map);

    // 2. OpenTopoMap / Terrain Layer (toggleable)
    const terrainLayer = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'OpenTopoMap',
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

    // 4. Initialize LayerGroups
    const routesGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);
    routesGroupRef.current = routesGroup;
    markersGroupRef.current = markersGroup;

    // 5. Doppler Weather Radar Cloud Overlay (Multi-spectral precipitation pattern matching screenshot)
    const radarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <filter id="radarBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <radialGradient id="stormCore1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
          <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.8" />
          <stop offset="65%" stop-color="#22c55e" stop-opacity="0.65" />
          <stop offset="85%" stop-color="#06b6d4" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="stormCore2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.85" />
          <stop offset="40%" stop-color="#eab308" stop-opacity="0.75" />
          <stop offset="70%" stop-color="#10b981" stop-opacity="0.55" />
          <stop offset="90%" stop-color="#0ea5e9" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="stormCore3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.85" />
          <stop offset="45%" stop-color="#eab308" stop-opacity="0.7" />
          <stop offset="75%" stop-color="#10b981" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
        </radialGradient>
      </defs>
      <g filter="url(#radarBlur)">
        <path d="M 450 140 Q 560 90 680 180 Q 750 280 620 340 Q 500 290 420 200 Z" fill="url(#stormCore1)" />
        <ellipse cx="540" cy="190" rx="140" ry="85" fill="url(#stormCore2)" />
        <ellipse cx="360" cy="280" rx="110" ry="60" fill="url(#stormCore3)" />
        <path d="M 280 270 Q 380 230 460 290 Q 420 340 310 320 Z" fill="url(#stormCore2)" opacity="0.8" />
        <circle cx="630" cy="240" r="75" fill="url(#stormCore1)" opacity="0.85" />
      </g>
    </svg>`;

    const radarDataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(radarSvg);
    const radarBounds: L.LatLngBoundsExpression = [
      [24.2, 90.2],
      [28.4, 96.8],
    ];
    const radarOverlay = L.imageOverlay(radarDataUri, radarBounds, {
      opacity: 0.72,
      interactive: false,
    });
    radarOverlayRef.current = radarOverlay;
    radarOverlay.addTo(map);

    // 6. Draw realistic highway corridors across NER
    // NH-27 (East-West Highway) - Open Green
    const nh27 = L.polyline(
      [
        [26.14, 91.73],
        [26.25, 92.30],
        [26.35, 92.68],
        [25.80, 93.10],
        [24.83, 92.80],
      ],
      { color: '#22c55e', weight: 4.5, opacity: 0.95 }
    ).addTo(routesGroup);
    nh27.bindTooltip('NH-27 (East-West Corridor) - Passable', { sticky: true });

    // NH-15 (Arunachal Border) - Blocked Red
    const nh15 = L.polyline(
      [
        [26.70, 92.80],
        [26.90, 93.30],
        [27.185, 93.682],
        [27.35, 94.10],
        [27.50, 95.00],
      ],
      { color: '#ef4444', weight: 4.5, opacity: 0.95, dashArray: '8, 6' }
    ).addTo(routesGroup);
    nh15.bindTooltip('NH-15 (Arunachal Border) - BLOCKED (Landslide)', { sticky: true });

    // NH-29 (Dimapur to Kohima) - Restricted Amber
    const nh29 = L.polyline(
      [
        [25.90, 93.72],
        [25.75, 94.02],
        [25.67, 94.11],
      ],
      { color: '#f59e0b', weight: 4, opacity: 0.9 }
    ).addTo(routesGroup);
    nh29.bindTooltip('NH-29 (Kohima-Dimapur) - RESTRICTED', { sticky: true });

    // NH-37 (Silchar to Imphal) - Blocked Red
    const nh37 = L.polyline(
      [
        [24.83, 92.80],
        [24.98, 93.48],
        [24.81, 93.93],
      ],
      { color: '#ef4444', weight: 4, opacity: 0.9, dashArray: '6, 6' }
    ).addTo(routesGroup);
    nh37.bindTooltip('NH-37 (Tamenglong-Imphal) - BLOCKED', { sticky: true });

    // State boundaries outlined with State & Capital labels (Exact from Screenshot)
    const stateBounds = [
      { name: 'ARUNACHAL PRADESH', capital: 'Itanagar', coords: [27.7, 94.3] as [number, number] },
      { name: 'ASSAM', capital: 'Dispur', coords: [26.25, 92.6] as [number, number] },
      { name: 'MEGHALAYA', capital: 'Shillong', coords: [25.5, 91.5] as [number, number] },
      { name: 'NAGALAND', capital: 'Kohima', coords: [26.1, 94.5] as [number, number] },
      { name: 'MANIPUR', capital: 'Imphal', coords: [24.7, 93.8] as [number, number] },
      { name: 'MIZORAM', capital: 'Aizawl', coords: [23.3, 92.8] as [number, number] },
      { name: 'TRIPURA', capital: 'Agartala', coords: [23.8, 91.5] as [number, number] },
      { name: 'SIKKIM', capital: 'Gangtok', coords: [27.5, 88.5] as [number, number] },
    ];

    stateBounds.forEach((st) => {
      const labelIcon = L.divIcon({
        className: 'custom-state-label',
        html: `<div style="text-align: center; pointer-events: none; user-select: none;">
          <div style="color: #ffffff; font-weight: 800; font-size: 12.5px; text-shadow: 0 1px 4px #000, 0 0 8px #000; letter-spacing: 0.08em; line-height: 1.1;">${st.name}</div>
          <div style="color: rgba(255,255,255,0.85); font-weight: 500; font-size: 10.5px; text-shadow: 0 1px 3px #000;">${st.capital}</div>
        </div>`,
        iconSize: [160, 32],
        iconAnchor: [80, 16],
      });
      L.marker(st.coords, { icon: labelIcon, interactive: false }).addTo(map);
    });

    // Neighboring country labels
    const countryLabels = [
      { name: 'BHUTAN', coords: [27.6, 90.4] as [number, number] },
      { name: 'BANGLADESH', coords: [24.5, 90.2] as [number, number] },
      { name: 'MYANMAR', coords: [24.1, 95.2] as [number, number] },
    ];

    countryLabels.forEach((c) => {
      const countryIcon = L.divIcon({
        className: 'custom-country-label',
        html: `<div style="color: rgba(255,255,255,0.7); font-weight: 700; font-size: 13px; letter-spacing: 0.18em; text-shadow: 0 0 6px #000000; pointer-events: none;">${c.name}</div>`,
        iconSize: [110, 20],
        iconAnchor: [55, 10],
      });
      L.marker(c.coords, { icon: countryIcon, interactive: false }).addTo(map);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Weather Radar visibility
  useEffect(() => {
    const radar = radarOverlayRef.current;
    if (!radar) return;
    if (layers.weather || layers.heavyRainfall) {
      radar.setOpacity(0.72);
    } else {
      radar.setOpacity(0);
    }
  }, [layers.weather, layers.heavyRainfall]);

  // Update Base Layer
  const handleBaseMapChange = (type: 'satellite' | 'terrain') => {
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

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. Plot Incidents
    if (layers.fieldIncidents) {
      INCIDENTS_DATA.forEach((inc) => {
        const isSelected = selectedIncident?.id === inc.id;
        const isBlocked = inc.status === 'BLOCKED';
        const color = isBlocked ? '#ef4444' : inc.status === 'RESTRICTED' ? '#f59e0b' : '#3b82f6';
        
        const incidentIcon = L.divIcon({
          className: 'custom-incident-marker',
          html: `<div style="position: relative; cursor: pointer; transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'}; transition: transform 0.2s ease;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: #ffffff;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            ${isSelected ? '<div style="position: absolute; top: -6px; right: -6px; width: 12px; height: 12px; border-radius: 50%; background: #3b82f6; border: 2px solid #ffffff;"></div>' : ''}
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([inc.lat, inc.lng], { icon: incidentIcon }).addTo(markersGroup);
        marker.on('click', () => onSelectIncident(inc));
        marker.bindTooltip(`<b>${inc.title}</b><br/>${inc.road} (${inc.status})`, { direction: 'top' });
      });
    }

    // 2. Plot District/City Nodes
    if (layers.districtBoundaries) {
      NER_NODES.forEach((node) => {
        const cityIcon = L.divIcon({
          className: 'city-node-marker',
          html: `<div style="display: flex; align-items: center; gap: 4px; pointer-events: auto; cursor: pointer;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff; border: 2px solid #2563eb; box-shadow: 0 1px 4px rgba(0,0,0,0.5);"></div>
            <span style="color: #ffffff; font-size: 10.5px; font-weight: 600; text-shadow: 0 1px 3px #000; background: rgba(15,23,42,0.65); padding: 0.5px 3px; border-radius: 3px;">${node.name}</span>
          </div>`,
          iconSize: [85, 14],
          iconAnchor: [4, 7],
        });
        L.marker([node.lat, node.lng], { icon: cityIcon }).addTo(markersGroup);
      });
    }

    // 3. Plot Logistics Convoys
    if (layers.vehicles) {
      const vehicles = [
        { id: 'CONVOY-01', lat: 26.20, lng: 92.05, route: 'Guwahati -> Nagaon' },
        { id: 'CONVOY-02', lat: 25.90, lng: 93.20, route: 'Lumding -> Silchar' },
        { id: 'CONVOY-03', lat: 27.20, lng: 94.80, route: 'Dibrugarh -> Tinsukia' },
      ];

      vehicles.forEach((v) => {
        const truckIcon = L.divIcon({
          className: 'truck-marker',
          html: `<div style="width: 24px; height: 24px; border-radius: 50%; background: #0284c7; border: 1.5px solid #ffffff; display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        L.marker([v.lat, v.lng], { icon: truckIcon }).addTo(markersGroup)
          .bindTooltip(`Freight Convoy ${v.id} (${v.route})`, { direction: 'top' });
      });
    }

    // 4. Plot Doppler Weather Radar & Rainfall Telemetry Stations
    if (layers.weather || layers.heavyRainfall) {
      const radarStations = [
        { name: 'IMD Doppler Radar — Cherrapunji', state: 'Meghalaya', lat: 25.30, lng: 91.70, rain: 14.8, status: '14.8 mm/h', alert: 'Orange Alert: Heavy Downpour' },
        { name: 'IMD Radar — Silchar / Cachar', state: 'Assam', lat: 24.83, lng: 92.80, rain: 6.2, status: '6.2 mm/h', alert: 'Yellow Watch: Moderate Rain' },
        { name: 'IMD Radar — Papum Pare', state: 'Arunachal', lat: 27.08, lng: 93.60, rain: 4.5, status: '4.5 mm/h', alert: 'Yellow Watch: Intermittent' },
        { name: 'IMD Station — Kohima', state: 'Nagaland', lat: 25.67, lng: 94.10, rain: 2.1, status: '2.1 mm/h', alert: 'Light Rain / Mud Risk' },
        { name: 'Mohanbari Doppler Radar', state: 'Assam', lat: 27.48, lng: 94.90, rain: 3.8, status: '3.8 mm/h', alert: 'Passing Clouds' },
      ];

      radarStations.forEach((st) => {
        const radarIcon = L.divIcon({
          className: 'doppler-radar-marker',
          html: `<div style="position: relative; cursor: pointer; text-align: center;">
            <div style="width: 26px; height: 26px; border-radius: 50%; background: #0284c7; border: 2px solid #ffffff; box-shadow: 0 0 10px rgba(56, 189, 248, 0.9); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 13px;">
              🌧️
            </div>
            <div style="margin-top: 1px; white-space: nowrap; background: rgba(15,23,42,0.9); color: #38bdf8; font-size: 9.5px; font-weight: 800; padding: 0.5px 4px; border-radius: 3px; border: 1px solid rgba(56,189,248,0.5); display: inline-block;">
              ${st.status}
            </div>
          </div>`,
          iconSize: [50, 42],
          iconAnchor: [25, 13],
        });

        const m = L.marker([st.lat, st.lng], { icon: radarIcon }).addTo(markersGroup);
        m.bindTooltip(
          `<div style="font-family: sans-serif; font-size: 11px;">
            <b style="color: #0284c7; font-size: 12px;">${st.name}</b><br/>
            <span>Precipitation: <b>${st.rain} mm/hr</b></span><br/>
            <span style="color: #ea580c; font-weight: 600;">${st.alert}</span>
          </div>`,
          { direction: 'top' }
        );
      });
    }

  
    // 5. Real-time NCS Earthquakes from NERDRR
    if (layers.earthquakes && dataMode === 'LIVE' && liveEarthquakes.length > 0) {
      liveEarthquakes.slice(0, 20).forEach((eq) => {
        const eqIcon = L.divIcon({
          className: 'live-quake-marker',
          html: `<div style="position: relative; cursor: pointer; text-align: center;">
            <span style="position: absolute; inset: -5px; border-radius: 50%; background: rgba(239, 68, 68, 0.45); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
            <div style="width: 30px; height: 30px; border-radius: 50%; background: #dc2626; border: 2.5px solid #ffffff; box-shadow: 0 0 14px rgba(220,38,38,0.9); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 900; font-size: 11px; font-family: monospace;">
              ${eq.magnitude.toFixed(1)}
            </div>
            <div style="margin-top: 1px; white-space: nowrap; background: rgba(15,23,42,0.95); color: #fca5a5; font-size: 9px; font-weight: 800; padding: 0.5px 5px; border-radius: 4px; border: 1px solid rgba(239,68,68,0.6); display: inline-block;">
              ${eq.depthKm}km
            </div>
          </div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 15],
        });

        const m = L.marker([eq.latitude, eq.longitude], { icon: eqIcon }).addTo(markersGroup);
        m.bindTooltip(
          `<div style="font-family: sans-serif; font-size: 11px; max-width: 240px; padding: 2px;">
            <div style="display: flex; align-items: center; gap: 4px; color: #dc2626; font-weight: 800; font-size: 12px;">
              <span>⚡ Seismic Event M ${eq.magnitude.toFixed(1)}</span>
            </div>
            <div style="font-weight: 700; color: #1e293b; margin-top: 2px;">${eq.place}</div>
            <div style="color: #64748b; font-size: 10.5px; margin-top: 2px;">Focal Depth: <b>${eq.depthKm} km</b> (${eq.status})</div>
            <div style="color: #64748b; font-size: 10px;">Time: ${new Date(eq.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div style="color: #15803d; font-weight: 700; font-size: 9.5px; margin-top: 4px; border-top: 1px solid #e2e8f0; padding-top: 2px;">
              ● Source: National Centre for Seismology / NESAC NERDRR
            </div>
          </div>`,
          { direction: 'top' }
        );
      });
    }

    // 6. Live MOSDAC Heavy Rain Cells
    if (dataMode === 'LIVE' && (layers.heavyRainfall || layers.weather) && liveRainPoints.length > 0) {
      liveRainPoints.slice(0, 35).forEach((pt) => {
        const rainDot = L.circleMarker([pt.lat, pt.lng], {
          radius: 6,
          fillColor: '#0284c7',
          color: '#ffffff',
          weight: 1.5,
          opacity: 0.95,
          fillOpacity: 0.75
        }).addTo(markersGroup);

        rainDot.bindTooltip(
          `<div style="font-family: sans-serif; font-size: 10.5px; padding: 2px;">
            <b style="color: #0284c7;">🌧️ ISRO MOSDAC Rain Cell</b><br/>
            <span>Radar Ref: <b>${pt.radInf}</b></span><br/>
            <span style="color: #0369a1; font-weight: 600;">${pt.forecast}</span>
          </div>`,
          { direction: 'top' }
        );
      });
    }

  }, [selectedIncident, layers, dataMode, liveEarthquakes, liveRainPoints]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetCenter = () => mapInstanceRef.current?.setView([26.15, 92.85], 7);
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.parentElement?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const query = searchTerm.toLowerCase();
    
    const foundNode = NER_NODES.find(
      (n) => n.name.toLowerCase().includes(query) || n.state.toLowerCase().includes(query)
    );
    if (foundNode) {
      mapInstanceRef.current?.flyTo([foundNode.lat, foundNode.lng], 10, { duration: 1.2 });
      return;
    }

    const foundInc = INCIDENTS_DATA.find(
      (i) => i.road.toLowerCase().includes(query) || i.state.toLowerCase().includes(query) || i.district.toLowerCase().includes(query)
    );
    if (foundInc) {
      mapInstanceRef.current?.flyTo([foundInc.lat, foundInc.lng], 10, { duration: 1.2 });
      onSelectIncident(foundInc);
    }
  };

  const handlePillClick = (pill: string) => {
    setActivePill(pill);
    if (pill === 'weather') {
      const next = !(layers.weather || layers.heavyRainfall);
      setLayers((prev) => ({ ...prev, weather: next, heavyRainfall: next }));
    }
    else if (pill === 'incidents') toggleLayer('fieldIncidents');
    else if (pill === 'vehicles') toggleLayer('vehicles');
    else if (pill === 'roads') toggleLayer('roads');
  };

  return (
    <div className="relative w-full h-[540px] rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-950 font-sans">
      
      {/* Real Interactive Leaflet Map Viewport */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 1. TOP BAR OVERLAY: Search + Filter Pills + Satellite/Terrain Toggle */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
        
        {/* Search Field */}
        <div className="pointer-events-auto w-72">
          <form onSubmit={handleSearch} className="relative shadow-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search location, district, road..."
              className="w-full h-8.5 pl-9 pr-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1.5 focus:ring-blue-600 shadow-sm font-sans"
            />
          </form>
        </div>

        {/* Filter Pills */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-md border border-slate-200 shadow-sm">
          <button
            onClick={() => handlePillClick('weather')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              layers.weather || layers.heavyRainfall ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>🌧️ Rainfall Radar</span>
          </button>
          <button
            onClick={() => handlePillClick('flood')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activePill === 'flood' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-600" />
            <span>Flood</span>
          </button>
          <button
            onClick={() => handlePillClick('landslide')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activePill === 'landslide' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>Landslide</span>
          </button>
          <button
            onClick={() => handlePillClick('incidents')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.fieldIncidents ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            <span>Incidents</span>
          </button>
          <button
            onClick={() => handlePillClick('vehicles')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.vehicles ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-sky-600" />
            <span>Vehicles</span>
          </button>
          <button
            onClick={() => handlePillClick('roads')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              layers.roads ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Route className="w-3.5 h-3.5 text-slate-600" />
            <span>Roads</span>
          </button>
        </div>

        {/* Live Telemetry Attribution Pill */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0b1a30]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-md text-xs text-white">
          {dataMode === 'LIVE' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-emerald-300">ISRO-NESAC NERDRR &amp; NCS Seismology</span>
              <span className="text-slate-400 text-[10px] hidden sm:inline">
                ({liveEarthquakes.length} Quakes | {liveRainPoints.length} Rain Cells)
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span className="font-semibold text-indigo-300">Simulation Scenario</span>
              <span className="text-slate-400 text-[10px] hidden sm:inline">(Curated Test Matrix)</span>
            </>
          )}
        </div>

        {/* Base Map Switcher: Satellite vs Terrain */}
        <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-xs p-0.5 rounded-md border border-slate-200 shadow-sm text-xs font-medium">
          <button
            onClick={() => handleBaseMapChange('satellite')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeBaseMap === 'satellite' ? 'bg-[#1a365d] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => handleBaseMapChange('terrain')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeBaseMap === 'terrain' ? 'bg-[#1a365d] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terrain
          </button>
        </div>

      </div>

      {/* 2. FLOATING LAYERS & LEGEND PANEL */}
      <div className="absolute top-14 left-4 z-20 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg shadow-lg overflow-hidden text-xs w-[190px]">
          
          <button
            onClick={() => setLayersOpen(!layersOpen)}
            className="flex items-center justify-between px-3 py-2 text-slate-800 font-semibold hover:bg-slate-50 transition-colors w-full cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[12px] font-bold">Layers</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${layersOpen ? 'rotate-180' : ''}`} />
          </button>

          {layersOpen && (
            <div className="px-3 pb-3 pt-1 border-t border-slate-100 max-h-[380px] overflow-y-auto text-slate-700 space-y-2">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Map Layers
                </div>
                <div className="space-y-1">
                  {[
                    { id: 'districtBoundaries', label: 'District Boundaries' },
                    { id: 'roads', label: 'Roads' },
                    { id: 'bridges', label: 'Bridges' },
                    { id: 'roadAccessibility', label: 'Road Accessibility' },
                    { id: 'traffic', label: 'Traffic' },
                    { id: 'fieldIncidents', label: 'Field Incidents' },
                    { id: 'earthquakes', label: 'Earthquakes (NCS Live)' },
                    { id: 'floodRisk', label: 'Flood Risk' },
                    { id: 'landslideRisk', label: 'Landslide Risk' },
                    { id: 'heavyRainfall', label: 'Heavy Rainfall' },
                    { id: 'weather', label: 'Weather' },
                    { id: 'vehicles', label: 'Vehicles' },
                    { id: 'emergencyRoutes', label: 'Emergency Routes' },
                    { id: 'satelliteImagery', label: 'Satellite Imagery' },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer select-none text-[11px] hover:text-blue-600 py-0.5">
                      <input
                        type="checkbox"
                        checked={layers[item.id as keyof typeof layers]}
                        onChange={() => toggleLayer(item.id as keyof typeof layers)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Road Status Legend */}
              <div className="pt-2 border-t border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Road Status
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1 rounded bg-emerald-500"></span>
                    <span>Open</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1 rounded bg-amber-500"></span>
                    <span>Restricted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1 rounded bg-orange-400"></span>
                    <span>Delayed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1 rounded bg-red-500"></span>
                    <span>Blocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1 rounded bg-slate-300"></span>
                    <span>Unknown</span>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[10.5px] text-blue-600 font-medium hover:underline cursor-pointer">
                  <Info className="w-3 h-3" />
                  <span>View Legend</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. MAP NAVIGATION TOOLS */}
      <div className="absolute left-4 z-20 flex flex-col gap-1 shadow-md pointer-events-auto" style={{ top: layersOpen ? '390px' : '70px' }}>
        <button
          onClick={handleZoomIn}
          className="w-7.5 h-7.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-t-md flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-7.5 h-7.5 bg-white hover:bg-slate-50 text-slate-700 border-x border-b border-slate-200 rounded-b-md flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetCenter}
          className="w-7.5 h-7.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md flex items-center justify-center transition-colors cursor-pointer mt-1"
          title="Recenter NER Region"
        >
          <Crosshair className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={handleToggleFullscreen}
          className="w-7.5 h-7.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md flex items-center justify-center transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* 3.5 RAINFALL DOPPLER INTENSITY SCALE */}
      {(layers.weather || layers.heavyRainfall) && (
        <div className="absolute bottom-11 left-4 z-20 bg-slate-950/90 backdrop-blur-md text-white px-3 py-2 rounded-lg text-[10px] border border-blue-500/40 shadow-lg select-none">
          <div className="flex items-center gap-1.5 font-bold text-blue-400 mb-1">
            <span>🌧️</span>
            <span>IMD Doppler Rainfall Radar (mm/hr)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <span className="w-5 h-2 rounded-xs bg-cyan-400"></span>
              <span className="text-[8px] text-slate-300 mt-0.5">&lt;2.5</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-2 rounded-xs bg-emerald-400"></span>
              <span className="text-[8px] text-slate-300 mt-0.5">5.0</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-2 rounded-xs bg-yellow-400"></span>
              <span className="text-[8px] text-slate-300 mt-0.5">15.0</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-2 rounded-xs bg-orange-500"></span>
              <span className="text-[8px] text-slate-300 mt-0.5">35.0</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-5 h-2 rounded-xs bg-red-600"></span>
              <span className="text-[8px] text-slate-300 mt-0.5">&gt;50</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAP SCALE INDICATOR */}
      <div className="absolute bottom-3 left-4 z-20 bg-white/90 backdrop-blur-xs text-slate-800 px-2.5 py-1 rounded text-[10px] font-mono border border-slate-300 shadow-xs flex items-center gap-2 select-none">
        <div className="h-1.5 w-16 border-b-2 border-l-2 border-r-2 border-slate-800"></div>
        <span>0  50  100  150 km</span>
      </div>

      {/* 5. INDIA OVERVIEW INSET MAP */}
      <div className="absolute bottom-3 right-4 z-20 bg-white/95 backdrop-blur-xs border border-slate-300 p-2 rounded-lg shadow-lg select-none flex items-center gap-2">
        <div className="relative">
          <svg viewBox="0 0 95 95" className="w-20 h-20">
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
          <div className="text-[10px] font-bold text-slate-700">N</div>
          <svg width="12" height="24" viewBox="0 0 12 24">
            <polygon points="6,2 11,12 6,9" fill="#ef4444" />
            <polygon points="6,2 1,12 6,9" fill="#dc2626" />
            <polygon points="6,22 11,12 6,15" fill="#64748b" />
            <polygon points="6,22 1,12 6,15" fill="#94a3b8" />
          </svg>
        </div>
      </div>

    </div>
  );
};
