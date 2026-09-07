import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface IncidentMiniMapProps {
  latitude: number;
  longitude: number;
  title: string;
  road: string;
  severity: string;
  className?: string;
}

export const IncidentMiniMap: React.FC<IncidentMiniMapProps> = ({
  latitude,
  longitude,
  title,
  road,
  severity,
  className = 'h-48 w-full rounded-xl overflow-hidden border border-slate-200'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 12,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    map.setView([latitude, longitude], 12);

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const isCritical = severity === 'CRITICAL';
    const markerHtml = `
      <div style="background:${isCritical ? '#dc2626' : '#ea580c'};color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 3px 8px rgba(0,0,0,0.4);font-size:14px;font-weight:bold;">
        ⚠️
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'incident-hazard-icon',
      html: markerHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    markerRef.current = L.marker([latitude, longitude], { icon: customIcon })
      .bindPopup(`<b>${title}</b><br/>${road}<br/>${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`)
      .addTo(map);

  }, [latitude, longitude, title, road, severity]);

  return <div ref={mapContainerRef} className={className} />;
};
