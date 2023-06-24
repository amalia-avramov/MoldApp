import { Button, Switch } from "@mui/material";
import "./dashboard.css";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import ChairIcon from "@mui/icons-material/Chair";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useDashboard } from "./useDashboard";
import { AddSensor } from "./AddSensor";
import SensorsIcon from "@mui/icons-material/Sensors";
import { Room, Sensor } from "../../types";
import { FooterBar } from "../../components/Footer/FooterBar";

export function Dashboard() {
  const { sensors, rooms, isLoading, onToggleChange, refresh, refreshRooms } = useDashboard();
  const [addSensor, setAddSensor] = useState(false);
  return (
    <div className="dashboard-container">
      <div className="dashboard-top-container">
        <div className="dashboard-title">My home</div>
        {sensors.length !== 0 && !isLoading && (
          <Button style={{ color: "black", position: "absolute", right: "0" }} onClick={() => setAddSensor(true)}>
            <AddCircleIcon fontSize="large" />
          </Button>
        )}
      </div>
      {sensors.length === 0 && !isLoading && <DashboardWithoutSensors />}
      {sensors.length === 0 && isLoading && <DashboardSkeleton />}
      {sensors.length > 0 && !isLoading && (
        <DashboardWithSensors sensors={sensors} rooms={rooms} onToggleChange={onToggleChange} />
      )}
      <FooterBar />
      <AddSensor
        open={addSensor}
        onClose={() => setAddSensor(false)}
        refresh={() => {
          refreshRooms();
          refresh();
        }}
      />
    </div>
  );
}

function DashboardWithoutSensors() {
  const [addSensor, setAddSensor] = useState(false);
  return (
    <div className="dashboard-content-without-sensors">
      <div className="dashboard-title" style={{ textAlign: "center" }}>
        No sensor available
      </div>
      <Button
        style={{
          backgroundColor: "#ADC7EF",
          color: "black",
          fontWeight: "bold",
        }}
        disableElevation
        onClick={() => setAddSensor(true)}
      >
        Add sensor
      </Button>
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)}/>
    </div>
  );
}

function DashboardWithSensors({
  sensors,
  rooms,
  onToggleChange,
}: {
  sensors: Sensor[];
  rooms: Room[];
  onToggleChange: (sensor: Sensor) => void;
}) {
  return (
    <div className="dashboard-with-sensors">
      <div>
        <div className="dashboard-with-sensors-text">Scenes</div>
        <div className="dashboard-with-sensors-top-section">
          {rooms?.map((room) => (
            <DashboardScene name={room.name} isActive={room.isActive} key={room.sensorId} />
          ))}
        </div>
      </div>
      <div>
        <div className="dashboard-with-sensors-text">Sensors</div>
        <div className="dashboard-with-sensors-bottom-section">
          {sensors?.map((sensor) => (
            <DashboardSensor sensor={sensor} onToggleChange={onToggleChange} key={sensor._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardScene({ name, isActive }: { name: string; isActive: boolean }) {
  return (
    <div className="scene">
      <div className="scene-content">
        <div className="scene-icon">{getRoomIcon(name)}</div>
        <div className="scene-text">{name}</div>
      </div>
      <Switch style={{ color: "white" }} checked={isActive} />
    </div>
  );
}

function DashboardSensor({ sensor, onToggleChange }: { sensor: Sensor; onToggleChange: (sensor: Sensor) => void }) {
  return (
    <div className="sensor">
      <div className="sensor-content">
        <div className="sensor-icon">
          <SensorsIcon />
        </div>
        <Switch style={{ color: "white" }} checked={sensor.isActive} onChange={() => onToggleChange(sensor)} />
      </div>
      <div className="sensor-text">{sensor.name}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard-with-sensors">
      <div className="dashboard-with-sensors-top-section">
        {Array.from(Array(5).keys()).map((column) => (
          <div className="scene" key={column} />
        ))}
      </div>
      <div className="dashboard-with-sensors-bottom-section">
        {Array.from(Array(6).keys()).map((column) => (
          <div className="sensor" key={column} />
        ))}
      </div>
    </div>
  );
}

export function getRoomIcon(roomName: string) {
  switch (roomName) {
    case "Living room":
      return <ChairIcon />;
    case "Kitchen":
      return <SoupKitchenIcon />;
    case "Bedroom 1":
      return <SingleBedIcon />;
    case "Bedroom 2":
      return <SingleBedIcon />;
    case "Bathroom":
      return <BathtubIcon />;
    case "Garage":
      return <GarageIcon />;
    default:
      return;
  }
}
