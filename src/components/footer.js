import React from 'react';
import styles from '../styles/footer.module.js';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>powered by boops</span>
      <nav className={styles.nav}>
        <a href="/posts">posts</a>
        <a href="https://github.com/jlengstorf/jason.af">source code</a>
      </nav>
    </footer>
  );
}
