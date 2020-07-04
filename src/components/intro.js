import React from 'react';
import styles from '../styles/intro.module.css';

export function Intro({ headline, children }) {
  return [
    <div className={styles.intro}>
      <h2 className={styles.headline}>{headline}</h2>
      <div className={styles.lede}>{children}</div>
    </div>,
  ];
}
