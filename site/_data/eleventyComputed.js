module.exports = {
  site: 'https://jason.af',
  posts: async (data) => {
    console.log({
      path: data.page.inputPath,
      count: data.collections.posts.length,
    });
    return data.collections.posts;
  },
};
