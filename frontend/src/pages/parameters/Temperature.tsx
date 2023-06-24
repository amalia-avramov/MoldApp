import { useLocation, useNavigate } from "react-router-dom";
import { useSensorData } from "./useSensorData";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Button } from "@mui/material";
import "./parameters.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { HorizontalBar } from "../../components/Bars/HorizontalBar";


export function Temperature() {
  const navigate = useNavigate();
  const location = useLocation();
  const sensorId = location.state.sensorId;
  const { sensorData } = useSensorData(sensorId);
  const roomName = localStorage.getItem("roomName");

  const temperature = Math.round((sensorData?.temperature ?? 0) * 10) / 10;

  return (
    <div className="temperature-container">
      <div className="temperature-top-section">
        <Button style={{ color: "black", position: "absolute", left: "8px" }} onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
        <div className="temperature-text">{roomName}</div>
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
