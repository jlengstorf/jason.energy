import { h } from 'preact';
import { Header } from './header.js';
import { Main } from './main.js';
import { Footer } from './footer.js';
import { useSettings } from '../context/settings.js';

export function Layout({ children }) {
  const { darkMode } = useSettings();

  return (
    <div class={`outer ${darkMode ? 'dark' : 'light'}`}>
      <Header />
      <Main>{children}</Main>
      <Footer>powered by boops</Footer>
    </div>
  );
}
