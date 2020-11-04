import React, { useState, useEffect } from 'react';
import { ExplodingNav } from './exploding-nav.js';
import { Settings } from './settings.js';
import styles from '../styles/header.module.js';

export function Header() {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
  }, []);

  return (
    <header className={styles.header}>
      <a href="/" rel="home" className={styles.home}>
        Jason Lengstorf
      </a>
      {isHome ? (
        <ExplodingNav />
      ) : (
        <nav className={styles.nav}>
          <a href="/posts">Writing</a>
        </nav>
      )}
      <Settings />
    </header>
  );
}
