import { h } from 'preact';
import { Intro } from './intro.js';
import { PostPreviews } from './post-previews.js';
import writing from '../data/writing.js';

export function Writing() {
  // TODO pull this dynamically
  const featuredPosts = writing.filter(post => post.featured);

  return (
    <section class="writing">
      <Intro headline="Jason shares stories about code (and not-code).">
        <p>
          Jason believes in the power of stories. He shares his stories and
          experiences <a href="/posts">on his blog</a> and writes about code at{' '}
          <a href="https://www.learnwithjason.dev/blog">learnwithjason.dev</a>.
          He’s also a regular contributor to other publications. These are a few
          pieces he’s proud of:
        </p>
      </Intro>
      <div>
        <PostPreviews posts={featuredPosts} />
      </div>
      <a href="/posts" class="writing-button">
        see all posts{' '}
      </a>
    </section>
  );
}
