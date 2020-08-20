/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Buffer } from 'buffer';
import { SettingsProvider } from './context/settings.js';

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

export default ({ children }) => {
  useEffect(() => {
    window.Buffer = Buffer;
  }, []);
  return <SettingsProvider>{children}</SettingsProvider>;
};
