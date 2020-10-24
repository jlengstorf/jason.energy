import React from 'react';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/footer.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>powered by boops</span>
      <nav className={styles.nav}>
        <a href="/posts">posts</a>
        <a href="https://github.com/jlengstorf/jason.af">source code</a>
      </nav>
    </footer>
  );
}
