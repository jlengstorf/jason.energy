import { h } from 'preact';
import { useSfx } from '../hooks/use-sfx.js';
import { useSettings } from '../context/settings.js';
import { Button } from './button.js';

export function Settings() {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useSettings();
  const { playClick, playPop, playBoop } = useSfx();

  function toggleSettings() {
    const panel = document.querySelector('.site-settings-panel');
    panel.classList.toggle('site-settings-panel-open');
  }

  return (
    <div class="site-settings">
      <Button
        class="site-settings-button site-settings-toggle"
        hoverSound={playPop}
        clickSound={playClick}
        handleClick={toggleSettings}
      >
        <img
          class="site-settings-gear"
          src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593477792/jason.af/gear.png"
          alt=""
        />
        <span class="visually-hidden">Show Settings</span>
      </Button>
      <div class="site-settings-panel">
        <Button
          class="site-settings-button"
          hoverSound={playPop}
          clickSound={playClick}
          handleClick={toggleDarkMode}
        >
          <img
            class="site-settings-sound"
            src={
              darkMode
                ? 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593999628/jason.af/dark-mode.png'
                : 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533576/jason.af/light-mode.png'
            }
            alt=""
          />
          <span class="visually-hidden">
            Switch to {darkMode ? 'light' : 'dark'} mode
          </span>
        </Button>
        <Button
          class="site-settings-button"
          hoverSound={playPop}
          clickSound={playBoop}
          handleClick={toggleSound}
          forceSoundEnabled={true}
        >
          <img
            class="site-settings-sound"
            src={
              soundEnabled
                ? 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533573/jason.af/sound-on.png'
                : 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_70/v1593533576/jason.af/sound-off.png'
            }
            alt=""
          />
          <span class="visually-hidden">Turn Sound Off</span>
        </Button>
      </div>
    </div>
  );
}
