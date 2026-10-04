import { useState, useCallback } from 'react';
import { getCurrentGpsPosition, GeoLocationResult, GeoLocationError } from '../services/geolocation';

export const useGeolocation = () => {
  const [position, setPosition] = useState<GeoLocationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<GeoLocationError | null>(null);

  const captureGps = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pos = await getCurrentGpsPosition();
      setPosition(pos);
      return pos;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const setManualCoords = useCallback((lat: number, lng: number, accuracy = 10.0) => {
    setPosition({
      latitude: lat,
      longitude: lng,
      accuracy,
      timestamp: new Date().toISOString(),
      isRealDeviceGps: false, // Marked as simulated demo coordinates
    });
    setError(null);
  }, []);

  const clear = useCallback(() => {
    setPosition(null);
    setError(null);
  }, []);

  return {
    position,
    loading,
    error,
    captureGps,
    setManualCoords,
    clear,
  };
};
