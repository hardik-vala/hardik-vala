"use client";

import { useEffect, useRef } from "react";
import { drawAxis, drawCurve, setupCanvas } from "./lib/canvas";
import { gaussian } from "./lib/stats";
import { SCENARIOS, type ScenarioName } from "./players";
import { Card } from "./ui/Card";
import { Legend } from "./ui/Legend";

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
    const yMax =
      Math.max(...players.map((p) => gaussian(p.mean, p.mean, p.sigma))) * 1.15;
    const setup = setupCanvas(canvas, yMax);
    if (!setup) return;
    const { ctx, plot } = setup;

    drawAxis(ctx, plot);
    for (const player of players) {
      drawCurve(ctx, plot, player.mean, player.sigma, player.color);
    }
  }, [players]);

  return (
    <Card>
      <Legend
        items={players.map((p) => ({
          color: p.color,
          label: `${p.label} (μ=${p.mean}, σ=${p.sigma})`,
        }))}
      />
      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label="Normal distributions for four free-throw players with different means and standard deviations"
        />
      </div>
    </Card>
  );
}
