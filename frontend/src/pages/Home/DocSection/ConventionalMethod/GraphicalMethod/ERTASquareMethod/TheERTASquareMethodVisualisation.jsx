import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

/** Data bounds (log-log) */
const defaultBounds = { xmin: 0.01, xmax: 1000, ymin: 0.001, ymax: 1000 };

/** Zones (anti-clockwise) */
const defaultZones = [
  {
    id: 'T1',
    name: 'T1',
    fill: 'rgba(255,153,153,0.7)',
    stroke: 'rgba(255,153,153,1)',
    points: [
      [0.01, 0.001],
      [1, 0.001],
      [1, 0.01],
      [0.01, 0.01],
    ],
  },
  {
    id: 'T2',
    name: 'T2',
    fill: 'rgba(255,204,0,0.7)',
    stroke: 'rgba(255,204,0,1)',
    points: [
      [1, 0.001],
      [4, 0.001],
      [4, 0.01],
      [1, 0.01],
    ],
  },
  {
    id: 'T3',
    name: 'T3',
    fill: 'rgba(0,0,0,0.7)',
    stroke: 'rgba(0,0,0,0.9)',
    labelFill: '#fff',
    points: [
      [4, 0.001],
      [1000, 0.001],
      [1000, 0.01],
      [4, 0.01],
    ],
  },
  {
    id: 'DT',
    name: 'DT',
    fill: 'rgba(200,60,200,0.7)',
    stroke: 'rgba(200,60,200,1)',
    points: [
      [1, 0.01],
      [1000, 0.01],
      [1000, 1],
      [1, 1],
    ],
  },
  {
    id: 'PD',
    name: 'PD',
    fill: 'rgba(255,0,0,0.7)',
    stroke: 'rgba(255,0,0,1)',
    points: [
      [0.01, 0.01],
      [1, 0.01],
      [1, 1],
      [0.01, 1],
    ],
  },
  {
    id: 'D1',
    name: 'D1',
    fill: 'rgba(104,255,255,0.7)',
    stroke: 'rgba(104,255,255,1)',
    points: [
      [0.01, 1],
      [10, 1],
      [10, 10],
      [0.01, 10],
    ],
  },
  {
    id: 'D2',
    name: 'D2',
    fill: 'rgba(51,100,240,0.7)',
    stroke: 'rgba(51,100,240,1)',
    points: [
      [0.01, 10],
      [10, 10],
      [10, 1],
      [1000, 1],
      [1000, 1000],
      [0.01, 1000],
    ],
  },
];

