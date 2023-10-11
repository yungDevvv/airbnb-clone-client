export default function NavButton({ children, onClick, style}) {
  const buttonStyle = {
    border: "1px solid #929598",
    background: "transparent",
    padding: "8px",
    fontSize: "12px",
    ...style
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className="datepicker-navbutton"
    >
      {children}
    </button>
  );
}
