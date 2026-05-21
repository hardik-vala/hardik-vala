import type { ReactNode } from "react";

const STYLE_BLOCK = `
.tps-slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: #2a2a2a;
  outline: none;
  cursor: pointer;
}
.tps-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #9ca3af;
  cursor: pointer;
  transition: background 0.15s;
}
.tps-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #9ca3af;
  border: none;
  cursor: pointer;
}
.tps-slider::-webkit-slider-thumb:hover { background: #cdcdcd; }
.tps-slider::-moz-range-thumb:hover { background: #cdcdcd; }
`;

export function SliderStyles() {
  return <style>{STYLE_BLOCK}</style>;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => v.toFixed(1),
  valueWidth = 36,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  valueWidth?: number;
}) {
  return (
    <label style={{ fontSize: 13, color: "#9ca3af" }}>
      {label}
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
      >
        <input
          type="range"
          className="tps-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            minWidth: valueWidth,
            textAlign: "right",
            color: "#cdcdcd",
          }}
        >
          {format(value)}
        </span>
      </div>
    </label>
  );
}
