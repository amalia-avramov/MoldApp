import { Button, Switch } from "@mui/material";
import "./dashboard.css";
import { Footer, FooterItem } from "../../components/Footer/FooterBar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import ChairIcon from "@mui/icons-material/Chair";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useDashboard } from "./useDashboard";
import { AddSensor } from "./AddSensor";
import SensorsIcon from "@mui/icons-material/Sensors";
import { Room, Sensor } from "../../types";

export function Dashboard() {
  const { sensors, rooms, isLoading } = useDashboard();
  const [addSensor, setAddSensor] = useState(false);
  return (
    <div className="dashboard-container">
      <div className="dashboard-top-container">
        <div className="dashboard-title">My home</div>
        {sensors.length !== 0 && !isLoading && (
          <Button
            style={{ color: "black", position: "absolute", right: "0" }}
            onClick={() => setAddSensor(true)}
          >
            <AddCircleIcon fontSize="large" />
          </Button>
        )}
      </div>
      {sensors.length === 0 && !isLoading && <DashboardWithoutSensors />}
      {sensors.length === 0 && isLoading && <DashboardSkeleton />}
      {sensors.length > 0 && !isLoading && (
        <DashboardWithSensors sensors={sensors} rooms={rooms} />
      )}
      <div className="dashboard-footer">
        <Footer>
          <FooterItem label="Dashboard" active>
            <DashboardOutlinedIcon style={{ color: "white" }} />
          </FooterItem>
          <FooterItem label="Rooms">
            <DoorBackOutlinedIcon style={{ color: "white" }} />
          </FooterItem>
          <FooterItem label="Notifications">
            <NotificationsNoneOutlinedIcon style={{ color: "white" }} />
          </FooterItem>
        </Footer>
      </div>
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)} />
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
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)} />
    </div>
  );
}

function DashboardWithSensors({
  sensors,
  rooms,
}: {
  sensors: Sensor[];
  rooms: Room[];
}) {
  return (
    <div className="dashboard-with-sensors">
      <div>
        <div className="dashboard-with-sensors-text">Scenes</div>
        <div className="dashboard-with-sensors-top-section">
          {rooms.map((room) => (
            <DashboardScene name={room.name} />
          ))}
        </div>
      </div>
      <div>
        <div className="dashboard-with-sensors-text">Sensors</div>
        <div className="dashboard-with-sensors-bottom-section">
          {sensors.map((sensor) => (
            <DashboardSensor name={sensor.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardScene({ name }: { name: string }) {
  return (
    <div className="scene">
      <div className="scene-content">
        <div className="scene-icon">{getRoomIcon(name)}</div>
        <div className="scene-text">{name}</div>
      </div>
      <Switch defaultChecked style={{ color: "white" }} />
    </div>
  );
}

function DashboardSensor({ name }: { name: string }) {
  return (
    <div className="sensor">
      <div className="sensor-content">
        <div className="sensor-icon">
          <SensorsIcon />
        </div>
        <Switch defaultChecked style={{ color: "white" }} />
      </div>
      <div className="sensor-text">{name}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard-with-sensors">
      <div className="dashboard-with-sensors-top-section">
        {Array.from(Array(5).keys()).map((column) => (
          <div className="scene" />
        ))}
      </div>
      <div className="dashboard-with-sensors-bottom-section">
        {Array.from(Array(6).keys()).map((column) => (
          <div className="sensor" />
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
