/** @jsx h */
import {h} from 'preact';

export function PostImage ({
  align = 'center',
  border = true,
  caption,
  children,
  className = false,
  creditType = 'Credit',
  creditLink = null,
  credit,
}) {
  return (
    <figure
      className={
        className ||
        `figure figure--${align} ${border ? '' : 'figure--no-border'}`
      }
    >
      {children}
      {(caption || credit) && (
        <figcaption className="figure__caption">
          {caption && <span dangerouslySetInnerHTML={{ __html: caption }} />}
          {credit && (
            <small className="figure__attribution">
              {creditType}:
              {creditLink ? (
                <a className="figure__attribution-link" href={creditLink}>
                  {credit}
                </a>
              ) : (
                <span className="figure__attribution-link">{credit}</span>
              )}
            </small>
          )}
        </figcaption>
      )}
    </figure>
  );
}
