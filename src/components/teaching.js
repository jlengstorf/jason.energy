import React from 'react';
import { Intro } from './intro.js';
import { Platform } from './platform.js';

import styles from '../styles/teaching.module.js';

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

export function Teaching() {
  return [
    <Intro headline="Jason makes learning fun & approachable.">
      <p>
        Jason has been teaching developers of all skill levels how to code for
        over a decade. He specializes in live coding, simplifying complex topics
        into relatable analogies and demos, and shoehorning corgi references
        into every project.
      </p>
    </Intro>,
    <section className={styles.container}>
      {platforms.map(platform => (
        <Platform key={platform.id} {...platform} />
      ))}
    </section>,
  ];
}
