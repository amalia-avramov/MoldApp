import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Button, Switch } from "@mui/material";
import "./temperature.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Temperature() {
  const navigate = useNavigate();
  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button
          style={{ color: "black", position: "absolute", left: "8px" }}
          onClick={() => navigate("/rooms")}
        >
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">Living room</div>
      </div>
      <div className="temperature">
        <div className="temperature-content">
          <div className="temperature-icon">
            <ThermostatIcon />
          </div>
          <Switch defaultChecked style={{ color: "white" }} />
        </div>
        <div className="temperature-text">Temperature</div>
      </div>
      <div className="temperature-degree-container">
        <div className="temperature-degree">24 {String.fromCharCode(176)}</div>
        <div className="temperature-text-with-opacity">Celsius</div>
      </div>
      <HorizontalBar
        value={24}
        maxValue={50}
        text={`24 ${String.fromCharCode(176)}`}
      />
    </div>
  );
}

export function Humidity() {
  const navigate = useNavigate();
  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button
          style={{ color: "black", position: "absolute", left: "8px" }}
          onClick={() => navigate("/rooms")}
        >
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">Living room</div>
      </div>
      <div className="temperature">
        <div className="temperature-content">
          <div className="temperature-icon">
            <ThermostatIcon />
          </div>
          <Switch defaultChecked style={{ color: "white" }} />
        </div>
        <div className="temperature-text">Humidity</div>
      </div>
      <div className="humidity-bar" />
      <HorizontalBar value={40} maxValue={100} text={"40%"} />
    </div>
  );
}

export function MoldIndex() {
    const navigate = useNavigate();
    return (
      <div className="temperature-container">
        <div className="temperature-top-section">
          <Button
            style={{ color: "black", position: "absolute", left: "8px" }}
            onClick={() => navigate("/rooms")}
          >
            <ArrowBackIosIcon />
          </Button>
          <div className="temperature-text">Living room</div>
        </div>
        <div className="temperature">
          <div className="temperature-content">
            <div className="temperature-icon">
              <ThermostatIcon />
            </div>
            <Switch defaultChecked style={{ color: "white" }} />
          </div>
          <div className="temperature-text">Mold index</div>
        </div>
        <div className="humidity-bar" />
        <VerticalBar value={4} maxValue={7} text={"4"} />
      </div>
    );
  }

function HorizontalBar({
  value,
  maxValue,
  text,
}: {
  value: number;
  maxValue: number;
  text: string;
}) {
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



function VerticalBar({
  value,
  maxValue,
  text,
}: {
  value: number;
  maxValue: number;
  text: string;
}) {
  const [style, setStyle] = useState({});
  useEffect(() => {
    const newStyle = { width: `${(value / maxValue) * 100}%` };
    setStyle(newStyle);
  }, [value, maxValue]);
  return (
    <div className="vertical-bar">
      <div className="bar-color" style={style}>
        <div className="horizontal-bar-text">{text}</div>
        <div className="bar-line">|</div>
      </div>
    </div>
  );
}
