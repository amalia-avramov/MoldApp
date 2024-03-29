import { Button, Modal, TextField } from "@mui/material";
import { TitleWithLogo } from "../../components/TitleWithLogo";
import { useRegister } from "./useRegister";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./register.css";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { register, showModal, errors, onSubmit } = useRegister();
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <TitleWithLogo />
      <div className="register-title">SIGN UP</div>
      <div className="register-description">
        Looks like you don’t have an account. Let’s create a new account for
        you.
      </div>
      <form autoComplete="off" className="register-form">
        <TextField
          id="name"
          label="Name"
          {...register("name", {
            required: "Required field",
          })}
          error={!!errors.password}
        />
        <TextField
          required
          id="email"
          label="Email"
          error={!!errors.email}
          {...register("email", {
            required: "Required field",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email?.message && (
          <div className="register-error">{errors.email.message}</div>
        )}
        <TextField
          required
          type="password"
          id="password"
          label="Password"
          {...register("password", {
            required: "Required field",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
              message:
                "Password should contains minimum 8 characters, at least one uppercase letter, one lowercase letter and one number",
            },
          })}
          error={!!errors.password}
        />
        {errors.password?.message && (
          <div className="register-error">{errors.password.message}</div>
        )}
        <Button
          style={{
            backgroundColor: "#ADC7EF",
            color: "black",
            fontWeight: "bold",
          }}
          disableElevation
          onClick={() => onSubmit()}
        >
          CREATE ACCOUNT
        </Button>
        <div>
        <Button
          style={{justifyContent: "left"}}
          disableElevation
          onClick={() => navigate('/login')}
        >
          <ArrowBackIosNewIcon/>
          Back
        </Button>
        </div>
        {showModal && (
          <Modal open={true}>
            <div className="register-modal">
              <CheckCircleOutlineIcon
                style={{ fontSize: "100px", color: "#ADC7EF" }}
              />
              <div className="register-modal-text">
                Account was successfully created!
              </div>
              <Button
                style={{
                  backgroundColor: "#ADC7EF",
                  color: "black",
                  fontWeight: "bold",
                  marginTop: "64px",
                }}
                disableElevation
                onClick={() => navigate("/login")}
              >
                Go to login
              </Button>
            </div>
          </Modal>
        )}
      </form>
    </div>
  );
}
