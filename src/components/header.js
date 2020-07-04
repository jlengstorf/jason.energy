import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { ExplodingNav } from './exploding-nav';
import { Settings } from './settings';
import styles from '../styles/header.module.css';

export function Header() {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/" rel="home" className={styles.home}>
        Jason Lengstorf
      </Link>
      {isHome && [<ExplodingNav />, <Settings />]}
    </header>
  );
}
