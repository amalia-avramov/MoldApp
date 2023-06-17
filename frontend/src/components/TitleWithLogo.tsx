import { Logo } from "./SvgIcon";
import "./style.css";

export function TitleWithLogo() {
  return (
    <div className="container">
      <div className="logo">
        <Logo />
      </div>
      <div className="title">moldsafe</div>
    </div>
  );
}
