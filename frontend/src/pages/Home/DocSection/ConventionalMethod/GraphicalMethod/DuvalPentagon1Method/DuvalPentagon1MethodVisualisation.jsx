import React, { useEffect, useRef } from 'react';

/**
 * Duval Pentagon – Method 1 Visualization (JSX/JS)
 * - Zones filled exactly like the original (order/colors preserved, no zone strokes)
 * - No "0" or "100" axis labels
 * - Dark/Light theme aware for lines/text (zone fills locked)
 * - Responsive (devicePixelRatio aware)
 */
export default function DuvalPentagon1Visualization({
  className = '',
  style,
  showCircle = true,
  showTicks = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Fault zones (LOCKED colors, independent of theme) — from your original code
  const faultZones = [
    {
      name: 'PD',
      coords: [
        [0, 33],
        [-1, 33],
        [-1, 24.5],
        [0, 24.5],
      ],
      fill: 'rgba(255, 0, 0, 1)',
    },
    {
      name: 'D1',
      coords: [
        [0, 40],
        [38, 12],
        [32, -6.1],
        [4, 16],
        [0, 1.5],
      ],
      fill: 'rgba(26, 232, 232, 1)',
    },
    {
      name: 'D2',
      coords: [
        [4, 16],
        [32, -6.1],
        [24.3, -30],
        [0, -3],
        [0, 1.5],
      ],
      fill: 'rgba(51, 100, 240, 1)',
    },
    {
      name: 'T3',
      coords: [
        [0, -3],
        [24.3, -30],
        [23.5, -32.4],
        [1, -32],
        [-6, -4],
      ],
      fill: 'rgba(0, 0, 0,1)',
    },
    {
      name: 'T2',
      coords: [
        [-6, -4],
        [1, -32.4],
        [-22.5, -32.4],
      ],
      fill: 'rgba(255, 204, 0, 1)',
    },
    {
      name: 'T1',
      coords: [
        [-6, -4],
        [-22.5, -32.4],
        [-23.5, -32.4],
        [-35, 3],
        [0, 1.5],
        [0, -3],
      ],
      fill: 'rgba(255, 153, 153, 1)',
    },
    {
      name: 'S',
      coords: [
        [0, 1.5],
        [-35, 3.1],
        [-38, 12.4],
        [0, 40],
        [0, 33],
        [-1, 33],
        [-1, 24.5],
        [0, 24.5],
      ],
      fill: 'rgba(128, 128, 128, 1)',
    },
  ];

  // Gas axes (angles in degrees CCW from +x)
  const gasAxes = [
    { angle: 90, label: 'H\u2082' }, // H₂
    { angle: 18, label: 'C\u2082H\u2082' }, // C₂H₂
    { angle: 162, label: 'C\u2082H\u2086' }, // C₂H₆
    { angle: 234, label: 'CH\u2084' }, // CH₄
    { angle: 306, label: 'C\u2082H\u2084' }, // C₂H₄
  ].sort((a, b) => a.angle - b.angle);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    const getThemeColor = () => {
      const cs = getComputedStyle(container);
      // Strokes/labels adapt to theme; fills remain fixed
      return cs.color || '#0f172a';
    };

    const draw = () => {
      // DPR-aware canvas sizing
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = container.clientWidth || 600;
      const cssHeight = container.clientHeight || 600;
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.imageSmoothingEnabled = true;

      // Center & radius
      const cx = cssWidth / 2;
      const cy = cssHeight / 2;
      const radius = Math.min(cssWidth, cssHeight) * 0.4;
      const scale = radius / 40; // 40 → radius

      // Theme-adaptive stroke/label color
      const strokeColor = getThemeColor();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // ---- 1) Fault zones (beneath axes), filled EXACTLY per original ----
      faultZones.forEach((zone) => {
        ctx.beginPath();
        zone.coords.forEach(([px, py], idx) => {
          const x = cx + scale * px;
          const y = cy - scale * py; // invert Y for canvas
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = zone.fill; // LOCKED across themes
        ctx.fill();
      });

      // ---- 2) Optional dashed circumscribed circle (on top, theme-aware) ----
      if (showCircle) {
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Precompute vertices on the circle for the regular pentagon (sorted gas axes)
      const vertices = gasAxes.map((axis) => {
        const rad = (axis.angle * Math.PI) / 180;
        return {
          x: cx + radius * Math.cos(rad),
          y: cy - radius * Math.sin(rad),
          angle: axis.angle,
          label: axis.label,
          rad,
        };
      });

      // ---- 3) Gas axes (dashed) + ticks (dots) ----
      const tickCount = 10; // 0..100 by 10
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      vertices.forEach((v) => {
        // axis line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();

        // ticks as small dots
        if (showTicks) {
          for (let i = 1; i < tickCount; i++) {
            const t = (radius * i) / tickCount;
            const tx = cx + t * Math.cos(v.rad);
            const ty = cy - t * Math.sin(v.rad);
            ctx.beginPath();
            ctx.arc(
              tx,
              ty,
              Math.max(1.25, Math.min(cssWidth, cssHeight) / 220),
              0,
              Math.PI * 2
            );
            ctx.fillStyle = strokeColor;
            ctx.fill();
          }
        }
      });

      // ---- 4) Solid pentagon outline (theme-aware stroke, transparent fill) ----
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = 'transparent';
      ctx.fill();
      ctx.stroke();

      // ---- 5) Gas axis labels (outside the circle) ----
      const fontSize = Math.max(12, Math.min(cssWidth, cssHeight) / 28);
      ctx.font = `${fontSize}px ui-sans-serif, system-ui`;
      ctx.fillStyle = strokeColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const labelOffset = Math.max(14, radius * 0.06);
      vertices.forEach((v) => {
        let extraOffset = 0;
        if (v.label === 'C\u2082H\u2086') {
          // Push C2H6 farther away from vertex
          extraOffset = radius * 0.1; // adjust factor as needed (10% of radius here)
        }
        const lx = cx + (radius + labelOffset + extraOffset) * Math.cos(v.rad);
        const ly = cy - (radius + labelOffset + extraOffset) * Math.sin(v.rad);
        ctx.fillText(v.label, lx, ly);
      });

      // NOTE: Removed 0/100 labels per your request.
    };

    const redraw = () => draw();

    const ro = new ResizeObserver(redraw);
    ro.observe(container);

    // Redraw on theme class changes (dark/light)
    const mo = new MutationObserver(redraw);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    draw();

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [showCircle, showTicks, gasAxes]);

  return (
    <div
      ref={containerRef}
      className={`TheDuvalPentagon1Canvas relative w-full aspect-square rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
