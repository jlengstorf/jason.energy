/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/post-preview.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

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

export function PostPreviews({ posts }) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    // this is pretty hacky and extremely fragile
    // we’re basically doing CSS calculations that will break if the CSS changes
    setColumns(Math.min(4, Math.floor((window.innerWidth * 0.9 + 48) / 298)));
  }, []);

  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <div className={styles.post} key={`featured-post-${index}`}>
          {post.site && (
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
          )}
          {index < columns && (
            <img
              src={
                post.image.match(/^https:\/\/res.cloudinary/)
                  ? post.thumb || post.image
                  : `https://res.cloudinary.com/jlengstorf/image/fetch/w_500,h_250,c_fill,g_face,q_auto,f_auto/${post.image}`
              }
              alt=""
              className={styles.image}
              loading="lazy"
              width={250}
              height={125}
            />
          )}
          <h3 className={styles.title}>
            <a href={post.url || `/${post.slug}`} className={styles.titleLink}>
              {post.title}
            </a>
          </h3>
          <p className={styles.description}>{post.description}</p>
          <span aria-hidden="true" className={styles.link}>
            Read this post &rarr;
          </span>
        </div>
      ))}
    </div>
  );
}
