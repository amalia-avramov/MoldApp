import { Button } from "@mui/material";
import "./dashboard.css";
import { Footer, FooterItem } from "../../components/Footer/FooterBar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export function Dashboard() {
  const userSensors = 0;
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">My home</div>
      {userSensors === 0 && (
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
          >
            Add sensor
          </Button>
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
    </div>
  );
}
