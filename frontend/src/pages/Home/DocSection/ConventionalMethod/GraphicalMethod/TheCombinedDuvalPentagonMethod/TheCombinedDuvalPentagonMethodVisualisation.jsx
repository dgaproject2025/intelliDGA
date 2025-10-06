// CombinedDuvalPentagonVisualization.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

export default function CombinedDuvalPentagonVisualization({
  className = '',
  style,
  background,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  const vertices = [
    { angle: 90, label: 'H\u2082' },
    { angle: 18, label: 'C\u2082H\u2082' },
    { angle: 306, label: 'C\u2082H\u2084' },
    { angle: 234, label: 'CH\u2084' },
    { angle: 162, label: 'C\u2082H\u2086' },
  ].sort((a, b) => a.angle - b.angle);

  const zones = [
    {
      id: 'PD',
      coords: [
        [0, 33],
        [-1, 33],
        [-1, 24.5],
        [0, 24.5],
      ],
    },
    {
      id: 'S',
      coords: [
        [0, 40],
        [-38, 12.4],
        [-35, 3.1],
        [0, 1.5],
      ],
    },
    {
      id: 'D1',
      coords: [
        [0, 40],
        [0, 1.5],
        [4, 16],
        [32, -6.1],
        [38, 12.4],
      ],
    },
    {
      id: 'D2',
      coords: [
        [0, 1.5],
        [0, -3],
        [24.3, -30],
        [32, -6.1],
        [4, 16],
      ],
    },
    {
      id: 'T1-O',
      coords: [
        [-23.5, -32.4],
        [-22.5, -32.4],
        [-18.64, -25.75],
        [-11, -8],
        [-6, -4],
        [0, -3],
        [0, 1.5],
        [-35, 3.1],
      ],
    },
    {
      id: 'T1-C',
      coords: [
        [-6, -4],
        [-11, -8],
        [-18.64, -25.75],
      ],
    },
    {
      id: 'T2-O',
      coords: [
        [-18.64, -25.75],
        [-22.5, -32.4],
        [-21.5, -32.4],
      ],
    },
    {
      id: 'T2-C',
      coords: [
        [-6, -4],
        [-18.64, -25.75],
        [-21.5, -32.4],
        [1, -32.4],
      ],
    },
    {
      id: 'T3-C',
      coords: [
        [-3.5, -3.5],
        [-6, -4],
        [1, -32.4],
        [2.5, -32.4],
      ],
    },
    {
      id: 'T3-H',
      coords: [
        [0, -3],
        [-3.5, -3.5],
        [2.5, -32.4],
        [23.5, -32.4],
        [24.3, -30],
      ],
    },
  ];

  const zoneFill = {
    PD: 'rgba(255, 0, 0, 0.7)',
    S: 'rgba(128,128,128,1)',
    D1: 'rgba(26, 232, 232, 1)',
    D2: 'rgba(51, 100, 240, 1)',
    'T1-O': '#ffff00',
    'T2-O': 'rgba(255, 204, 0, 1)',
    'T1-C': '#ffa500',
    'T2-C': '#06d6a0',
    'T3-C': '#9381ff',
    'T3-H': 'rgba(0, 0, 0,1)',
  };

  const drawPriority = {
    S: 1,
    D1: 2,
    D2: 3,
    'T1-O': 4,
    'T1-C': 5,
    'T2-O': 6,
    'T2-C': 7,
    'T3-C': 8,
    'T3-H': 9,
    PD: 10,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');

    const themeColors = () => {
      const cs = getComputedStyle(container);
      const text = cs.color || (theme === 'dark' ? '#e5e7eb' : '#0f172a');
      const outline = theme === 'dark' ? '#cbd5e1' : '#1f2937';
      const zoneStroke =
        theme === 'dark' ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.7)';
      return { text, outline, zoneStroke };
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = container.clientWidth || 640;
      const cssH = container.clientHeight || 640;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const C = themeColors();
      ctx.clearRect(0, 0, cssW, cssH);

      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, cssW, cssH);
      }

      const cx = cssW / 2;
      const cy = cssH / 2;
      const radius = Math.min(cssW, cssH) * 0.4;
      const scale = radius / 40;

      const toCanvas = ([x, y]) => [cx + x * scale, cy - y * scale];
      const orderedZones = [...zones].sort(
        (a, b) => (drawPriority[a.id] || 0) - (drawPriority[b.id] || 0)
      );

      orderedZones.forEach((z) => {
        const pts = z.coords.map(toCanvas);
        if (pts.length < 3) return;

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();

        ctx.fillStyle = zoneFill[z.id] || 'rgba(255,0,0,0.7)';
        ctx.fill();

        // PD: no border at all
        if (z.id !== 'PD') {
          ctx.strokeStyle = C.zoneStroke;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      });

      // Pentagon border
      const pentVerts = vertices.map((v) => {
        const rad = (v.angle * Math.PI) / 180;
        return {
          x: cx + radius * Math.cos(rad),
          y: cy - radius * Math.sin(rad),
          angle: v.angle,
          label: v.label,
        };
      });

      ctx.beginPath();
      ctx.moveTo(pentVerts[0].x, pentVerts[0].y);
      for (let i = 1; i < pentVerts.length; i++)
        ctx.lineTo(pentVerts[i].x, pentVerts[i].y);
      ctx.closePath();
      ctx.strokeStyle = C.outline;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Labels
      ctx.font = `${Math.max(
        12,
        cssW / 60
      )}px ui-sans-serif, system-ui, sans-serif`;
      ctx.fillStyle = C.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const offset = 18;
      pentVerts.forEach((v) => {
        const rad = (v.angle * Math.PI) / 180;
        const lx = cx + (radius + offset) * Math.cos(rad);
        const ly = cy - (radius + offset) * Math.sin(rad);
        ctx.fillText(v.label, lx, ly);
      });
    };

    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    draw();
    return () => ro.disconnect();
  }, [theme, background]);

  return (
    <div
      ref={containerRef}
      className={`TheCombinedDuvalPentagonCanvas relative w-full aspect-square rounded-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
