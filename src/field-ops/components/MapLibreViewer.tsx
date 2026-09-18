import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { formatCoordinates } from '../utils/formatters';
import { MapPin } from 'lucide-react';

interface FieldLocationMapProps {
  latitude: number;
  longitude: number;
  accuracy?: number;
  incidentType?: string;
  severity?: string;
  roadName?: string;
  districtName?: string;
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

export const FieldLocationMap: React.FC<FieldLocationMapProps> = ({
  latitude,
  longitude,
  accuracy,
  incidentType,
  severity = 'HIGH',
  roadName,
  districtName,
  zoom = 13,
  height = '240px',
  interactive = true,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Free, zero-API-key OpenStreetMap raster style
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors',
            },
          },
          layers: [
            {
              id: 'osm-tiles-layer',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        },
        center: [longitude, latitude],
        zoom: zoom,
        interactive: interactive,
      });

      mapInstance.current = map;

      // Add navigation controls if interactive
      if (interactive) {
        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
      }

      // Severity color mapping
      const sevColor =
        severity === 'CRITICAL'
          ? '#dc2626'
          : severity === 'HIGH'
          ? '#ea580c'
          : severity === 'MEDIUM'
          ? '#f59e0b'
          : '#10b981';

      // Custom DOM marker element
      const el = document.createElement('div');
      el.className = 'field-marker';
      el.innerHTML = `
        <div style="
          background-color: ${sevColor};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Popup with incident details
      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; color: #1e293b; padding: 2px 4px;">
          <strong style="color: ${sevColor};">${incidentType || 'Incident Location'}</strong>
          <div>${formatCoordinates(latitude, longitude)}</div>
          ${roadName ? `<div style="font-weight: 600; margin-top: 2px;">Road: ${roadName}</div>` : ''}
          ${districtName ? `<div style="color: #64748b;">District: ${districtName}</div>` : ''}
          ${accuracy ? `<div style="color: #94a3b8; font-size: 10px;">Accuracy: ±${accuracy.toFixed(1)}m</div>` : ''}
        </div>
      `;

      marker.setPopup(new maplibregl.Popup({ offset: 16 }).setHTML(popupContent));

      return () => {
        map.remove();
      };
    } catch (err) {
      console.warn('MapLibre GL initialization error, falling back to static visual:', err);
      setMapError(true);
    }
  }, [latitude, longitude, accuracy, severity, incidentType, roadName, districtName, zoom, interactive]);

  if (mapError) {
    return (
      <div
        className="w-full bg-slate-200 rounded-lg flex flex-col items-center justify-center border border-slate-300 p-4 text-center"
        style={{ height }}
      >
        <MapPin className="w-8 h-8 text-blue-600 mb-1" />
        <span className="text-sm font-semibold text-slate-800">
          {roadName || 'Field Geo-Location'}
        </span>
        <span className="text-xs text-slate-600 font-mono">
          {formatCoordinates(latitude, longitude)}
        </span>
        {districtName && (
          <span className="text-xs text-slate-500 mt-1">{districtName}</span>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-300 shadow-sm">
      <div ref={mapContainer} style={{ width: '100%', height }} />
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-mono text-slate-700 shadow-sm border border-slate-200">
        {formatCoordinates(latitude, longitude)}
      </div>
    </div>
  );
};

export const IncidentLocationPicker: React.FC<{
  initialLat: number;
  initialLng: number;
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ initialLat, initialLng, onLocationSelect: _onLocationSelect }) => {
  return (
    <div className="space-y-2">
      <FieldLocationMap
        latitude={initialLat}
        longitude={initialLng}
        zoom={14}
        height="180px"
        interactive={true}
      />
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Tap / Drag to refine position pin</span>
        <span className="font-mono">{formatCoordinates(initialLat, initialLng)}</span>
      </div>
    </div>
  );
};
