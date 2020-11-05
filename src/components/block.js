import { h } from 'preact';
import styles from '../styles/block.module.js';

export function Block({ color, children, id, ...props }) {
  const extraClass = props.className ?? '';

  return (
    <div
      {...props}
      id={id}
      className={`${styles.block} ${styles[color]} ${extraClass}`}
    >
      {children}
    </div>
  );
}
