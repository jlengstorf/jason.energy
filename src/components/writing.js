import React, { useEffect, useState } from 'react';
import styles from '../styles/writing.module.css';
import { Intro } from './intro';

import writing from '../../data/writing';

const sites = {
  lengstorf: {
    name: 'lengstorf.com',
    icon: 'https://lengstorf.com/favicon-32x32.png',
  },
  learnwithjason: {
    name: 'Learn With Jason',
    icon:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_32/v1593386676/jason.af/learnwithjason.png',
  },
  netlify: {
    name: 'Netlify',
    icon: 'https://www.netlify.com/v3/static/favicon/favicon-32x32.png',
  },
  smashingmag: {
    name: 'Smashing Magazine',
    icon: 'https://www.smashingmagazine.com/images/favicon/favicon.png',
  },
  alistapart: {
    name: 'A List Apart',
    icon:
      'https://alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=32%2C32',
  },
  csstricks: {
    name: 'CSS-Tricks',
    icon: 'https://css-tricks.com/apple-touch-icon.png',
  },
};

export function Writing() {
  const [columns, setColumns] = useState(1);

  // TODO pull this dynamically
  const featuredPosts = writing.filter(post => post.featured);

  useEffect(() => {
    // this is pretty hacky and extremely fragile
    // we’re basically doing CSS calculations that will break if the CSS changes
    setColumns(Math.min(4, Math.floor((window.innerWidth * 0.9 + 48) / 298)));
  }, []);

  return (
    <section className={styles.writing}>
      <Intro headline="Jason shares stories about code and not-code.">
        <p>
          Jason believes in the power of stories to help us share lessons
          learned in a way that feels less like telling others how to live their
          lives and more like people laughing and learning together through
          shared experience.
        </p>
      </Intro>
      <p className={styles.overview}>
        Jason has two blogs: a{' '}
        <a href="https://www.learnwithjason.dev/blog">code blog</a> for
        tutorials and a{' '}
        <a href="https://www.lengstorf.com/blog/">personal blog</a> for
        anecdotes and stories. He also writes guest posts on various sites
        around the web. These are a few of his favorites:
      </p>
      <div className={styles.posts}>
        {featuredPosts.map((post, index) => (
          <div className={styles.post} key={`featured-post-${index}`}>
            <p className={styles.site}>
              <img
                src={`https://res.cloudinary.com/jlengstorf/image/fetch/w_32,h_32,c_fill,g_face,q_auto,f_auto/${
                  sites[post.site].icon
                }`}
                alt={sites[post.site].name}
                loading="lazy"
                height={16}
                width={16}
              />
              {sites[post.site].name}
            </p>
            {index < columns && (
              <a href={post.url} className={styles.imageLink}>
                <img
                  src={
                    post.image.match(/^https:\/\/res.cloudinary/)
                      ? post.image
                      : `https://res.cloudinary.com/jlengstorf/image/fetch/w_500,h_255,c_fill,g_face,q_auto,f_auto/${post.image}`
                  }
                  alt={post.title}
                  className={styles.image}
                  loading="lazy"
                  width={250}
                  height={125}
                />
              </a>
            )}
            <h3 className={styles.title}>
              <a href={post.url}>{post.title}</a>
            </h3>
            <p className={styles.description}>{post.description}</p>
            <a href={post.url} className={styles.link}>
              Read this post &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
