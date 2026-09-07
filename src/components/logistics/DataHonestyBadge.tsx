import React from 'react';
import { Radio } from 'lucide-react';
import type { LocationSource } from '../../types/logistics';

interface DataHonestyBadgeProps {
  source: LocationSource;
  size?: 'sm' | 'md';
}

export const DataHonestyBadge: React.FC<DataHonestyBadgeProps> = ({ source, size = 'sm' }) => {
  if (source === 'LIVE_GPS') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono font-semibold rounded-md border bg-emerald-50 text-emerald-700 border-emerald-300 ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>LIVE GPS</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-semibold rounded-md border bg-amber-50 text-amber-800 border-amber-300 ${
      size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
    }`}>
      <Radio className="w-3 h-3 text-amber-600" />
      <span>SIMULATED GPS TELEMETRY</span>
    </span>
  );
};
