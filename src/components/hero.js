import React, { useState } from 'react';
import { useSfx } from '../hooks/use-sfx';
import styles from '../styles/hero.module.css';

const taglines = [
  {
    rotation: '11deg',
    scale: '0.99',
    size: '9.3vw',
    'size-lg': '72px',
    text: `
      believes in us <span class="love">love</span>
    `,
  },
  {
    rotation: '-9deg',
    size: '8.3vw',
    'size-lg': '64.5px',
    text: `
      <span class="love">love</span>s melted cheese
    `,
  },
  {
    rotation: '-3deg',
    size: '4.7vw',
    'size-lg': '38.5px',
    text: `
      would <span class="love">love</span> a sandwich, thanks
    `,
  },
  {
    rotation: '-11deg',
    size: '8.3vw',
    'size-lg': '64.5px',
    text: `
      <span class="love">love</span>s pajama pants
    `,
  },
];

const CycleTagline = ({ clickHandler }) => {
  const [active, setActive] = useState(false);

  const images = {
    off:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1593806081/jason.af/rotate-off.png',
    on:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1593806090/jason.af/rotate-on.png',
  };

  const handleClick = event => {
    event.preventDefault();

    setActive(true);
    setTimeout(() => setActive(false), 500);

    clickHandler();
  };

  return (
    <a
      href="#cycle-tagline"
      onClick={handleClick}
      className={`${styles.cycle} ${active ? styles.active : ''}`}
    >
      <img
        src={images[active ? 'on' : 'off']}
        alt="drawing of two arrows pointing in a circle"
      />
      <span className="visually-hidden">change tagline</span>
    </a>
  );
};

export function Hero() {
  const { playBoop } = useSfx();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const tagline = taglines[taglineIndex]; //[Math.floor(Math.random() * taglines.length)];

  function cycleTagline() {
    playBoop();

    const index = taglineIndex + 1;
    setTaglineIndex(index < taglines.length ? index : 0);
  }

  return [
    <h1 className={styles.hero}>
      <span className={styles.firstLine}>Jason</span>
      <span className={styles.box}>Lengstorf</span>
      <span
        className={styles.tagline}
        style={{
          '--rotation': tagline['rotation'],
          '--scale': tagline.scale,
          '--size': tagline.size,
          '--size-lg': tagline['size-lg'],
        }}
        dangerouslySetInnerHTML={{ __html: tagline.text }}
      />
    </h1>,
    <CycleTagline clickHandler={cycleTagline} />,
  ];
}
