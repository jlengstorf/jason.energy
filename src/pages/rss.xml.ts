import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

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