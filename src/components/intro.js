import React from 'react';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/intro.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

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
