import useSound from 'use-sound';
import { useSettings } from '../context/settings';

export function useSfx() {
  const { soundEnabled } = useSettings();

  const [playBoop] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/oop.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  const [playPop] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/pop.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  const [playClick] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/click.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  const [playPowerUp] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/power-up.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  const [playPowerDown] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395253/jason.af/sfx/power-down.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  const [playHooray] = useSound(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/hooray.mp3',
    {
      soundEnabled,
      volume: 0.5,
    },
  );

  return {
    playBoop,
    playClick,
    playHooray,
    playPop,
    playPowerUp,
    playPowerDown,
  };
}
