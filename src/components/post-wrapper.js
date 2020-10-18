/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/post-wrapper.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function PostWrapper({ children, title, description, image, slug }) {
  const ref = useRef();
  const url = new URL('https://www.jason.af/');
  url.pathname = `/${slug}`;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const footnotes = ref.current.querySelector('.footnotes');

    footnotes.querySelectorAll('a[href^="#fnref"]').forEach(node => {
      node.innerText = 'back';
    });
  }, [ref]);

  return [
    <SEO title={title} description={description} image={image} url={url} />,
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.headline}>{title}</h1>
        <p className={styles.lede}>{description}</p>
        <img className={styles.image} src={image} alt={title} />
      </header>
      <Block color="white">
        <div className={styles['post-wrapper']} ref={ref}>
          {children}
        </div>
      </Block>
    </Layout>,
  ];
}
