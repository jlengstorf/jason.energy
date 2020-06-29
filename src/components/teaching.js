import React, { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import { getFluidImageObject } from 'gatsby-transformer-cloudinary';
import TweetEmbed from '@jlengstorf/react-tweet-embed';
import styles from '../styles/teaching.module.css';

const platforms = [
  {
    id: 'lwj',
    label: 'Learn With Jason',
    link: 'https://www.learnwithjason.dev',
    description: `
      Jason hosts <em>Learn With Jason</em> twice a week and pair programs with
      brilliant people from community to learn something new in 90 minutes.
      Shows are live and interactive, so 
      <a href="https://www.learnwithjason.dev/schedule">mark your calendar</a> and join the fun!
    `,
    image: 'learnwithjason',
  },
  {
    id: 'egghead',
    label: 'egghead',
    link: 'https://jason.af/egghead',
    description: `
      Jason has created dozens of video lessons on egghead. These videos skip
      the chatter, instead diving straight into the code and delivering tons of
      practical knowledge a few minutes at a time.
    `,
    image: 'egghead',
  },
  {
    id: 'frontendmasters',
    label: 'Frontend Masters',
    link: 'https://jason.af/frontendmasters',
    description: `
      Jason has taught several workshops with Frontend Masters, a long-form
      workshop format focused on deep dives into a topic for a full day. These
      workshops are packed with the “why” & “how” behind the topic.
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
        <a href={link} className={styles.logo}>
          <Image fluid={fluid} alt="Camera" />
        </a>
      )}
      <div className={styles.card}>
        <h2 className={styles.name}>
          <a href={link}>{label}</a>
        </h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <a className={styles.link} href={link}>
          check it out &rarr;
        </a>
      </div>
    </div>
  );
}

export function Teaching() {
  return [
    <div className={styles.intro}>
      <h2 className={styles.heading}>
        Jason makes learning fun and approachable.
      </h2>
      <p className={styles.lede}>
        Jason has been teaching developers of all skill levels how to code for
        over a decade. He specializes in live coding, simplifying complex topics
        into relatable analogies and demos, and shoehorning corgi references
        into every project.
      </p>
    </div>,
    <section className={styles.container}>
      {platforms.map(platform => (
        <Platform key={platform.id} {...platform} />
      ))}
    </section>,
    <div className={styles.tweets}>
      <TweetEmbed url="https://twitter.com/sarah_edo/status/1195038019343896576" />
      <TweetEmbed url="https://twitter.com/techieEliot/status/1252954917632868353" />
    </div>,
  ];
}
