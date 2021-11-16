import { h } from 'preact';

export function Footer() {
  return (
    <footer class="footer">
      <span>powered by boops</span>
      <nav class="footer-nav">
        <a href="/posts">posts</a>
        <a href="https://github.com/jlengstorf/jason.af">source code</a>
      </nav>
    </footer>
  );
}
