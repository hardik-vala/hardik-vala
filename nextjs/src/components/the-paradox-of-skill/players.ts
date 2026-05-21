export type Player = {
  label: string;
  mean: number;
  sigma: number;
  color: string;
};

export const SPREAD_PLAYERS: Player[] = [
  { label: "Player A", mean: 55, sigma: 5, color: "#7F77DD" },
  { label: "Player B", mean: 68, sigma: 5, color: "#1D9E75" },
  { label: "Player C", mean: 80, sigma: 3, color: "#D85A30" },
  { label: "Player D", mean: 87, sigma: 4, color: "#378ADD" },
];

export const COMPRESSED_PLAYERS: Player[] = [
  { label: "Player A", mean: 84, sigma: 4, color: "#7F77DD" },
  { label: "Player B", mean: 86, sigma: 4, color: "#1D9E75" },
  { label: "Player C", mean: 88, sigma: 4, color: "#D85A30" },
  { label: "Player D", mean: 90, sigma: 4, color: "#378ADD" },
];

export const SCENARIOS = {
  spread: SPREAD_PLAYERS,
  compressed: COMPRESSED_PLAYERS,
} as const;

export type ScenarioName = keyof typeof SCENARIOS;
