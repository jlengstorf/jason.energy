import React from 'react';
import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';

import '../styles/global.css';

export function Layout({ children }) {
  return [
    <Header />,
    <Main>{children}</Main>,
    <Footer>powered by boops</Footer>,
  ];
}
