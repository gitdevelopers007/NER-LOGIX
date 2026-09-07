import React, { useState } from 'react';
import type { TrendDataPoint } from '../services/analyticsService';

interface ConnectivityTrendChartProps {
  data: TrendDataPoint[];
  currentAverage?: number;
}

export const ConnectivityTrendChart: React.FC<ConnectivityTrendChartProps> = ({
  data,
  currentAverage = 82
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart configuration
  const minVal = 60;
  const maxVal = 100;
  const height = 220;
  const width = 800; // viewBox width
  const padLeft = 45;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 35;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const getY = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const normalized = (clamped - minVal) / (maxVal - minVal);
    return padTop + chartHeight - normalized * chartHeight;
  };

  const getX = (idx: number) => {
    if (data.length <= 1) return padLeft + chartWidth / 2;
    return padLeft + (idx / (data.length - 1)) * chartWidth;
  };

  // Generate smooth SVG path using Catmull-Rom or cubic Bezier
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let d = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${padTop + chartHeight} L ${points[0].x} ${padTop + chartHeight} Z`
    : '';

  const yTicks = [60, 70, 80, 90, 100];
  const avgY = getY(currentAverage);

  return (
    <div className="relative w-full bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Regional Connectivity Trend
            </h3>
            <span className="text-[11px] font-medium text-slate-500">(Accessibility %)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Real-time aggregate road corridor availability across all 8 North Eastern states
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-600 rounded-full" />
            <span className="text-slate-600 font-medium">Connectivity %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-slate-400" />
            <span className="text-slate-500">Benchmark Avg ({currentAverage}%)</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[550px] select-none"
        >
          <defs>
            <linearGradient id="connGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y axis labels */}
          {yTicks.map((val) => {
            const yPos = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={yPos}
                  x2={width - padRight}
                  y2={yPos}
                  stroke="#e2e8f0"
                  strokeDasharray={val === 80 ? 'none' : '3 3'}
                  strokeWidth={val === 80 ? '1.2' : '1'}
                />
                <text
                  x={padLeft - 10}
                  y={yPos + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono font-medium"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Current Average Benchmark dashed reference line */}
          <line
            x1={padLeft}
            y1={avgY}
            x2={width - padRight}
            y2={avgY}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#connGradient)" />
          )}

          {/* Smooth Trend line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* X axis baseline */}
          <line
            x1={padLeft}
            y1={padTop + chartHeight}
            x2={width - padRight}
            y2={padTop + chartHeight}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Data points & X axis labels */}
          {points.map((pt, i) => {
            const d = data[i];
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Vertical hover indicator bar */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={padTop}
                    x2={pt.x}
                    y2={padTop + chartHeight}
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.75"
                  />
                )}

                {/* X axis tick text */}
                <text
                  x={pt.x}
                  y={padTop + chartHeight + 18}
                  textAnchor="middle"
                  className={`text-[11px] font-medium font-sans ${
                    isHovered ? 'fill-blue-700 font-bold' : 'fill-slate-600'
                  }`}
                >
                  {d.label}
                </text>

                {/* Point Outer Ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* Value tooltip callout if hovered or highest/lowest */}
                {isHovered && (
                  <g>
                    <rect
                      x={pt.x - 38}
                      y={pt.y - 30}
                      width="76"
                      height="22"
                      rx="4"
                      fill="#0f172a"
                      opacity="0.95"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 15}
                      textAnchor="middle"
                      className="text-[10.5px] font-bold fill-white font-mono"
                    >
                      {d.value}% access
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover Information Banner */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div>
          {hoveredIndex !== null ? (
            <span className="text-slate-700 font-medium">
              <strong className="text-blue-700">{data[hoveredIndex].label}</strong>: {data[hoveredIndex].value}% accessibility
              {data[hoveredIndex].highlight && ` — ${data[hoveredIndex].highlight}`}
            </span>
          ) : (
            <span>Tip: Hover over data points to inspect daily corridor events &amp; disruptions</span>
          )}
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          Model: Regional GIS Aggregator v4.2 • Updated 20:41 IST
        </div>
      </div>
    </div>
  );
};
