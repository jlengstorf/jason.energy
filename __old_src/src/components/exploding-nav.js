import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useSfx } from '../hooks/use-sfx.js';

const navItems = [
  {
    id: 'bio',
    label: 'About Jason',
    icon: 'camera',
  },
  {
    id: 'teaching',
    label: 'Teaching',
    icon: 'terminal',
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: 'writing',
  },
  // {
  //   id: 'art',
  //   label: 'Art',
  //   icon: 'astronaut',
  // },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: 'newsletter',
  },
  {
    id: 'connect',
    label: 'Connect',
    icon: 'rubber-corgi',
  },
  // {
  //   id: 'gear',
  //   label: 'What I Use',
  //   icon: 'tv',
  // },
];

export function ExplodingNav() {
  const [firstRun, setFirstRun] = useState(true);
  const [state, setState] = useState('closed');
  const { playPowerUp, playPowerDown, playPop, playClick } = useSfx();

  const toggleOpen = () => {
    const toggle = document.querySelector('.nav-toggle');
    if (state === 'closed') {
      playPowerUp();
      setState('open');
      toggle.classList.add('nav-is-active');

      if (firstRun) {
        toggle.classList.remove('nav-first-run');
        setFirstRun(false);
      }
    } else {
      playPowerDown();
      setState('closed');
      toggle.classList.remove('nav-is-active');
    }
  };

  const handleClick = id => event => {
    event.preventDefault();
    event.stopPropagation();
    playClick();
    toggleOpen();

    const target = document.getElementById(id);
    const top = target.offsetTop - 60;
    const supportsNativeSmoothScroll =
      'scrollBehavior' in document.documentElement.style;

    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    } else {
      const element = document.scrollingElement || document.documentElement;
      element.scrollTop = top;
    }

    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    delete target.tabIndex;
  };

  return (
    <div
      class="nav-toggle nav-first-run"
      style={{ '--navCount': navItems.length }}
    >
      <button class="nav-button" onClick={toggleOpen}>
        <img
          class="nav-face"
          src="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/jason.af/jason-brains.png"
          alt=""
        />
        <span class="visually-hidden">Show Navigation</span>
      </button>
      <nav class="main-nav">
        {navItems.map((item, index) => (
          <a
            class="nav-item"
            key={`nav-${item.id}`}
            href={`/#${item.id}`}
            style={{
              '--offset': index,
            }}
            onFocus={playPop}
            onClick={event => event.preventDefault()}
            onMouseEnter={playPop}
            onMouseDown={handleClick(item.id)}
            onKeyDown={event =>
              event.key === 'Enter' && handleClick(item.id)(event)
            }
          >
            {item.label}
            <img
              src={`https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/jason.af/${item.icon}.png`}
              alt=""
            />
          </a>
        ))}
      </nav>
    </div>
  );
}
