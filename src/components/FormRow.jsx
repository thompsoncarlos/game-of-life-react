
export default function FormRow({ children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}