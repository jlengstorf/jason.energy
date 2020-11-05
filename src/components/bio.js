/* eslint-disable jsx-a11y/label-has-for */
import { h } from 'preact';
import { useSettings } from '../context/settings.js';
import { useSfx } from '../hooks/use-sfx.js';
import { Photos } from './photos.js';
import styles from '../styles/bio.module.js';

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

  return bioLength ? (
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
  ) : null;
}

export function Bio() {
  const { playPop, playClick } = useSfx();

  return (
    <section className={styles.container}>
      <div className={styles.bioWrapper}>
        <LengthChooser />
        <BioText />
        <div className={styles.social}>
          <h2 className={styles.connect}>Connect With Jason:</h2>
          <ul className={styles.profiles}>
            {[
              {
                id: 'twitter',
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 80 80"
                  >
                    <defs />
                    <path
                      fill="#6B6971"
                      d="M25.158 72.502c30.19 0 46.701-25.011 46.701-46.7 0-.711 0-1.418-.048-2.122A33.396 33.396 0 0080 15.184a32.762 32.762 0 01-9.427 2.582 16.47 16.47 0 007.216-9.078 32.895 32.895 0 01-10.423 3.984 16.429 16.429 0 00-27.97 14.97 46.6 46.6 0 01-33.828-17.15 16.426 16.426 0 005.082 21.91A16.292 16.292 0 013.2 30.35v.207a16.419 16.419 0 0013.168 16.09 16.388 16.388 0 01-7.411.282A16.432 16.432 0 0024.29 58.326 32.934 32.934 0 010 65.13a46.467 46.467 0 0025.158 7.36"
                    />
                  </svg>
                ),
                src: '/images/twitter.svg',
                link: 'https://twitter.com/jlengstorf',
                label: 'Twitter',
              },
              {
                id: 'github',
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 81 80"
                  >
                    <defs />
                    <g clip-path="url(#clip0)">
                      <path
                        fill="#6B6971"
                        fill-rule="evenodd"
                        d="M40.5 0C18.4 0 .5 17.9.5 40c0 17.68 11.467 32.658 27.354 37.962 1.99.368 2.726-.86 2.726-1.94 0-.958-.025-3.462-.05-6.802-11.123 2.407-13.48-5.353-13.48-5.353C15.233 59.251 12.606 58 12.606 58c-3.635-2.48.27-2.431.27-2.431 4.002.294 6.138 4.125 6.138 4.125 3.56 6.114 9.356 4.346 11.64 3.315.368-2.578 1.4-4.346 2.529-5.353-8.865-.982-18.196-4.42-18.196-19.742 0-4.371 1.547-7.931 4.126-10.73-.418-1.032-1.793-5.084.368-10.584 0 0 3.364-1.08 11 4.1 3.193-.883 6.606-1.325 10.019-1.35 3.389.025 6.826.467 10.018 1.35 7.637-5.18 11.001-4.1 11.001-4.1 2.185 5.5.81 9.577.393 10.583 2.554 2.8 4.1 6.36 4.1 10.73 0 15.372-9.355 18.736-18.268 19.743 1.424 1.228 2.725 3.683 2.725 7.416 0 5.353-.049 9.65-.049 10.976 0 1.08.712 2.308 2.75 1.915C69.057 72.658 80.5 57.68 80.5 40.024 80.5 17.902 62.6 0 40.5 0z"
                        clip-rule="evenodd"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <path
                          fill="#fff"
                          d="M0 0h80v80H0z"
                          transform="translate(.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                ),
                src: '/images/github.svg',
                link: 'https://github.com/jlengstorf',
                label: 'GitHub',
              },
              {
                id: 'dribbble',
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 80 80"
                  >
                    <defs />
                    <path
                      fill="#6B6971"
                      fill-rule="evenodd"
                      d="M40 0C17.918 0 0 17.918 0 40s17.918 40 40 40c22.039 0 40-17.918 40-40S62.039 0 40 0zm26.42 18.438a34.01 34.01 0 017.723 21.258c-1.128-.217-12.408-2.516-23.774-1.084-.26-.564-.477-1.172-.738-1.779a101.679 101.679 0 00-2.256-4.946c12.582-5.12 18.308-12.494 19.046-13.449zM40 5.9c8.677 0 16.616 3.254 22.646 8.59-.607.868-5.77 7.766-17.917 12.321-5.597-10.282-11.8-18.698-12.755-20 2.56-.607 5.25-.91 8.026-.91zM25.466 9.11c.911 1.215 6.985 9.675 12.669 19.74-15.966 4.252-30.066 4.165-31.584 4.165 2.213-10.585 9.37-19.392 18.915-23.904zM5.813 40.044v-1.04c1.476.042 18.048.26 35.098-4.86.998 1.91 1.909 3.861 2.777 5.814-.434.13-.911.26-1.345.39-17.614 5.683-26.985 21.215-27.766 22.516-5.423-6.03-8.764-14.056-8.764-22.82zM40 74.187a33.928 33.928 0 01-20.954-7.202c.607-1.258 7.548-14.62 26.81-21.345.088-.043.131-.043.218-.087 4.815 12.451 6.768 22.907 7.288 25.9-4.121 1.78-8.633 2.734-13.362 2.734zm19.046-5.857c-.347-2.083-2.17-12.061-6.638-24.339 10.716-1.692 20.087 1.085 21.258 1.475-1.475 9.501-6.941 17.701-14.62 22.864z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ),
                src: '/images/dribbble.svg',
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
                  {profile.svg}
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
