import { Alert, AlertTitle, Button, Link, TextField } from "@mui/material";
import { TitleWithLogo } from "../../components/TitleWithLogo";
import { useLogin } from "./useLogin";
import "./login.css";

export function Login() {
  const { alert, register, errors, onSubmit } = useLogin();
  return (
    <div className="login-container">
      <TitleWithLogo />
      <div className="login-title">SIGN IN</div>
      <form autoComplete="off" className="login-form">
        <TextField
          required
          id="email"
          label="Email"
          error={!!errors.email}
          {...register("email", {
            required: "Required field",
          })}
        />
        <TextField
          required
          type="password"
          id="password"
          label="Password"
          {...register("password", {
            required: "Required field",
          })}
          error={!!errors.password}
        />
        {alert && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Invalid credentials! — <strong>Try again!</strong>
          </Alert>
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
          LOGIN
        </Button>
        <div className="login-link">
          Don't have an account yet?
          <Link href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
