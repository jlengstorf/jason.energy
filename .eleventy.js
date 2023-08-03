const pluginRss = require('@11ty/eleventy-plugin-rss');
const getShareImage = require('@jlengstorf/get-share-image').default;
const terser = require('terser');
const postcss = require('postcss');
const csso = require('csso');
const autoprefixer = require('autoprefixer');

const cloudinary = require('@jlengstorf/cloudinary-11ty-helpers')({
  cloud_name: 'jlengstorf',
  folder: 'jason.energy',
  image_width: 680,
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

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
    .use(cloudinary.mdPlugin);

  eleventyConfig.setLibrary('md', mdLib);

  eleventyConfig.addTemplateFormats('site.js');

  eleventyConfig.addExtension('site.js', {
    outputFileExtension: 'min.js',
    compile: function (contents) {
      return async () => {
        const ret = await terser.minify(contents);
        return ret.code;
      };
    },
  });

  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: function (contents, inputPath) {
      return async () => {
        postcss();
        const css = await postcss([autoprefixer()]).process(contents, {
          from: inputPath,
        }).css;
        const minifiedCss = csso.minify(css).css;

        return minifiedCss;
      };
    },
  });

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
  eleventyConfig.addNunjucksAsyncFilter('cloudinary', cloudinary.asyncFilter);

  eleventyConfig.addFilter('seoImage', (content) => {
    return getShareImage({
      title: content.toUpperCase(),
      cloudName: 'jlengstorf',
      imagePublicID: 'jason.energy/og',
      titleFont: 'jwf.otf',
      titleExtraConfig: '_line_spacing_-25',
      titleFontSize: 75,
      textColor: '171321',
      textLeftOffset: 354,
      textAreaWidth: 920,
      titleBottomOffset: 185,
    });
  });

  eleventyConfig.addPairedShortcode('footnote', (content, { id }) => {
    return `<a href="#${id}" id="${id}ref" class="footnote-phrase" aria-described-by="footnote-label-${id}">${content}</a>`;
  });

  eleventyConfig.addPairedShortcode('footnoteText', (content, { id }) => {
    return `
<aside class="footnote" id="${id}">
  <p class="sr-only" id="footnote-label-${id}">additional context</p>
  <div class="footnote-content" data-visible="false">
    ${content} <a href="#${id}ref" class="footnote-backref" aria-label="Back to content">close</a>
  </div>
</aside>
`;
  });

  eleventyConfig.addPairedShortcode('aside', (content, type = 'default') => {
    const icons = {
      default: {
        src: 'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1593991250/jason.energy/light-mode.png',
        alt: 'light bulb',
      },
      spicy: {
        src: 'https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1609402670/jason.energy/fire.png',
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
