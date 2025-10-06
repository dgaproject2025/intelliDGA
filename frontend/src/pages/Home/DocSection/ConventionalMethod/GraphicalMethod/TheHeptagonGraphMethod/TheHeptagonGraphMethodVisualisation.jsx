import React, { useEffect, useRef } from 'react';

import { useTheme } from '../../../../../../context/ThemeContext'; // Adjust path if needed

/**
 * A responsive, canvas-based React component to visualize the Heptagon Graph method for DGA.
 * This is the final, complete, and faithful port of the original vanilla JS implementation.
 */
export default function HeptagonGraphVisualization({ className = '', style }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);

  const vertexDataRef = useRef([]);
  const pointsDataRef = useRef([]);

  const resizeObserverRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!container || !canvas || !tooltip) return;

    const ctx = canvas.getContext('2d');

    const drawDashedLineSegment = (x1, y1, x2, y2, dashLen, gapLen) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const segLength = Math.sqrt(dx * dx + dy * dy);
      if (segLength === 0) return;
      const angle = Math.atan2(dy, dx);
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = getThemeColors().arrow;
      ctx.lineCap = 'round'; // Softer dashes

      let pos = 0;
      while (pos < segLength) {
        const segment = Math.min(dashLen, segLength - pos);
        ctx.beginPath();
        ctx.moveTo(x1 + pos * cosAngle, y1 + pos * sinAngle);
        ctx.lineTo(
          x1 + (pos + segment) * cosAngle,
          y1 + (pos + segment) * sinAngle
        );
        ctx.stroke();
        pos += dashLen + gapLen;
      }
      ctx.restore();
    };

    const getThemeColors = () => {
      const zones = {
        HCCD: 'rgba(255, 105, 180, 0.7)',
        MCCD: 'rgba(255, 165, 0, 0.7)',
        LCCD: 'rgba(255, 255, 0, 0.7)',
        PD: 'rgba(255, 0, 0, 0.7)',
        D1: 'rgba(104, 255, 255, 0.7)',
        D2: 'rgba(51, 100, 240, 0.7)',
        T1: 'rgba(255, 153, 153, 0.7)',
        T2: 'rgba(255, 204, 0, 0.7)',
        T3: 'rgba(0, 0, 0, 0.7)',
        DT: 'rgba(200, 60, 200, 0.7)',
      };

      if (theme === 'dark') {
        return {
          bgGradientStart: '#1e293b',
          bgGradientEnd: '#0f172a',
          text: '#cbd5e1',
          heptagonLine: '#94a3b8',
          lineGlow: '#94a3b8',
          circumcircle: '#475569',
          tickLabel: '#94a3b8',
          arrow: '#e2e8f0',
          arrowGlow: '#e2e8f0',
          zones,
        };
      } else {
        return {
          bgGradientStart: '#f8fafc',
          bgGradientEnd: '#eef2f7',
          text: '#334155',
          heptagonLine: '#64748b',
          lineGlow: 'rgba(100, 116, 139, 0.2)',
          circumcircle: '#cbd5e1',
          tickLabel: '#475569',
          arrow: '#1e293b',
          arrowGlow: 'rgba(30, 41, 59, 0.2)',
          zones,
        };
      }
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = container.clientWidth;
      const cssHeight = container.clientHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colors = getThemeColors();
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const R = Math.min(cssWidth, cssHeight) * 0.4;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        R * 0.5,
        centerX,
        centerY,
        R * 1.5
      );
      gradient.addColorStop(0, colors.bgGradientStart);
      gradient.addColorStop(1, colors.bgGradientEnd);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      vertexDataRef.current = [];
      pointsDataRef.current = [];

      const gasLabels = ['H₂', 'CH₄', 'C₂H₂', 'C₂H₆', 'CO', 'CO₂', 'C₂H₄'];
      const N = 7;
      const delta = Math.PI / N;
      const startAngle = -Math.PI / 2 + delta;

      const vertices = [];
      for (let k = 0; k < N; k++) {
        const angle = startAngle - (k * (2 * Math.PI)) / N;
        const x = centerX + R * Math.cos(angle);
        const y = centerY - R * Math.sin(angle);
        vertices.push({ x, y, angle, label: gasLabels[k] });
        vertexDataRef.current.push({ x, y, label: `Vertex: ${gasLabels[k]}` });
      }

      const fillPoly = (points, fill) => {
        if (!points || points.length < 3 || points.some((p) => !p)) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++)
          ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      };
      const interp = (p, q, t) => ({
        x: p.x + t * (q.x - p.x),
        y: p.y + t * (q.y - p.y),
      });
      const addPointToTooltip = (label, point) =>
        pointsDataRef.current.push({ label, ...point });

      // --- Full Fault Zone Calculation & Drawing (Restored) ---
      let V5_D1, Vertex5_D1;
      const d_c2h2_c2h6 = {
        x: vertices[3].x - vertices[2].x,
        y: vertices[3].y - vertices[2].y,
      };
      const d_co_co2 = {
        x: vertices[5].x - vertices[4].x,
        y: vertices[5].y - vertices[4].y,
      };
      const P1_HCCD = interp(vertices[4], vertices[5], 0.65);
      addPointToTooltip('P1_HCCD', P1_HCCD);
      const P3_HCCD = interp(vertices[5], vertices[6], 0.25);
      addPointToTooltip('P3_HCCD', P3_HCCD);
      const denom_HCCD =
        d_c2h2_c2h6.x * -d_co_co2.y - -d_co_co2.x * d_c2h2_c2h6.y;
      let t_HCCD = 0;
      if (Math.abs(denom_HCCD) > 1e-6)
        t_HCCD =
          ((P3_HCCD.x - P1_HCCD.x) * -d_co_co2.y -
            -d_co_co2.x * (P3_HCCD.y - P1_HCCD.y)) /
          denom_HCCD;
      const P4_HCCD = {
        x: P1_HCCD.x + t_HCCD * d_c2h2_c2h6.x,
        y: P1_HCCD.y + t_HCCD * d_c2h2_c2h6.y,
      };
      addPointToTooltip('P4_HCCD', P4_HCCD);
      fillPoly([P1_HCCD, vertices[5], P3_HCCD, P4_HCCD], colors.zones.HCCD);
      const V1_MCCD = interp(vertices[4], vertices[5], 0.45);
      addPointToTooltip('V1_MCCD', V1_MCCD);
      const V2_MCCD = interp(vertices[4], vertices[5], 0.65);
      addPointToTooltip('V2_MCCD', V2_MCCD);
      const B_MCCD = interp(vertices[5], vertices[6], 0.25);
      const denom_MCCD = denom_HCCD;
      let t_MCCD = 0;
      if (Math.abs(denom_MCCD) >= 1e-6)
        t_MCCD =
          ((B_MCCD.x - V2_MCCD.x) * -d_co_co2.y -
            -d_co_co2.x * (B_MCCD.y - V2_MCCD.y)) /
          denom_MCCD;
      const V3_MCCD = {
        x: V2_MCCD.x + t_MCCD * d_c2h2_c2h6.x,
        y: V2_MCCD.y + t_MCCD * d_c2h2_c2h6.y,
      };
      addPointToTooltip('V3_MCCD', V3_MCCD);
      const V4_MCCD = B_MCCD;
      addPointToTooltip('V4_MCCD', V4_MCCD);
      const V5_MCCD = interp(vertices[5], vertices[6], 0.5);
      addPointToTooltip('V5_MCCD', V5_MCCD);
      let t2_MCCD = 0;
      if (Math.abs(denom_MCCD) >= 1e-6)
        t2_MCCD =
          ((V5_MCCD.x - V1_MCCD.x) * -d_co_co2.y -
            -d_co_co2.x * (V5_MCCD.y - V1_MCCD.y)) /
          denom_MCCD;
      const V6_MCCD = {
        x: V1_MCCD.x + t2_MCCD * d_c2h2_c2h6.x,
        y: V1_MCCD.y + t2_MCCD * d_c2h2_c2h6.y,
      };
      addPointToTooltip('V6_MCCD', V6_MCCD);
      fillPoly(
        [V1_MCCD, V2_MCCD, V3_MCCD, V4_MCCD, V5_MCCD, V6_MCCD],
        colors.zones.MCCD
      );
      const V1_LCCD = interp(vertices[4], vertices[5], 0.18);
      addPointToTooltip('V1_LCCD', V1_LCCD);
      const V2_LCCD = interp(vertices[4], vertices[5], 0.45);
      addPointToTooltip('V2_LCCD', V2_LCCD);
      const V4_LCCD = V5_MCCD;
      addPointToTooltip('V4_LCCD', V4_LCCD);
      const V5_LCCD = vertices[6];
      let t_LCCD = 0;
      if (Math.abs(denom_HCCD) >= 1e-6)
        t_LCCD =
          ((V4_LCCD.x - V2_LCCD.x) * -d_co_co2.y -
            -d_co_co2.x * (V4_LCCD.y - V2_LCCD.y)) /
          denom_HCCD;
      const V3_LCCD = {
        x: V2_LCCD.x + t_LCCD * d_c2h2_c2h6.x,
        y: V2_LCCD.y + t_LCCD * d_c2h2_c2h6.y,
      };
      addPointToTooltip('V3_LCCD', V3_LCCD);
      let t2_LCCD = 0;
      if (Math.abs(denom_HCCD) >= 1e-6)
        t2_LCCD =
          ((V5_LCCD.x - V1_LCCD.x) * -d_co_co2.y -
            -d_co_co2.x * (V5_LCCD.y - V1_LCCD.y)) /
          denom_HCCD;
      const V6_LCCD = {
        x: V1_LCCD.x + t2_LCCD * d_c2h2_c2h6.x,
        y: V1_LCCD.y + t2_LCCD * d_c2h2_c2h6.y,
      };
      addPointToTooltip('V6_LCCD', V6_LCCD);
      fillPoly(
        [V1_LCCD, V2_LCCD, V3_LCCD, V4_LCCD, V5_LCCD, V6_LCCD],
        colors.zones.LCCD
      );
      const PD1 = vertices[1];
      const PD2 = interp(vertices[0], vertices[1], 0.6);
      addPointToTooltip('PD2', PD2);
      const PD3 = interp(vertices[1], vertices[2], 0.4);
      addPointToTooltip('PD3', PD3);
      fillPoly([PD1, PD2, PD3], colors.zones.PD);
      const P_H2_98_D1 = interp(vertices[0], vertices[1], 0.98);
      const Q_H2_60_D1 = interp(vertices[0], vertices[1], 0.6);
      let t_D1 = 0;
      if (Math.abs(denom_HCCD) >= 1e-6)
        t_D1 =
          ((Q_H2_60_D1.x - P_H2_98_D1.x) * -d_co_co2.y -
            -d_co_co2.x * (Q_H2_60_D1.y - P_H2_98_D1.y)) /
          denom_HCCD;
      const Vertex1_D1 = {
        x: P_H2_98_D1.x + t_D1 * d_c2h2_c2h6.x,
        y: P_H2_98_D1.y + t_D1 * d_c2h2_c2h6.y,
      };
      addPointToTooltip('Vertex1_D1', Vertex1_D1);
      const Vertex2_D1 = interp(vertices[1], vertices[2], 0.4);
      addPointToTooltip('Vertex2_D1', Vertex2_D1);
      const Vertex4_D1 = interp(vertices[2], vertices[3], 0.5);
      addPointToTooltip('Vertex4_D1', Vertex4_D1);
      const d_h2_ch4 = {
        x: vertices[1].x - vertices[0].x,
        y: vertices[1].y - vertices[0].y,
      };
      const denom2_D1 =
        d_h2_ch4.x * -d_c2h2_c2h6.y - -d_c2h2_c2h6.x * d_h2_ch4.y;
      let t2_D1 = 0;
      if (Math.abs(denom2_D1) >= 1e-6)
        t2_D1 =
          ((Vertex1_D1.x - Vertex4_D1.x) * -d_c2h2_c2h6.y -
            -d_c2h2_c2h6.x * (Vertex1_D1.y - Vertex4_D1.y)) /
          denom2_D1;
      V5_D1 = Vertex5_D1 = {
        x: Vertex4_D1.x + t2_D1 * d_h2_ch4.x,
        y: Vertex4_D1.y + t2_D1 * d_h2_ch4.y,
      };
      addPointToTooltip('Vertex5_D1', Vertex5_D1);
      fillPoly(
        [Vertex1_D1, Vertex2_D1, vertices[2], Vertex4_D1, Vertex5_D1],
        colors.zones.D1
      );
      const Vertex1_D2 = Vertex4_D1;
      addPointToTooltip('Vertex1_D2', Vertex1_D2);
      const Vertex4_D2 = interp(vertices[4], vertices[5], 0.18);
      addPointToTooltip('Vertex4_D2', Vertex4_D2);
      let t_D2 = 0;
      if (Math.abs(denom_HCCD) >= 1e-6)
        t_D2 =
          ((vertices[6].x - Vertex4_D2.x) * -d_co_co2.y -
            -d_co_co2.x * (vertices[6].y - Vertex4_D2.y)) /
          denom_HCCD;
      const Vertex5_D2 = {
        x: Vertex4_D2.x + t_D2 * d_c2h2_c2h6.x,
        y: Vertex4_D2.y + t_D2 * d_c2h2_c2h6.y,
      };
      addPointToTooltip('Vertex5_D2', Vertex5_D2);
      const Vertex6_D2 = V5_D1;
      fillPoly(
        [
          Vertex1_D2,
          vertices[3],
          vertices[4],
          Vertex4_D2,
          Vertex5_D2,
          Vertex6_D2,
        ],
        colors.zones.D2
      );
      const Vertex2_T1 = interp(vertices[6], vertices[0], 0.5);
      addPointToTooltip('Vertex2_T1', Vertex2_T1);
      const P_T1 = interp(vertices[0], vertices[1], 0.12);
      const d_c2h4_h2 = {
        x: vertices[0].x - vertices[6].x,
        y: vertices[0].y - vertices[6].y,
      };
      const denom_T1 = d_co_co2.x * -d_c2h4_h2.y - -d_c2h4_h2.x * d_co_co2.y;
      let t_T1 = 0;
      if (Math.abs(denom_T1) >= 1e-6)
        t_T1 =
          ((P_T1.x - Vertex2_T1.x) * -d_c2h4_h2.y -
            -d_c2h4_h2.x * (P_T1.y - Vertex2_T1.y)) /
          denom_T1;
      const Vertex3_T1 = {
        x: Vertex2_T1.x + t_T1 * d_co_co2.x,
        y: Vertex2_T1.y + t_T1 * d_co_co2.y,
      };
      addPointToTooltip('Vertex3_T1', Vertex3_T1);
      const R_T1 = interp(vertices[0], vertices[1], 0.3);
      const denom2_T1 =
        d_c2h2_c2h6.x * -d_c2h4_h2.y - -d_c2h4_h2.x * d_c2h2_c2h6.y;
      let t2_T1 = 0;
      if (Math.abs(denom2_T1) >= 1e-6)
        t2_T1 =
          ((R_T1.x - Vertex3_T1.x) * -d_c2h4_h2.y -
            -d_c2h4_h2.x * (R_T1.y - Vertex3_T1.y)) /
          denom2_T1;
      const Vertex4_T1 = {
        x: Vertex3_T1.x + t2_T1 * d_c2h2_c2h6.x,
        y: Vertex3_T1.y + t2_T1 * d_c2h2_c2h6.y,
      };
      addPointToTooltip('Vertex4_T1', Vertex4_T1);
      const d_c2h6_co = {
        x: vertices[4].x - vertices[3].x,
        y: vertices[4].y - vertices[3].y,
      };
      const denom3_T1 = d_c2h6_co.x * -d_co_co2.y - -d_co_co2.x * d_c2h6_co.y;
      let t3_T1 = 0;
      if (Math.abs(denom3_T1) >= 1e-6)
        t3_T1 =
          ((vertices[6].x - Vertex4_T1.x) * -d_co_co2.y -
            -d_co_co2.x * (vertices[6].y - Vertex4_T1.y)) /
          denom3_T1;
      const Vertex5_T1 = {
        x: Vertex4_T1.x + t3_T1 * d_c2h6_co.x,
        y: Vertex4_T1.y + t3_T1 * d_c2h6_co.y,
      };
      addPointToTooltip('Vertex5_T1', Vertex5_T1);
      fillPoly(
        [vertices[6], Vertex2_T1, Vertex3_T1, Vertex4_T1, Vertex5_T1],
        colors.zones.T1
      );
      const Vertex2_T2 = interp(vertices[6], vertices[0], 0.75);
      addPointToTooltip('Vertex2_T2', Vertex2_T2);
      const P_T2 = interp(vertices[0], vertices[1], 0.25);
      let t_T2 = 0;
      if (Math.abs(denom_T1) >= 1e-6)
        t_T2 =
          ((P_T2.x - Vertex2_T2.x) * -d_c2h4_h2.y -
            -d_c2h4_h2.x * (P_T2.y - Vertex2_T2.y)) /
          denom_T1;
      const Vertex3_T2 = {
        x: Vertex2_T2.x + t_T2 * d_co_co2.x,
        y: Vertex2_T2.y + t_T2 * d_co_co2.y,
      };
      addPointToTooltip('Vertex3_T2', Vertex3_T2);
      const R_T2 = interp(vertices[0], vertices[1], 0.54);
      let t2_T2 = 0;
      if (Math.abs(denom2_T1) >= 1e-6)
        t2_T2 =
          ((R_T2.x - Vertex3_T2.x) * -d_c2h4_h2.y -
            -d_c2h4_h2.x * (R_T2.y - Vertex3_T2.y)) /
          denom2_T1;
      const Vertex4_T2 = {
        x: Vertex3_T2.x + t2_T2 * d_c2h2_c2h6.x,
        y: Vertex3_T2.y + t2_T2 * d_c2h2_c2h6.y,
      };
      addPointToTooltip('Vertex4_T2', Vertex4_T2);
      let t3_T2 = 0;
      if (Math.abs(denom3_T1) >= 1e-6)
        t3_T2 =
          ((vertices[6].x - Vertex4_T2.x) * -d_co_co2.y -
            -d_co_co2.x * (vertices[6].y - Vertex4_T2.y)) /
          denom3_T1;
      const Vertex5_T2 = {
        x: Vertex4_T2.x + t3_T2 * d_c2h6_co.x,
        y: Vertex4_T2.y + t3_T2 * d_c2h6_co.y,
      };
      addPointToTooltip('Vertex5_T2', Vertex5_T2);
      fillPoly(
        [
          Vertex2_T1,
          Vertex2_T2,
          Vertex3_T2,
          Vertex4_T2,
          Vertex5_T2,
          Vertex5_T1,
          Vertex4_T1,
          Vertex3_T1,
        ],
        colors.zones.T2
      );
      const Vertex3_T3 = interp(vertices[0], vertices[1], 0.35);
      addPointToTooltip('Vertex3_T3', Vertex3_T3);
      const P_T3 = interp(vertices[0], vertices[1], 0.82);
      const denom_T3 =
        d_c2h2_c2h6.x * -d_c2h4_h2.y - -d_c2h4_h2.x * d_c2h2_c2h6.y;
      let t_T3 = 0;
      if (Math.abs(denom_T3) >= 1e-6)
        t_T3 =
          ((P_T3.x - Vertex3_T3.x) * -d_c2h4_h2.y -
            -d_c2h4_h2.x * (P_T3.y - Vertex3_T3.y)) /
          denom_T3;
      const Vertex4_T3 = {
        x: Vertex3_T3.x + t_T3 * d_c2h2_c2h6.x,
        y: Vertex3_T3.y + t_T3 * d_c2h2_c2h6.y,
      };
      addPointToTooltip('Vertex4_T3', Vertex4_T3);
      const denom2_T3 = d_c2h6_co.x * -d_co_co2.y - -d_co_co2.x * d_c2h6_co.y;
      let t2_T3 = 0;
      if (Math.abs(denom2_T3) >= 1e-6)
        t2_T3 =
          ((vertices[6].x - Vertex4_T3.x) * -d_co_co2.y -
            -d_co_co2.x * (vertices[6].y - Vertex4_T3.y)) /
          denom2_T3;
      const Vertex5_T3 = {
        x: Vertex4_T3.x + t2_T3 * d_c2h6_co.x,
        y: Vertex4_T3.y + t2_T3 * d_c2h6_co.y,
      };
      addPointToTooltip('Vertex5_T3', Vertex5_T3);
      fillPoly(
        [
          Vertex2_T2,
          vertices[0],
          Vertex3_T3,
          Vertex4_T3,
          Vertex5_T3,
          Vertex5_T2,
          Vertex4_T2,
          Vertex3_T2,
        ],
        colors.zones.T3
      );
      fillPoly(
        [
          Vertex3_T3,
          PD2,
          Vertex1_D1,
          Vertex5_D1,
          Vertex5_D2,
          Vertex5_T3,
          Vertex4_T3,
        ],
        colors.zones.DT
      );

      // --- Heptagon Edges with Glow/Shadow ---
      ctx.save();
      ctx.shadowColor = colors.lineGlow;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      vertices.forEach((v, i) =>
        i === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
      );
      ctx.closePath();
      ctx.strokeStyle = colors.heptagonLine;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      // --- Draw Perimeter Ticks and Internal Arrows ---
      for (let i = 0; i < N; i++) {
        const v1 = vertices[i];
        const v2 = vertices[(i + 1) % N];
        const label = gasLabels[i];
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        const sideLen = Math.sqrt(dx * dx + dy * dy);

        const tickPerpX = dy / sideLen;
        const tickPerpY = -dx / sideLen;
        const tickLength = R * 0.05;
        const tickFontSize = Math.max(9, R / 30);
        ctx.font = `500 ${tickFontSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;
        ctx.strokeStyle = colors.circumcircle;
        ctx.fillStyle = colors.tickLabel;
        ctx.lineWidth = 1;
        for (let j = 1; j < 10; j++) {
          const t = j / 10;
          const baseX = v1.x + t * dx;
          const baseY = v1.y + t * dy;
          const endX = baseX + tickLength * tickPerpX;
          const endY = baseY + tickLength * tickPerpY;
          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          const labelX = endX + tickLength * 0.7 * tickPerpX;
          const labelY = endY + tickLength * 0.7 * tickPerpY;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(j * 10, labelX, labelY);
        }

        const unitX = dx / sideLen,
          unitY = dy / sideLen;
        const arrowPerpX = -dy / sideLen;
        const arrowPerpY = dx / sideLen;
        const arrowGap = -(R / 5);
        const arrowLength = sideLen / 2;
        const midX = v1.x + 0.5 * dx;
        const midY = v1.y + 0.5 * dy;
        const arrowTailX =
          midX - (arrowLength / 2) * unitX + arrowGap * arrowPerpX;
        const arrowTailY =
          midY - (arrowLength / 2) * unitY + arrowGap * arrowPerpY;
        const arrowHeadX =
          midX + (arrowLength / 2) * unitX + arrowGap * arrowPerpX;
        const arrowHeadY =
          midY + (arrowLength / 2) * unitY + arrowGap * arrowPerpY;

        const labelFontSize = Math.max(11, R / 20);
        ctx.font = `600 ${labelFontSize}px system-ui, -apple-system, sans-serif`;
        const labelMetrics = ctx.measureText(label);
        const totalLabelGap = labelMetrics.width + 8;

        const gapStartX =
          arrowTailX + (arrowLength / 2 - totalLabelGap / 2) * unitX;
        const gapStartY =
          arrowTailY + (arrowLength / 2 - totalLabelGap / 2) * unitY;
        const gapEndX =
          arrowTailX + (arrowLength / 2 + totalLabelGap / 2) * unitX;
        const gapEndY =
          arrowTailY + (arrowLength / 2 + totalLabelGap / 2) * unitY;

        ctx.save();
        ctx.shadowColor = colors.arrowGlow;
        ctx.shadowBlur = 8;
        const dashLen = R / 40;
        const gapLen = R / 80;
        drawDashedLineSegment(
          arrowTailX,
          arrowTailY,
          gapStartX,
          gapStartY,
          dashLen,
          gapLen
        );
        drawDashedLineSegment(
          gapEndX,
          gapEndY,
          arrowHeadX,
          arrowHeadY,
          dashLen,
          gapLen
        );

        const labelMidX = midX + arrowGap * arrowPerpX;
        const labelMidY = midY + arrowGap * arrowPerpY;
        ctx.fillStyle = colors.arrow;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, labelMidX, labelMidY);

        const arrowHeadLength = arrowLength / 8;
        const arrowHeadWidth = arrowHeadLength / 2;
        const baseCenterX = arrowHeadX - arrowHeadLength * unitX;
        const baseCenterY = arrowHeadY - arrowHeadLength * unitY;
        const baseLeftX = baseCenterX + arrowHeadWidth * arrowPerpX;
        const baseLeftY = baseCenterY + arrowHeadWidth * arrowPerpY;
        const baseRightX = baseCenterX - arrowHeadWidth * arrowPerpX;
        const baseRightY = baseCenterY - arrowHeadWidth * arrowPerpY;

        ctx.beginPath();
        ctx.moveTo(arrowHeadX, arrowHeadY);
        ctx.lineTo(baseLeftX, baseLeftY);
        ctx.lineTo(baseRightX, baseRightY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // --- Vertices and Gas Labels (NO CIRCLES) ---
      const labelOffset = R * 0.12;
      const vertexFont = `bold ${Math.max(
        14,
        R / 18
      )}px system-ui, -apple-system, sans-serif`;
      ctx.font = vertexFont;
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      vertices.forEach((v) => {
        const labelX = v.x + labelOffset * Math.cos(v.angle);
        const labelY = v.y - labelOffset * Math.sin(v.angle);
        ctx.fillText(v.label, labelX, labelY);
      });
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const allPoints = [...vertexDataRef.current, ...pointsDataRef.current];
      let found = null;
      for (const p of allPoints) {
        const dx = mx - p.x;
        const dy = my - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < 12) {
          found = p;
          break;
        }
      }
      if (found) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.textContent = found.label;
      } else {
        tooltip.style.display = 'none';
      }
    };
    const onMouseOut = () => {
      tooltip.style.display = 'none';
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseout', onMouseOut);

    resizeObserverRef.current = new ResizeObserver(() => draw());
    resizeObserverRef.current.observe(container);

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
      className={`relative w-full aspect-square rounded-md overflow-hidden ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute z-10 px-3 py-1.5 rounded-lg text-xs pointer-events-none shadow-xl"
        style={{
          display: 'none',
          backdropFilter: 'blur(4px)',
          background:
            theme === 'dark'
              ? 'rgba(30, 41, 59, 0.7)'
              : 'rgba(255, 255, 255, 0.7)',
          color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
          border: `1px solid ${
            theme === 'dark'
              ? 'rgba(100, 116, 139, 0.5)'
              : 'rgba(203, 213, 225, 0.5)'
          }`,
          fontWeight: 500,
        }}
      />
    </div>
  );
}
