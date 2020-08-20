import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import { useSfx } from '../hooks/use-sfx.js';
import { Button } from './button.js';
import { Intro } from './intro.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/form.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Form() {
  const [image, setImage] = useState(false);
  const [sending, setSending] = useState(false);
  const { playPop, playHooray } = useSfx();

  useEffect(() => {
    getFluidImageObject({
      public_id: 'jason.af/opt-in',
      cloudName: 'jlengstorf',
      originalHeight: 296,
      originalWidth: 280,
    }).then(setImage);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setSending(true);
    playHooray();

    const data = new FormData(event.target);

    // TODO handle form submissions
    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        firstName: data.get('firstName'),
        email: data.get('email'),
      }),
    }).then(res => {
      if (res.status === 200 && res.redirected === true) {
        window.location.href = res.url;
      }
    });
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles/form.module.css" />
      </Helmet>
      <section className={styles.newsletter}>
        <Intro headline="Get booped on the brain.">
          <p>
            Jason believes in lifelong learning and continuous improvement. In
            his newsletter, he shares his experience — both technical and
            otherwise — in hopes of connecting with more lifelong learners and
            building a community of practice.
          </p>
        </Intro>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            {image && (
              <Image
                fluid={image}
                alt="Illustration of a letter with a heart on the top flap."
              />
            )}
          </div>
          <form
            action="/api/subscribe"
            method="POST"
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <label htmlFor="firstName" className={styles.label}>
              First Name
              <input
                className={styles.input}
                type="text"
                name="firstName"
                id="firstName"
                required
                disabled={sending}
              />
            </label>
            <label htmlFor="email" className={styles.label}>
              Email
              <input
                className={styles.input}
                type="email"
                name="email"
                id="email"
                required
                disabled={sending}
              />
            </label>
            <Button
              className={styles.button}
              hoverSound={playPop}
              handleClick={() => {}}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Join'}
            </Button>
            <p className={styles.privacy}>
              <strong>Privacy notice:</strong> I will never sell or share your
              personal information with anyone (because I’m not a jerk).
              Unsubscribe at any time with one click.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
