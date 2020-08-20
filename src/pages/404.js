import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { SEO } from '../components/seo.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/404.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export default () => {
  const [fluid, setFluid] = useState(false);

  useEffect(() => {
    getFluidImageObject({
      public_id: 'jason.af/404.png',
      cloudName: 'jlengstorf',
      originalHeight: 600,
      originalWidth: 1200,
    }).then(setFluid);
  }, []);

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
          {fluid && <Image fluid={fluid} alt="A drawing of a dumpster fire." />}
          <h1>404 — Page Not Found</h1>
          <p>This is a one-page website. How did you get here?</p>
          <a href="/">&larr; back to safety</a>
        </div>
      </Block>
    </Layout>,
  ];
};
