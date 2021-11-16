/** @jsx h */
import { h } from 'preact';

export function PostImage({
  align = 'center',
  border = true,
  caption,
  children,
  creditType = 'Credit',
  creditLink = null,
  credit,
  ...props
}) {
  return (
    <figure
      class={
        props.class ||
        `post-figure post-figure-align-${align} ${
          border ? '' : 'post-figure-no-border'
        }`
      }
    >
      {children}
      {(caption || credit) && (
        <figcaption class="post-figure-caption">
          {caption && <span dangerouslySetInnerHTML={{ __html: caption }} />}
          {credit && (
            <small class="post-figure-attribution">
              {creditType}:
              {creditLink ? (
                <a class="post-figure-attribution-link" href={creditLink}>
                  {credit}
                </a>
              ) : (
                <span class="post-figure-attribution-link">{credit}</span>
              )}
            </small>
          )}
        </figcaption>
      )}
    </figure>
  );
}
