import { Footer, FooterItem } from "./Footer";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";

export function FooterBar() {
  const activePath = window.location.pathname;
  return (
    <div className="footer-bar">
      <Footer>
        <FooterItem
          label="Dashboard"
          href="/dashboard"
          active={activePath === "/dashboard"}
        >
          <DashboardOutlinedIcon style={{ color: "white" }} />
        </FooterItem>
        <FooterItem
          label="Rooms"
          href="/rooms"
          active={activePath === "/rooms"}
        >
          <DoorBackOutlinedIcon style={{ color: "white" }} />
        </FooterItem>
        <FooterItem
          label="Notifications"
          href="/notifications"
          active={activePath === "/notifications"}
        >
          <NotificationsNoneOutlinedIcon style={{ color: "white" }} />
        </FooterItem>
      </Footer>
    </div>
  );
}
