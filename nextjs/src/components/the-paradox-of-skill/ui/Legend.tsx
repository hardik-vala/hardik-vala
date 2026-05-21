import type { CSSProperties, ReactNode } from "react";

export type LegendItem = {
  color: string;
  label: ReactNode;
  opacity?: number;
};

export function Legend({
  items,
  style,
}: {
  items: LegendItem[];
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 16px",
        marginBottom: "0.75rem",
        fontSize: 12,
        color: "#9ca3af",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: item.color,
              opacity: item.opacity,
              display: "inline-block",
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
