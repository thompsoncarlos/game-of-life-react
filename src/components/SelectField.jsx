import { Fragment } from 'react';

export default function SelectField({ label, id, onChange, children, ...props }) {
  return (
    <Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} onChange={event => onChange(event.target.value)} {...props}>
        {children}
      </select>
    </Fragment>
  );
}