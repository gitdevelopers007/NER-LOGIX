import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Plus, Minus, Maximize } from 'lucide-react';
import type { AlertItem } from '../services/alertService';

interface EmergencySituationMapProps {
  alerts: AlertItem[];
  selectedAlertId: string;
  onSelectAlert: (id: string) => void;
  className?: string;
}

export const EmergencySituationMap: React.FC<EmergencySituationMapProps> = ({
  alerts,
  selectedAlertId,
  onSelectAlert,
  className = 'h-[460px] w-full rounded-xl overflow-hidden border border-slate-200'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const [legendOpen, setLegendOpen] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [26.2, 93.0],
        zoom: 7.8,
        minZoom: 6.8,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Blocked Road Segment (Crimson Dashed) - NH-13 segment near Lower Subansiri
    const blockedSegment: [number, number][] = [
      [27.35, 93.65],
      [27.4285, 93.7542],
      [27.50, 93.85]
    ];
    L.polyline(blockedSegment, {
      color: '#ef4444',
      weight: 5,
      dashArray: '8, 8',
      opacity: 0.9
    }).addTo(group);

    // 2. Emergency Alternative Route (Emerald Green) - Tezpur Bypass Corridor
    const emergencyRoute: [number, number][] = [
      [26.1584, 91.7705],
      [26.6500, 92.8000],
      [26.8800, 93.3000],
      [27.0844, 93.6053]
    ];
    L.polyline(emergencyRoute, {
      color: '#10b981',
      weight: 4,
      opacity: 0.85
    }).addTo(group);

    // 3. Flood Risk Polygon in Assam Riverine Area (Dhemaji/Lakhimpur)
    const floodPolygon: [number, number][] = [
      [27.35, 94.40],
      [27.55, 94.70],
      [27.45, 94.85],
      [27.25, 94.50]
    ];
    L.polygon(floodPolygon, {
      color: '#0284c7',
      fillColor: '#38bdf8',
      fillOpacity: 0.25,
      weight: 2,
      dashArray: '4, 4'
    }).bindPopup('<b>Brahmaputra Flood Risk Zone</b><br/>Water discharge alert: +1.4m over danger mark.').addTo(group);

    // 4. Alert Markers
    alerts.forEach((alt) => {
      const isSelected = alt.id === selectedAlertId;
      const isCritical = alt.severity === 'CRITICAL';
      const isHigh = alt.severity === 'HIGH';
      const isEarthquake = alt.category === 'EARTHQUAKE';

      const pinColor = isEarthquake ? '#dc2626' : isCritical ? '#dc2626' : isHigh ? '#ea580c' : '#2563eb';
      const haloClass = (isCritical || isEarthquake) ? 'animate-ping' : '';

      const iconHtml = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
          <span style="position:absolute;width:34px;height:34px;border-radius:50%;background:${pinColor};opacity:0.35;" class="${haloClass}"></span>
          <div style="width:${isSelected ? '32px' : '26px'};height:${isSelected ? '32px' : '26px'};border-radius:50%;background:${pinColor};border:2.5px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;transition:all 0.2s;">
            ${isEarthquake ? '⚡' : isCritical ? '!' : isHigh ? '▲' : '●'}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'alert-map-pin',
        html: iconHtml,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([alt.latitude, alt.longitude], { icon: customIcon }).addTo(group);

      marker.on('click', () => {
        onSelectAlert(alt.id);
      });

      marker.bindPopup(`
        <div style="font-family:sans-serif;font-size:12px;max-width:220px;">
          <div style="color:${pinColor};font-weight:bold;margin-bottom:2px;">● ${alt.severity} ${alt.category} ALERT</div>
          <div style="font-weight:bold;color:#0f172a;">${alt.title}</div>
          <div style="color:#64748b;font-size:11px;">${alt.road} • ${alt.district}</div>
          <div style="color:#dc2626;font-weight:bold;margin-top:4px;">Status: ${alt.roadCondition}</div>
          <div style="color:#059669;font-size:10px;font-weight:600;margin-top:2px;">Source: ${alt.source}</div>
          ${alt.eventUrl ? `<div style="margin-top:5px;border-top:1px solid #e2e8f0;padding-top:3px;"><a href="${alt.eventUrl}" target="_blank" rel="noreferrer" style="color:#2563eb;font-size:10.5px;font-weight:bold;text-decoration:underline;">Official NCS Bulletin ↗</a></div>` : ''}
        </div>
      `);

      if (isSelected) {
        marker.openPopup();
      }
    });

  }, [alerts, selectedAlertId, onSelectAlert]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetFocus = () => mapInstanceRef.current?.setView([26.4, 93.0], 7);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-md border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-md border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetFocus}
          className="w-8 h-8 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-md border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          title="Reset View"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Toggle Legend Button */}
      <button
        onClick={() => setLegendOpen(!legendOpen)}
        className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-md flex items-center gap-1.5 cursor-pointer"
      >
        <Layers className="w-3.5 h-3.5 text-blue-600" />
        <span>Legend</span>
      </button>

      {/* Legend Drawer */}
      {legendOpen && (
        <div className="absolute bottom-12 left-3 z-[1000] bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-lg text-[11px] space-y-1.5 min-w-[190px]">
          <div className="font-bold text-slate-900 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>Map Symbology</span>
            <span className="text-[9px] text-slate-400 font-mono">GIS V2.4</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="text-slate-700 font-medium">Critical Incident</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-700 font-medium">High Risk Corridor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-700 font-medium">Flood Inundation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-700 font-medium">Heavy Rainfall Radar</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <span className="w-4 h-0.5 bg-emerald-500" />
            <span className="text-slate-700 font-medium">Emergency Bypass Route</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-red-500 border-b border-dashed border-red-500" />
            <span className="text-slate-700 font-medium">Blocked Road Segment</span>
          </div>
        </div>
      )}
    </div>
  );
};
