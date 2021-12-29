import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useSfx } from '../hooks/use-sfx.js';
import { Button } from './button.js';
import { Intro } from './intro.js';
import { Image } from './image.js';

export function Form({ title = 'Get booped on the brain.', children }) {
  const [sending, setSending] = useState(false);
  const { playPop, playHooray } = useSfx();

  const handleSubmit = event => {
    event.preventDefault();
    setSending(true);
    playHooray();

    const data = new FormData(event.target);

    // TODO handle form submissions
    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        firstName: data.get('firstName'),
        email: data.get('email'),
      }),
    }).then(res => {
      if (res.status === 200 && res.redirected === true) {
        window.location.href = res.url;
      }
    });
  };

  return (
    <section class="newsletter-opt-in">
      <Intro headline={title}>
        {children || (
          <p>
            Jason believes in lifelong learning and continuous improvement. In
            his newsletter, he shares his experience — both technical and
            otherwise — in hopes of connecting with more lifelong learners and
            building a community of practice.
          </p>
        )}
      </Intro>
      <div class="form-wrapper">
        <div class="form-image-wrapper">
          <Image
            publicId="jason.af/opt-in"
            alt="Illustration of a letter with a heart on the top flap."
            width={280}
            height={296}
          />
        </div>
        <form
          action="/.netlify/functions/subscribe"
          method="POST"
          class="opt-in-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstName" class="opt-in-label">
            First Name
            <input
              class="opt-in-input"
              type="text"
              name="firstName"
              id="firstName"
              required
              disabled={sending}
            />
          </label>
          <label htmlFor="email" class="opt-in-label">
            Email
            <input
              class="opt-in-input"
              type="email"
              name="email"
              id="email"
              required
              disabled={sending}
            />
          </label>
          <Button
            class="opt-in-button"
            hoverSound={playPop}
            handleClick={() => {}}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Join'}
          </Button>
        </form>
      </div>
    </section>
  );
}
