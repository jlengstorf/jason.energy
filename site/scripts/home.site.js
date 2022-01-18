// exploding nav
const explodingNav = document.querySelector('.exploding-nav');
const explodingNavButton = document.querySelector('.exploding-nav-button');

function toggleNavOpen(event) {
  event.preventDefault();

  if (explodingNav.classList.contains('active')) {
    window.playSoundEffect('power-down');
  } else {
    window.playSoundEffect('power-up');
  }

  explodingNav.classList.remove('first-run');
  explodingNav.classList.toggle('active');
}

explodingNavButton.addEventListener('click', toggleNavOpen);

const settingsButton = document.querySelector('.site-settings-button');
const panel = document.querySelector('.site-settings-panel');
const soundToggle = document.querySelector('[data-setting=sound]');
const soundImage = soundToggle.querySelector('img');
let isSoundEnabled = window.localStorage.getItem('settings:sound');

function toggleSettings() {
  panel.classList.toggle('site-settings-panel-open');
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  window.localStorage.setItem('settings:sound', isSoundEnabled);

  if (isSoundEnabled) {
    window.sound.mute(false);
    soundImage.src = soundImage.dataset.imageOn;
  } else {
    window.sound.mute(true);
    soundImage.src = soundImage.dataset.imageOff;
  }
}

settingsButton.addEventListener('click', (event) => {
  toggleSettings();
});

soundToggle.addEventListener('click', () => {
  toggleSound();
});

// taglines
const taglines = [
  {
    size: '8.46vw',
    'size-lg': '66px',
    text: `
      has a lot of ideas
    `,
  },
  {
    rotation: '11deg',
    scale: '1.2',
    size: '9.4vw',
    'size-lg': '73px',
    text: `
      believes in us <span class="love"></span>
    `,
    top: '0',
  },
  {
    size: '9.57vw',
    'size-lg': '74.5px',
    text: `
      is an okay cook
    `,
  },
  {
    rotation: '-9deg',
    scale: '1.15',
    size: '8.44vw',
    'size-lg': '65.5px',
    text: `
      <span class="love">love</span>s melted cheese
    `,
  },
  {
    rotation: '18deg',
    scale: 1.35,
    size: '5.75vw',
    'size-lg': '44.5px',
    text: `
      thinks you belong here <span class="love"></span>
    `,
    top: '0.025em',
  },
  {
    scale: 1.3,
    rotation: '-3deg',
    size: '5.02vw',
    'size-lg': '39px',
    text: `
      would <span class="love">love</span> a sandwich, thanks
    `,
    top: '-0.1em',
  },
  {
    rotation: '-11deg',
    scale: 1.3,
    size: '8.39vw',
    'size-lg': '65.25px',
    text: `
      <span class="love">love</span>s pajama pants
    `,
  },
];

const element = document.querySelector('.hero-tagline');
let currentIndex = 0;

function cycleTagline() {
  window.addBoop();

  currentIndex = (currentIndex + 1) % taglines.length;
  const tagline = taglines[currentIndex];

  element.style.setProperty('--top', tagline.top || '-7px');
  element.style.setProperty('--rotation', tagline.rotation || '0deg');
  element.style.setProperty('--scale', tagline.scale || 1.1);
  element.style.setProperty('--size', tagline.size || '8.1vw');
  element.style.setProperty('--size-lg', tagline['size-lg'] || '44px');

  element.innerHTML = tagline.text;
}

const taglineButton = document.querySelector('.hero-cycle');
taglineButton.addEventListener('click', (event) => {
  taglineButton.classList.add('active');

  setTimeout(() => {
    taglineButton.classList.remove('active');
  }, 500);

  cycleTagline();
});

// boop drop
const world = document.querySelector('.boop-drop');
const { Engine, Render, Runner, World, Bodies } = Matter;

const heroBlock = document.querySelector('.hero-block');
const { width, height } = heroBlock.getBoundingClientRect();

function createBall() {
  const ball = Bodies.circle(Math.round(Math.random() * width), -30, 25, {
    angle: Math.PI * (Math.random() * 2 - 1),
    friction: 0.001,
    frictionAir: 0.01,
    restitution: 0.8,
    render: {
      sprite: {
        texture: 'https://static-cdn.jtvnw.net/emoticons/v1/301299185/2.0',
      },
    },
  });

  return ball;
}

const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  canvas: world,
  engine: engine,
  options: {
    width,
    height,
    background: 'transparent',
    wireframes: false,
  },
});

const boundaryOptions = {
  isStatic: true,
  render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',
  },
};
const ground = Bodies.rectangle(
  width / 2,
  height,
  width + 20,
  4,
  boundaryOptions,
);
const leftWall = Bodies.rectangle(0, height / 2, 4, height, boundaryOptions);
const rightWall = Bodies.rectangle(
  width,
  height / 2,
  4,
  height,
  boundaryOptions,
);

Render.run(render);
Runner.run(runner, engine);

World.add(engine.world, [ground, leftWall, rightWall]);

const addBoop = (sound = true) => {
  if (sound) {
    window.playSoundEffect('boop');
  }

  const boop = createBall();
  World.add(engine.world, [boop]);
};

window.addBoop = addBoop;

addBoop(false);

