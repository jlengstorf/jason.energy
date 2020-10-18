import React from 'react';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/block.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Block({ color, children, id, ...props }) {
  const extraClass = props.className ?? '';

  return (
    <div
      {...props}
      id={id}
      className={`${styles.block} ${styles[color]} ${extraClass}`}
    >
      {children}
    </div>
  );
}
