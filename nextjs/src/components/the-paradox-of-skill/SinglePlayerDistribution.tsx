"use client";

import { useEffect, useRef, useState } from "react";
import { drawAxis, drawCurve, setupCanvas, toCanvasX } from "./lib/canvas";
import { gaussian } from "./lib/stats";
import { Card } from "./ui/Card";
import { Slider, SliderStyles } from "./ui/Slider";

const CURVE_COLOR = "#7F77DD";

export default function SinglePlayerDistribution() {
  const [mean, setMean] = useState(75);
  const [sigma, setSigma] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const yMax = gaussian(mean, mean, sigma) * 1.15;
    const setup = setupCanvas(canvas, yMax);
    if (!setup) return;
    const { ctx, plot } = setup;

    drawAxis(ctx, plot);

    // Vertical dashed line at the mean
    const meanX = toCanvasX(plot, mean);
    ctx.strokeStyle = "rgba(127,119,221,0.5)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(meanX, plot.padY);
    ctx.lineTo(meanX, plot.h - plot.padY);
    ctx.stroke();
    ctx.setLineDash([]);

    drawCurve(ctx, plot, mean, sigma, CURVE_COLOR, { fillOpacityHex: "2E" });
  }, [mean, sigma]);

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
          label="Mean (μ)"
          value={mean}
          min={50}
          max={100}
          step={1}
          onChange={setMean}
          format={(v) => String(v)}
        />
        <Slider
          label="Standard deviation (σ)"
          value={sigma}
          min={1}
          max={15}
          step={0.5}
          onChange={setSigma}
        />
      </div>
      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={`Normal distribution with mean ${mean} and standard deviation ${sigma}`}
        />
      </div>
    </Card>
  );
}
