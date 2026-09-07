import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';
import { logisticsService } from '../../services/logisticsService';
import { DataHonestyBadge } from './DataHonestyBadge';

interface SimulationDeckProps {
  missionId: string;
  onUpdate?: () => void;
}

export const SimulationDeck: React.FC<SimulationDeckProps> = ({ missionId, onUpdate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5.0);
  const [progress, setProgress] = useState(0.35);

  useEffect(() => {
    const state = logisticsService.getSimulationState(missionId);
    setIsRunning(state.isRunning);
    setSpeed(state.speedMultiplier);
    setProgress(state.progress);
  }, [missionId]);

  const handleStart = () => {
    logisticsService.startSimulation(missionId, () => {
      const state = logisticsService.getSimulationState(missionId);
      setProgress(state.progress);
      setIsRunning(state.isRunning);
      onUpdate?.();
    });
    setIsRunning(true);
  };

  const handlePause = () => {
    logisticsService.pauseSimulation(missionId);
    setIsRunning(false);
    onUpdate?.();
  };

  const handleReset = () => {
    logisticsService.resetSimulation(missionId);
    setIsRunning(false);
    setProgress(0);
    onUpdate?.();
  };

  const handleSpeed = (mult: number) => {
    setSpeed(mult);
    logisticsService.setSimulationSpeed(missionId, mult);
  };

  const handleDisruption = () => {
    logisticsService.injectDisruption(missionId);
    onUpdate?.();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
            Convoy GPS Telemetry Engine
          </h4>
          <DataHonestyBadge source="SIMULATED_TELEMETRY" />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <span className="text-[10px] text-slate-500 font-medium px-2">Speed:</span>
          {[1.0, 5.0, 10.0].map((s) => (
            <button
              key={s}
              onClick={() => handleSpeed(s)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                speed === s
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="font-semibold text-slate-600">Corridor Route Traversal</span>
          <span className="font-bold font-mono text-blue-600">{Math.round(progress * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Convoy</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Traversal</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Position</span>
          </button>
        </div>

        <button
          onClick={handleDisruption}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-300 shadow-xs cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>Simulate Landslide Disruption</span>
        </button>
      </div>
    </div>
  );
};