// bio
const bios = {
  shortest: `
    <strong>Jason Lengstorf</strong> is trying his very best.
  `,
  shorter: `
    <strong>Jason Lengstorf</strong> works at <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">Netlify</a> and hosts <a href="https://www.learnwithjason.dev/"><em>Learn With Jason</em></a>. He is trying his very best.
  `,
  short: `
    <strong>Jason Lengstorf</strong> works at <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">Netlify</a> and hosts <a href="https://www.learnwithjason.dev/"><em>Learn With Jason</em></a>. He spends a lot of time telling people that the formula for success and happiness is to lift each other up and share what we learn. He is trying his very best to follow his own advice. He lives in Portland, Oregon.
  `,
  long: `
    <strong>Jason Lengstorf</strong> works as the VP of Developer Experience at <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">Netlify</a> and hosts <a href="https://www.learnwithjason.dev/"><em>Learn With Jason</em></a>, a live-streamed video show where he pair programs to learn something new in 90 minutes. He spends a lot of time telling people that the formula for success and happiness is to lift each other up and share what we learn. He is trying his very best to follow his own advice. He lives in Portland, Oregon.
  `,
  longer: `
    <strong>Jason Lengstorf</strong> works as the VP of Developer Experience at <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">Netlify</a>, where he works to improve the experience of building and deploying to the modern web. He also hosts <a href="https://www.learnwithjason.dev/"><em>Learn With Jason</em></a>, a live-streamed video show where he pair programs to learn something new in 90 minutes. He spends a lot of time telling people that the formula for success and happiness is to lift each other up and share what we learn. He is trying his very best to follow his own advice. He lives in Portland, Oregon.
  `,
  longest: `
    <strong>Jason Lengstorf</strong> works as the VP of Developer Experience at <a href="https://www.netlify.com/?utm_source=jasonaf&utm_medium=jason-bio-jl&utm_campaign=devex">Netlify</a>, where he works to improve the experience of building and deploying to the modern web. He also hosts <a href="https://www.learnwithjason.dev/"><em>Learn With Jason</em></a>, a live-streamed video show where he pair programs to learn something new in 90 minutes. He spends a lot of time writing to share what he’s learned in tech as well as stories about how he used to suck, listened to people who taught him valuable lessons, and made changes that helped him suck less. This frequently boils down to telling people that the formula for success and happiness is to lift each other up at every opportunity and share what we learn, even when it feels like something that’s been shared before or that “everybody already knows”. He is trying his very best to follow his own advice. He lives in Portland, Oregon.
  `,
};

const radioEls = document.querySelectorAll('.bio-input');
const bioEl = document.querySelector('.bio');

radioEls.forEach((el) => {
  el.addEventListener('change', (event) => {
    const currentLength = event.target.value;
    const nextBio = bios[currentLength];

    bioEl.innerHTML = nextBio;
  });
});

// gallery
const gallery = document.querySelector('.gallery-image');
const img = gallery.querySelector('img');
const caption = gallery.querySelector('.image-caption');
const creditLink = gallery.querySelector('.gallery-credit a');

function updateImage(event) {
  const thumb = event.target.querySelector('img') || event.target;
  const publicId = thumb.dataset.publicId;
  const alt = thumb.dataset.alt;
  const src = `https://res.cloudinary.com/jlengstorf/image/upload/w_400,h_400,c_fill,g_faces,q_auto,f_auto/${publicId}.jpg`;

  img.src = src;
  img.alt = alt;
  caption.innerText = thumb.dataset.caption;
  creditLink.href = thumb.dataset.creditLink;
  creditLink.innerText = thumb.dataset.credit;
}

const thumbs = document.querySelectorAll('.gallery-thumb');

Array.from(thumbs).forEach((thumb) => {
  thumb.addEventListener('click', updateImage);
  thumb.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    updateImage(event);
  });
});

// sound effects
const sound = new Howl({
  src: [
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1642207423/jason.af/sfx/sprite.webm',
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1642207423/jason.af/sfx/sprite.mp3',
  ],
  sprite: {
    airhorn: [0, 2076],
    beep: [2205, 378],
    boop: [2724, 483],
    click: [3373, 273],
    hooray: [3762, 900],
    oop: [4800, 324],
    pop: [5319, 324],
    'power-down': [5838, 952],
    'power-up': [7005, 953],
    woohoo: [8173, 743],
    yay: [9081, 1265],
  },
});

window.sound = sound;

window.playSoundEffect = (name = 'boop') => {
  sound.play(name);
};

const hoverEls = document.querySelectorAll('[data-sound-hover]');
hoverEls.forEach((el) => {
  const soundEffect = el.dataset.soundHover;

  el.addEventListener('mouseenter', () => window.playSoundEffect(soundEffect));
});

const clickEls = document.querySelectorAll('[data-sound-click]');
clickEls.forEach((el) => {
  const soundEffect = el.dataset.soundClick;

  el.addEventListener('mousedown', (event) => {
    window.playSoundEffect(soundEffect);

    event.preventDefault();
  });

  el.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    window.playSoundEffect(soundEffect);
  });
});

const focusEls = document.querySelectorAll('[data-sound-focus]');
focusEls.forEach((el) => {
  const soundEffect = el.dataset.soundFocus;

  el.addEventListener('focus', () => window.playSoundEffect(soundEffect));
});
