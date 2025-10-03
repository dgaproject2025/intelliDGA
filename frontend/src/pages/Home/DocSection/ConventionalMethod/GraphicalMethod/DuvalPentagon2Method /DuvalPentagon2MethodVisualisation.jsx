import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

export default function DuvalPentagon2Visualization({
  className = '',
  style,
  showCircle = true,
  showTicks = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  // Fault zones (locked colors)
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
      fill: 'rgba(128,128,128,1)',
    },
    {
      name: 'T3-H',
      coords: [
        [0, -3],
        [24.3, -30],
        [23.5, -32.4],
        [2.5, -32.4],
        [-3.5, -3],
      ],
      fill: 'rgba(0, 0, 0, 1)',
    },
    {
      name: 'C',
      coords: [
        [-3.5, -3],
        [2.5, -32.4],
        [-21.5, -32.4],
        [-11, -8],
      ],
      fill: '#ffa500',
    },
    {
      name: 'O',
      coords: [
        [-3.5, -3],
        [-11, -8],
        [-21.5, -32.4],
        [-23.5, -32.4],
        [-35, 3.1],
        [0, 1.5],
        [0, -3],
      ],
      fill: '#ffff00',
    },
  ];

  // Gas axes
  const gasAxes = [
    { angle: 90, label: 'H\u2082' },
    { angle: 18, label: 'C\u2082H\u2082' },
    { angle: 162, label: 'C\u2082H\u2086' },
    { angle: 234, label: 'CH\u2084' },
    { angle: 306, label: 'C\u2082H\u2084' },
  ].sort((a, b) => a.angle - b.angle);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');

    const getColors = () => {
      const cs = getComputedStyle(container);
      const text = cs.color || '#0f172a';
      // Use the container's background to paint the canvas bg explicitly
      let bg = cs.backgroundColor || '#ffffff';
      // Fallbacks for some Tailwind setups that may render transparent
      if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
        const isDark =
          document.documentElement.classList.contains('dark') ||
          window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
        bg = isDark ? '#0f172a' : '#ffffff';
      }
      return { text, axis: text, bg };
    };

    const getThemeColors = (appTheme) => {
      const isDarkMode = appTheme === 'dark';
      const cs = getComputedStyle(container);
      const defaultTextColor = cs.color;
      const axisColor = isDarkMode ? defaultTextColor : '#1f75fe';

      return {
        text: defaultTextColor,
        axis: axisColor,
        triangleSideText: defaultTextColor,
        arrows: {
          ab: colors?.arrows?.ab ?? 'orange',
          bc: colors?.arrows?.bc ?? 'purple',
          ca: colors?.arrows?.ca ?? 'brown',
        },
      };
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = container.clientWidth || 600;
      const cssHeight = container.clientHeight || 600;
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { text, axis, bg } = getColors();

      // Clear + paint theme background explicitly
      ctx.save();
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.restore();

      const cx = cssWidth / 2;
      const cy = cssHeight / 2;
      const radius = Math.min(cssWidth, cssHeight) * 0.4;
      const scale = radius / 40;

      // Zones (beneath)
      faultZones.forEach((zone) => {
        ctx.beginPath();
        zone.coords.forEach(([px, py], idx) => {
          const x = cx + scale * px;
          const y = cy - scale * py; // invert Y
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = zone.fill; // locked colors across themes
        ctx.fill();
      });

      // Vertices
      const vertices = gasAxes.map((axisDef) => {
        const rad = (axisDef.angle * Math.PI) / 180;
        return {
          x: cx + radius * Math.cos(rad),
          y: cy - radius * Math.sin(rad),
          rad,
          label: axisDef.label,
        };
      });

      // Optional circled boundary (dashed)
      if (showCircle) {
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = axis;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Axes + ticks
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = axis;
      ctx.lineWidth = 1;
      const tickCount = 10;

      vertices.forEach((v) => {
        // Axis line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();

        // Tick dots
        if (showTicks) {
          for (let i = 1; i < tickCount; i++) {
            const r = (radius * i) / tickCount;
            const tx = cx + r * Math.cos(v.rad);
            const ty = cy - r * Math.sin(v.rad);
            ctx.beginPath();
            ctx.arc(
              tx,
              ty,
              Math.max(1.25, Math.min(cssWidth, cssHeight) / 220),
              0,
              Math.PI * 2
            );
            ctx.fillStyle = axis;
            ctx.fill();
          }
        }
      });

      // Pentagon outline
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++)
        ctx.lineTo(vertices[i].x, vertices[i].y);
      ctx.closePath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = axis;
      ctx.stroke();

      // Labels (offset farther from vertices)
      const fontSize = Math.max(12, Math.min(cssWidth, cssHeight) / 28);
      ctx.font = `${fontSize}px ui-sans-serif, system-ui`;
      ctx.fillStyle = text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const baseOffset = Math.max(22, radius * 0.08);
      vertices.forEach((v) => {
        let extraOffset = 0;
        if (v.label === 'C\u2082H\u2086') {
          extraOffset = radius * 0.08; // push C₂H₆ farther (tune factor if needed)
        }
        const lx = cx + (radius + baseOffset + extraOffset) * Math.cos(v.rad);
        const ly = cy - (radius + baseOffset + extraOffset) * Math.sin(v.rad);
        ctx.fillText(v.label, lx, ly);
      });
    };

    // Redraw on container resize
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);

    // Redraw when the root element toggles dark mode class
    const mo = new MutationObserver(() => draw());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Redraw on OS theme changes
    let mq;
    if (window.matchMedia) {
      mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', draw);
      // Safari fallback
      mq.addListener?.(draw);
    }

    draw();

    return () => {
      ro.disconnect();
      mo.disconnect();
      if (mq) {
        mq.removeEventListener?.('change', draw);
        mq.removeListener?.(draw);
      }
    };
  }, [showCircle, showTicks, gasAxes]);

  return (
    <div
      ref={containerRef}
      className={`TheDuvalPentagon2Canvas relative w-full aspect-square rounded-2xl
        ring-1 ring-slate-200 dark:ring-slate-700
        bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
