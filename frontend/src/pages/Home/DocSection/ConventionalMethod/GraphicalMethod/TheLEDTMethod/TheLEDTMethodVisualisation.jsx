import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

export default function LowEnergyDegradationTriangleVisualization({
  className = '',
  style,
  showAxes = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  // Logical drawing bounds
  const xMin = -100,
    xMax = 550;
  const yMin = -100,
    yMax = 550;
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  // Margins
  const marginLeft = 30;
  const marginRight = 30;
  const marginBottom = 50;
  const marginTop = 10;

  // LEDT fault zones (as provided)
  const polygonData = [
    {
      PolygonName: 'N',
      X: 0,
      Y: 0,
      Order: 1,
      FillColor: 'rgba(129, 239, 154, 1)',
      Vertex: 'A',
    },
    {
      PolygonName: 'N',
      X: 65,
      Y: 0,
      Order: 2,
      FillColor: 'rgba(129, 239, 154, 1)',
      Vertex: 'A',
    },
    {
      PolygonName: 'N',
      X: 32.5,
      Y: 56.29,
      Order: 3,
      FillColor: 'rgba(129, 239, 154, 1)',
      Vertex: 'A',
    },

    {
      PolygonName: 'D1',
      X: 170,
      Y: 0,
      Order: 4,
      FillColor: 'rgb(104, 255, 255)',
      Vertex: 'A',
    },
    {
      PolygonName: 'D1',
      X: 450,
      Y: 0,
      Order: 5,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D1',
      X: 475,
      Y: 43.3,
      Order: 6,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D1',
      X: 455,
      Y: 77.94,
      Order: 7,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D1',
      X: 185,
      Y: 25.98,
      Order: 8,
      FillColor: 'rgb(104, 255, 255)',
    },

    {
      PolygonName: 'D2',
      X: 185,
      Y: 25.98,
      Order: 9,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'D2',
      X: 455,
      Y: 77.94,
      Order: 10,
      FillColor: 'rgb(51, 100, 240)',
      Vertex: 'C',
    },
    {
      PolygonName: 'D2',
      X: 385,
      Y: 199.18,
      Order: 11,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'D2',
      X: 245,
      Y: 129.9,
      Order: 12,
      FillColor: 'rgb(51, 100, 240)',
    },

    { PolygonName: 'T3', X: 150, Y: 173.2, Order: 13, FillColor: 'rgb(0,0,0)' },
    {
      PolygonName: 'T3',
      X: 175,
      Y: 129.9,
      Order: 14,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'C',
    },
    { PolygonName: 'T3', X: 350, Y: 259.8, Order: 15, FillColor: 'rgb(0,0,0)' },
    { PolygonName: 'T3', X: 275, Y: 389.7, Order: 16, FillColor: 'rgb(0,0,0)' },

    {
      PolygonName: 'DT',
      X: 100,
      Y: 0,
      Order: 17,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 170,
      Y: 0,
      Order: 18,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 245,
      Y: 129.9,
      Order: 19,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 385,
      Y: 199.18,
      Order: 20,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 350,
      Y: 259.8,
      Order: 21,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 175,
      Y: 129.9,
      Order: 22,
      FillColor: 'rgb(200,60,200)',
    },

    {
      PolygonName: 'T2',
      X: 100,
      Y: 173.2,
      Order: 23,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 125,
      Y: 129.9,
      Order: 24,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 75,
      Y: 43.3,
      Order: 25,
      FillColor: 'rgb(255,204,0)',
    },
    { PolygonName: 'T2', X: 100, Y: 0, Order: 26, FillColor: 'rgb(255,204,0)' },
    {
      PolygonName: 'T2',
      X: 175,
      Y: 129.9,
      Order: 27,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 150,
      Y: 173.2,
      Order: 28,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 275,
      Y: 389.7,
      Order: 29,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 250,
      Y: 433,
      Order: 30,
      FillColor: 'rgb(255,204,0)',
    },

    {
      PolygonName: 'T1',
      X: 65,
      Y: 0,
      Order: 31,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 100,
      Y: 0,
      Order: 32,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 75,
      Y: 43.3,
      Order: 33,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 125,
      Y: 129.9,
      Order: 34,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 100,
      Y: 173.2,
      Order: 35,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 32.5,
      Y: 56.29,
      Order: 36,
      FillColor: 'rgb(255,153,153)',
    },

    { PolygonName: 'PD', X: 450, Y: 0, Order: 37, FillColor: 'rgb(255,0,0)' },
    {
      PolygonName: 'PD',
      X: 500,
      Y: 0,
      Order: 38,
      FillColor: 'rgb(255,0,0)',
      Vertex: 'B',
    },
    {
      PolygonName: 'PD',
      X: 475,
      Y: 43.3,
      Order: 39,
      FillColor: 'rgb(255,0,0)',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    const transformX = (x, scaleX) => marginLeft + (x - xMin) * scaleX;
    const transformY = (y, scaleY, h) => h - marginBottom - (y - yMin) * scaleY;

    const getThemeColors = (appTheme) => {
      const isDark = appTheme === 'dark';
      const cs = getComputedStyle(container);
      const defaultTextColor = cs.color;
      const axisColor = isDark ? defaultTextColor : '#1f75fe'; // match Duval-1 behavior
      return {
        text: defaultTextColor,
        axis: axisColor,
        arrows: { ab: 'orange', bc: 'purple', ca: 'brown' }, // fixed across themes
      };
    };

    const draw = () => {
      // HiDPI-safe sizing
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = container.clientWidth || 600;
      const cssHeight = container.clientHeight || 400;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const drawingWidth = cssWidth - marginLeft - marginRight;
      const drawingHeight = cssHeight - marginTop - marginBottom;
      const scaleX = drawingWidth / xRange;
      const scaleY = drawingHeight / yRange;

      const themeColors = getThemeColors(theme);

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Axes & ticks
      if (showAxes) {
        ctx.strokeStyle = themeColors.axis;
        ctx.fillStyle = themeColors.axis;
        ctx.lineWidth = 0.5;
        const axisTick = 5;
        const axisFont = Math.max(9, drawingWidth / 90);
        ctx.font = `300 ${axisFont}px ui-sans-serif, sans-serif`;

        // X axis at y = -100
        const xAxisY = transformY(-100, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(transformX(xMin, scaleX), xAxisY);
        ctx.lineTo(transformX(xMax, scaleX), xAxisY);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let x = -50; x <= xMax; x += 50) {
          const tx = transformX(x, scaleX);
          ctx.beginPath();
          ctx.moveTo(tx, xAxisY);
          ctx.lineTo(tx, xAxisY + axisTick);
          ctx.stroke();
          ctx.fillText(String(x), tx, xAxisY + axisTick + 2);
        }

        // Y axis at x = -100
        const yAxisX = transformX(-100, scaleX);
        ctx.beginPath();
        ctx.moveTo(yAxisX, transformY(yMin, scaleY, cssHeight));
        ctx.lineTo(yAxisX, transformY(yMax, scaleY, cssHeight));
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = -50; y <= yMax; y += 50) {
          const ty = transformY(y, scaleY, cssHeight);
          ctx.beginPath();
          ctx.moveTo(yAxisX, ty);
          ctx.lineTo(yAxisX - axisTick, ty);
          ctx.stroke();
          ctx.fillText(String(y), yAxisX - axisTick - 2, ty);
        }
      }

      // Fault-zone polygons (fill fixed colors, stroke with theme axis)
      const groups = {};
      polygonData.forEach((p) => {
        if (!groups[p.PolygonName]) groups[p.PolygonName] = [];
        groups[p.PolygonName].push(p);
      });

      Object.keys(groups).forEach((name) => {
        const pts = groups[name].sort((a, b) => a.Order - b.Order);
        if (!pts.length) return;
        ctx.beginPath();
        ctx.moveTo(
          transformX(pts[0].X, scaleX),
          transformY(pts[0].Y, scaleY, cssHeight)
        );
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(
            transformX(pts[i].X, scaleX),
            transformY(pts[i].Y, scaleY, cssHeight)
          );
        }
        ctx.closePath();
        ctx.fillStyle = pts[0].FillColor;
        ctx.fill();
        ctx.strokeStyle = themeColors.axis;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Main triangle A(0,0), B(250,433), C(500,0)
      ctx.beginPath();
      ctx.moveTo(transformX(0, scaleX), transformY(0, scaleY, cssHeight)); // A
      ctx.lineTo(transformX(250, scaleX), transformY(433, scaleY, cssHeight)); // B
      ctx.lineTo(transformX(500, scaleX), transformY(0, scaleY, cssHeight)); // C
      ctx.closePath();
      ctx.strokeStyle = themeColors.axis;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Vertex labels
      const vfs = Math.max(12, drawingWidth / 40);
      ctx.font = `300 ${vfs}px ui-sans-serif, sans-serif`;
      ctx.fillStyle = themeColors.text;
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

      // Side tick marks (0..100)
      const tickLen = 10;
      const labelPad = 4;
      const markFont = Math.max(10, drawingWidth / 80);
      ctx.font = `300 ${markFont}px ui-sans-serif, sans-serif`;
      ctx.fillStyle = themeColors.text;

      // AB: 0 at A → 100 at B (labels left of tick)
      const marksAB = Array.from({ length: 11 }, (_, i) => ({
        mark: i * 10,
        p1: i / 10,
      }));
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      marksAB.forEach(({ mark, p1 }) => {
        const x = transformX(250 * p1, scaleX);
        const y = transformY(433 * p1, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(x - tickLen / 2, y);
        ctx.lineTo(x + tickLen / 2, y);
        ctx.strokeStyle = themeColors.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(mark), x - tickLen / 2 - labelPad, y);
      });

      // BC: 0 at B → 100 at C (ticks parallel to AB; labels outside)
      const vBCx = 0.5 * scaleX,
        vBCy = -0.866 * scaleY;
      const magBC = Math.hypot(vBCx, vBCy);
      const u_v = { x: vBCx / magBC, y: vBCy / magBC };
      const nBCx = -0.866 * scaleX,
        nBCy = 0.5 * scaleY;
      const magN = Math.hypot(nBCx, nBCy);
      const u_n = { x: nBCx / magN, y: nBCy / magN };
      const marksBC = Array.from({ length: 11 }, (_, i) => ({
        mark: i * 10,
        p1: (10 - i) / 10,
        p2: i / 10,
      }));
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      marksBC.forEach(({ mark, p1, p2 }) => {
        const cx = transformX(500 * p2 + 250 * p1, scaleX);
        const cy = transformY(433 * p1, scaleY, cssHeight);
        const half = tickLen / 2;
        ctx.beginPath();
        ctx.moveTo(cx - half * u_v.x, cy - half * u_v.y);
        ctx.lineTo(cx + half * u_v.x, cy + half * u_v.y);
        ctx.strokeStyle = themeColors.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(
          String(mark),
          cx - 2.5 * labelPad * u_n.x,
          cy + 2 * labelPad * u_n.y
        );
      });

      // CA: C→A (ticks parallel to BC; labels below)
      const vCAx = 250 * scaleX,
        vCAy = 433 * scaleY;
      const magCA = Math.hypot(vCAx, vCAy);
      const u_tick_CA = { x: vCAx / magCA, y: vCAy / magCA };
      const marksCA = Array.from({ length: 11 }, (_, i) => ({
        mark: i * 10,
        t: i / 10,
      }));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      marksCA.forEach(({ mark, t }) => {
        const logicalX = 500 * (1 - t); // C→A
        const cx = transformX(logicalX, scaleX);
        const cy = transformY(0, scaleY, cssHeight);
        const half = tickLen / 2;
        ctx.beginPath();
        ctx.moveTo(cx - half * u_tick_CA.x, cy - half * u_tick_CA.y);
        ctx.lineTo(cx + half * u_tick_CA.x, cy + half * u_tick_CA.y);
        ctx.strokeStyle = themeColors.axis;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(mark), cx, cy + half + labelPad);
      });

      // Arrow helpers
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
      const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };

      const outwardOffset = (p, q, dist) => {
        const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
        const dx = q.x - p.x,
          dy = q.y - p.y;
        const m = Math.hypot(dx, dy) || 1;
        const uLeft = { x: -dy / m, y: dx / m };
        const v = { x: mid.x - centroid.x, y: mid.y - centroid.y };
        const sign = v.x * uLeft.x + v.y * uLeft.y >= 0 ? 1 : -1;
        return sign * dist;
      };

      const drawArrowWithLabel = ({
        a,
        b,
        offset,
        color,
        text,
        labelSide = 'right',
        rotateReverse = false,
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

        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        const ahLen = Math.max(8, drawingWidth / 40);
        const ahWid = ahLen / 2;
        const uRight = { x: u.y, y: -u.x };
        const base = { x: head.x - ahLen * u.x, y: head.y - ahLen * u.y };
        const left = {
          x: base.x + ahWid * uRight.x,
          y: base.y + ahWid * uRight.y,
        };
        const right = {
          x: base.x - ahWid * uRight.x,
          y: base.y - ahWid * uRight.y,
        };
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        const labelOffsetPx = ahLen + 4;
        const sideVec =
          labelSide === 'right' ? { x: u.y, y: -u.x } : { x: -u.y, y: u.x };
        const lp = {
          x: center.x + labelOffsetPx * sideVec.x,
          y: center.y + labelOffsetPx * sideVec.y,
        };
        const angle = Math.atan2(u.y, u.x);
        ctx.save();
        ctx.translate(lp.x, lp.y);
        ctx.rotate(rotateReverse ? angle + Math.PI : angle);
        const lf = Math.max(10, drawingWidth / 60);
        ctx.font = `${lf}px ui-sans-serif, sans-serif`;
        ctx.fillStyle = themeColors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };

      const baseOffset = Math.max(36, drawingWidth / 40);

      // CH4 along AB
      drawArrowWithLabel({
        a: A,
        b: B,
        offset: outwardOffset(A, B, baseOffset),
        color: themeColors.arrows.ab,
        text: 'CH\u2084 in %',
        labelSide: 'right',
      });

      // H2 along BC
      drawArrowWithLabel({
        a: B,
        b: C,
        offset: outwardOffset(B, C, baseOffset),
        color: themeColors.arrows.bc,
        text: 'H\u2082 in %',
        labelSide: 'right',
      });

      // CO along CA (C→A)
      drawArrowWithLabel({
        a: C,
        b: A,
        offset: outwardOffset(C, A, baseOffset),
        color: themeColors.arrows.ca,
        text: 'CO in %',
        labelSide: 'right',
        rotateReverse: true,
      });
    };

    const ro = new ResizeObserver(() => draw());
    ro.observe(container);

    draw();

    return () => ro.disconnect();
  }, [showAxes, theme]);

  return (
    <div
      ref={containerRef}
      className={`TheLowEnergyDegradationTriangleCanvas relative w-full aspect-[5/4] rounded-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
