import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';

interface LiveClockBadgeProps {
  className?: string;
  onRefresh?: () => void;
}

export const LiveClockBadge: React.FC<LiveClockBadgeProps> = ({ className = '', onRefresh }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Tick every second so viewers can see the clock actively running live
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setLastUpdated('Syncing...');
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
    }, 800);
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  const hours = pad(currentTime.getHours());
  const minutes = pad(currentTime.getMinutes());
  const seconds = pad(currentTime.getSeconds());
  const timeString = `${hours}:${minutes}:${seconds} IST`;

  return (
    <div className={`flex items-center gap-2.5 text-xs text-slate-500 flex-wrap ${className}`}>
      {/* Live Ticking Time Badge */}
      <div className="flex items-center gap-2 font-medium text-slate-700 bg-white border border-slate-200/90 px-3 py-1.5 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-1.5 font-mono text-slate-800 text-xs">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-bold tracking-tight text-slate-900">{timeString}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5"></span>
        </div>
      </div>

      {/* Dynamic Last Updated Badge */}
      <button
        type="button"
        onClick={handleRefreshClick}
        className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-blue-600 bg-white border border-slate-200/90 hover:border-blue-300 px-2.5 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer select-none"
        title="Refresh live telemetry feeds from ISRO & IMD"
      >
        <RefreshCw className={`w-3 h-3 text-slate-400 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
        <span>Last updated: <strong className="font-medium text-slate-700">{lastUpdated}</strong></span>
      </button>
    </div>
  );
};
