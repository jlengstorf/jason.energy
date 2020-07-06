import React from 'react';
import styles from '../styles/block.module.css';

export function Block({ color, children, id, ...props }) {
  return (
    <div id={id} className={`${styles.block} ${styles[color]}`} {...props}>
      {children}
    </div>
  );
}
