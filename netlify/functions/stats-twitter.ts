import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

type TwitterResponse = {
  data: {
    name: string;
    username: string;
    id: string;
    public_metrics: {
      followers_count: number;
      following_count: number;
      tweet_count: number;
      listed_count: number;
    };
  };
};

export const handler: Handler = async () => {
  const apiUrl = new URL('https://api.twitter.com/');
  apiUrl.pathname = `/2/users/${process.env.TWITTER_USER_ID}`;
  apiUrl.searchParams.set('user.fields', 'public_metrics');

  let followers = 0;

  try {
    const res = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch Twitter details: ${res.status}`);
      return;
    }

    const { data } = (await res.json()) as TwitterResponse;
    const { followers_count } = data.public_metrics;

    followers = followers_count;
  } catch (error) {
    console.error('Failed to fetch Twitter details');
    console.error(error);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followers }),
  };
};
