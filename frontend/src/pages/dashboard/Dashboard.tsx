import { Button, Switch } from "@mui/material";
import "./dashboard.css";
import { Footer, FooterItem } from "../../components/Footer/FooterBar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import ChairIcon from "@mui/icons-material/Chair";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { useDashboard } from "./useDashboard";
import { AddSensor } from "./AddSensor";
import SensorsIcon from "@mui/icons-material/Sensors";

export function Dashboard() {
  const { sensors } = useDashboard();
  const [addSensor, setAddSensor] = useState(false);
  return (
    <div className="dashboard-container">
      <div className="dashboard-top-container">
        <div className="dashboard-title">My home</div>
        {sensors.length !== 0 && (
          <Button
            style={{ color: "black", position: "absolute", right: "0" }}
            onClick={() => setAddSensor(true)}
          >
            <AddCircleIcon fontSize="large" />
          </Button>
        )}
      </div>
      {sensors.length === 0 ? (
        <DashboardWithoutSensors />
      ) : (
        <div className="dashboard-with-sensors">
          <div className="dashboard-with-sensors-top-section">
            <DashboardScene name="Bedroom">
              <SingleBedIcon />
            </DashboardScene>
            <DashboardScene name="Living room">
              <ChairIcon />
            </DashboardScene>
            <DashboardScene name="Kitchen">
              <SoupKitchenIcon />
            </DashboardScene>
          </div>
          <div className="dashboard-with-sensors-bottom-section">
            <DashboardSensor name="Sensor 1"/>
            <DashboardSensor name="Sensor 2"/>
            <DashboardSensor name="Sensor 3"/>
          </div>
        </div>
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

function DashboardScene({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="scene">
      <div className="scene-content">
        <div className="scene-icon">{children}</div>
        <div className="scene-text">{name}</div>
      </div>
      <Switch defaultChecked style={{ color: "white" }} />
    </div>
  );
}

function DashboardSensor({
  name,
}: {
  name: string;
}) {
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
