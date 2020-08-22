import React from 'react';
import { Helmet } from 'react-helmet';
import { useSfx } from '../hooks/use-sfx.js';
import { useSettings } from '../context/settings.js';
import { Button } from './button.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/settings.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Settings() {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useSettings();
  const { playClick, playPop, playBoop } = useSfx();

  function toggleSettings() {
    const panel = document.querySelector(`.${styles.panel}`);
    panel.classList.toggle(styles.open);
  }

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles/settings.module.css" />
      </Helmet>
      <div className={styles.settings}>
        <Button
          className={`${styles.button} ${styles.toggle}`}
          hoverSound={playPop}
          clickSound={playClick}
          handleClick={toggleSettings}
        >
          <img
            className={styles.gear}
            src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593477792/jason.af/gear.png"
            alt=""
          />
          <span className="visually-hidden">Show Settings</span>
        </Button>
        <div className={styles.panel}>
          <Button
            className={styles.button}
            hoverSound={playPop}
            clickSound={playClick}
            handleClick={toggleDarkMode}
          >
            <img
              className={styles.sound}
              src={
                darkMode
                  ? 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593999628/jason.af/dark-mode.png'
                  : 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533576/jason.af/light-mode.png'
              }
              alt=""
            />
            <span className="visually-hidden">
              Switch to {darkMode ? 'light' : 'dark'} mode
            </span>
          </Button>
          <Button
            className={styles.button}
            hoverSound={playPop}
            clickSound={playBoop}
            handleClick={toggleSound}
            forceSoundEnabled={true}
          >
            <img
              className={styles.sound}
              src={
                soundEnabled
                  ? 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533573/jason.af/sound-on.png'
                  : 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533576/jason.af/sound-off.png'
              }
              alt=""
            />
            <span className="visually-hidden">Turn Sound Off</span>
          </Button>
        </div>
      </div>
    </>
  );
}
