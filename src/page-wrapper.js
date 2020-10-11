/** @jsx h */
import { Fragment, h } from 'preact';
import { MDXProvider } from '@mdx-js/preact';
import { SettingsProvider } from './context/settings.js';
import { PostWrapper } from './components/post-wrapper.js';
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
      <MDXProvider
        components={{
          PostImage,
          PostTweetBox,
        }}
      >
        <Component {...meta}>{children}</Component>
      </MDXProvider>
    </SettingsProvider>
  );
};
