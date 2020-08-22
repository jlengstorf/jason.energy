import React from 'react';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/intro.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Intro({ headline, children }) {
  return [
    <div className={styles.intro}>
      <h2 className={styles.headline}>{headline}</h2>
      <div className={styles.lede}>{children}</div>
    </div>,
  ];
}
