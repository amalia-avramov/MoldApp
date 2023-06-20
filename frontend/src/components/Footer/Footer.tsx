import classnames from "classnames";
import "./footer.css";
import { NavLink } from "react-router-dom";

export function Footer({ children }: { children: React.ReactNode }) {
  return <nav className="footer">{children}</nav>;
}

export function FooterItem({
  label,
  active,
  children,
  number,
  href,
}: {
  label: string;
  children?: React.ReactNode;
  active?: boolean;
  number?: number;
  href: string;
}) {
  return (
    <NavLink className={classnames("footer-item", { "footer-item-active": active })} to={href}>
      <div className="footer-icon">
        {children}
        {number && number > 0 && <div className="footer-item-number">{number}</div>}
      </div>
      {active && <div className="footer-item-label">{label}</div>}
    </NavLink>
  );
}
