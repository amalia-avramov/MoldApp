import { Button } from "@mui/material";
import { Logo } from "../../components/SvgIcon";
import "./start.css";
import { useNavigate } from "react-router-dom";

export function Start() {
  const navigate = useNavigate();
  return (
    <div className="start-container">
      <div className="start-top-container"></div>
      <div className="start-logo">
        <Logo />
      </div>
      <div className="start-title">moldsafe</div>
      <div className="start-description">It's Not Mold Until It's Tested</div>
      <div className="start-button">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ADC7EF",
            color: "black",
            fontWeight: "bold",
          }}
          disableElevation
          onClick={() => navigate("/login")}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}
