import { FooterBar } from "../../components/Footer/FooterBar";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import "./notifications.css";
import { useNotifications } from "./useNotifications";
import { NotificationDTO } from "../../types";
import classNames from "classnames";
import { Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

export function NotificationPage() {
  const { data, handleViewButton, handleDeleteNotification, handleClearAllButton } = useNotifications();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  return (
    <div className="notifications-page-container">
      <div className="notifications-page-title">Notifications</div>
      {data?.map((notification) => (
        <Notification
          notification={notification}
          key={notification._id}
          onView={handleViewButton}
          onDelete={handleDeleteNotification}
        />
      ))}
      {data && data?.length > 0 && <Button onClick={() => setShowDeleteWarning(true)}>Clear all notifications</Button>}
      {showDeleteWarning && (
        <Modal open={true}>
          <div className="notification-modal">
            <div className="notification-modal-text">Are you sure you want to delete all notifications?</div>
            <div className="notification-modal-buttons">
              <IconButton
                style={{ backgroundColor: "#9cf79c" }}
                onClick={() => {
                  setShowDeleteWarning(false);
                  handleClearAllButton();
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton style={{ backgroundColor: "#ff9393" }} onClick={() => setShowDeleteWarning(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      )}
      <FooterBar />
    </div>
  );
}

function Notification({
  notification,
  onView,
  onDelete,
}: {
  notification: NotificationDTO;
  onView: (notification: NotificationDTO) => void;
  onDelete: (id: string) => void;
}) {
  const time = formatDate(new Date(notification.created_at));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="notification">
      <div className="notification-icon">
        <CoronavirusIcon
          className={classNames("", {
            "info-notification": notification.type == "3",
            "critical-notification": notification.type == "2",
            "warning-notification": notification.type == "1",
          })}
          fontSize="large"
        />
      </div>
      <div className="notification-content">
        <div className="notification-top-container">
          <div className="notification-title">{notification.title}</div>
          <div className="notification-actions">
            <div className="notification-time">{time}</div>
            <div>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {!notification.viewed && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      onView(notification);
                    }}
                  >
                    Mark as read
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    handleClose();
                    onDelete(notification._id);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="notification-description">{notification.message}</div>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return hours + ":" + minutes;
  } else if (isSameDay(date, yesterday)) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
