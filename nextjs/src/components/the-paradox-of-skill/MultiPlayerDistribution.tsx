"use client";

import { useEffect, useRef } from "react";
import { SCENARIOS, type ScenarioName } from "./players";

function gaussian(x: number, mu: number, sigma: number) {
  return (
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

export default function MultiPlayerDistribution({
  scenario = "spread",
}: {
  scenario?: ScenarioName;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const players = SCENARIOS[scenario];

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
    const yMax =
      Math.max(...players.map((p) => gaussian(p.mean, p.mean, p.sigma))) * 1.15;

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

    const steps = 240;
    for (const player of players) {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const x = xMin + (i / steps) * (xMax - xMin);
        points.push({
          x: toCanvasX(x),
          y: toCanvasY(gaussian(x, player.mean, player.sigma)),
        });
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, h - padY);
      for (const p of points) ctx.lineTo(p.x, p.y);
      ctx.lineTo(points[points.length - 1].x, h - padY);
      ctx.closePath();
      ctx.fillStyle = player.color + "22";
      ctx.fill();

      ctx.beginPath();
      points.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.strokeStyle = player.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [players]);

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 16px",
          marginBottom: "0.75rem",
          fontSize: 12,
          color: "#9ca3af",
        }}
      >
        {players.map((p) => (
          <span
            key={p.label}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: p.color,
                display: "inline-block",
              }}
            />
            {p.label} (μ={p.mean}, σ={p.sigma})
          </span>
        ))}
      </div>
      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label="Normal distributions for four free-throw players with different means and standard deviations"
        />
      </div>
    </div>
  );
}
