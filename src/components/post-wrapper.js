/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import getShareImage from '@jlengstorf/get-share-image';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Form } from '../components/form.js';

import styles from '../styles/post-wrapper.module.js';

export function PostWrapper({ children, title, description, image, slug }) {
  const ref = useRef();
  const [headings, setHeadings] = useState([]);
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

    if (footnotes) {
      footnotes.querySelectorAll('a[href^="#fnref"]').forEach(node => {
        node.innerText = 'back';
      });
    }

    const post = ref.current;

    const headingElements = post.querySelectorAll('h2');
    const callback = ([entry]) => {
      const activeHeading = entry.target;
      const links = Array.from(
        document.querySelectorAll(`.${styles['table-of-contents']} a`),
      );

      links.forEach(link => {
        const [, href] = link.href.split('#');

        if (entry.isIntersecting && href === activeHeading.id) {
          links.forEach(l => l.classList.remove(styles.active));
          link.classList.add(styles.active);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: [1.0] });

    setHeadings(
      Array.from(headingElements)
        .filter(h2 => h2.id !== 'table-of-contents')
        .map(h2 => {
          observer.observe(h2);

          return {
            label: h2.innerText,
            href: `#${h2.id}`,
          };
        }),
    );

    return () => {
      Array.from(headingElements).map(h2 => {
        observer.unobserve(h2);
      });
    };
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
        <aside className={styles['table-of-contents']}>
          <div className={styles['toc-sticky-container']}>
            <h2 id="table-of-contents">Table of Contents</h2>
            <ol>
              {headings.map(heading => (
                <li key={`heading-${heading.href}`}>
                  <a href={heading.href}>{heading.label}</a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
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
