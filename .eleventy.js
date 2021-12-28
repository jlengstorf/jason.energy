module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: '/' });

  eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
    tags: ['h2'],
    wrapper: 'div',
  });

  const md = require('markdown-it');
  const mdAnchor = require('markdown-it-anchor');
  const mdLib = md({ html: true })
    .use(mdAnchor, {
      slugify: s =>
        s
          .toLowerCase()
          .replace(/['’]/i, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
    })
    .use(md => {
      md.core.ruler.before('linkify', 'lwj_images', async state => {
        state.tokens.forEach(token => {
          if (token.type !== 'inline') {
            return;
          }

          if (!token.children || token.children[0].type !== 'image') {
            return;
          }

          const image = token.children[0];
          const src = image.attrGet('src');

          if (!src.startsWith('https://res.cloudinary.com/')) {
            console.log(`TODO: upload ${src} to Cloudinary`);
            return;
          }

          const srcSet = [2040, 1360, 680, 300]
            .map(
              size => `${src.replace(/q_auto/, `q_auto,w_${size}`)} ${size}w`,
            )
            .join(',');

          image.attrPush(['srcset', srcSet]);
          image.attrPush(['sizes', '(max-width: 680px) 100vw, 680px']);
          image.attrPush(['loading', 'lazy']);
        });
      });
    });

  eleventyConfig.setLibrary('md', mdLib);

  eleventyConfig.addPairedShortcode('footnote', (content, { id }) => {
    return `
<a href="#${id}" id="${id}ref" class="footnote-phrase">${content}</a>
`;
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
    'figure',
    (content, { credit, creditLink }) => {
      return `
<figure class="post-figure post-figure-align-center">
  ${content}
  <figcaption class="post-figure-caption">
    <small class="post-figure-attribution"
      >Credit:
      <a
        class="post-figure-attribution-link"
        href="${creditLink}"
        >${credit}</a
      ></small
    >
  </figcaption>
</figure>
`;
    },
  );

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
  };
};
