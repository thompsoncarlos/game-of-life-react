import { Fragment } from 'react';

export default function InputField({ label, id, onChange, ...props }) {
  return (
    <Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} onChange={event => onChange(event.target.value)} {...props} />
    </Fragment>
  );
}