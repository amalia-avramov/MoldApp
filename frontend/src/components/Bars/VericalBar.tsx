import { useEffect, useState } from "react";
import './bars.css'

export function VerticalBar({ value, maxValue, text }: { value: number; maxValue: number; text: string }) {
    const [style, setStyle] = useState({});
    useEffect(() => {
      const newStyle = { width: `${(value / maxValue) * 100}%` };
      setStyle(newStyle);
    }, [value, maxValue]);
    return (
      <div className="vertical-bar">
        <div className="bar-color" style={style}>
          <div className="vertical-bar-text">{text}</div>
          <div className="bar-line">|</div>
        </div>
      </div>
    );
  }