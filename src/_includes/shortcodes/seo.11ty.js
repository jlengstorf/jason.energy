module.exports = function (...args) {
  console.log({ args });

  return `
    <title>{title}</title>
    <link rel="canonical" href={url} />
    <meta name="description" content={description} />
    <meta name="image" content={image} />

    <meta property="og:type" content={post ? 'article' : 'website'} />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta
      name="twitter:widgets:theme"
      content={darkMode ? 'dark' : 'light'}
    />
    <meta name="twitter:dnt" content="on" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@jlengstorf" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  `;
};
