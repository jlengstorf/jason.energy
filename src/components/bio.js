/** @jsx h */
/* eslint-disable jsx-a11y/label-has-for */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from '../styles/bio.module.css';

function LengthChooser({ length, setLength }) {
  const handleChange = ({ target }) => setLength(target.value);

  return (
    <form className={styles.control}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          Choose how much bio you can manage:
        </legend>
        <div className={styles.options}>
          {['shortest', 'shorter', 'short', 'long', 'longer', 'longest'].map(
            l => {
              return (
                <div className={styles.option}>
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

  return [
    <LengthChooser length={length} setLength={setLength} />,
    <BioText length={length} />,
  ];
}
