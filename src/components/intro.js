import { h } from 'preact';

const Heading = ({ children, post, ...props }) =>
  post ? <h1 {...props}>{children}</h1> : <h2 {...props}>{children}</h2>;

export function Intro({ headline, children, post = false }) {
  return [
    <div class="intro">
      <Heading class="intro-headline" post={post}>
        {headline}
      </Heading>
      <div class="intro-lede">{children}</div>
    </div>,
  ];
}
