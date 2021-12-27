/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import getShareImage from '@jlengstorf/get-share-image';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Form } from '../components/form.js';
import { TableOfContents } from '../components/table-of-contents.js';

export function PostWrapper({
  children,
  title,
  seo_title,
  description,
  image,
  slug,
  useImageForSEO = false,
}) {
  const ref = useRef();
  const url = new URL('https://www.jason.af/');
  url.pathname = `/${slug}`;

  const postTitle = seo_title || title;

  const ogImage = useImageForSEO
    ? image
    : getShareImage({
        title: postTitle.toUpperCase(),
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
  }, [ref]);

  return [
    <SEO
      title={postTitle}
      description={description}
      image={ogImage}
      url={url}
      post
    />,
    <Layout>
      <header class="post-header">
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={image} alt={title} />
      </header>
      <Block color="white" class="post-block">
        <TableOfContents />
        <div class="post-wrapper" ref={ref}>
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
