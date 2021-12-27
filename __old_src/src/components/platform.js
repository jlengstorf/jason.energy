import { h } from 'preact';
import { Image } from './image.js';

export function Platform({
  label,
  link,
  description,
  image,
  linkText = 'Check it out &rarr;',
}) {
  return (
    <div class="platform">
      <a href={link} class="platform-logo">
        <Image
          publicId={`jason.af/${image}`}
          alt={label}
          width={400}
          height={400}
          transformations={['c_fill']}
        />
      </a>
      <div class="platform-card">
        <h2 class="platform-name">
          <a href={link}>{label}</a>
        </h2>
        <p
          class="platform-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* ESLint doesn’t recognize this text, so we ignore the error */}
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <a
          class="platform-link"
          href={link}
          dangerouslySetInnerHTML={{ __html: linkText }}
        />
      </div>
    </div>
  );
}
