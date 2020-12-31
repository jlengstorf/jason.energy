/** @jsx h */
import { h } from 'preact';

import styles from '../styles/post-aside.module.js';

export function PostAside({ children, className = false, spicy = false }) {
  return (
    <aside className={className || styles.aside}>
      <div className={styles.icon}>
        <img
          src="https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1593991250/jason.af/light-mode.png"
          alt="light bulb"
        />
      </div>
      <div className={styles.content}>{children}</div>
    </aside>
  );
}
