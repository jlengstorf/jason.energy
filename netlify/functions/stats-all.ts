import { builder, Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const apiUrl = new URL(process.env.URL);

async function getStats(endpoint: string, fallback: object) {
  apiUrl.pathname = endpoint;

  return fetch(apiUrl.toString())
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
      }

      return res;
    })
    .then((res) => res.json())
    .catch(() => fallback);
}

async function getYouTubeSubscribers() {
  return getStats('/api/stats/youtube', { subscribers: 0 });
}

async function getTwitchFollowers() {
  return getStats('/api/stats/twitch', { followers: 0 });
}

async function getTwitterFollowers() {
  return getStats('/api/stats/twitter', { followers: 0 });
}

async function getPostCount() {
  return getStats('/api/stats/blog', { posts: 0 });
}

async function getEpisodeCount() {
  return getStats('/api/stats/lwj', { episodes: 0 });
}

const getAllStats: Handler = async () => {
  try {
    const [youtube, twitch, twitter, blog, lwj] = await Promise.all([
      getYouTubeSubscribers() as Promise<{ subscribers: number }>,
      getTwitchFollowers() as Promise<{ followers: number }>,
      getTwitterFollowers() as Promise<{ followers: number }>,
      getPostCount() as Promise<{ posts: number }>,
      getEpisodeCount() as Promise<{ episodes: number }>,
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        youtube: {
          count: youtube.subscribers,
          label: 'subscribers',
        },
        twitch: {
          count: twitch.followers,
          label: 'followers',
        },
        twitter: {
          count: twitter.followers,
          label: 'followers',
        },
        blog: {
          count: blog.posts,
          label: 'posts',
        },
        lwj: {
          count: lwj.episodes,
          label: 'episodes',
        },
      }),
      ttl: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch statistics');
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch statistics',
      }),
    };
  }
};

export const handler = builder(getAllStats);
