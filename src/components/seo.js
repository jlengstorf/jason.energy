import { h } from 'preact';
import { Helmet } from 'react-helmet';
import { useSettings } from '../context/settings.js';

export function SEO({
  title = 'A Very Jason Lengstorf Website — Powered By Boops!',
  description = 'Jason Lengstorf is a web developer, educator, and the host of Learn With Jason. It is rumored that he gives the best hugs. Jason started that rumor.',
  url = 'https://jason.af/',
  image = 'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,g_auto/v1593579116/jason.af/og-image.jpg',
  post = false,
}) {
  const { darkMode } = useSettings();

  return (
    <Helmet defer={false}>
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

      <body class={darkMode ? 'dark' : 'light'} />
    </Helmet>
  );
}
