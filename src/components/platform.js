import { h } from 'preact';
import { Image } from './image.js';

import styles from '../styles/platform.module.js';

export function Platform({
  label,
  link,
  description,
  image,
  linkText = 'Check it out &rarr;',
}) {
  return (
    <div className={styles.platform}>
      <a href={link} className={styles.logo}>
        <Image
          publicId={`jason.af/${image}`}
          alt={label}
          width={400}
          height={400}
          transformations={['c_fill']}
        />
      </a>
      <div className={styles.card}>
        <h2 className={styles.name}>
          <a href={link}>{label}</a>
        </h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* ESLint doesn’t recognize this text, so we ignore the error */}
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <a
          className={styles.link}
          href={link}
          dangerouslySetInnerHTML={{ __html: linkText }}
        />
      </div>
    </div>
  );
}
