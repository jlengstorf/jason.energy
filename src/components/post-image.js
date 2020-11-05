/** @jsx h */
import { h } from 'preact';

import styles from '../styles/post-image.module.js';

export function PostImage({
  align = 'center',
  border = true,
  caption,
  children,
  className = false,
  creditType = 'Credit',
  creditLink = null,
  credit,
}) {
  return (
    <figure
      className={
        className ||
        `${styles.figure} ${styles[align]} ${border ? '' : styles.noBorder}`
      }
    >
      {children}
      {(caption || credit) && (
        <figcaption className={styles.caption}>
          {caption && <span dangerouslySetInnerHTML={{ __html: caption }} />}
          {credit && (
            <small className={styles.attribution}>
              {creditType}:
              {creditLink ? (
                <a className={styles.attributionLink} href={creditLink}>
                  {credit}
                </a>
              ) : (
                <span className={styles.attributionLink}>{credit}</span>
              )}
            </small>
          )}
        </figcaption>
      )}
    </figure>
  );
}
