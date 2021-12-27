import { h } from 'preact';

export function Block({ color, children, id, ...props }) {
  const extraClass = props.class ?? '';

  return (
    <div {...props} id={id} class={`block ${color} ${extraClass}`}>
      {children}
    </div>
  );
}
