/** @jsx h */
import { h } from 'preact';
import { Link } from 'gatsby';
import styles from '../styles/header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" rel="home">
        jason.af
      </Link>
      <nav></nav>
    </header>
  );
}
