import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';

import '../styles/global.css';

export function Layout({ children }) {
  return [
    <Helmet>
      <html lang="en" />
      <link rel="preconnect" href="https://syndication.twitter.com" />
      <link rel="preconnect" href="https://pbs.twimg.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://platform.twitter.com" />
      <link rel="stylesheet" href="https://use.typekit.net/ufz6qjq.css" />
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
      <meta name="theme-color" content="#ffe742"></meta>
    </Helmet>,
    <Header />,
    <Main>{children}</Main>,
    <Footer>powered by boops</Footer>,
  ];
}
