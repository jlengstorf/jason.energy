import { h } from 'preact';
import styles from '../styles/intro.module.js';

const Heading = ({ children, className, post }) =>
  post ? (
    <h1 className={className}>{children}</h1>
  ) : (
    <h2 className={className}>{children}</h2>
  );

export function Intro({ headline, children, post = false }) {
  return [
    <div className={styles.intro}>
      <Heading className={styles.headline} post={post}>
        {headline}
      </Heading>
      <div className={styles.lede}>{children}</div>
    </div>,
  ];
}
