import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');

  if (!context.site) {
    throw new Error('site must be set in the Astro config');
  }

  return rss({
    title: 'Jason Lengstorf’s Blog',
    description: 'Jason has 20+ years of developer experience, which he combines with stage and video production expertise to help companies tell better stories.',
    site: context.site,
    items: blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/${post.id}/`,
    })),
  });
}