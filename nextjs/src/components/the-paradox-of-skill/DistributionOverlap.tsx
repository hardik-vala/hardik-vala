"use client";

import { useEffect, useRef, useState } from "react";
import {
  drawAxis,
  drawCurve,
  setupCanvas,
  toCanvasX,
  toCanvasY,
} from "./lib/canvas";
import { gaussian, normCdf } from "./lib/stats";
import { Card } from "./ui/Card";
import { Legend } from "./ui/Legend";
import { Slider, SliderStyles } from "./ui/Slider";

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
    const yMax = gaussian(0, 0, SIGMA) * 1.15;
    const setup = setupCanvas(canvas, yMax);
    if (!setup) return;
    const { ctx, plot } = setup;

    drawAxis(ctx, plot);

    // Shade Player D's left tail before the midpoint between μC and μD —
    // the "upset region" where D underperforms and loses to C.
    const midpoint = (muC + muD) / 2;
    const midX = toCanvasX(plot, midpoint);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, midX, plot.h);
    ctx.clip();
    const steps = 320;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(plot, plot.xMin), plot.h - plot.padY);
    for (let i = 0; i <= steps; i++) {
      const x = plot.xMin + (i / steps) * (plot.xMax - plot.xMin);
      ctx.lineTo(toCanvasX(plot, x), toCanvasY(plot, gaussian(x, muD, SIGMA)));
    }
    ctx.lineTo(toCanvasX(plot, plot.xMax), plot.h - plot.padY);
    ctx.closePath();
    ctx.fillStyle = COLOR_D + "55";
    ctx.fill();
    ctx.restore();

    // Curves
    drawCurve(ctx, plot, muC, SIGMA, COLOR_C, { fill: false });
    drawCurve(ctx, plot, muD, SIGMA, COLOR_D, { fill: false });
  }, [muD, muC]);

  return (
    <Card>
      <SliderStyles />
      <div style={{ marginBottom: "0.75rem" }}>
        <Slider
          label="Distance between means"
          value={gap}
          min={0}
          max={20}
          step={0.5}
          onChange={setGap}
        />
      </div>

      <Legend
        items={[
          { color: COLOR_D, label: `Player D (μ=${muD.toFixed(1)})` },
          { color: COLOR_C, label: `Player C (μ=${muC.toFixed(1)})` },
          { color: COLOR_D, label: "upset region (D loses)", opacity: 0.33 },
        ]}
        style={{ gap: "8px 16px", marginBottom: "0.5rem" }}
      />

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
    </Card>
  );
}
