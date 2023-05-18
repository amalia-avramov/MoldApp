import { FooterBar } from "../../components/Footer/FooterBar";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import "./notifications.css";

export function Notifications() {
  return (
    <div className="notifications-page-container">
      <div className="notifications-page-title">Notifications</div>
      <Notification />
      <Notification />
      <Notification />
      <FooterBar />
    </div>
  );
}

function Notification() {
  return (
    <div className="notification">
      <div className="notification-icon">
        <CoronavirusIcon />
      </div>
      <div className="notification-content">
        <div className="notification-title">Hi there!</div>
        <div className="notification-time">now</div>
        <div className="notification-description">
          High mold index detected!
        </div>
      </div>
    </div>
  );
}
