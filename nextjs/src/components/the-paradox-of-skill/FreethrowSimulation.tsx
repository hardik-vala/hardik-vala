"use client";

import { useState } from "react";
import { SCENARIOS, type ScenarioName } from "./players";

function randn() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const N_ROUNDS = 1000;

export default function FreethrowSimulation({
  scenario = "spread",
}: {
  scenario?: ScenarioName;
}) {
  const players = SCENARIOS[scenario];
  const [wins, setWins] = useState<number[] | null>(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    // Defer so the button updates visually before the (fast) sim runs
    setTimeout(() => {
      const w = players.map(() => 0);
      for (let r = 0; r < N_ROUNDS; r++) {
        let best = -Infinity;
        let winner = 0;
        players.forEach((p, i) => {
          const s = p.mean + p.sigma * randn();
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: "0.875rem",
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
          {running ? "Running…" : wins ? "Run again ↻" : "Run"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {players.map((p, i) => {
          const w = wins?.[i] ?? 0;
          const rate = wins ? (w / N_ROUNDS) * 100 : 0;
          return (
            <div
              key={p.label}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 110,
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
                    background: p.color,
                    display: "inline-block",
                  }}
                />
                {p.label}
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
                    background: p.color,
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
    </div>
  );
}
