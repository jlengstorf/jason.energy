/** @jsx h */
import { Fragment, h } from 'preact';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/preact';
import { SettingsProvider } from './context/settings.js';
import { PostWrapper } from './components/post-wrapper.js';
import { PostAside } from './components/post-aside.js';
import { PostImage } from './components/post-image.js';
import { PostTweetBox } from './components/post-tweet-box.js';

console.log(
  '%c HERE ARE SOME BOOPS FOR YOU',
  `
    font-size: 6vw;
    color: transparent;
    background-image: url(https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_100/v1585764654/lwj/store/boop.png);
    background-blend-mode: multiply;
    background-size: contain;
    background-position: 0 -10px;
    line-height: 1;
  `,
);

console.log(
  '%c HELLO FRIENDS THANK YOU FOR COMING TO THE CONSOLE',
  `
    background-color: #6d114c;
    color: white;
    font-size: 2.8vw;
    line-height: 1;
    padding: 4rem 5vw;
  `,
);

export default ({ children, type = 'page', ...meta }) => {
  const Component = type === 'post' ? PostWrapper : Fragment;

  return (
    <SettingsProvider>
      <Helmet>
        <html lang="en" />

        <link rel="preconnect" href="https://res.cloudinary.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>A Very Jason Lengstorf Website — Powered By Boops!</title>
        <link rel="stylesheet" inline href="/styles/global.css" />

        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff87d4" />
        <meta name="msapplication-TileColor" content="#ffe742" />
        <meta name="theme-color" content="#ffe742" />
      </Helmet>
      <MDXProvider
        components={{
          PostAside,
          PostImage,
          PostTweetBox,
        }}
      >
        <Component {...meta}>{children}</Component>
      </MDXProvider>
    </SettingsProvider>
  );
};
