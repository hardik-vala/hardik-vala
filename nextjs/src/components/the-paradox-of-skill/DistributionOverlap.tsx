"use client";

import { useEffect, useRef, useState } from "react";

function gaussian(x: number, mu: number, sigma: number) {
  return (
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

// Abramowitz & Stegun approximation of erf
function erf(x: number) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

function normCdf(z: number) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

const CENTER = 80;
const SIGMA = 4;
const COLOR_D = "#378ADD"; // Player D (better) — matches existing scenarios
const COLOR_C = "#D85A30"; // Player C (weaker) — matches existing scenarios

export default function DistributionOverlap() {
  const [gap, setGap] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const muD = CENTER + gap / 2;
  const muC = CENTER - gap / 2;
  const pUpset = 1 - normCdf(gap / (SIGMA * Math.sqrt(2)));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const padX = 16;
    const padY = 12;
    const xMin = 40;
    const xMax = 100;
    const yMax = gaussian(0, 0, SIGMA) * 1.15;

    const toX = (x: number) =>
      padX + ((x - xMin) / (xMax - xMin)) * (w - 2 * padX);
    const toY = (y: number) => h - padY - (y / yMax) * (h - 2 * padY);

    // Axis
    ctx.strokeStyle = "rgba(176,180,186,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();

    // x ticks
    ctx.fillStyle = "rgba(176,180,186,0.7)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    for (let x = xMin; x <= xMax; x += 10) {
      const cx = toX(x);
      ctx.beginPath();
      ctx.moveTo(cx, h - padY);
      ctx.lineTo(cx, h - padY + 3);
      ctx.stroke();
      ctx.fillText(String(x), cx, h - 1);
    }

    const steps = 320;
    const xs: number[] = [];
    const ysD: number[] = [];
    const ysC: number[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      xs.push(x);
      ysD.push(gaussian(x, muD, SIGMA));
      ysC.push(gaussian(x, muC, SIGMA));
    }

    // Shade Player D's left tail before the midpoint between μC and μD —
    // the "upset region" where D underperforms and loses to C.
    const midpoint = (muC + muD) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, toX(midpoint), h);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(toX(xs[0]), h - padY);
    for (let i = 0; i < xs.length; i++) {
      ctx.lineTo(toX(xs[i]), toY(ysD[i]));
    }
    ctx.lineTo(toX(xs[xs.length - 1]), h - padY);
    ctx.closePath();
    ctx.fillStyle = COLOR_D + "55";
    ctx.fill();
    ctx.restore();

    // Stroke C
    ctx.beginPath();
    for (let i = 0; i < xs.length; i++) {
      const cx = toX(xs[i]);
      const cy = toY(ysC[i]);
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = COLOR_C;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Stroke D
    ctx.beginPath();
    for (let i = 0; i < xs.length; i++) {
      const cx = toX(xs[i]);
      const cy = toY(ysD[i]);
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = COLOR_D;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [muD, muC]);

  return (
    <div
      style={{
        margin: "1.5rem 0",
        padding: "1rem 1.25rem",
        border: "0.5px solid #2a2a2a",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <style>{`
        .do-slider {
          -webkit-appearance: none;
          appearance: none;
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: #2a2a2a;
          outline: none;
          cursor: pointer;
        }
        .do-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          cursor: pointer;
          transition: background 0.15s;
        }
        .do-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          border: none;
          cursor: pointer;
        }
        .do-slider::-webkit-slider-thumb:hover { background: #cdcdcd; }
        .do-slider::-moz-range-thumb:hover { background: #cdcdcd; }
      `}</style>

      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: "0.75rem",
        }}
      >
        Distance between means
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
        >
          <input
            type="range"
            className="do-slider"
            min={0}
            max={20}
            step={0.5}
            value={gap}
            onChange={(e) => setGap(parseFloat(e.target.value))}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              minWidth: 36,
              textAlign: "right",
              color: "#cdcdcd",
            }}
          >
            {gap.toFixed(1)}
          </span>
        </div>
      </label>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 16px",
          marginBottom: "0.5rem",
          fontSize: 12,
          color: "#9ca3af",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: COLOR_D,
              display: "inline-block",
            }}
          />
          Player D (μ={muD.toFixed(1)})
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: COLOR_C,
              display: "inline-block",
            }}
          />
          Player C (μ={muC.toFixed(1)})
        </span>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          marginBottom: "0.875rem",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={`Two normal distributions for Player D (mean ${muD.toFixed(1)}) and Player C (mean ${muC.toFixed(1)}), both with standard deviation ${SIGMA}, with their overlap region shaded`}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontSize: 13,
          color: "#9ca3af",
        }}
      >
        <span>P(Player C beats Player D on a given game) =</span>
        <span
          style={{
            fontWeight: 500,
            color: "#cdcdcd",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {(pUpset * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}