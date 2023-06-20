import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Button, Switch } from "@mui/material";
import "./parameters.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSensorData } from "./useSensorData";

export function Temperature() {
  const navigate = useNavigate();
  const location = useLocation();
  const sensorId = location.state.sensorId;
  const { sensorData } = useSensorData(sensorId);

  const temperature = Math.round((sensorData?.temperature ?? 0) * 10) / 10;

  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button style={{ color: "black", position: "absolute", left: "8px" }} onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">Living room</div>
      </div>
      <div className="temperature">
        <div className="temperature-content">
          <div className="temperature-icon">
            <ThermostatIcon />
          </div>
        </div>
        <div className="temperature-text">Temperature</div>
      </div>
      <div className="temperature-degree-container">
        <div className="temperature-degree">
          {temperature} {String.fromCharCode(176)}
        </div>
        <div className="temperature-text-with-opacity">Celsius</div>
      </div>
      <HorizontalBar value={temperature} maxValue={50} text={`${temperature} ${String.fromCharCode(176)}`} />
    </div>
  );
}

export function Humidity() {
  const navigate = useNavigate();
  const location = useLocation();
  const sensorId = location.state.sensorId;
  const { sensorData } = useSensorData(sensorId);
  const humidity = Math.round((sensorData?.humidity ?? 0) * 10) / 10;

  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button style={{ color: "black", position: "absolute", left: "8px" }} onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">Living room</div>
      </div>
      <div className="temperature">
        <div className="temperature-content">
          <div className="temperature-icon">
            <ThermostatIcon />
          </div>
        </div>
        <div className="temperature-text">Humidity</div>
      </div>
      <div className="humidity-bar" />
      <HorizontalBar value={humidity} maxValue={100} text={`${humidity}%`} />
    </div>
  );
}

export function MoldIndex() {
  const navigate = useNavigate();
  const location = useLocation();
  const sensorId = location.state.sensorId;
  const { sensorData } = useSensorData(sensorId);

  const moldIndex = Math.round((sensorData?.moldIndex ?? 0) * 100) / 100;

  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button style={{ color: "black", position: "absolute", left: "8px" }} onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">Living room</div>
      </div>
      <div className="temperature">
        <div className="temperature-content">
          <div className="temperature-icon">
            <ThermostatIcon />
          </div>
        </div>
        <div className="temperature-text">Mold index</div>
      </div>
      <div className="humidity-bar" />
      <VerticalBar value={moldIndex} maxValue={6} text={`${moldIndex}`} />
    </div>
  );
}

function HorizontalBar({ value, maxValue, text }: { value: number; maxValue: number; text: string }) {
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

function VerticalBar({ value, maxValue, text }: { value: number; maxValue: number; text: string }) {
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
