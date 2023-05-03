import classnames from "classnames";
import "./footer.css";

export function Footer({ children }: { children: React.ReactNode }) {
  return <div className="footer">{children}</div>;
}

export function FooterItem({
  label,
  active,
  children,
  onClick,
}: {
  label: string;
  children?: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <div
      className={classnames("footer-item", { "footer-item-active": active })}
      onClick={onClick}
    >
      <div className="footer-icon">{children}</div>
      {active && <div className="footer-item-label">{label}</div>}
    </div>
  );
}
