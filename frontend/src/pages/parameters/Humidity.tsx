import { useLocation, useNavigate } from "react-router-dom";
import { useSensorData } from "./useSensorData";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Button } from "@mui/material";
import "./parameters.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { HorizontalBar } from "../../components/Bars/HorizontalBar";


export function Humidity() {
    const navigate = useNavigate();
    const location = useLocation();
    const sensorId = location.state.sensorId;
    const { sensorData } = useSensorData(sensorId);
    const humidity = Math.round((sensorData?.humidity ?? 0) * 10) / 10;
    const roomName = localStorage.getItem("roomName");
  
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
          <div className="temperature-text">Humidity</div>
        </div>
        <div className="humidity-bar" />
        <HorizontalBar value={humidity} maxValue={100} text={`${humidity}%`} />
      </div>
    );
  }