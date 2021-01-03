/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

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
    <div class="post-tweet-box">
      <p>{quote}</p>
      <p class="post-tweet-link">
        <a href={url}>Tweet this</a>
      </p>
    </div>
  );
}
