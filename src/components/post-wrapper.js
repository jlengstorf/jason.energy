/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import getShareImage from '@jlengstorf/get-share-image';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Form } from '../components/form.js';

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

  const ogImage = getShareImage({
    title: title.toUpperCase(),
    cloudName: 'jlengstorf',
    imagePublicID: 'jason.af/og',
    titleFont: 'jwf.otf',
    titleExtraConfig: '_line_spacing_-25',
    titleFontSize: 75,
    textColor: '171321',
    textLeftOffset: 354,
    textAreaWidth: 920,
    titleBottomOffset: 185,
  });

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
    <SEO
      title={title}
      description={description}
      image={ogImage}
      url={url}
      post
    />,
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.headline}>{title}</h1>
        <p className={styles.lede}>{description}</p>
        <img className={styles.image} src={image} alt={title} />
      </header>
      <Block color="white" className={styles['post-block']}>
        <div className={styles['post-wrapper']} ref={ref}>
          {children}
        </div>
      </Block>
      <Block id="newsletter" color="yellow">
        <Form title="Do more of what matters.">
          <p>
            I’ve spent a lot of my life doing things the hard way. I write about
            the experiences, experiments, and strategies that have helped me
            live a happier, more fulfilling life where I’m able to do more of
            what matters to me — and less of what doesn’t.
          </p>
          <p>
            Join my newsletter and I’ll share those stories directly to your
            inbox.
          </p>
        </Form>
      </Block>
    </Layout>,
  ];
}
