import React from 'react';
import { Intro } from './intro.js';
import { PostPreviews } from './post-previews.js';
import writing from '../data/writing.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/writing.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

export function Writing() {
  // TODO pull this dynamically
  const featuredPosts = writing.filter(post => post.featured);

  return (
    <section className={styles.writing}>
      <Intro headline="Jason shares stories about code (and not-code).">
        <p>
          Jason believes in the power of stories. He writes about code at{' '}
          <a href="https://www.learnwithjason.dev/blog">learnwithjason.dev</a>{' '}
          shares his stories and experiences at{' '}
          <a href="https://www.lengstorf.com/blog/">lengstorf.com</a>, and
          contributes to various sites around the web. These are a few pieces
          he’s proud of:
        </p>
      </Intro>
      <div className={styles.posts}>
        <PostPreviews posts={featuredPosts} />
      </div>
    </section>
  );
}
