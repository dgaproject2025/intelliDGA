import React, { useEffect, useRef } from 'react';

/**
 * Duval Triangle – Method 5 (Full Visualization)
 * - Dark/Light compatible (zone fills fixed across themes)
 * - Global axes with generous label gap
 * - Triangle, vertex labels
 * - Side tick marks (0..100) with correct directions:
 *     AB: 0@A → 100@B
 *     BC: 0@B → 100@C
 *     CA: 0@C → 100@A
 * - Directional arrows with labels:
 *     A→B (right label): Methane (CH₄)
 *     B→C (right label): Ethylene (C₂H₄)
 *     C→A (label ABOVE horizontal axis as requested): Ethane (C₂H₆)
 */
export default function DuvalTriangle5Visualization({
  className = '',
  showAxes = true,
  style,
  labels = {
    ab: 'Methane(CH₄) – PPM in %',
    bc: 'Ethylene(C₂H₄) – PPM in %',
    ca: 'Ethane(C₂H₆) – PPM in %',
  },
  colors,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Logical coordinate boundaries
  const xMin = -100,
    xMax = 550;
  const yMin = -100,
    yMax = 550;
  const xRange = xMax - xMin; // 650
  const yRange = yMax - yMin; // 650

  // Responsive margins
  const marginLeft = 40;
  const marginRight = 10;
  const marginBottom = 84; // room for x-axis labels
  const marginTop = 10;

  // Zone polygons (fixed colors across themes)
  const polygonData = [
    {
      PolygonName: 'O',
      X: 0,
      Y: 0,
      Order: 1,
      FillColor: 'rgb(104, 255, 255)',
      Vertex: 'A',
    },
    {
      PolygonName: 'O',
      X: 50,
      Y: 0,
      Order: 2,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 140,
      Y: 155.8,
      Order: 3,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 115,
      Y: 199.18,
      Order: 4,
      FillColor: 'rgb(104, 255, 255)',
    },

    {
      PolygonName: 'S',
      X: 115,
      Y: 199.18,
      Order: 5,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'S',
      X: 140,
      Y: 155.18,
      Order: 6,
      FillColor: 'rgb(51, 100, 240)',
      Vertex: 'C',
    },
    {
      PolygonName: 'S',
      X: 237.5,
      Y: 324.75,
      Order: 7,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'S',
      X: 212.5,
      Y: 368.05,
      Order: 8,
      FillColor: 'rgb(51, 100, 240)',
    },

    {
      PolygonName: 'PD',
      X: 212.5,
      Y: 368.05,
      Order: 9,
      FillColor: 'rgb(255, 0, 0)',
    },
    {
      PolygonName: 'PD',
      X: 215,
      Y: 363.72,
      Order: 10,
      FillColor: 'rgb(255, 0, 0)',
    },
    {
      PolygonName: 'PD',
      X: 247.5,
      Y: 420.01,
      Order: 11,
      FillColor: 'rgb(255, 0, 0)',
    },
    {
      PolygonName: 'PD',
      X: 245,
      Y: 424.34,
      Order: 12,
      FillColor: 'rgb(255, 0, 0)',
    },

    {
      PolygonName: 'O',
      X: 215,
      Y: 363.72,
      Order: 13,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 237.5,
      Y: 324.75,
      Order: 14,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 275,
      Y: 389.7,
      Order: 15,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 250,
      Y: 433,
      Order: 16,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 245,
      Y: 424.34,
      Order: 17,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'O',
      X: 247.5,
      Y: 420.01,
      Order: 18,
      FillColor: 'rgb(104, 255, 255)',
    },

    { PolygonName: 'ND', X: 50, Y: 0, Order: 19, FillColor: '#d3d3d3' },
    { PolygonName: 'ND', X: 175, Y: 0, Order: 20, FillColor: '#d3d3d3' },
    { PolygonName: 'ND', X: 262.5, Y: 151.55, Order: 21, FillColor: '#d3d3d3' },
    { PolygonName: 'ND', X: 200, Y: 259.8, Order: 22, FillColor: '#d3d3d3' },

    { PolygonName: 'T31', X: 175, Y: 0, Order: 23, FillColor: 'rgb(0,0,0)' },
    { PolygonName: 'T31', X: 350, Y: 0, Order: 24, FillColor: 'rgb(0,0,0)' },
    {
      PolygonName: 'T31',
      X: 262.5,
      Y: 151.55,
      Order: 25,
      FillColor: 'rgb(0,0,0)',
    },

    { PolygonName: 'C', X: 350, Y: 0, Order: 26, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 390, Y: 69.28, Order: 27, FillColor: '#ffa500' },
    {
      PolygonName: 'C',
      X: 335,
      Y: 164.54,
      Order: 28,
      FillColor: '#ffa500',
      Vertex: 'C',
    },
    { PolygonName: 'C', X: 340, Y: 173.2, Order: 29, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 245, Y: 337.74, Order: 30, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 200, Y: 259.8, Order: 31, FillColor: '#ffa500' },

    {
      PolygonName: 'T3',
      X: 350,
      Y: 0,
      Order: 32,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'B',
    },
    { PolygonName: 'T3', X: 500, Y: 0, Order: 33, FillColor: 'rgb(0,0,0)' },
    {
      PolygonName: 'T3',
      X: 337.5,
      Y: 281.45,
      Order: 34,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'B',
    },
    {
      PolygonName: 'T3',
      X: 307.5,
      Y: 229.49,
      Order: 35,
      FillColor: 'rgb(0,0,0)',
    },
    {
      PolygonName: 'T3',
      X: 340,
      Y: 173.2,
      Order: 36,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'B',
    },
    {
      PolygonName: 'T3',
      X: 335,
      Y: 164.54,
      Order: 37,
      FillColor: 'rgb(0,0,0)',
    },
    {
      PolygonName: 'T3',
      X: 390,
      Y: 69.28,
      Order: 38,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'B',
    },

    {
      PolygonName: 'T2',
      X: 307.5,
      Y: 229.49,
      Order: 39,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 337.5,
      Y: 281.45,
      Order: 40,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 275,
      Y: 389.7,
      Order: 41,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 245,
      Y: 337.74,
      Order: 42,
      FillColor: 'rgb(255,204,0)',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const transformX = (x, scaleX) => marginLeft + (x - xMin) * scaleX;
    const transformY = (y, scaleY, height) =>
      height - marginBottom - (y - yMin) * scaleY;

    const theme = () => {
      const cs = getComputedStyle(container);
      const text = cs.color || '#0f172a';
      return {
        text,
        axis: text,
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
      const cssHeight = container.clientHeight || 400;
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const drawingWidth = cssWidth - marginLeft - marginRight;
      const drawingHeight = cssHeight - marginTop - marginBottom;
      const scaleX = drawingWidth / xRange;
      const scaleY = drawingHeight / yRange;
      const th = theme();

      // --- Draw triangle outline first (for reference) ---
      const A = {
        x: transformX(0, scaleX),
        y: transformY(0, scaleY, cssHeight),
      };
      const B = {
        x: transformX(250, scaleX),
        y: transformY(433, scaleY, cssHeight),
      };
      const C = {
        x: transformX(500, scaleX),
        y: transformY(0, scaleY, cssHeight),
      };

      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.closePath();
      ctx.strokeStyle = th.axis;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // --- Filled zones ---
      const polygonGroups = {};
      for (const item of polygonData) {
        (polygonGroups[item.PolygonName] ||= []).push(item);
      }
      for (const name of Object.keys(polygonGroups)) {
        const group = polygonGroups[name].sort((a, b) => a.Order - b.Order);
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(
          transformX(group[0].X, scaleX),
          transformY(group[0].Y, scaleY, cssHeight)
        );
        for (let i = 1; i < group.length; i++) {
          ctx.lineTo(
            transformX(group[i].X, scaleX),
            transformY(group[i].Y, scaleY, cssHeight)
          );
        }
        ctx.closePath();
        ctx.fillStyle = group[0].FillColor;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = th.axis;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // --- Vertex labels ---
      const vertexFontSize = Math.max(12, drawingWidth / 40);
      ctx.font = `300 ${vertexFontSize}px ui-sans-serif, system-ui`;
      ctx.fillStyle = th.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'A',
        transformX(-35, scaleX),
        transformY(-50, scaleY, cssHeight)
      );
      ctx.fillText(
        'B',
        transformX(250, scaleX),
        transformY(483, scaleY, cssHeight)
      );
      ctx.fillText(
        'C',
        transformX(535, scaleX),
        transformY(-50, scaleY, cssHeight)
      );

      // --- Side ticks (0..100) with correct directions and orientations ---
      const tickLen = 10;
      const labelPad = 4;
      const markFont = Math.max(10, drawingWidth / 80);
      ctx.font = `300 ${markFont}px ui-sans-serif, system-ui`;
      ctx.fillStyle = th.text;

      // AB: 0@A → 100@B (horizontal tick, parallel to CA)
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let m = 0; m <= 100; m += 10) {
        const p = m / 100; // fraction from A to B
        const x = transformX(250 * p, scaleX);
        const y = transformY(433 * p, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(x - tickLen / 2, y);
        ctx.lineTo(x + tickLen / 2, y);
        ctx.strokeStyle = th.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(m), x - tickLen / 2 - labelPad, y);
      }

      // BC: 0@B → 100@C (ticks parallel to AB direction)
      // Unit along AB in canvas
      let vABx = 0.5 * scaleX,
        vABy = -0.866 * scaleY; // (0.5, 0.866) logical becomes y negative in canvas
      let vABmag = Math.hypot(vABx, vABy);
      const u_v = { x: vABx / vABmag, y: vABy / vABmag };
      // Right-hand normal for BC label offset (same as earlier logic)
      let nX = -0.866 * scaleX,
        nY = 0.5 * scaleY;
      const nMag = Math.hypot(nX, nY);
      const u_n = { x: nX / nMag, y: nY / nMag };

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      for (let m = 0; m <= 100; m += 10) {
        const p = m / 100; // 0 at B
        const logicalX = 250 + p * 250; // from 250 to 500
        const logicalY = 433 - p * 433; // from 433 to 0
        const cx = transformX(logicalX, scaleX);
        const cy = transformY(logicalY, scaleY, cssHeight);
        const half = tickLen / 2;
        const sx = cx - half * u_v.x,
          sy = cy - half * u_v.y;
        const ex = cx + half * u_v.x,
          ey = cy + half * u_v.y;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = th.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        const lx = cx - 2 * labelPad * u_n.x,
          ly = cy - 2 * labelPad * u_n.y; // to the right side of BC
        ctx.fillText(String(m), lx, ly);
      }

      // CA: 0@C → 100@A (ticks parallel to BC direction, labels ABOVE the horizontal axis)
      let vCAx = 250 * scaleX,
        vCAy = 433 * scaleY;
      const mag_vCA = Math.hypot(vCAx, vCAy);
      const u_tick_CA = { x: vCAx / mag_vCA, y: vCAy / mag_vCA };
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top'; // ABOVE the line
      for (let m = 0; m <= 100; m += 10) {
        const p = m / 100; // 0 at C(500,0) to A(0,0)
        const logicalX = 500 - 500 * p;
        const cx = transformX(logicalX, scaleX);
        const cy = transformY(0, scaleY, cssHeight);
        const half = tickLen / 2;
        const sx = cx - half * u_tick_CA.x,
          sy = cy - half * u_tick_CA.y;
        const ex = cx + half * u_tick_CA.x,
          ey = cy + half * u_tick_CA.y;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = th.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(m), cx, cy + half + labelPad); // ABOVE
      }

      // --- Arrow helper ---
      const drawArrowWithLabel = ({
        a,
        b,
        offset,
        color,
        label,
        labelSide = 'right',
        rotateReverse = false,
        placeAbove = false,
      }) => {
        const d = { x: b.x - a.x, y: b.y - a.y };
        const mag = Math.hypot(d.x, d.y) || 1;
        const u = { x: d.x / mag, y: d.y / mag };
        const uLeft = { x: -u.y, y: u.x };
        const center = {
          x: (a.x + b.x) / 2 + offset * uLeft.x,
          y: (a.y + b.y) / 2 + offset * uLeft.y,
        };

        const len = 0.5 * mag;
        const half = len / 2;
        const tail = { x: center.x - half * u.x, y: center.y - half * u.y };
        const head = { x: center.x + half * u.x, y: center.y + half * u.y };

        // line
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        // head
        const ah = Math.max(8, drawingWidth / 40);
        const aw = ah / 2;
        const uRight = { x: u.y, y: -u.x };
        const base = { x: head.x - ah * u.x, y: head.y - ah * u.y };
        const L = { x: base.x + aw * uRight.x, y: base.y + aw * uRight.y };
        const R = { x: base.x - aw * uRight.x, y: base.y - aw * uRight.y };
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(L.x, L.y);
        ctx.lineTo(R.x, R.y);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // label
        const labelOffsetPx = ah + 4;
        const sideVec =
          labelSide === 'right' ? { x: u.y, y: -u.x } : { x: -u.y, y: u.x };
        const labelPos = {
          x: center.x + labelOffsetPx * sideVec.x,
          y: center.y + labelOffsetPx * sideVec.y,
        };
        const angle = Math.atan2(u.y, u.x);
        ctx.save();
        ctx.translate(labelPos.x, labelPos.y);
        ctx.rotate(rotateReverse ? angle + Math.PI : angle);
        const fs = Math.max(10, drawingWidth / 60);
        ctx.font = `${fs}px ui-sans-serif, system-ui`;
        ctx.fillStyle = th.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = placeAbove ? 'bottom' : 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
      };

      // outward offset helper (keeps arrows outside)
      const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
      const outwardOffset = (a, b, dist) => {
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const m = Math.hypot(dx, dy) || 1;
        const u = { x: dx / m, y: dy / m };
        const uLeft = { x: -u.y, y: u.x };
        const v = { x: mid.x - centroid.x, y: mid.y - centroid.y };
        const sign = v.x * uLeft.x + v.y * uLeft.y >= 0 ? 1 : -1;
        return sign * dist;
      };

      const baseOffset = Math.max(36, drawingWidth / 40);

      // A→B, B→C labels on the right (outside). CA label ABOVE axis (inside) but arrow stays outside.
      drawArrowWithLabel({
        a: A,
        b: B,
        offset: outwardOffset(A, B, baseOffset),
        color: th.arrows.ab,
        label: labels.ab,
        labelSide: 'right',
      });
      drawArrowWithLabel({
        a: B,
        b: C,
        offset: outwardOffset(B, C, baseOffset),
        color: th.arrows.bc,
        label: labels.bc,
        labelSide: 'right',
      });
      // For CA: use outward offset for arrow, but placeAbove=true for label baseline.
      drawArrowWithLabel({
        a: C,
        b: A,
        offset: outwardOffset(C, A, baseOffset),
        color: th.arrows.ca,
        label: labels.ca,
        labelSide: 'right',
        rotateReverse: true,
        placeAbove: true,
      });

      // --- Global axes (draw last for clarity) ---
      if (showAxes) {
        const axisTickSize = 6;
        const axisFont = Math.max(11, drawingWidth / 60);
        const axisLabelPad = Math.max(12, axisFont * 0.7);
        ctx.font = `${axisFont}px ui-sans-serif, system-ui`;
        ctx.fillStyle = th.axis;
        ctx.strokeStyle = th.axis;
        ctx.lineWidth = 1.5;

        const xAxisY = transformY(yMin, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(transformX(xMin, scaleX), xAxisY);
        ctx.lineTo(transformX(xMax, scaleX), xAxisY);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let x = xMin; x <= xMax; x += 50) {
          const cx = transformX(x, scaleX);
          ctx.beginPath();
          ctx.moveTo(cx, xAxisY);
          ctx.lineTo(cx, xAxisY + axisTickSize);
          ctx.stroke();
          ctx.fillText(String(x), cx, xAxisY + axisTickSize + axisLabelPad);
        }

        const yAxisX = transformX(xMin, scaleX);
        ctx.beginPath();
        ctx.moveTo(yAxisX, transformY(yMin, scaleY, cssHeight));
        ctx.lineTo(yAxisX, transformY(yMax, scaleY, cssHeight));
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = yMin; y <= yMax; y += 50) {
          const cy = transformY(y, scaleY, cssHeight);
          ctx.beginPath();
          ctx.moveTo(yAxisX, cy);
          ctx.lineTo(yAxisX - axisTickSize, cy);
          ctx.stroke();
          ctx.fillText(String(y), yAxisX - axisTickSize - 6, cy);
        }
      }
    };

    const redraw = () => draw();
    const ro = new ResizeObserver(redraw);
    ro.observe(container);
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
  }, [colors, labels, showAxes]);

  return (
    <div
      ref={containerRef}
      className={`TheDuvalTriangle5Canvas relative w-full aspect-[5/4] rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
