import React, { useEffect, useRef } from 'react';

/**
 * Duval Triangle – Method 4 Visualization (full-fledged)
 * - Dark/Light theme aware
 * - Fully responsive canvas & typography
 * - Global axes with extra gap from tick labels
 * - Triangle, vertex labels, side ticks (0–100 by 10)
 * - Zone polygons (O, C, PD, S, ND)
 * - Directional arrows with labels: A→B (right, Hydrogen), B→C (right, Methane), C→A (below, reversed, Ethane)
 */
export default function DuvalTriangle4Visualization({
  className = '',
  showAxes = true,
  style,
  labels = {
    ab: 'Hydrogen(H₂) – PPM in %',
    bc: 'Methane(CH₄) – PPM in %',
    ca: 'Ethane(C₂H₆) – PPM in %',
  },
  colors,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Logical coordinate boundaries (overall drawing area)
  const xMin = -100,
    xMax = 550;
  const yMin = -100,
    yMax = 550;
  const xRange = xMax - xMin; // 650
  const yRange = yMax - yMin; // 650

  // Responsive margins for the drawing area
  const marginLeft = 40;
  const marginRight = 10;
  const marginBottom = 70; // extra space for CA axis title / bottom labels
  const marginTop = 10;

  // --- Duval-4 zone polygons (full list from your script) ---
  const polygonData = [
    {
      PolygonName: 'O',
      X: 0,
      Y: 0,
      Order: 1,
      FillColor: '#ffff00',
      Vertex: 'A',
    },
    { PolygonName: 'O', X: 350, Y: 0, Order: 2, FillColor: '#ffff00' },
    { PolygonName: 'O', X: 327.5, Y: 38.97, Order: 3, FillColor: '#ffff00' },
    { PolygonName: 'O', X: 22.5, Y: 38.97, Order: 4, FillColor: '#ffff00' },

    { PolygonName: 'C', X: 350, Y: 0, Order: 5, FillColor: '#ffa500' },
    {
      PolygonName: 'C',
      X: 500,
      Y: 0,
      Order: 6,
      FillColor: '#ffa500',
      Vertex: 'C',
    },
    { PolygonName: 'C', X: 340, Y: 277.12, Order: 7, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 280, Y: 173.2, Order: 8, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 342.5, Y: 64.95, Order: 9, FillColor: '#ffa500' },
    { PolygonName: 'C', X: 312.5, Y: 64.95, Order: 10, FillColor: '#ffa500' },

    {
      PolygonName: 'PD',
      X: 285,
      Y: 363.72,
      Order: 11,
      FillColor: 'rgb(255,0,0)',
    },
    {
      PolygonName: 'PD',
      X: 287.5,
      Y: 368.05,
      Order: 12,
      FillColor: 'rgb(255,0,0)',
    },
    {
      PolygonName: 'PD',
      X: 255,
      Y: 424.34,
      Order: 13,
      FillColor: 'rgb(255,0,0)',
    },
    {
      PolygonName: 'PD',
      X: 252.5,
      Y: 420.01,
      Order: 14,
      FillColor: 'rgb(255,0,0)',
    },

    { PolygonName: 'S', X: 247.5, Y: 38.97, Order: 15, FillColor: '#0000ff' },
    { PolygonName: 'S', X: 327.5, Y: 38.97, Order: 16, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 312.5, Y: 64.95, Order: 17, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 342.5, Y: 64.95, Order: 18, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 280, Y: 173.2, Order: 19, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 340, Y: 277.12, Order: 20, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 287.5, Y: 368.05, Order: 21, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 285, Y: 363.72, Order: 22, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 252.5, Y: 420.01, Order: 23, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 255, Y: 424.34, Order: 24, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 250, Y: 433, Order: 25, FillColor: '#ffa500' },
    { PolygonName: 'S', X: 135, Y: 233.82, Order: 26, FillColor: '#ffa500' },

    { PolygonName: 'ND', X: 22.5, Y: 38.97, Order: 27, FillColor: '#d3d3d3' },
    {
      PolygonName: 'ND',
      X: 247.5,
      Y: 38.97,
      Order: 28,
      FillColor: '#d3d3d3',
      Vertex: 'C',
    },
    { PolygonName: 'ND', X: 135, Y: 233.82, Order: 29, FillColor: '#d3d3d3' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    // helpers
    const transformX = (x, scaleX) => marginLeft + (x - xMin) * scaleX;
    const transformY = (y, scaleY, height) =>
      height - marginBottom - (y - yMin) * scaleY;

    const getTheme = () => {
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

      const theme = getTheme();

      // --- Triangle outline ---
      ctx.beginPath();
      ctx.moveTo(transformX(0, scaleX), transformY(0, scaleY, cssHeight));
      ctx.lineTo(transformX(250, scaleX), transformY(433, scaleY, cssHeight));
      ctx.lineTo(transformX(500, scaleX), transformY(0, scaleY, cssHeight));
      ctx.closePath();
      ctx.strokeStyle = theme.axis;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // --- Filled zones ---
      const polygonGroups = {};
      for (const item of polygonData) {
        if (!polygonGroups[item.PolygonName])
          polygonGroups[item.PolygonName] = [];
        polygonGroups[item.PolygonName].push(item);
      }
      for (const name of Object.keys(polygonGroups)) {
        const group = polygonGroups[name].sort((a, b) => a.Order - b.Order);
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
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // --- Vertex labels ---
      const vertexFontSize = Math.max(12, drawingWidth / 40);
      ctx.font = `300 ${vertexFontSize}px ui-sans-serif, system-ui`;
      ctx.fillStyle = theme.text;
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

      // --- Ticks along sides AB, BC, CA ---
      const tickLen = 10;
      const labelPad = 4;
      const markFont = Math.max(10, drawingWidth / 80);
      ctx.font = `300 ${markFont}px ui-sans-serif, system-ui`;

      // AB marks: at p1 from 0..1 → (250*p1, 433*p1) and horizontal ticks
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let m = 0; m <= 100; m += 10) {
        const p1 = m / 100;
        const x = transformX(250 * p1, scaleX);
        const y = transformY(433 * p1, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(x - tickLen / 2, y);
        ctx.lineTo(x + tickLen / 2, y);
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(m), x - tickLen / 2 - labelPad, y);
      }

      // BC marks: tick direction parallel to AB (unit along AB in canvas); labels offset along normal
      let vABx = 0.5 * scaleX,
        vABy = -0.866 * scaleY; // AB direction in canvas
      let vABmag = Math.hypot(vABx, vABy);
      let u_v = { x: vABx / vABmag, y: vABy / vABmag };
      let nX = -0.866 * scaleX,
        nY = 0.5 * scaleY; // right-hand normal for BC
      let nMag = Math.hypot(nX, nY);
      let u_n = { x: nX / nMag, y: nY / nMag };

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      for (let m = 0; m <= 100; m += 10) {
        const p1 = m / 100,
          p2 = 1 - p1;
        const logicalX = 500 * (p2 + 0.5 * p1);
        const logicalY = 433 * p1;
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
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        const lx = cx - 2 * labelPad * u_n.x;
        const ly = cy - 2 * labelPad * u_n.y;
        ctx.fillText(String(m), lx, ly);
      }

      // CA marks: parallel to BC; labels below (top baseline)
      let vCAx = 250 * scaleX,
        vCAy = 433 * scaleY;
      let mag_vCA = Math.hypot(vCAx, vCAy);
      let u_tick_CA = { x: vCAx / mag_vCA, y: vCAy / mag_vCA };
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (let m = 0; m <= 100; m += 10) {
        const p2 = m / 100;
        const cx = transformX(500 * p2, scaleX);
        const cy = transformY(0, scaleY, cssHeight);
        const half = tickLen / 2;
        const sx = cx - half * u_tick_CA.x,
          sy = cy - half * u_tick_CA.y;
        const ex = cx + half * u_tick_CA.x,
          ey = cy + half * u_tick_CA.y;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(m), cx, cy + half + labelPad);
      }

      // --- Arrow + label helper ---
      const drawArrowWithLabel = ({
        a,
        b,
        offset,
        color,
        label,
        labelSide = 'right',
        rotateReverse = false,
        below = false,
      }) => {
        const d = { x: b.x - a.x, y: b.y - a.y };
        const mag = Math.hypot(d.x, d.y) || 1;
        const u = { x: d.x / mag, y: d.y / mag };
        const uLeft = { x: -u.y, y: u.x };
        const center = {
          x: (a.x + b.x) / 2 + offset * uLeft.x,
          y: (a.y + b.y) / 2 + offset * uLeft.y,
        };

        const len = 0.5 * mag; // half the side length
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

        // arrow head
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
        ctx.fillStyle = theme.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = below ? 'top' : 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
      };

      // --- choose outward offset (push arrows outside triangle) ---
      const centroid = {
        x:
          (transformX(0, scaleX) +
            transformX(250, scaleX) +
            transformX(500, scaleX)) /
          3,
        y:
          (transformY(0, scaleY, cssHeight) +
            transformY(433, scaleY, cssHeight) +
            transformY(0, scaleY, cssHeight)) /
          3,
      };
      const outwardOffset = (a, b, dist) => {
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const m = Math.hypot(dx, dy) || 1;
        const u = { x: dx / m, y: dy / m };
        const uLeft = { x: -u.y, y: u.x };
        const v = { x: mid.x - centroid.x, y: mid.y - centroid.y };
        const dot = v.x * uLeft.x + v.y * uLeft.y;
        const sign = dot >= 0 ? 1 : -1;
        return sign * dist;
      };

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
      const baseOffset = Math.max(36, drawingWidth / 40);

      // Arrows per spec: A→B (right), B→C (right), C→A (below + reversed orientation)
      drawArrowWithLabel({
        a: A,
        b: B,
        offset: outwardOffset(A, B, baseOffset),
        color: theme.arrows.ab,
        label: labels.ab,
        labelSide: 'right',
      });
      drawArrowWithLabel({
        a: B,
        b: C,
        offset: outwardOffset(B, C, baseOffset),
        color: theme.arrows.bc,
        label: labels.bc,
        labelSide: 'right',
      });
      drawArrowWithLabel({
        a: C,
        b: A,
        offset: outwardOffset(C, A, baseOffset),
        color: theme.arrows.ca,
        label: labels.ca,
        labelSide: 'right',
        rotateReverse: true,
        below: true,
      });

      // --- Global axes (draw last so they remain visible) ---
      if (showAxes) {
        const axisTickSize = 6;
        const axisFont = Math.max(11, drawingWidth / 60);
        ctx.font = `${axisFont}px ui-sans-serif, system-ui`;
        ctx.fillStyle = theme.text;
        ctx.strokeStyle = theme.axis;
        ctx.lineWidth = 1.5;

        // X-axis at logical y = yMin
        const xAxisY = transformY(yMin, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(transformX(xMin, scaleX), xAxisY);
        ctx.lineTo(transformX(xMax, scaleX), xAxisY);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top'; // labels below axis with extra gap
        for (let x = xMin; x <= xMax; x += 50) {
          const cx = transformX(x, scaleX);
          ctx.beginPath();
          ctx.moveTo(cx, xAxisY);
          ctx.lineTo(cx, xAxisY + axisTickSize);
          ctx.stroke();
          ctx.fillText(String(x), cx, xAxisY + axisTickSize + 6);
        }

        // Y-axis at logical x = xMin
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

      // --- tiny sanity tests (non-breaking) ---
      console.assert(baseOffset >= 36, '[Test] baseOffset minimum');
      const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
      const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
      [
        { a: A, b: B, l: 'AB' },
        { a: B, b: C, l: 'BC' },
        { a: C, b: A, l: 'CA' },
      ].forEach(({ a, b, l }) => {
        const off = outwardOffset(a, b, baseOffset);
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const m = Math.hypot(dx, dy) || 1;
        const u = { x: dx / m, y: dy / m };
        const uLeft = { x: -u.y, y: u.x };
        const mpt = mid(a, b);
        const center = { x: mpt.x + off * uLeft.x, y: mpt.y + off * uLeft.y };
        console.assert(
          dist(center, centroid) > dist(mpt, centroid),
          `[Test] ${l} arrow outward`
        );
      });
    };

    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    resizeObserverRef.current = ro;

    const mo = new MutationObserver(draw);
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
      className={`TheDuvalTriangle4Canvas relative w-full aspect-[5/4] rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
