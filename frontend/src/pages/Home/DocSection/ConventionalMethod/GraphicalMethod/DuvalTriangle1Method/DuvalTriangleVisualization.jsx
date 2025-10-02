import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../../../../context/ThemeContext';

export default function DuvalTriangle1Visualization({
  className = '',
  showAxes = true,
  style,
  labels = {
    ab: 'Methane(CH₄) – PPM in %',
    bc: 'Ethylene(C₂H₄) – PPM in %',
    ca: 'Acetylene(C₂H₂) – PPM in %',
  },
  colors,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const { theme } = useTheme();

  // Logical coordinate boundaries
  const xMin = -100,
    xMax = 550;
  const yMin = -100,
    yMax = 550;
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  // Margins for drawing area
  const marginLeft = 30;
  const marginRight = 30;
  const marginBottom = 50;
  const marginTop = 10;

  const polygonData = [
    {
      PolygonName: 'D1',
      X: 0,
      Y: 0,
      Order: 1,
      FillColor: 'rgb(104, 255, 255)',
      Vertex: 'A',
    },
    {
      PolygonName: 'D1',
      X: 115,
      Y: 0,
      Order: 2,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D1',
      X: 275,
      Y: 277.12,
      Order: 3,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D1',
      X: 217.5,
      Y: 376.71,
      Order: 4,
      FillColor: 'rgb(104, 255, 255)',
    },
    {
      PolygonName: 'D2',
      X: 115,
      Y: 0,
      Order: 5,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'D2',
      X: 355,
      Y: 0,
      Order: 6,
      FillColor: 'rgb(51, 100, 240)',
      Vertex: 'C',
    },
    {
      PolygonName: 'D2',
      X: 277.5,
      Y: 134.23,
      Order: 7,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'D2',
      X: 317.5,
      Y: 203.51,
      Order: 8,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'D2',
      X: 275,
      Y: 277.12,
      Order: 9,
      FillColor: 'rgb(51, 100, 240)',
    },
    {
      PolygonName: 'DT',
      X: 355,
      Y: 0,
      Order: 10,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 425,
      Y: 0,
      Order: 11,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 337.5,
      Y: 151.55,
      Order: 12,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 365,
      Y: 199.18,
      Order: 13,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 240,
      Y: 415.68,
      Order: 14,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 217.5,
      Y: 376.71,
      Order: 15,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 317.5,
      Y: 203.51,
      Order: 16,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'DT',
      X: 277.5,
      Y: 134.23,
      Order: 17,
      FillColor: 'rgb(200,60,200)',
    },
    {
      PolygonName: 'T1',
      X: 290,
      Y: 329.08,
      Order: 18,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 300,
      Y: 346.4,
      Order: 19,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 255,
      Y: 424.34,
      Order: 20,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 245,
      Y: 424.34,
      Order: 21,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T1',
      X: 240,
      Y: 415.68,
      Order: 22,
      FillColor: 'rgb(255,153,153)',
    },
    {
      PolygonName: 'T2',
      X: 365,
      Y: 199.18,
      Order: 23,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 375,
      Y: 216.5,
      Order: 24,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 300,
      Y: 346.4,
      Order: 25,
      FillColor: 'rgb(255,204,0)',
    },
    {
      PolygonName: 'T2',
      X: 290,
      Y: 329.08,
      Order: 26,
      FillColor: 'rgb(255,204,0)',
    },
    { PolygonName: 'T3', X: 425, Y: 0, Order: 27, FillColor: 'rgb(0,0,0)' },
    {
      PolygonName: 'T3',
      X: 500,
      Y: 0,
      Order: 28,
      FillColor: 'rgb(0,0,0)',
      Vertex: 'C',
    },
    { PolygonName: 'T3', X: 375, Y: 216.5, Order: 29, FillColor: 'rgb(0,0,0)' },
    {
      PolygonName: 'T3',
      X: 337.5,
      Y: 151.55,
      Order: 30,
      FillColor: 'rgb(0,0,0)',
    },
    {
      PolygonName: 'PD',
      X: 255,
      Y: 424.34,
      Order: 31,
      FillColor: 'rgb(255,0,0)',
    },
    {
      PolygonName: 'PD',
      X: 250,
      Y: 433,
      Order: 32,
      FillColor: 'rgb(255,0,0)',
      Vertex: 'B',
    },
    {
      PolygonName: 'PD',
      X: 245,
      Y: 424.34,
      Order: 33,
      FillColor: 'rgb(255,0,0)',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    const transformX = (x, scaleX) => marginLeft + (x - xMin) * scaleX;
    const transformY = (y, scaleY, height) =>
      height - marginBottom - (y - yMin) * scaleY;

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

      if (showAxes) {
        ctx.strokeStyle = themeColors.axis;
        ctx.fillStyle = themeColors.axis;
        ctx.lineWidth = 0.5;
        const axisTickSize = 5;
        const axisFontSize = Math.max(9, drawingWidth / 90);
        ctx.font = `300 ${axisFontSize}px ui-sans-serif, sans-serif`;

        const xAxisY = transformY(-100, scaleY, cssHeight);
        ctx.beginPath();
        ctx.moveTo(transformX(xMin, scaleX), xAxisY);
        ctx.lineTo(transformX(xMax, scaleX), xAxisY);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let x = -50; x <= xMax; x += 50) {
          const cx = transformX(x, scaleX);
          ctx.beginPath();
          ctx.moveTo(cx, xAxisY);
          ctx.lineTo(cx, xAxisY + axisTickSize);
          ctx.stroke();
          ctx.fillText(x.toString(), cx, xAxisY + axisTickSize + 2);
        }

        const yAxisX = transformX(-100, scaleX);
        ctx.beginPath();
        ctx.moveTo(yAxisX, transformY(yMin, scaleY, cssHeight));
        ctx.lineTo(yAxisX, transformY(yMax, scaleY, cssHeight));
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = -50; y <= yMax; y += 50) {
          const cy = transformY(y, scaleY, cssHeight);
          ctx.beginPath();
          ctx.moveTo(yAxisX, cy);
          ctx.lineTo(yAxisX - axisTickSize, cy);
          ctx.stroke();
          ctx.fillText(y.toString(), yAxisX - axisTickSize - 2, cy);
        }
      }

      const polygonGroups = {};
      polygonData.forEach((item) => {
        if (!polygonGroups[item.PolygonName])
          polygonGroups[item.PolygonName] = [];
        polygonGroups[item.PolygonName].push(item);
      });

      Object.keys(polygonGroups).forEach((polyName) => {
        const group = polygonGroups[polyName].sort((a, b) => a.Order - b.Order);
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
      });

      ctx.beginPath();
      ctx.moveTo(transformX(0, scaleX), transformY(0, scaleY, cssHeight));
      ctx.lineTo(transformX(250, scaleX), transformY(433, scaleY, cssHeight));
      ctx.lineTo(transformX(500, scaleX), transformY(0, scaleY, cssHeight));
      ctx.closePath();
      ctx.strokeStyle = themeColors.axis;
      ctx.lineWidth = 1;
      ctx.stroke();

      const vertexFontSize = Math.max(12, drawingWidth / 40);
      ctx.font = `300 ${vertexFontSize}px ui-sans-serif, sans-serif`;
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

      const A_canvas = {
        x: transformX(0, scaleX),
        y: transformY(0, scaleY, cssHeight),
      };
      const B_canvas = {
        x: transformX(250, scaleX),
        y: transformY(433, scaleY, cssHeight),
      };
      const C_canvas = {
        x: transformX(500, scaleX),
        y: transformY(0, scaleY, cssHeight),
      };
      const centroid = {
        x: (A_canvas.x + B_canvas.x + C_canvas.x) / 3,
        y: (A_canvas.y + B_canvas.y + C_canvas.y) / 3,
      };

      const drawArrowWithLabel = ({
        a,
        b,
        offset,
        color,
        label,
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
        const labelPos = {
          x: center.x + labelOffsetPx * sideVec.x,
          y: center.y + labelOffsetPx * sideVec.y,
        };
        const angle = Math.atan2(u.y, u.x);
        ctx.save();
        ctx.translate(labelPos.x, labelPos.y);
        ctx.rotate(rotateReverse ? angle + Math.PI : angle);
        const labelFontSize = Math.max(10, drawingWidth / 60);
        ctx.font = `${labelFontSize}px ui-sans-serif, sans-serif`;
        ctx.fillStyle = themeColors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
      };

      const outwardOffset = (a, b, distance) => {
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const m = Math.hypot(dx, dy) || 1;
        const uLeft = { x: -dy / m, y: dx / m };
        const v = { x: mid.x - centroid.x, y: mid.y - centroid.y };
        const dot = v.x * uLeft.x + v.y * uLeft.y;
        return (dot >= 0 ? 1 : -1) * distance;
      };

      const baseOffset = Math.max(36, drawingWidth / 40);
      const tickLen = 10;
      const labelPad = 4;
      const markFont = Math.max(10, drawingWidth / 80);
      ctx.font = `300 ${markFont}px ui-sans-serif, sans-serif`;
      ctx.fillStyle = themeColors.triangleSideText;

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

      // MODIFIED: textAlign and label position for BC ticks reverted to place them outside.
      ctx.textAlign = 'left';
      marksBC.forEach(({ mark, p1, p2 }) => {
        const cx = transformX(500 * p2 + 250 * p1, scaleX);
        const cy = transformY(433 * p1, scaleY, cssHeight);
        const half = tickLen / 2;
        ctx.beginPath();
        ctx.moveTo(cx - half * u_v.x, cy - half * u_v.y);
        ctx.lineTo(cx + half * u_v.x, cy + half * u_v.y);
        ctx.stroke();
        // Position label outside the triangle, offset by the normal vector
        ctx.fillText(
          String(mark),
          cx - 2.5 * labelPad * u_n.x,
          cy + 2 * labelPad * u_n.y
        );
      });

      const vCAx = 250 * scaleX,
        vCAy = 433 * scaleY;
      const mag_vCA = Math.hypot(vCAx, vCAy);
      const u_tick_CA = { x: vCAx / mag_vCA, y: vCAy / mag_vCA };
      const marksCA = Array.from({ length: 11 }, (_, i) => ({
        mark: i * 10,
        p2: i / 10,
      }));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      marksCA.forEach(({ mark, p2 }) => {
        const cx = transformX(500 * p2, scaleX);
        const cy = transformY(0, scaleY, cssHeight);
        const half = tickLen / 2;
        ctx.beginPath();
        ctx.moveTo(cx - half * u_tick_CA.x, cy - half * u_tick_CA.y);
        ctx.lineTo(cx + half * u_tick_CA.x, cy + half * u_tick_CA.y);
        ctx.stroke();
        ctx.fillText(String(mark), cx, cy + half + labelPad);
      });

      drawArrowWithLabel({
        a: A_canvas,
        b: B_canvas,
        offset: outwardOffset(A_canvas, B_canvas, baseOffset),
        color: themeColors.arrows.ab,
        label: labels.ab,
        labelSide: 'right',
      });
      drawArrowWithLabel({
        a: B_canvas,
        b: C_canvas,
        offset: outwardOffset(B_canvas, C_canvas, baseOffset),
        color: themeColors.arrows.bc,
        label: labels.bc,
        labelSide: 'right',
      });
      drawArrowWithLabel({
        a: C_canvas,
        b: A_canvas,
        offset: outwardOffset(C_canvas, A_canvas, baseOffset),
        color: themeColors.arrows.ca,
        label: labels.ca,
        labelSide: 'right',
        rotateReverse: true,
      });
    };

    const ro = new ResizeObserver(() => draw());
    ro.observe(container);

    draw();

    return () => ro.disconnect();
  }, [colors, labels, showAxes, theme]);

  return (
    <div
      ref={containerRef}
      className={`TheDuvalTriangleCanvas relative w-full aspect-[5/4] rounded-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
