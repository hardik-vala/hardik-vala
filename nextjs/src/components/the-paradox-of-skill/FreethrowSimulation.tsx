"use client";

import { useState } from "react";
import { simulateGames } from "./lib/stats";
import { SCENARIOS, type ScenarioName } from "./players";
import { Card } from "./ui/Card";
import { WinRateBars } from "./ui/WinRateBars";

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
      setWins(simulateGames(players, N_ROUNDS));
      setRunning(false);
    }, 0);
  };

  return (
    <Card>
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

      <WinRateBars players={players} wins={wins} total={N_ROUNDS} />
    </Card>
  );
}
