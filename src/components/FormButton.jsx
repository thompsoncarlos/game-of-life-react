export default function FormButton({ children, className, ...props }) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}