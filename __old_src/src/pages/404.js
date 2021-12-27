import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { SEO } from '../components/seo.js';
import { Image } from '../components/image.js';

export default () => {
  const [missingLink, setMissingLink] = useState();

  useEffect(() => {
    setMissingLink(document.location.href);
  }, []);

  const title = encodeURIComponent(`Broken link: ${missingLink}`);
  const body = encodeURIComponent(
    `The link ${missingLink} is returning a 404.`,
  );

  return [
    <SEO
      title="Page Not Found"
      description="This page does not exist."
      url="https://jason.af/404"
      image="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1593581194/jason.af/404.png"
    />,
    <Layout>
      <Block color="yellow">
        <div class="not-found-container">
          <Image
            publicId="jason.af/404.png"
            alt="A drawing of a dumpster fire."
            width={1200}
            height={600}
          />
          <h1>404 — Page Not Found</h1>
          <p>
            Oh no. If you came here from a link, could you please{' '}
            <a
              href={`https://github.com/jlengstorf/jason.af/issues/new?title=${title}&body=${body}`}
            >
              let me know
            </a>{' '}
            so I can fix it? If you don’t have a GitHub account, you can email
            me: jason@lengstorf.com
          </p>
          <a href="/">&larr; back to safety</a>
        </div>
      </Block>
    </Layout>,
  ];
};
