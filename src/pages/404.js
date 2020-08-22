import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { SEO } from '../components/seo.js';
import { Image } from '../components/image.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/404.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export default () => {
  return [
    <Helmet>
      <link rel="stylesheet" href="/styles/block.module.css" />
    </Helmet>,
    <SEO
      title="Page Not Found"
      description="This page does not exist."
      url="https://jason.af/404"
      image="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1593581194/jason.af/404.png"
    />,
    <Layout>
      <Block color="yellow">
        <div className={styles.container}>
          <Image
            publicId="jason.af/404.png"
            alt="A drawing of a dumpster fire."
            width={1200}
            height={600}
          />
          <h1>404 — Page Not Found</h1>
          <p>This is a one-page website. How did you get here?</p>
          <a href="/">&larr; back to safety</a>
        </div>
      </Block>
    </Layout>,
  ];
};
