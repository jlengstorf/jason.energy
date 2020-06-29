/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import styles from '../styles/bio.module.css';
import useSound from 'use-sound';

const headlines = [
  'Jason Lengstorf believes anything can be a sandwich if you try hard enough.',
  'Jason Lengstorf is (probably) wearing pajama pants right now.',
  'Jason Lengstorf knows there’s nothing better in life than melted cheese.',
];

function LengthChooser({ length, setLength }) {
  const [playPop] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/pop.mp3',
    {
      volume: 0.5,
    },
  );
  const [playClick] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/click.mp3',
    {
      volume: 0.5,
    },
  );
  const handleChange = ({ target }) => {
    playClick();
    setLength(target.value);
  };

  return (
    <form className={styles.control}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Adjust bio length:</legend>
        <div className={styles.options}>
          {['shortest', 'shorter', 'short', 'long', 'longer', 'longest'].map(
            l => {
              /* eslint-disable jsx-a11y/no-static-element-interactions */
              return (
                <div className={styles.option} onMouseEnter={playPop}>
                  <input
                    className={styles.input}
                    type="radio"
                    id={`length-${l}`}
                    name="length"
                    value={l}
                    checked={length === l}
                    onChange={handleChange}
                  />
                  <label
                    key={`length-${l}`}
                    htmlFor={`length-${l}`}
                    className={styles.label}
                  >
                    <span className={styles.text}>{l}</span>
                  </label>
                </div>
              );
            },
          )}
        </div>
      </fieldset>
    </form>
  );
}

function BioText({ length }) {
  const getVisibility = group => {
    const mappings = {
      shortest: [],
      shorter: ['shorter'],
      short: ['shorter', 'short'],
      long: ['shorter', 'short', 'long'],
      longer: ['shorter', 'short', 'long', 'longer'],
      longest: ['shorter', 'short', 'long', 'longer', 'longest'],
    };

    const visibility = mappings[length];

    return visibility.includes(group) ? 'inline' : 'none';
  };

  return (
    <p className={styles.bio}>
      <strong>Jason Lengstorf</strong>{' '}
      <span style={{ display: getVisibility('shorter') }}>
        works{' '}
        <span style={{ display: getVisibility('long') }}>
          as a principal developer experience engineer
        </span>{' '}
        at{' '}
        <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">
          Netlify
        </a>
        <span style={{ display: getVisibility('longer') }}>
          , where he works to improve the experience of building
        </span>{' '}
        and{' '}
        <span style={{ display: getVisibility('longer') }}>
          deploying to the modern web. He also{' '}
        </span>
        hosts{' '}
        <a href="https://www.learnwithjason.dev/">
          <em>Learn With Jason</em>
        </a>
        <span style={{ display: getVisibility('long') }}>
          , a live-streamed video show where he pair programs to learn something
          new in 90 minutes
        </span>
        . He{' '}
        <span style={{ display: getVisibility('short') }}>
          spends a lot of time
          <span style={{ display: getVisibility('longest') }}>
            {' '}
            writing to share what he’s learned in tech as well as stories about
            how he used to suck, listened to people who taught him valuable
            lessons, and made changes that helped him suck less. This frequently
            boils down to
          </span>{' '}
          telling people that the formula for success and happiness is to lift
          each other up
          <span style={{ display: getVisibility('longest') }}>
            {' '}
            at every opportunity
          </span>{' '}
          and share what we learn
          <span style={{ display: getVisibility('longest') }}>
            , even when it feels like something that’s been shared before or
            that “everybody already knows”
          </span>
          . He
        </span>
      </span>{' '}
      is trying his very best
      <span style={{ display: getVisibility('shorter') }}>
        {' '}
        to follow his own advice
      </span>
      .{' '}
      <span style={{ display: getVisibility('short') }}>
        He lives in Portland, Oregon.
      </span>
    </p>
  );
}

export function Bio() {
  const [length, setLength] = useState('short');
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [playBoop] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/oop.mp3',
    {
      volume: 0.5,
    },
  );

  function cycleHeadline(event) {
    playBoop();

    event && event.preventDefault();
    const index = headlineIndex + 1;
    setHeadlineIndex(index < headlines.length ? index : 0);
  }

  useEffect(() => {
    const index = Math.floor(Math.random() * headlines.length);

    setHeadlineIndex(index);
  }, []);

  return [
    <h1 className={styles.heading}>{headlines[headlineIndex]}</h1>,
    <a href="#cycle-headline" onClick={cycleHeadline} className={styles.cycle}>
      <span role="img" aria-label="cycle">
        🔄
      </span>{' '}
      load another Jason fact
    </a>,
    <section className={styles.container}>
      <figure className={styles.image}>
        <img
          src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_800,h_800,c_fill/v1593397602/jason.af/jason-lengstorf-hat.jpg"
          alt="Jason Lengstorf"
        />
        <figcaption>
          This shot captures Jason’s most common expression: Resting Murder
          Face™
          <span className={styles.credit}>
            Photo: <a href="https://www.marisamorby.com">Marisa Morby</a>
          </span>
        </figcaption>
      </figure>
      <div className={styles.bioWrapper}>
        <LengthChooser length={length} setLength={setLength} />
        <BioText length={length} />
      </div>
    </section>,
  ];
}
