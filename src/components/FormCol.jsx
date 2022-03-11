export default function FormCol({ children, ...props }) {
  return (
    <div className="col" {...props}>
      {children}
    </div>
  );
}