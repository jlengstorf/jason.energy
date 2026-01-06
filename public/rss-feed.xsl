<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <xsl:variable name="title">
      <xsl:value-of select="/rss/channel/title" />
    </xsl:variable>
    <xsl:variable name="description">
      <xsl:value-of select="/rss/channel/description" />
    </xsl:variable>
    <xsl:variable name="link">
      <xsl:value-of select="/rss/channel/link" />
    </xsl:variable>

    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title" /> RSS Feed</title>
        <meta charset="UTF-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1,shrink-to-fit=no" />
        <style type="text/css">
          @font-face {
          font-display: swap;
          font-family: 'tay-amaya';
          src: url('/fonts/TAYAmaya.woff2') format('woff2');
          }

          @font-face {
          font-display: swap;
          font-family: 'tay-dreamboat';
          src: url('/fonts/TAYDreamboat.woff2') format('woff2');
          }

          * {
          box-sizing: border-box;
          }

          :root {
          --white: #f5f2fb;
          --gray-100: #dbd4e9;
          --gray-600: #322942;
          --gray-700: #231239;
          --gray-900: #030626;
          --pink: #a20979;
          --purple: #4e2d88;
          --blue: #389fff;
          --orange: #bc7218;

          --font-heading: 'tay-dreamboat', sans-serif;
          --font-subheading: 'tay-amaya', sans-serif;
          --font-body: system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';

          background-color: var(--gray-700);
          color-scheme: dark;
          font-family: var(--font-body);
          interpolate-size: allow-keywords;
          line-height: 1.45;
          text-rendering: optimizeLegibility;
          }

          header,
          main {
          margin-inline: auto;
          inline-size: min(90dvi, 600px);
          }

          header {
          margin-block-start: 40px;
          }

          main {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-block: 80px;
          }

          img {
          block-size: auto;
          display: block;
          max-inline-size: 100%;
          }

          :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-heading);
          font-weight: normal;
          line-height: 0.9;
          margin: 0;
          }

          article {
          background: var(--gray-600);
          container: article / inline-size;
          align-items: start;
          border: 1px solid transparent;
          border-radius: 3px;
          color: var(--gray-100);
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          padding: 20px 16px;
          }

          :is(h1) {
          font-size: 1.5em;
          }

          :is(h2) {
          font-size: 1.25em;
          }

          :is(h3) {
          font-family: var(--font-subheading);
          line-height: 1.1;
          }

          h3 a {
          color: var(--white);
          text-decoration: none;
          }

          h3 a:is(:focus, :hover, :active) {
          text-decoration: underline;
          }

          :is(p, li) {
          line-height: 1.45;
          margin: 0;
          }

          header p {
          margin-block-start: 16px;
          }

          a {
          color: var(--blue);
          }
        </style>
      </head>
      <body>
        <header>
          <h1>
            <xsl:value-of select="/rss/channel/title" />
          </h1>
          <p>
            <xsl:value-of select="/rss/channel/description" />
          </p>
          <p>
            Subscribe to this RSS feed in your favorite feed reader.
          </p>
          <p>
            <a hreflang="en"
              target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute> Visit
              Website &#x2192; </a>
          </p>
        </header>
        <main>
          <h2>Recent Posts</h2>
          <xsl:for-each select="/rss/channel/item">
            <article>
              <h3>
                <a hreflang="en" target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h3>
              <p>
                <xsl:apply-templates select="description" />
              </p>
              <p>

                <a hreflang="en" target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute> Read full post
                  &#x2192;</a>
              </p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>