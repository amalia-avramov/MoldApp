import { useRegisterSensor } from "./useRegisterSensor";
import {
    Alert,
    Button,
    MenuItem,
    Modal,
    Select,
    TextField,
  } from "@mui/material";
  import CancelIcon from "@mui/icons-material/Cancel";
import SensorsIcon from "@mui/icons-material/Sensors";
import classNames from "classnames";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Sensor } from "../../types";
import { availableRooms, wallTypes } from "../../utils";
import { Wizard, useWizard } from "react-use-wizard";

export function AddSensor({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { register, getValues, setValue, onSubmit } = useRegisterSensor();
    const [enterButton, setEnterButton] = useState(false);
  
    return (
      <Modal open={open}>
        <div
          className={classNames("dashboard-add-sensor-container", {
            "dashboard-add-sensor-container-first-step": !enterButton,
            "dashboard-add-sensor-container-next-step": enterButton,
          })}
        >
          <Button
            style={{ color: "black", position: "absolute", right: "0" }}
            onClick={onClose}
          >
            <CancelIcon />
          </Button>
          <Wizard>
            <IpAddressStep1
              onClick={() => setEnterButton(true)}
              register={register}
            />
            <IpAddressStep2 ipAddress={getValues("ipAddress")} />
            <NameStep register={register} />
            <RoomStep setValue={setValue} />
            <WallTypeStep
              value={getValues("wallType")}
              register={register}
              onSubmit={onSubmit}
            />
            <CompleteStep selectedRoom={getValues("room")} onClose={onClose} />
          </Wizard>
        </div>
      </Modal>
    );
  }
  
  function AddSensorStep({
    title,
    infoAlert,
    button1Text,
    button2Text,
    children,
    onClickFirstButton,
    onClickSecondButton,
  }: {
    title?: string;
    infoAlert?: boolean;
    button1Text?: string;
    button2Text?: string;
    children: React.ReactNode;
    onClickFirstButton?: () => void;
    onClickSecondButton?: () => void;
  }) {
    return (
      <form className="dashboard-add-sensor-content" autoComplete="off">
        {title && <div className="dashboard-add-sensor-text">{title}</div>}
        {children}
        {infoAlert && (
          <Alert severity="info">
            Please note that this step is very important for predicting mold
            growth index.
          </Alert>
        )}
        <div className="dashboard-add-sensor-complete-buttons">
          {onClickFirstButton && (
            <Button
              style={{
                backgroundColor: "#ADC7EF",
                color: "black",
                fontWeight: "bold",
                width: "90%",
              }}
              disableElevation
              onClick={onClickFirstButton}
            >
              {button1Text}
            </Button>
          )}
          {onClickSecondButton && (
            <Button
              style={{
                color: "#ADC7EF",
                fontWeight: "bold",
                width: "90%",
              }}
              disableElevation
              onClick={onClickSecondButton}
            >
              {button2Text}
            </Button>
          )}
        </div>
      </form>
    );
  }
  
  function IpAddressStep1({
    onClick,
    register,
  }: {
    onClick: () => void;
    register: UseFormRegister<Sensor>;
  }) {
    const { nextStep } = useWizard();
    return (
      <AddSensorStep title="Sensor">
        <div className="dashboard-add-sensor-body">
          <div className="dashboard-add-sensor-icon">
            <SensorsIcon style={{ fontSize: "50px" }} />
          </div>
          <TextField
            required
            id="ipAddress"
            label="IP Address"
            className="dashboard-add-sensor-input"
            {...register("ipAddress")}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onClick();
                nextStep();
              }
            }}
          />
        </div>
      </AddSensorStep>
    );
  }
  
  function IpAddressStep2({ ipAddress }: { ipAddress: string }) {
    const { nextStep } = useWizard();
    return (
      <AddSensorStep
        title={ipAddress}
        button1Text="Add sensor"
        onClickFirstButton={() => nextStep()}
      >
        <div className="dashboard-add-sensor-icon">
          <SensorsIcon style={{ fontSize: "50px" }} />
        </div>
      </AddSensorStep>
    );
  }
  
  function NameStep({ register }: { register: UseFormRegister<Sensor> }) {
    const { nextStep } = useWizard();
    return (
      <AddSensorStep
        title="Sensor name"
        button1Text="Continue"
        onClickFirstButton={() => nextStep()}
      >
        <TextField
          required
          id="sensorName"
          label="Sensor name"
          className="dashboard-add-sensor-input"
          {...register("name")}
        />
      </AddSensorStep>
    );
  }
  
  function RoomStep({ setValue }: { setValue: UseFormSetValue<Sensor> }) {
    const { nextStep } = useWizard();
    return (
      <AddSensorStep
        title="Select location"
        button1Text="Continue"
        onClickFirstButton={() => nextStep()}
      >
        <div className="dashboard-add-sensor-rooms">
          {availableRooms.map((room) => {
            return (
              <button
                key={room.name}
                className="dashboard-add-sensor-room"
                onClick={(event) => {
                  event.preventDefault();
                  setValue("room", room.name);
                }}
              >
                {room.name}
              </button>
            );
          })}
        </div>
      </AddSensorStep>
    );
  }
  
  function WallTypeStep({
    register,
    onSubmit,
    value,
  }: {
    register: UseFormRegister<Sensor>;
    onSubmit: (
      e?: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
    value: string;
  }) {
    const { nextStep } = useWizard();
    return (
      <AddSensorStep
        title="Wall type"
        infoAlert
        button1Text="Continue"
        onClickFirstButton={() => {
          nextStep();
          onSubmit();
        }}
      >
        <Select
          id="wall-type-dropdown"
          label="Wall type"
          value={value}
          {...register("wallType")}
          className="dashboard-add-sensor-dropdown"
        >
          {wallTypes.map((wall, index) => {
            return (
              <MenuItem value={wall.name} key={index}>
                {wall.name}
              </MenuItem>
            );
          })}
        </Select>
      </AddSensorStep>
    );
  }
  
  function CompleteStep({
    selectedRoom,
    onClose,
  }: {
    selectedRoom: string;
    onClose: () => void;
  }) {
    console.log(selectedRoom)
    return (
      <AddSensorStep
        button1Text="Done"
        button2Text="View sensor"
        onClickFirstButton={onClose}
        onClickSecondButton={onClose}
      >
        <div className="dashboard-add-sensor-complete">
          <CheckCircleOutlineIcon
            style={{ fontSize: "100px", color: "#ADC7EF" }}
          />
          <div className="dashboard-add-sensor-complete-text">
            Sensor added!
          </div>
        </div>
      </AddSensorStep>
    );
  }
  