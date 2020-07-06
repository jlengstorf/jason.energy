/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { useSettings } from '../context/settings';
import { useSfx } from '../hooks/use-sfx';
import { Photos } from './photos';
import styles from '../styles/bio.module.css';
import Twitter from '../assets/twitter.svg';
import Dribbble from '../assets/dribbble.svg';
import GitHub from '../assets/github.svg';

function LengthChooser() {
  const { bioLength, updateBioLength } = useSettings();
  const { playPop, playClick } = useSfx();

  const handleChange = ({ target }) => {
    playClick();
    updateBioLength(target.value);
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
                    checked={bioLength === l}
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

function BioText() {
  const { bioLength } = useSettings();
  const getVisibility = group => {
    const mappings = {
      shortest: [],
      shorter: ['shorter'],
      short: ['shorter', 'short'],
      long: ['shorter', 'short', 'long'],
      longer: ['shorter', 'short', 'long', 'longer'],
      longest: ['shorter', 'short', 'long', 'longer', 'longest'],
    };

    const visibility = mappings[bioLength];

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
  const { playPop, playClick } = useSfx();

  return (
    <section className={styles.container}>
      <div className={styles.bioWrapper}>
        <LengthChooser />
        <BioText />
        <div className={styles.social}>
          <h3 className={styles.connect}>Connect With Jason:</h3>
          <ul className={styles.profiles}>
            {[
              {
                id: 'twitter',
                icon: Twitter,
                link: 'https://twitter.com/jlengstorf',
                label: 'Twitter',
              },
              {
                id: 'github',
                icon: GitHub,
                link: 'https://github.com/jlengstorf',
                label: 'GitHub',
              },
              {
                id: 'dribbble',
                icon: Dribbble,
                link: 'https://dribbble.com/jlengstorf',
                label: 'Dribbble',
              },
            ].map(profile => (
              <li className={styles.profile}>
                <a
                  href={profile.link}
                  className={styles.link}
                  onMouseDown={event => {
                    playClick();
                    event.stopPropagation();
                  }}
                  onKeyDown={event => {
                    if (event.key !== 'Enter') return;
                    playClick();
                    event.stopPropagation();
                  }}
                  onFocus={playPop}
                  onMouseEnter={playPop}
                >
                  <profile.icon className={styles.icon} />
                  <span className="visually-hidden">{profile.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Photos className={styles.imageContainer} />
    </section>
  );
}
