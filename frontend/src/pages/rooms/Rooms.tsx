import { Button, Modal } from "@mui/material";
import { FooterBar } from "../../components/Footer/FooterBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import ChairIcon from "@mui/icons-material/Chair";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import { useState } from "react";
import { AddSensor } from "../dashboard/AddSensor";
import "./rooms.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { useRoom } from "./useRooms";

export function Rooms() {
  const [addSensor, setAddSensor] = useState(false);
  const { rooms, refresh } = useRoom();
  const path = window.location.pathname;
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
        <nav className="rooms-body-first-section">
          {rooms.map((room, index) => (
            <Room
              name={room.name}
              href={`/rooms/${room.sensorId}`}
              active={path === `/rooms/${room.sensorId}`}
              key={index}
            />
          ))}
        </nav>
      </div>
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)} refresh={refresh}/>
      <FooterBar />
    </div>
  );
}

export function SelectedRooms() {
  const [addSensor, setAddSensor] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { rooms, onDelete } = useRoom();
  const navigate = useNavigate();
  const pathSegments = window.location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

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
        <nav className="rooms-body-first-section">
          {rooms.map((room, index) => (
            <Room
              name={room.name}
              href={`/rooms/${room.sensorId}`}
              active={lastPathSegment === room.sensorId}
              key={index}
            />
          ))}
        </nav>
        <div className="rooms-body-second-section">
          <Factor
            name="Temperature"
            onClick={() =>
              navigate("/temperature", { state: { sensorId: lastPathSegment } })
            }
          >
            <ThermostatIcon />
          </Factor>
          <Factor
            name="Humidity"
            onClick={() =>
              navigate("/humidity", { state: { sensorId: lastPathSegment } })
            }
          >
            <OpacityIcon />
          </Factor>
          <Factor
            name="Mold index"
            onClick={() =>
              navigate("/mold", { state: { sensorId: lastPathSegment } })
            }
          >
            <CoronavirusIcon />
          </Factor>
        </div>
        <Button
          style={{
            color: "#ADC7EF",
            fontWeight: "bold",
            marginTop: "32px",
          }}
          disableElevation
          onClick={() => setShowModal(true)}
        >
          Remove sensor
          <DeleteOutlineIcon
            style={{
              color: "#ADC7EF",
            }}
          />
        </Button>
      </div>
      <AddSensor open={addSensor} onClose={() => setAddSensor(false)} />
      {showModal && (
        <Modal open={true}>
          <div className="delete-modal">
            <div className="delete-modal-text">
              Are you sure you want to delete this sensor?
            </div>
            <div className="delete-modal-buttons">
              <Button
                style={{
                  backgroundColor: "#ADC7EF",
                  color: "black",
                  fontWeight: "bold",
                  marginTop: "64px",
                }}
                disableElevation
                onClick={() => {
                  onDelete(lastPathSegment);
                  setShowModal(false);
                }}
              >
                yes
              </Button>
              <Button
                style={{
                  border: "2px solid #ADC7EF",
                  color: "black",
                  fontWeight: "bold",
                  marginTop: "64px",
                }}
                disableElevation
                onClick={() => setShowModal(false)}
              >
                no
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <FooterBar />
    </div>
  );
}

function Room({
  name,
  href,
  active,
}: {
  name: string;
  href: string;
  active?: boolean;
}) {
  return (
    <NavLink
      to={href}
      onClick={()=> localStorage.setItem('roomName', name)}
      className={classnames("room", { "room-active": active })}
    >
      <div className="room-icon">{getRoomIcon(name)}</div>
      <div className="room-text">{name}</div>
    </NavLink>
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
