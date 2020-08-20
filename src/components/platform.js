import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/platform.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

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
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles/platform.module.css" />
      </Helmet>
      <div className={styles.platform}>
        {fluid && (
          <a href={link} className={styles.logo}>
            <Image fluid={fluid} alt={label} />
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
    </>
  );
}
