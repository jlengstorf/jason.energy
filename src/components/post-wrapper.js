/** @jsx h */
import { h } from 'preact';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Intro } from '../components/intro.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/post-wrapper.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function PostWrapper({ children, title, description, image, slug }) {
  const url = new URL('https://www.jason.af/');
  url.pathname = `/${slug}`;

  return [
    <SEO title={title} description={description} image={image} url={url} />,
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.headline}>{title}</h1>
        <p className={styles.lede}>{description}</p>
        <img className={styles.image} src={image} alt={title} />
      </header>
      <Block color="white">
        <div className={styles['post-wrapper']}>{children}</div>
      </Block>
    </Layout>,
  ];
}
