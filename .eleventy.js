const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'jlengstorf',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'site/static': '/' });

  eleventyConfig.addCollection('posts', (collectionApi) => {
    // I was already using tags, so this is a workaround
    return collectionApi
      .getAll()
      .filter((item) => item.data.type === 'post')
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
    tags: ['h2'],
    wrapper: 'div',
  });

  const markdown = require('markdown-it');
  const mdAnchor = require('markdown-it-anchor');
  const mdLib = markdown({ html: true })
    .use(mdAnchor, {
      slugify: (s) =>
        s
          .toLowerCase()
          .replace(/['’]/i, '') // avoid "let’s" => "let-s"
          .replace(/[^a-z0-9]+/g, '-') // convert "some text" => "some-text"
          .replace(/^-|-$/g, ''), // avoid leading/trailing hyphens
    })
    .use((md) => {
      /*
       * this is a custom plugin to upload all local images to Cloudinary and
       * modify the HTML output to include the Cloudinary URL + responsive image
       * attributes to improve performance
       *
       * this is configured specifically for this site, so if you want to use
       * this you'll need to modify the Cloudinary config, folder name, src
       * rewrite, and the sizes (see the note on sizes for details)
       */
      md.core.ruler.before('linkify', 'lwj_images', (state) => {
        state.tokens.forEach((token) => {
          if (token.type !== 'inline') {
            return;
          }

          if (!token.children || token.children[0].type !== 'image') {
            return;
          }

          const image = token.children[0];
          let src = image.attrGet('src');

          if (path.extname(src) === '.gif') {
            return;
          }

          if (!src.startsWith('https://res.cloudinary.com/')) {
            const filePath = path.resolve(state.env.page.inputPath);
            const imagePath = path.join(path.dirname(filePath), src);

            cloudinary.uploader.upload(imagePath, {
              folder: 'jason.af', // optional; set this to whatever you want
              use_filename: true, // use the filename as the public ID
              overwrite: false, // don't re-upload images with the same filename
              unique_filename: false, // required to avoid duplicate uploads
            });

            // no async in markdown-it (yay!) so we have to fake this a bit
            src = `https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto/jason.af/${path.basename(
              imagePath,
            )}`;
            image.attrSet('src', src);
          }

          // 3x, 2x, 1x, and mobile sizes based on content column width of 680px
          const srcSet = [2040, 1360, 680, 300]
            .map(
              (size) => `${src.replace(/q_auto/, `q_auto,w_${size}`)} ${size}w`,
            )
            .join(',');

          image.attrSet('srcset', srcSet);
          image.attrSet('loading', 'lazy');

          // don't forget to match this to content column width
          image.attrSet('sizes', '(max-width: 680px) 100vw, 680px');
        });
      });
    });

  eleventyConfig.setLibrary('md', mdLib);

  /*
   * usage: {{ relativeImagePath | cloudinary(page.inputPath) }}
   *
   * the image path needs to be relative to the file being processed (e.g. if
   * the post is in `/posts/my-post.md` and the image is at
   * `/posts/images/my-image.jpg`, you'd use "./images/my-image.jpg")
   *
   * as far as I can tell there's no way to get the current inputPath without
   * passing it in via the filter, which feels a bit clunky but it works
   */
  eleventyConfig.addNunjucksAsyncFilter(
    'cloudinary',
    async (value, currentFile, width = 1360, callback) => {
      const baseDir = path.dirname(currentFile);
      const imagePath = path.join(baseDir, value);

      const res = await cloudinary.uploader.upload(imagePath, {
        folder: 'jason.af', // optional; set this to whatever you want
        use_filename: true, // use the filename as the public ID
        overwrite: false, // don't re-upload images with the same filename
        unique_filename: false, // required to avoid duplicate uploads
      });

      callback(
        null,
        res.secure_url.replace(/upload/, `upload/f_auto,q_auto,w_${width}`),
      );
    },
  );

  eleventyConfig.addPairedShortcode('footnote', (content, { id }) => {
    return `<a href="#${id}" id="${id}ref" class="footnote-phrase">${content}</a>`;
  });

  eleventyConfig.addPairedShortcode('footnoteText', (content, { id }) => {
    return `
<aside class="footnote" id="${id}">
  <details>
    <summary>notes here</summary>
    ${content} <a href="#${id}ref" class="footnote-backref">close</a>
  </details>
</aside>
`;
  });

  eleventyConfig.addPairedShortcode('aside', (content, type = 'default') => {
    const icons = {
      default: {
        src: 'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1593991250/jason.af/light-mode.png',
        alt: 'light bulb',
      },
      spicy: {
        src: 'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1609402670/jason.af/fire.png',
        alt: 'fire',
      },
    };

    const icon = icons[type] || icons.default;

    return `
<aside class="post-aside">
  <div class="post-aside-icon">
    <img src="${icon.src}" alt="${icon.alt}" />
  </div>
  <div class="post-aside-content">
    ${content}
  </div>
</aside>
`;
  });

  eleventyConfig.addPairedShortcode(
    'tweet',
    (content, { postUrl, retweetId = false }) => {
      const url = new URL('https://twitter.com/');

      if (retweetId) {
        url.pathname = '/intent/retweet';
        url.search = new URLSearchParams({ tweet_id: retweetId });
      } else {
        url.pathname = '/compose/tweet';
        url.search = new URLSearchParams({
          text: `“${content}” —@jlengstorf`,
          url: postUrl,
          related: 'jlengstorf',
        });
      }

      return `
<div class="post-tweet-box">
  <p>${content}</p>
  <p class="post-tweet-link">
    <a href="${url}">Tweet this</a>
  </p>
</div>
`;
    },
  );

  eleventyConfig.addPairedShortcode(
    'figure',
    (content, { caption, credit, creditLink, align = 'center' } = {}) => {
      const captionText = caption ? `<span>${caption}</span>` : '';

      const linkOpen = creditLink
        ? `<a class="post-figure-attribution-link" href="${creditLink}">`
        : '';
      const linkClose = creditLink ? `</a>` : '';

      const imageCredit = credit
        ? `<small class="post-figure-attribution">Credit: ${linkOpen}${credit}${linkClose}</small>`
        : '';

      return `
<figure class="post-figure post-figure-align-${align}">
  ${content}
  <figcaption class="post-figure-caption">
    ${captionText} ${imageCredit}
  </figcaption>
</figure>
`;
    },
  );

  eleventyConfig.addShortcode('uses', (item) => {
    return `
<div class="uses-item">
  <h3>${item.name}</h3>
  <ul>${item.tags.map((tag) => `<li>${tag}</li>`).join(' ')}</ul>
  <p>${item.details}</p>

  <a href="${item.link}" class="uses-item-link ${
      item.sponsored ? 'sponsored' : ''
    }">
    More <span class="sr-only">${item.name}</span> details &rarr;
  </a>
</div>
`;
  });

  return {
    dir: {
      input: 'site',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
  };
};
