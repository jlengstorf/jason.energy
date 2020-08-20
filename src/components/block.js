import React from 'react';
import { Helmet } from 'react-helmet';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/block.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Block({ color, children, id, ...props }) {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles/block.module.css" />
      </Helmet>
      <div id={id} className={`${styles.block} ${styles[color]}`} {...props}>
        {children}
      </div>
    </>
  );
}
