import React, { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { SEO } from '../components/seo';
import styles from '../styles/404.module.css';
import { Link } from 'gatsby';

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
          <Link to="/">&larr; back to safety</Link>
        </div>
      </Block>
    </Layout>,
  ];
};
