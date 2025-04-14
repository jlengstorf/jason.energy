module.exports = {
  layout: 'post.njk',
  permalink: '{{slug}}/index.html',
  type: 'post',
  eleventyComputed: {
    postUrl: (data) => `${data.site}/${data.slug}/`,
  },
};
