/** @jsx h */
import { h } from 'preact';

export function PostAside({ children, spicy = false, ...props }) {
  const icons = {
    spicy: {
      src:
        'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1609402670/jason.af/fire.png',
      alt: 'fire',
    },
    default: {
      src:
        'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1593991250/jason.af/light-mode.png',
      alt: 'light bulb',
    },
  };

  const icon = spicy ? icons.spicy : icons.default;

  return (
    <aside class={props.class ?? 'post-aside'}>
      <div class="post-aside-icon">
        <img src={icon.src} alt={icon.alt} />
      </div>
      <div class="post-aside-content">{children}</div>
    </aside>
  );
}
