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
      <Block color="white">
        <Intro headline={title}>
          <p>{description}</p>
        </Intro>
        <div className={styles['post-wrapper']}>{children}</div>
      </Block>
    </Layout>,
  ];
}
