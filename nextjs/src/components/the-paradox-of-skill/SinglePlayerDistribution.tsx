"use client";

import { useEffect, useRef, useState } from "react";

function gaussian(x: number, mu: number, sigma: number) {
  return (
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

export default function SinglePlayerDistribution() {
  const [mean, setMean] = useState(75);
  const [sigma, setSigma] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const peak = gaussian(mean, mean, sigma);
    const yMax = peak * 1.15;

    const toCanvasX = (x: number) =>
      padX + ((x - xMin) / (xMax - xMin)) * (w - 2 * padX);
    const toCanvasY = (y: number) =>
      h - padY - (y / yMax) * (h - 2 * padY);

    ctx.strokeStyle = "rgba(176,180,186,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();

    ctx.fillStyle = "rgba(176,180,186,0.7)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    for (let x = xMin; x <= xMax; x += 10) {
      const cx = toCanvasX(x);
      ctx.beginPath();
      ctx.moveTo(cx, h - padY);
      ctx.lineTo(cx, h - padY + 3);
      ctx.stroke();
      ctx.fillText(String(x), cx, h - 1);
    }

    const meanX = toCanvasX(mean);
    ctx.strokeStyle = "rgba(127,119,221,0.5)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(meanX, padY);
    ctx.lineTo(meanX, h - padY);
    ctx.stroke();
    ctx.setLineDash([]);

    const steps = 240;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      points.push({ x: toCanvasX(x), y: toCanvasY(gaussian(x, mean, sigma)) });
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, h - padY);
    for (const p of points) ctx.lineTo(p.x, p.y);
    ctx.lineTo(points[points.length - 1].x, h - padY);
    ctx.closePath();
    ctx.fillStyle = "rgba(127,119,221,0.18)";
    ctx.fill();

    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "#7F77DD";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [mean, sigma]);

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
        .nd-slider {
          -webkit-appearance: none;
          appearance: none;
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: #2a2a2a;
          outline: none;
          cursor: pointer;
        }
        .nd-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          cursor: pointer;
          transition: background 0.15s;
        }
        .nd-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          border: none;
          cursor: pointer;
        }
        .nd-slider::-webkit-slider-thumb:hover { background: #cdcdcd; }
        .nd-slider::-moz-range-thumb:hover { background: #cdcdcd; }
      `}</style>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 24px",
          marginBottom: "0.75rem",
        }}
      >
        <label style={{ fontSize: 13, color: "#9ca3af" }}>
          Mean (μ)
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <input
              type="range"
              className="nd-slider"
              min={50}
              max={100}
              step={1}
              value={mean}
              onChange={(e) => setMean(parseFloat(e.target.value))}
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
              {mean}
            </span>
          </div>
        </label>
        <label style={{ fontSize: 13, color: "#9ca3af" }}>
          Standard deviation (σ)
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <input
              type="range"
              className="nd-slider"
              min={1}
              max={15}
              step={0.5}
              value={sigma}
              onChange={(e) => setSigma(parseFloat(e.target.value))}
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
              {sigma.toFixed(1)}
            </span>
          </div>
        </label>
      </div>
      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={`Normal distribution with mean ${mean} and standard deviation ${sigma}`}
        />
      </div>
    </div>
  );
}
