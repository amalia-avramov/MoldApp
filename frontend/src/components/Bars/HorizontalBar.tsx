import { useEffect, useState } from "react";
import './bars.css'

export function HorizontalBar({ value, maxValue, text }: { value: number; maxValue: number; text: string }) {
  const [style, setStyle] = useState({});
  useEffect(() => {
    const newStyle = { width: `${(value / maxValue) * 100}%` };
    setStyle(newStyle);
  }, [value, maxValue]);
  return (
    <div className="horizontal-bar">
      <div className="bar-color" style={style}>
        <div className="bar-text">{text}</div>
        <div className="bar-line">|</div>
      </div>
    </div>
  );
}
