/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const sites = {
  jasonaf: {
    name: 'jason.af',
    icon: 'https://www.jason.af/favicon-32x32.png',
  },
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
    <div class="post-previews">
      {posts.map((post, index) => (
        <div class="post-preview" key={`featured-post-${index}`}>
          {post.site && (
            <p class="post-preview-site">
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
              class="post-preview-image"
              loading="lazy"
              width={250}
              height={125}
            />
          )}
          <h3 class="post-preview-title">
            <a
              href={post.url || `/${post.slug}`}
              class="post-preview-title-link"
            >
              {post.title}
            </a>
          </h3>
          <p class="post-preview-description">{post.description}</p>
          <span aria-hidden="true" class="post-preview-link">
            Read this post &rarr;
          </span>
        </div>
      ))}
    </div>
  );
}
