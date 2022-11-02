import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

type StatisticsResponse = {
  items: {
    statistics: {
      subscriberCount: number;
    };
  }[];
};

export const handler: Handler = async () => {
  const apiUrl = new URL('https://youtube.googleapis.com/');
  apiUrl.pathname = '/youtube/v3/channels';
  apiUrl.searchParams.set('key', process.env.YOUTUBE_API_KEY);
  apiUrl.searchParams.set('id', process.env.YOUTUBE_CHANNEL_ID);
  apiUrl.searchParams.set('part', 'statistics');

  let subscribers = 0;

  try {
    const ytRes = await fetch(apiUrl.toString());

    if (!ytRes.ok) {
      console.error(`Failed to fetch channel statistics: ${ytRes.status}`);
      return;
    }

    const data = (await ytRes.json()) as StatisticsResponse;
    const [{ statistics }] = data.items;
    const { subscriberCount } = statistics;

    subscribers = subscriberCount;
  } catch (error) {
    console.error('Failed to fetch channel statistics');
    console.error(error);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscribers }),
  };
};
