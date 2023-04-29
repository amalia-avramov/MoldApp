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
      className={active ? "footer-item footer-item-active" : "footer-item"}
      onClick={onClick}
    >
      <div className="footer-icon">{children}</div>
      {active && <a className="footer-item-label">{label}</a>}
    </div>
  );
}
