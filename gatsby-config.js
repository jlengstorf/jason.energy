module.exports = {
  plugins: [
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        offset: -55,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
  ],
};
