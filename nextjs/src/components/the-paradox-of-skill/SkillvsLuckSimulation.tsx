"use client";

import { useEffect, useRef, useState } from "react";

function gaussian(x: number, mu: number, sigma: number) {
  return (
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

function randn() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD"];
const LABELS = ["Player A", "Player B", "Player C", "Player D"];
const CENTER = 75;
const N_PLAYERS = 4;
const N_ROUNDS = 1000;

function meansFor(spread: number) {
  return Array.from({ length: N_PLAYERS }, (_, i) =>
    CENTER - spread / 2 + (i / (N_PLAYERS - 1)) * spread
  );
}

export default function SkillvsLuckSimulation() {
  const [spread, setSpread] = useState(30);
  const [sigma, setSigma] = useState(4);
  const [wins, setWins] = useState<number[] | null>(null);
  const [running, setRunning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const means = meansFor(spread);

  // Invalidate prior simulation when parameters change
  useEffect(() => {
    setWins(null);
  }, [spread, sigma]);

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
    const yMax = gaussian(0, 0, sigma) * 1.15;

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

    // Curves
    const steps = 240;
    means.forEach((mu, idx) => {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const x = xMin + (i / steps) * (xMax - xMin);
        points.push({ x: toX(x), y: toY(gaussian(x, mu, sigma)) });
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, h - padY);
      for (const p of points) ctx.lineTo(p.x, p.y);
      ctx.lineTo(points[points.length - 1].x, h - padY);
      ctx.closePath();
      ctx.fillStyle = COLORS[idx] + "22";
      ctx.fill();

      ctx.beginPath();
      points.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.strokeStyle = COLORS[idx];
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }, [means, sigma]);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      const w = means.map(() => 0);
      for (let r = 0; r < N_ROUNDS; r++) {
        let best = -Infinity;
        let winner = 0;
        means.forEach((mu, i) => {
          const s = mu + sigma * randn();
          if (s > best) {
            best = s;
            winner = i;
          }
        });
        w[winner]++;
      }
      setWins(w);
      setRunning(false);
    }, 0);
  };

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
        .fe-slider {
          -webkit-appearance: none;
          appearance: none;
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: #2a2a2a;
          outline: none;
          cursor: pointer;
        }
        .fe-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          cursor: pointer;
          transition: background 0.15s;
        }
        .fe-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #9ca3af;
          border: none;
          cursor: pointer;
        }
        .fe-slider::-webkit-slider-thumb:hover { background: #cdcdcd; }
        .fe-slider::-moz-range-thumb:hover { background: #cdcdcd; }
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
          Skill spread (best − worst)
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
          >
            <input
              type="range"
              className="fe-slider"
              min={2}
              max={40}
              step={1}
              value={spread}
              onChange={(e) => setSpread(parseFloat(e.target.value))}
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
              {spread}
            </span>
          </div>
        </label>
        <label style={{ fontSize: 13, color: "#9ca3af" }}>
          Noise / luck (σ)
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
          >
            <input
              type="range"
              className="fe-slider"
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
              {sigma}
            </span>
          </div>
        </label>
      </div>

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
        {means.map((mu, i) => (
          <span
            key={LABELS[i]}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: COLORS[i],
                display: "inline-block",
              }}
            />
            {LABELS[i]} (μ={mu.toFixed(1)})
          </span>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          marginBottom: "1rem",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={`Normal distributions for four players with skill spread ${spread} and noise ${sigma}`}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={run}
          disabled={running}
          style={{
            fontSize: 13,
            padding: "6px 14px",
            borderRadius: 6,
            border: "0.5px solid #3a3a3a",
            background: running ? "#1a1a1a" : "#2a2a2a",
            color: "#cdcdcd",
            cursor: running ? "default" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {running ? "Running…" : wins ? "Run again ↻" : "Run simulation ↗"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {means.map((_, i) => {
          const w = wins?.[i] ?? 0;
          const rate = wins ? (w / N_ROUNDS) * 100 : 0;
          return (
            <div
              key={LABELS[i]}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 80,
                  fontSize: 12,
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: COLORS[i],
                    display: "inline-block",
                  }}
                />
                {LABELS[i]}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 14,
                  background: "#1a1a1a",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${rate}%`,
                    height: "100%",
                    background: COLORS[i],
                    transition: "width 0.4s ease-out",
                  }}
                />
              </div>
              <div
                style={{
                  width: 60,
                  textAlign: "right",
                  fontSize: 12,
                  color: "#cdcdcd",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {wins ? `${rate.toFixed(1)}%` : "—"}
              </div>
            </div>
          );
        })}
      </div>

      {(() => {
        const bestIdx = N_PLAYERS - 1;
        const bestRate = wins ? (wins[bestIdx] / N_ROUNDS) * 100 : null;
        const chance = 100 / N_PLAYERS;
        const edge = bestRate != null ? bestRate - chance : null;
        const cardStyle: React.CSSProperties = {
          background: "#1a1a1a",
          borderRadius: 6,
          padding: "0.625rem 0.875rem",
        };
        const labelStyle: React.CSSProperties = {
          fontSize: 11,
          color: "#9ca3af",
          marginBottom: 3,
        };
        const valueStyle: React.CSSProperties = {
          fontSize: 18,
          fontWeight: 500,
          color: "#cdcdcd",
          fontVariantNumeric: "tabular-nums",
        };
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              marginTop: "1rem",
            }}
          >
            <div style={cardStyle}>
              <div style={labelStyle}>Best player win rate</div>
              <div style={valueStyle}>
                {bestRate != null ? `${bestRate.toFixed(1)}%` : "—"}
              </div>
            </div>
            <div style={cardStyle}>
              <div style={labelStyle}>Pure chance baseline</div>
              <div style={valueStyle}>{chance.toFixed(1)}%</div>
            </div>
            <div style={cardStyle}>
              <div style={labelStyle}>Skill edge</div>
              <div style={{ ...valueStyle, color: "#4ADE80" }}>
                {edge != null
                  ? `${edge >= 0 ? "+" : ""}${edge.toFixed(1)}%`
                  : "—"}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}