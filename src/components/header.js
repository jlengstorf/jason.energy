import React from 'react';
import { Link } from 'gatsby';
import { ExplodingNav } from './exploding-nav';
import styles from '../styles/header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" rel="home" className={styles.home}>
        Jason Lengstorf
      </Link>
      <ExplodingNav />
    </header>
  );
}
