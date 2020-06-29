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
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Quicksand:wght@300,400,600'],
        display: 'swap',
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
