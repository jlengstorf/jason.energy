module.exports = {
  layout: 'post.njk',
  site: 'https://jason.af',
  permalink: '{{slug}}/index.html',
  eleventyComputed: {
    postUrl: (data) => `${data.site}/${data.slug}/`,
  },
};
