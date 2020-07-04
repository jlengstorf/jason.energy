import React, { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import styles from '../styles/platform.module.css';

export function Platform({
  label,
  link,
  description,
  image,
  linkText = 'Check it out &rarr;',
}) {
  const [fluid, setFluid] = useState(false);

  useEffect(() => {
    getFluidImageObject({
      public_id: `jason.af/${image}`,
      cloudName: 'jlengstorf',
      originalHeight: 420,
      originalWidth: 420,
    }).then(setFluid);
  }, [image]);

  return (
    <div className={styles.platform}>
      {fluid && (
        <a href={link} className={styles.logo}>
          <Image fluid={fluid} alt="Camera" />
        </a>
      )}
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
