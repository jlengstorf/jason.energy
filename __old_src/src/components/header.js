import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ExplodingNav } from './exploding-nav.js';
import { Settings } from './settings.js';

export function Header() {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
  }, []);

  return (
    <header class="site-header">
      <a href="/" rel="home" class="home">
        Jason Lengstorf
      </a>
      {isHome ? (
        <ExplodingNav />
      ) : (
        <nav class="site-nav">
          <a href="/posts">Writing</a>
        </nav>
      )}
      <Settings />
    </header>
  );
}
