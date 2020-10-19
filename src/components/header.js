import React, { useState, useEffect } from 'react';
import { ExplodingNav } from './exploding-nav.js';
import { Settings } from './settings.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/header.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

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
