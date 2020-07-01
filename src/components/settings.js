import React from 'react';
import styles from '../styles/settings.module.css';
import { useSfx } from '../hooks/use-sfx';
import { useSettings } from '../context/settings';
import { Button } from './button';

export function Settings() {
  const { soundEnabled, toggleSound } = useSettings();
  const { playClick, playPop, playBoop } = useSfx();

  function toggleSettings() {
    const panel = document.querySelector(`.${styles.panel}`);
    panel.classList.toggle(styles.open);
  }

  return (
    <div className={styles.settings}>
      <Button
        className={styles.button}
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
  );
}
