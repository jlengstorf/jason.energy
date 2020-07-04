import React from 'react';
import styles from '../styles/connect.module.css';
import { Intro } from './intro';
import { Platform } from './platform';

const platforms = [
  {
    id: 'party-corgi',
    label: 'Party Corgi Discord',
    link: 'https://discord.gg/partycorgi',
    linkText: 'Join the Discord &rarr;',
    description: `
      This is an active, inclusive, supportive community of creators and learners.
    `,
    image: 'party-corgi-discord',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    link: 'https://twitch.tv/jlengstorf',
    linkText: 'Follow on Twitch &rarr;',
    description: `
      Joining the chat during a livestream is a
      fun, interactive way to connect with Jason.
    `,
    image: 'twitch',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    link: 'https://twitter.com/jlengstorf',
    linkText: 'Follow on Twitter &rarr;',
    description: `
      At any given moment, the likelihood that I am doomscrolling is
      embarrassingly high.
    `,
    image: 'twitter-mark',
  },
];

export function Connect() {
  return (
    <section className={styles.connect}>
      <Intro headline="Connect with Jason.">
        <p>
          If you want to catch up with Jason, he’s most active on these
          platforms.
        </p>
      </Intro>
      <div className={styles.platforms}>
        {platforms.map(platform => (
          <Platform key={platform.id} {...platform} />
        ))}
      </div>
    </section>
  );
}