export default function ERTASquareMethodVisualization({
  className = '',
  style,
  zones = defaultZones,
  bounds = defaultBounds,
  showGrid = true,
  background = '#1f75fe',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');

    // stronger dark-mode contrast, stable axis color
    const getThemeColors = () => {
      const cs = getComputedStyle(container);
      const text = cs.color || (theme === 'dark' ? '#e5e7eb' : '#0f172a');
      return {
        text,
        axis: theme === 'dark' ? text : '#0b4fc0', // slightly darker than bg for clarity
        grid: theme === 'dark' ? '#334155' : '#e2e8f0', // slate-700 / slate-200
        border: theme === 'dark' ? '#475569' : '#64748b', // slate-600 / slate-500
        plotBg:
          theme === 'dark' ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.85)',
        tick: theme === 'dark' ? '#e5e7eb' : '#334155',
        zoneLabelFallback: theme === 'dark' ? '#e5e7eb' : '#0f172a',
      };
    };

    const decadesBetween = (min, max) => {
      const a = Math.ceil(Math.log10(min));
      const b = Math.floor(Math.log10(max));
      const arr = [];
      for (let p = a; p <= b; p++) arr.push(Math.pow(10, p));
      return arr;
    };
    const formatTick = (v) => (v >= 1 ? String(v) : v.toString());

    const polygonCentroid = (pts) => {
      let area = 0,
        cx = 0,
        cy = 0;
      const n = pts.length;
      for (let i = 0; i < n; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % n];
        const cross = x1 * y2 - x2 * y1;
        area += cross;
        cx += (x1 + x2) * cross;
        cy += (y1 + y2) * cross;
      }
      area *= 0.5;
      if (Math.abs(area) < 1e-6) {
        const sx = pts.reduce((s, p) => s + p[0], 0) / n;
        const sy = pts.reduce((s, p) => s + p[1], 0) / n;
        return [sx, sy];
      }
      return [cx / (6 * area), cy / (6 * area)];
    };

    const draw = () => {
      // DPR-safe sizing
      const dpr = window.devicePixelRatio || 1;
      const cssW = container.clientWidth || 680;
      const cssH = container.clientHeight || 680;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const C = getThemeColors();

      // clear + global background
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, cssW, cssH);

      // Plot square (NO RADIUS now)
      const padding = Math.max(40, Math.min(cssW, cssH) / 12);
      const innerW = cssW - padding * 2;
      const innerH = cssH - padding * 2;
      const side = Math.min(innerW, innerH);
      const x0 = (cssW - side) / 2;
      const y0 = (cssH - side) / 2;

      // plot background (square)
      ctx.fillStyle = C.plotBg;
      ctx.fillRect(x0, y0, side, side);

      // Log mapping
      const { xmin, xmax, ymin, ymax } = bounds;
      const lxmin = Math.log10(xmin),
        lxmax = Math.log10(xmax);
      const lymin = Math.log10(ymin),
        lymax = Math.log10(ymax);
      const spanX = lxmax - lxmin || 1;
      const spanY = lymax - lymin || 1;
      const toCanvas = (x, y) => {
        const px = x0 + ((Math.log10(x) - lxmin) / spanX) * side;
        const py = y0 + side - ((Math.log10(y) - lymin) / spanY) * side;
        return [px, py];
      };

      // Grid decades
      if (showGrid) {
        const xTicks = decadesBetween(xmin, xmax);
        const yTicks = decadesBetween(ymin, ymax);
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = C.grid;
        ctx.lineWidth = 1;

        // vertical lines + labels
        xTicks.forEach((t) => {
          const [x1, y1] = toCanvas(t, ymin);
          const [x2, y2] = toCanvas(t, ymax);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          ctx.fillStyle = C.tick;
          ctx.font = `${Math.max(
            10,
            cssW / 68
          )}px ui-sans-serif, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(formatTick(t), x1, y0 + side + 6);
        });

        // horizontal lines + labels
        yTicks.forEach((t) => {
          const [x1, y1] = toCanvas(xmin, t);
          const [x2, y2] = toCanvas(xmax, t);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          ctx.fillStyle = C.tick;
          ctx.font = `${Math.max(
            10,
            cssW / 68
          )}px ui-sans-serif, system-ui, sans-serif`;
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(formatTick(t), x0 - 6, y1);
        });

        ctx.setLineDash([]);
      }

      // Border (square, no radius)
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x0, y0, side, side);

      // Zones
      zones.forEach((z) => {
        const pts = z.points.map(([x, y]) => toCanvas(x, y));
        ctx.beginPath();
        pts.forEach(([px, py], i) =>
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
        );
        ctx.closePath();
        ctx.fillStyle = z.fill;
        ctx.fill();
        ctx.strokeStyle = z.stroke || 'transparent';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // zone label
        const [cx, cy] = polygonCentroid(pts);
        ctx.font = `${Math.max(
          11,
          cssW / 68
        )}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = z.labelFill || C.zoneLabelFallback;
        ctx.fillText(z.name || z.id, cx, cy);
      });

      // Axis titles
      ctx.fillStyle = C.text;
      ctx.font = `${Math.max(
        12,
        cssW / 60
      )}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('C₂H₄ / C₂H₆', x0 + side / 2, y0 + side + 26);

      ctx.save();
      ctx.translate(x0 - 30, y0 + side / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('C₂H₂ / C₂H₆', 0, 0);
      ctx.restore();
    };

    const ro = new ResizeObserver(draw);
    ro.observe(container);
    draw();

    return () => ro.disconnect();
  }, [theme, zones, bounds, background]);

  return (
    <div
      ref={containerRef}
      className={`ERTATheSquareCanvas relative w-full aspect-square rounded-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      {/* If you ALSO want no rounding on the outer frame, remove `rounded-sm` above. */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
