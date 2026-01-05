import type { Plugin } from 'esbuild';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { basename, dirname, resolve } from 'node:path';
import { bundleMDX } from 'mdx-bundler';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

const loadAstroAsJsx = {
  name: 'loadAstroAsJsx',
  setup(build: any) {
    build.onLoad({ filter: /(\.astro|\.tsx)$/ }, async (args: any) => {
      let contents;

      switch (basename(args.path)) {
        case 'post-aside.astro':
          contents = `export default function Aside({ children }) { return <aside>{children}</aside>; }`;
          break;

        case 'post-footnote.astro':
          contents =
            'export default function Fn({ children }) { return children; }';
          break;

        case 'post-footnote-text.astro':
          contents =
            'export default function FnText({ children }) { return <aside>{children}</aside>; }';
          break;

        case 'post-figure.astro':
          contents =
            'export default function Figure({ children }) { return <figure>{children}</figure>; }';
          break;

        case 'post-youtube.astro':
          contents =
            'export default function YouTube({ children, id }) { return <p><a href={`https://youtu.be/${id}`}>Watch on YouTube</a></p>; }';
          break;

        default:
          contents = `export default function Unknown() { return <></> }`;
      }

      return {
        contents,
        loader: 'jsx',
      };
    });
  },
};

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');

  if (!context.site) {
    throw new Error('site must be set in the Astro config');
  }

  const items = await Promise.all(
    blog
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(async (post) => {
        const result = await bundleMDX({
          source: post.body ?? '',
          esbuildOptions(options) {
            options.plugins = [
              loadAstroAsJsx,
              ...(options.plugins as Plugin[]),
            ];

            return options;
          },
          cwd: resolve('./src/content/blog', dirname(post.id)),
        });

        const Component = await getMDXComponent(result.code);

        const content = renderToString(createElement(Component));

        return {
          title: post.data.title,
          pubDate: post.data.date,
          description: post.data.description,
          content,
          // Compute RSS link from post `id`
          // This example assumes all posts are rendered as `/blog/[id]` routes
          link: `/${post.id}/`,
        };
      }),
  );

  return rss({
    title: 'Jason Lengstorf’s RSS Feed',
    description:
      'Jason Lengstorf makes tv for developers at CodeTV. He has 20+ years of developer experience, which he combines with stage and video production expertise to help companies tell better stories.',
    site: context.site,
    items,
    stylesheet: '/rss-feed.xsl',
  });
};
