/** @jsx h */
import {h} from 'preact';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/post-image.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function PostImage ({
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
