export function gaussian(x: number, mu: number, sigma: number): number {
  return (
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI))
  );
}

// Box-Muller
export function randn(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Abramowitz & Stegun approximation of erf
export function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

export function normCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

// Run nGames contests; in each, each player draws one Gaussian sample and the
// highest wins. Returns per-player win counts, parallel to `players`.
export function simulateGames(
  players: { mean: number; sigma: number }[],
  nGames: number
): number[] {
  const wins = players.map(() => 0);
  for (let r = 0; r < nGames; r++) {
    let best = -Infinity;
    let winner = 0;
    players.forEach((p, i) => {
      const s = p.mean + p.sigma * randn();
      if (s > best) {
        best = s;
        winner = i;
      }
    });
    wins[winner]++;
  }
  return wins;
}
