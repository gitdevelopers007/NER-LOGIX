import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { RouteReference, VehicleLocation } from '../../types/logistics';

interface LogisticsMapProps {
  route?: RouteReference | null;
  previousRoute?: RouteReference | null;
  currentLocation?: VehicleLocation | null;
  origin?: { latitude: number; longitude: number; name?: string } | null;
  destination?: { latitude: number; longitude: number; name?: string } | null;
  disruptionPoint?: [number, number] | null;
  className?: string;
  zoom?: number;
}

export const LogisticsMap: React.FC<LogisticsMapProps> = ({
  route,
  previousRoute,
  currentLocation,
  origin,
  destination,
  disruptionPoint,
  className = 'h-80 w-full rounded-xl overflow-hidden border border-slate-200',
  zoom = 9
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [25.86, 91.85],
        zoom: zoom,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Previous Route (dashed red if rerouted)
    if (previousRoute && previousRoute.geometry && previousRoute.geometry.length > 0) {
      L.polyline(previousRoute.geometry, {
        color: '#ef4444',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.7
      }).addTo(group);
    }

    // 2. Active Route Polyline
    if (route && route.geometry && route.geometry.length > 0) {
      const polyline = L.polyline(route.geometry, {
        color: '#1a56db',
        weight: 5,
        opacity: 0.9
      }).addTo(group);

      try {
        const bounds = polyline.getBounds();
        map.fitBounds(bounds, { padding: [30, 30] });
      } catch (e) {
        // bounds safeguard
      }
    }

    // 3. Origin Marker
    if (origin) {
      const originIcon = L.divIcon({
        className: 'origin-marker',
        html: `<div style="background:#10b981;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:12px;font-weight:bold;">A</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker([origin.latitude, origin.longitude], { icon: originIcon })
        .bindPopup(`<b>Origin:</b> ${origin.name || 'Depot'}`)
        .addTo(group);
    }

    // 4. Destination Marker
    if (destination) {
      const destIcon = L.divIcon({
        className: 'dest-marker',
        html: `<div style="background:#ef4444;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:12px;font-weight:bold;">B</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker([destination.latitude, destination.longitude], { icon: destIcon })
        .bindPopup(`<b>Destination:</b> ${destination.name || 'Hospital'}`)
        .addTo(group);
    }

    // 5. Disruption Marker (if injected)
    if (disruptionPoint) {
      const hazardIcon = L.divIcon({
        className: 'hazard-marker',
        html: `<div style="background:#dc2626;color:white;width:30px;height:30px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 8px rgba(220,38,38,0.5);font-size:14px;">⚠️</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      L.marker(disruptionPoint, { icon: hazardIcon })
        .bindPopup('<b>Active Disruption:</b> Landslide near Umsning km-68')
        .addTo(group);
    }

    // 6. Current Vehicle Position Marker
    if (currentLocation) {
      const truckIcon = L.divIcon({
        className: 'truck-marker',
        html: `<div style="background:#1e40af;color:white;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 3px 10px rgba(30,64,175,0.6);transform:rotate(${currentLocation.heading}deg);transition:all 0.5s ease;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
          </svg>
        </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });
      L.marker([currentLocation.latitude, currentLocation.longitude], { icon: truckIcon })
        .bindPopup(`<b>Live Convoy:</b> ${currentLocation.vehicle_id || 'Fleet Unit'}<br/>Speed: ${currentLocation.speed_kmh} km/h<br/>Heading: ${currentLocation.heading}°`)
        .addTo(group);
    }
  }, [route, previousRoute, currentLocation, origin, destination, disruptionPoint]);

  return <div ref={mapContainerRef} className={className} />;
};
