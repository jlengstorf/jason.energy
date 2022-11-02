import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { getTwitchAccessToken } from '@jlengstorf/get-twitch-oauth';

type TwitchFollowersResponse = {
  total: number;
  data: {
    from_id: string;
    from_login: string;
    from_name: string;
    to_id: string;
    to_login: string;
    to_name: string;
    followed_at: string;
  }[];
  pagination: {
    cursor: string;
  };
};

const apiUrl = new URL('https://api.twitch.tv/');
apiUrl.pathname = '/helix/users/follows';
apiUrl.searchParams.set('to_id', process.env.TWITCH_CHANNEL_ID);
apiUrl.searchParams.set('first', '1');

export const handler: Handler = async () => {
  if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
    return {
      statusCode: 401,
      body: 'Must provide a Twitch app client ID and secret.',
    };
  }

  const res = await getTwitchAccessToken();

  const twitchRes = await fetch(apiUrl.toString(), {
    method: 'GET',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${res.access_token}`,
    },
  });

  if (!twitchRes.ok) {
    console.error(`Failed to fetch channel statistics: ${twitchRes.status}`);
  }

  const data = (await twitchRes.json()) as TwitchFollowersResponse;

  const followers = data.total;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followers }),
  };
};
