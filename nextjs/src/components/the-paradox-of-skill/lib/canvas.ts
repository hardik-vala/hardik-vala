import { PAD_X, PAD_Y, X_MAX, X_MIN } from "./constants";
import { gaussian } from "./stats";

export type Plot = {
  w: number;
  h: number;
  padX: number;
  padY: number;
  xMin: number;
  xMax: number;
  yMax: number;
};

// Sets DPR scaling, clears the canvas, returns a 2D ctx + plot config.
// Returns null if the canvas has no 2D context.
export function setupCanvas(
  canvas: HTMLCanvasElement,
  yMax: number,
  opts?: { padX?: number; padY?: number; xMin?: number; xMax?: number }
): { ctx: CanvasRenderingContext2D; plot: Plot } | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  return {
    ctx,
    plot: {
      w,
      h,
      padX: opts?.padX ?? PAD_X,
      padY: opts?.padY ?? PAD_Y,
      xMin: opts?.xMin ?? X_MIN,
      xMax: opts?.xMax ?? X_MAX,
      yMax,
    },
  };
}

export function toCanvasX(plot: Plot, x: number): number {
  return (
    plot.padX + ((x - plot.xMin) / (plot.xMax - plot.xMin)) * (plot.w - 2 * plot.padX)
  );
}

export function toCanvasY(plot: Plot, y: number): number {
  return plot.h - plot.padY - (y / plot.yMax) * (plot.h - 2 * plot.padY);
}

export function drawAxis(ctx: CanvasRenderingContext2D, plot: Plot) {
  // baseline
  ctx.strokeStyle = "rgba(176,180,186,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(plot.padX, plot.h - plot.padY);
  ctx.lineTo(plot.w - plot.padX, plot.h - plot.padY);
  ctx.stroke();

  // x ticks every 10 across [xMin, xMax]
  ctx.fillStyle = "rgba(176,180,186,0.7)";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "center";
  for (let x = plot.xMin; x <= plot.xMax; x += 10) {
    const cx = toCanvasX(plot, x);
    ctx.beginPath();
    ctx.moveTo(cx, plot.h - plot.padY);
    ctx.lineTo(cx, plot.h - plot.padY + 3);
    ctx.stroke();
    ctx.fillText(String(x), cx, plot.h - 1);
  }
}

// Returns the sampled points (in canvas coords) so callers can do extra work
// (e.g. clipped tail fill in DistributionOverlap).
export function drawCurve(
  ctx: CanvasRenderingContext2D,
  plot: Plot,
  mu: number,
  sigma: number,
  color: string,
  opts?: { fill?: boolean; fillOpacityHex?: string; lineWidth?: number }
): { x: number; y: number }[] {
  const fill = opts?.fill !== false;
  const fillOpacityHex = opts?.fillOpacityHex ?? "22";
  const lineWidth = opts?.lineWidth ?? 1.5;

  const steps = 240;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = plot.xMin + (i / steps) * (plot.xMax - plot.xMin);
    points.push({
      x: toCanvasX(plot, x),
      y: toCanvasY(plot, gaussian(x, mu, sigma)),
    });
  }

  if (fill) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, plot.h - plot.padY);
    for (const p of points) ctx.lineTo(p.x, p.y);
    ctx.lineTo(points[points.length - 1].x, plot.h - plot.padY);
    ctx.closePath();
    ctx.fillStyle = color + fillOpacityHex;
    ctx.fill();
  }

  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) ctx.moveTo(points[i].x, points[i].y);
    else ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  return points;
}
