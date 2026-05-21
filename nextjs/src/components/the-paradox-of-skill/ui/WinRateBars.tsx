export function WinRateBars({
  players,
  wins,
  total,
  labelWidth = 110,
}: {
  players: { label: string; color: string }[];
  wins: number[] | null;
  total: number;
  labelWidth?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {players.map((p, i) => {
        const w = wins?.[i] ?? 0;
        const rate = wins ? (w / total) * 100 : 0;
        return (
          <div
            key={p.label}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: labelWidth,
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
  );
}
