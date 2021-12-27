module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('static');

  eleventyConfig.addShortcode(
    'seo',
    require('./src/_includes/shortcodes/seo.11ty.js'),
  );

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
