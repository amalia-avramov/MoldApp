import { Button } from "@mui/material";
import { FooterBar } from "../../components/Footer/FooterBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import ChairIcon from "@mui/icons-material/Chair";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import { useState } from "react";
import { AddSensor } from "../dashboard/AddSensor";
import "./rooms.css";
import { useNavigate } from "react-router-dom";

export function Rooms() {
  const [addSensor, setAddSensor] = useState(false);
  const navigate=useNavigate();
  return (
    <div className="rooms-container">
      <div className="rooms-top-container">
        <div className="rooms-title">My home</div>
        <Button
          style={{ color: "black", position: "absolute", right: "0" }}
          onClick={() => setAddSensor(true)}
        >
          <AddCircleIcon fontSize="large" />
        </Button>
      </div>
      <div className="rooms-body">
        <div className="rooms-body-first-section">
          <Room name="Living room" />
          <Room name="Living room" />
          <Room name="Living room" />
        </div>
        <div className="rooms-body-second-section">
          <Factor name="Temperature" onClick={()=> navigate('/temperature')}>
            <ThermostatIcon />
          </Factor>
          <Factor name="Humidity" onClick={()=> navigate('/humidity')}>
            <OpacityIcon />
          </Factor>
          <Factor name="Mold index" onClick={()=> navigate('/mold')}>
            <CoronavirusIcon />
          </Factor>
        </div>
      </div>
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)} />
      <FooterBar />
    </div>
  );
}

function Room({ name }: { name: string }) {
  return (
    <div className="room">
      <div className="room-icon">{getRoomIcon(name)}</div>
      <div className="room-text">{name}</div>
    </div>
  );
}

function Factor({
  name,
  children,
  onClick,
}: {
  name: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div className="factor">
      <div className="factor-container">
        <div className="factor-icon">{children}</div>
        <div className="factor-name">{name}</div>
      </div>
      <Button
        style={{ color: "black", right: "4px", position: "absolute" }}
        onClick={onClick}
      >
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
}

function getRoomIcon(roomName: string) {
  switch (roomName) {
    case "Living room":
      return <ChairIcon fontSize="small" />;
    case "Kitchen":
      return <SoupKitchenIcon fontSize="small" />;
    case "Bedroom 1":
      return <SingleBedIcon fontSize="small" />;
    case "Bedroom 2":
      return <SingleBedIcon fontSize="small" />;
    case "Bathroom":
      return <BathtubIcon fontSize="small" />;
    case "Garage":
      return <GarageIcon fontSize="small" />;
    default:
      return;
  }
}
