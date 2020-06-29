import React, { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import styles from '../styles/teaching.module.css';

const platforms = [
  {
    id: 'lwj',
    label: 'Learn With Jason',
    link: 'https://www.learnwithjason.dev',
    description: `
      I regularly pair program with brilliant people from around the community
      to learn something new in 90 minutes. Shows are live and interactive, so 
      make sure to check the calendar and join in the fun!
    `,
    image: 'learnwithjason',
  },
  {
    id: 'egghead',
    label: 'egghead',
    link: 'https://jason.af/egghead',
    description: `
      I’ve created dozens of video lessons on egghead. These videos have no
      fluff, cutting straight to the code and delivering tons of practical 
      knowledge in just a few minutes each.
    `,
    image: 'egghead',
  },
  {
    id: 'frontendmasters',
    label: 'frontendmasters',
    link: 'https://jason.af/frontendmasters',
    description: `
      I’ve given several workshops with Frontend Masters, a long-form workshop
      format where I go deep on a topic for a full day. These workshops are 
      deep-dives into the why and how of various technologies.
    `,
    image: 'frontendmasters',
  },
];

function Platform({ label, link, description, image }) {
  const [fluid, setFluid] = useState(false);

  useEffect(() => {
    getFluidImageObject({
      public_id: `jason.af/${image}`,
      cloudName: 'jlengstorf',
      originalHeight: 420,
      originalWidth: 420,
    }).then(setFluid);
  }, [image]);

  return (
    <div className={styles.platform}>
      {fluid && (
        <a href={link}>
          <Image fluid={fluid} alt="Camera" />
        </a>
      )}
      <h2 className={styles.heading}>
        <a href={link}>{label}</a>
      </h2>
      <p>{description}</p>
      <a href={link}>check it out &rarr;</a>
    </div>
  );
}

export function Teaching() {
  return (
    <section className={styles.container}>
      {platforms.map(platform => (
        <Platform key={platform.id} {...platform} />
      ))}
    </section>
  );
}
