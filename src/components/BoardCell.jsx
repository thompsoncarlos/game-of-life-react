import "../assets/index.css";

export default function BoardCell({ children, className, ...props }) {
  return (
    <div className="cell" {...props}>
      {children}
    </div>
  );
}