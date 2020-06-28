/** @jsx h */
import { h } from 'preact';
import styles from '../styles/block.module.css';

export function Block({ color, children }) {
  return <div className={`${styles.block} ${styles[color]}`}>{children}</div>;
}
