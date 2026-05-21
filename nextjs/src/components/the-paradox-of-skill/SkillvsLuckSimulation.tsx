"use client";

import { useEffect, useRef, useState } from "react";
import { drawAxis, drawCurve, setupCanvas } from "./lib/canvas";
import { gaussian, simulateGames } from "./lib/stats";
import { Card } from "./ui/Card";
import { Legend } from "./ui/Legend";
import { Slider, SliderStyles } from "./ui/Slider";
import { WinRateBars } from "./ui/WinRateBars";

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
    const yMax = gaussian(0, 0, sigma) * 1.15;
    const setup = setupCanvas(canvas, yMax);
    if (!setup) return;
    const { ctx, plot } = setup;

    drawAxis(ctx, plot);
    means.forEach((mu, i) => {
      drawCurve(ctx, plot, mu, sigma, COLORS[i]);
    });
  }, [means, sigma]);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      const players = means.map((mean) => ({ mean, sigma }));
      setWins(simulateGames(players, N_ROUNDS));
      setRunning(false);
    }, 0);
  };

  const barPlayers = means.map((_, i) => ({
    label: LABELS[i],
    color: COLORS[i],
  }));

  const bestRate = wins ? (wins[N_PLAYERS - 1] / N_ROUNDS) * 100 : null;
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
    <Card>
      <SliderStyles />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 24px",
          marginBottom: "0.75rem",
        }}
      >
        <Slider
          label="Skill spread (best − worst)"
          value={spread}
          min={2}
          max={40}
          step={1}
          onChange={setSpread}
          format={(v) => String(v)}
        />
        <Slider
          label="Noise / luck (σ)"
          value={sigma}
          min={1}
          max={15}
          step={0.5}
          onChange={setSigma}
          format={(v) => String(v)}
        />
      </div>

      <Legend
        items={means.map((mu, i) => ({
          color: COLORS[i],
          label: `${LABELS[i]} (μ=${mu.toFixed(1)})`,
        }))}
        style={{ gap: "8px 16px", marginBottom: "0.5rem" }}
      />

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

      <WinRateBars
        players={barPlayers}
        wins={wins}
        total={N_ROUNDS}
        labelWidth={80}
      />

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
    </Card>
  );
}
