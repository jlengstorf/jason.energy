import React from 'react';
import styles from '../styles/settings.module.css';
import { useSfx } from '../hooks/use-sfx';
import { useSettings } from '../context/settings';

export function Settings() {
  const { sound, toggleSound } = useSettings();
  const { playClick, playPop, playBoop } = useSfx();
  function toggleSettings() {
    const panel = document.querySelector(`.${styles.panel}`);

    playClick();
    panel.classList.toggle(styles.open);
  }

  function handleToggleSound() {
    toggleSound();
    playBoop();
  }

  return (
    <div className={styles.settings}>
      <button
        className={styles.button}
        onKeyPress={event => {
          if (event.key !== 'Enter') return;
          playClick();
          toggleSettings();
        }}
        onMouseDown={event => {
          playClick();
          event.preventDefault();
          event.stopPropagation();
          toggleSettings();
        }}
        onMouseEnter={playPop}
        onFocus={playPop}
      >
        <img
          className={styles.gear}
          src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593477792/jason.af/gear.png"
          alt=""
        />
        <span className="visually-hidden">Show Settings</span>
      </button>
      <div className={styles.panel}>
        <button
          className={styles.button}
          onKeyPress={event => {
            if (event.key !== 'Enter') return;
            handleToggleSound();
          }}
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            handleToggleSound();
          }}
          onMouseEnter={playPop}
          onFocus={playPop}
        >
          <img
            className={styles.sound}
            src={
              sound
                ? 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533573/jason.af/sound-on.png'
                : 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533576/jason.af/sound-off.png'
            }
            alt=""
          />
          <span className="visually-hidden">Turn Sound Off</span>
        </button>
      </div>
    </div>
  );
}
