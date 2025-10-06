import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

// Mansour Pentagon Visualization (canvas-based)
export default function MansourPentagonVisualization({
  className = '',
  style,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const labelC2H2Ref = useRef(null);
  const pointsDataRef = useRef([]); // for tooltip hit-testing
  const vertexDataRef = useRef([]); // for tooltip hit-testing
  const resizeObserverRef = useRef(null);

  const { theme } = useTheme(); // not used for background (fixed blue), but used for text/axis color choice if you wish

  // Helpers
  const toRadians = (deg) => (deg * Math.PI) / 180;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    const labelC2H2 = labelC2H2Ref.current;
    if (!container || !canvas || !tooltip || !labelC2H2) return;

    const ctx = canvas.getContext('2d');

    // Colors (background is fixed)
    const getThemeColors = () => {
      // On a strong blue background, white labels look best in both modes.
      // You can still theme other items if needed.
      return {
        bg: '#90D5FF', // fixed as requested
        text: '#ffffff',
        axis: '#e6eefc',
        circle: '#e6eefc',
        dots: '#e6eefc',
        zones: {
          PD: 'rgba(255,0,0,1)',
          D1: 'rgb(104,255,255)',
          D2: 'rgb(51,100,240)',
          T1: 'rgb(255,153,153)',
          T2: 'rgb(255,204,0)',
          T3: 'rgb(0,0,0)',
        },
      };
    };

    const draw = () => {
      // Hi-DPI scaling
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = Math.max(100, container.clientWidth || 600);
      const cssHeight = Math.max(100, container.clientHeight || 600);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear and paint background FIRST
      const colors = getThemeColors();
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Reset tooltip datasets
      pointsDataRef.current = [];
      vertexDataRef.current = [];

      // Center/radius
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const r = (Math.min(cssWidth, cssHeight) / 2) * 0.8;

      // ----- Vertices (gas axes) with dashed lines and labels -----
      const gasAxes = [
        { angle: 18, label: 'CH\u2084' },
        { angle: 90, label: 'H\u2082' },
        { angle: 162, label: 'C\u2082H\u2082' },
        { angle: 234, label: 'C\u2082H\u2086' },
        { angle: 306, label: 'C\u2082H\u2084' },
      ];

      // Draw dashed axes from center to vertices and place labels
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = colors.axis;
      ctx.lineWidth = 1;

      const vertices = gasAxes.map((axis) => {
        const rad = toRadians(axis.angle);
        const x = centerX + r * Math.cos(rad);
        const y = centerY - r * Math.sin(rad);
        const mathCoord = `(${(r * Math.cos(rad)).toFixed(3)}, ${(
          r * Math.sin(rad)
        ).toFixed(3)})`;

        // Axis line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        return {
          x,
          y,
          label: axis.label,
          angle: axis.angle,
          math: mathCoord,
          rad,
        };
      });

      ctx.setLineDash([]);

      // Labels: draw all on canvas EXCEPT C2H2 which we position as an HTML element slightly farther from vertex
      ctx.font = `16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.fillStyle = colors.text;

      vertices.forEach((v) => {
        if (v.label === 'C\u2082H\u2082') return; // handled via HTML below

        // Small per-label offset tuning
        let ox = 5,
          oy = -10;
        if (v.label.includes('H\u2082')) {
          ox = 0;
          oy = -15;
        } else if (v.label.includes('C\u2082H\u2086')) {
          ox = -35;
          oy = 20;
        } else if (v.label.includes('C\u2082H\u2084')) {
          ox = 8;
          oy = 15;
        } else if (v.label.includes('CH\u2084')) {
          ox = 8;
          oy = 8;
        }

        ctx.fillText(v.label, v.x + ox, v.y + oy);
        vertexDataRef.current.push({
          label: v.label,
          x: v.x,
          y: v.y,
          math: v.math,
        });
      });

      // Place C2H2 HTML label a bit farther away from vertex
      {
        const c2h2 = vertices.find((v) => v.label === 'C\u2082H\u2082');
        if (c2h2) {
          // radial push distance (pixels) – increased to be "a little bit away"
          const extra = Math.max(24, Math.min(48, r * 0.06));
          const pushedX = c2h2.x + extra * Math.cos(c2h2.rad);
          const pushedY = c2h2.y - extra * Math.sin(c2h2.rad);

          // Position the HTML label (absolute inside container)
          labelC2H2.style.left = `${pushedX}px`;
          labelC2H2.style.top = `${pushedY}px`;
          labelC2H2.style.color = colors.text;
          labelC2H2.textContent = c2h2.label;

          vertexDataRef.current.push({
            label: c2h2.label,
            x: c2h2.x,
            y: c2h2.y,
            math: c2h2.math,
          });
        }
      }

      // ---------- Precompute named points (M,F,T,K,G,S,H,N,W,L) ----------
      const sin = (d) => Math.sin(toRadians(d));
      const cos = (d) => Math.cos(toRadians(d));
      const tan = (d) => Math.tan(toRadians(d));

      // Section 1: M F T (on side H2–C2H2)
      const addPoint = (label, x, y, color) => {
        // draw small square point (subtle, since background is blue)
        ctx.fillStyle = color;
        ctx.fillRect(x - 2, y - 2, 4, 4);
        pointsDataRef.current.push({
          label,
          x,
          y,
          math: `(${(x - centerX).toFixed(3)}, ${(centerY - y).toFixed(3)})`,
        });
      };

      {
        const factor = Math.sqrt((1 - Math.sin(toRadians(18))) / 2);
        const sin54 = Math.sin(toRadians(54));
        const cos54 = Math.cos(toRadians(54));
        const Uvals = [
          { label: 'M', U: 3.2, color: '#ffebee' },
          { label: 'F', U: 5.0, color: '#ffebee' },
          { label: 'T', U: 9.1, color: '#ffebee' },
        ];
        Uvals.forEach(({ label, U, color }) => {
          const R = factor * 0.2 * U * r;
          const x = centerX + R * sin54;
          const y = centerY - (r - R * cos54);
          addPoint(label, x, y, color);
        });
      }

      // Section 2: K (on C2H6–H2 line, U=3.2)
      {
        const U = 3.2;
        const factor = Math.sqrt((1 - Math.sin(toRadians(18))) / 2);
        const sin54 = Math.sin(toRadians(54));
        const cos54 = Math.cos(toRadians(54));
        const R = factor * 0.2 * U * r;
        const x = centerX - R * sin54;
        const y = centerY - (r - R * cos54);
        addPoint('K', x, y, '#e3f2fd');
      }

      // Section 3: G (on C2H2–C2H4 line)
      {
        const U = 1.2;
        const R = 0.2 * r * Math.sin(toRadians(36)) * U;
        const xg = r * Math.cos(toRadians(18)) - R * Math.cos(toRadians(72));
        const yg = Math.tan(toRadians(72)) * xg - 2.61803398875 * r;
        addPoint('G', centerX + xg, centerY - yg, '#ede7f6');
      }

      // Section 4: S and H (angle 54°, U = 4.2, 2.2)
      {
        const sin54 = Math.sin(toRadians(54));
        const cos54 = Math.cos(toRadians(54));
        const SH = [
          { label: 'S', U: 4.2, color: '#e8f5e9' },
          { label: 'H', U: 2.2, color: '#fff3e0' },
        ];
        SH.forEach(({ label, U, color }) => {
          const R = 0.2 * r * sin54 * U;
          const x = r * cos54 - R;
          const y = -r * sin54;
          addPoint(label, centerX + x, centerY - y, color);
        });
      }

      // Section 5: N (on CH4–C2H6 line)
      {
        const U = 6.8;
        const R = 0.2 * r * Math.sin(toRadians(36)) * U;
        const xn = -(r * Math.cos(toRadians(54)) + R * Math.cos(toRadians(72)));
        const yn = Math.tan(toRadians(108)) * xn - 2.61803398875 * r;
        addPoint('N', centerX + xn, centerY - yn, '#fce4ec');
      }

      // Section 6: W (intersection)
      {
        const sin54_v = Math.sin(toRadians(54));
        const cos54_v = Math.cos(toRadians(54));
        const U_S = 4.2;
        const R_S2 = 0.2 * r * sin54_v * U_S;
        const xS = r * cos54_v - R_S2;
        const yS = -r * sin54_v;

        const U_T = 9.1;
        const factorT = Math.sqrt((1 - Math.sin(toRadians(18))) / 2);
        const R_T = factorT * 0.2 * U_T * r;
        const xT = R_T * Math.sin(toRadians(54));
        const yT = r - R_T * Math.cos(toRadians(54));
        const mL2 = cos54_v / sin54_v;
        const xW = xS;
        const yW = yT + mL2 * (xS - xT);
        addPoint('W', centerX + xW, centerY - yW, '#d7ccc8');
      }

      // Section 7: L (intersection)
      {
        const sin54_v = Math.sin(toRadians(54));
        const cos54_v = Math.cos(toRadians(54));
        const U_H = 2.2;
        const R_H = 0.2 * r * sin54_v * U_H;
        const xH = r * cos54_v - R_H;
        const yH = -r * sin54_v;
        const mL2 = cos54_v / sin54_v;

        const U_G = 1.2;
        const R_G = 0.2 * r * Math.sin(toRadians(36)) * U_G;
        const xGv = r * Math.cos(toRadians(18)) - R_G * Math.cos(toRadians(72));
        const yGv = Math.tan(toRadians(72)) * xGv - 2.61803398875 * r;

        const xL = xH;
        const yL = yGv + mL2 * (xH - xGv);
        addPoint('L', centerX + xL, centerY - yL, '#bcaaa4');
      }

      // Push vertex data for tooltip
      vertices.forEach((v) => {
        vertexDataRef.current.push({
          label: v.label,
          x: v.x,
          y: v.y,
          math: v.math,
        });
      });

      // ---------- Zones (drawn AFTER points so they sit beneath labels/dots) ----------
      const getPoint = (label) =>
        pointsDataRef.current.find((p) => p.label === label);
      const getVertex = (label) =>
        vertexDataRef.current.find((p) => p.label === label);

      const fillPoly = (pts, fill) => {
        if (!pts.every(Boolean)) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      };

      // PD: (H2, M, K)
      fillPoly(
        [getVertex('H\u2082'), getPoint('M'), getPoint('K')],
        colors.zones.PD
      );

      // D1/LED: (K, M, N, C2H2)
      fillPoly(
        [
          getPoint('K'),
          getPoint('M'),
          getPoint('N'),
          getVertex('C\u2082H\u2082'),
        ],
        colors.zones.D1
      );

      // D2/HED: (M, F, C2H6, N)
      fillPoly(
        [
          getPoint('M'),
          getPoint('F'),
          getVertex('C\u2082H\u2086'),
          getPoint('N'),
        ],
        colors.zones.D2
      );

      // T1/LT: (F, T, W, S, C2H6)
      fillPoly(
        [
          getPoint('F'),
          getPoint('T'),
          getPoint('W'),
          getPoint('S'),
          getVertex('C\u2082H\u2086'),
        ],
        colors.zones.T1
      );

      // T2/MT: (T, CH4, G, L, H, S, W)
      fillPoly(
        [
          getPoint('T'),
          getVertex('CH\u2084'),
          getPoint('G'),
          getPoint('L'),
          getPoint('H'),
          getPoint('S'),
          getPoint('W'),
        ],
        colors.zones.T2
      );

      // T3/HT: (G, C2H4, H, L)
      fillPoly(
        [
          getPoint('G'),
          getVertex('C\u2082H\u2084'),
          getPoint('H'),
          getPoint('L'),
        ],
        colors.zones.T3
      );

      // Circumcircle
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.strokeStyle = colors.circle;
      ctx.stroke();
      ctx.setLineDash([]);

      // Axis dots + dashed connectors (0..100%)
      {
        const dotRadius = 2;
        ctx.fillStyle = colors.dots;
        ctx.strokeStyle = colors.circle;

        gasAxes.forEach((axis) => {
          const rad = toRadians(axis.angle);

          // dashed connector: center -> marks
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          for (let i = 1; i <= 10; i++) {
            const f = i / 10;
            const dx = centerX + f * r * Math.cos(rad);
            const dy = centerY - f * r * Math.sin(rad);
            ctx.lineTo(dx, dy);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // draw the dots
          for (let i = 0; i <= 10; i++) {
            const f = i / 10;
            const dx = centerX + f * r * Math.cos(rad);
            const dy = centerY - f * r * Math.sin(rad);
            ctx.beginPath();
            ctx.arc(dx, dy, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    };

    // Tooltip handlers (hit-test against points & vertices)
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const all = pointsDataRef.current.concat(vertexDataRef.current);
      let found = null;
      for (let i = 0; i < all.length; i++) {
        const dx = mx - all[i].x;
        const dy = my - all[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < 8) {
          found = all[i];
          break;
        }
      }

      if (found) {
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.display = 'block';
        tooltip.textContent = `${found.label} ${found.math}`;
      } else {
        tooltip.style.display = 'none';
      }
    };
    const onMouseOut = () => {
      tooltip.style.display = 'none';
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseout', onMouseOut);

    // Resize observer to redraw responsively
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    resizeObserverRef.current = ro;

    // Initial draw + redraw on theme change (even though bg is fixed, labels might change style)
    draw();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseout', onMouseOut);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`TheMansourPentagonCanvas relative w-full aspect-square rounded-md overflow-hidden ${className}`}
      style={style}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* C2H2 vertex label (HTML), positioned by JS each draw */}
      <div
        ref={labelC2H2Ref}
        className="vertex-label absolute select-none pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          fontSize: 16,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
          fontWeight: 400,
          textShadow: '0 1px 2px rgba(0,0,0,0.35)',
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        id="tooltip"
        className="absolute z-10 px-2 py-1 rounded text-xs pointer-events-none"
        style={{
          display: 'none',
          color: '#0b1020',
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(0,0,0,0.12)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          borderRadius: 6,
        }}
      />
    </div>
  );
}
