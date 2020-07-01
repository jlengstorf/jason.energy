import useSound from 'use-sound';
import { useSettings } from '../context/settings';

export function useSfx() {
  const { sound } = useSettings();
  const ifEnabled = fn => (sound ? fn() : null);

  const [playBoop] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/oop.mp3',
    {
      volume: 0.5,
    },
  );

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

  const [playPowerUp] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/power-up.mp3',
    {
      volume: 0.5,
    },
  );

  const [playPowerDown] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395253/jason.af/sfx/power-down.mp3',
    {
      volume: 0.5,
    },
  );

  return {
    playBoop: () => ifEnabled(playBoop),
    playClick: () => ifEnabled(playClick),
    playPop: () => ifEnabled(playPop),
    playPowerUp: () => ifEnabled(playPowerUp),
    playPowerDown: () => ifEnabled(playPowerDown),
  };
}
