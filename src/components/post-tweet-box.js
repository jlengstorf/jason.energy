/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/post-tweet-box.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function PostTweetBox({ quote, retweetId = false }) {
  const [location, setLocation] = useState('https://www.jason.af');

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  const url = new URL('https://twitter.com/');

  if (retweetId) {
    url.pathname = '/intent/retweet';
    url.search = new URLSearchParams({ tweet_id: retweetId });
  } else {
    url.pathname = '/compose/tweet';
    url.search = new URLSearchParams({
      text: `“${quote}” —@jlengstorf`,
      url: location,
      related: 'jlengstorf',
    });
  }
  return (
    <div className={styles['tweet-box']}>
      <p>{quote}</p>
      <p className={styles['tweet-link']}>
        <a href={url}>Tweet this</a>
      </p>
    </div>
  );
}
