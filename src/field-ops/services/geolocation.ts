export interface GeoLocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  isRealDeviceGps: boolean;
}

export interface GeoLocationError {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED';
  message: string;
}

export const getCurrentGpsPosition = (): Promise<GeoLocationResult> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 'NOT_SUPPORTED',
        message: 'Geolocation is not supported on this device/browser.',
      } as GeoLocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toISOString(),
          isRealDeviceGps: true,
        });
      },
      (error) => {
        let code: GeoLocationError['code'] = 'POSITION_UNAVAILABLE';
        if (error.code === error.PERMISSION_DENIED) {
          code = 'PERMISSION_DENIED';
        } else if (error.code === error.TIMEOUT) {
          code = 'TIMEOUT';
        }

        reject({
          code,
          message: error.message || 'Failed to acquire device GPS position.',
        } as GeoLocationError);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      }
    );
  });
};
