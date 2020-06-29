import React from 'react';
import styles from '../styles/block.module.css';

export function Block({ color, children, id }) {
  return (
    <div id={id} className={`${styles.block} ${styles[color]}`}>
      {children}
    </div>
  );
}
