import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

export const handler: Handler = async () => {
  let episodes = 0;

  try {
    const res = await fetch('https://learnwithjason.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            allEpisode(where: {hidden: {neq: true}}) {
              youtubeID
            }
          }
        `,
        variables: {},
      }),
    });

    if (!res.ok) {
      console.error(`Failed to fetch LWJ stats: ${res.status}`);
      return;
    }

    const { data } = (await res.json()) as {
      data: { allEpisode: { youtubeID: string }[] };
    };

    episodes = data.allEpisode.filter((e) => e.youtubeID !== null).length;
  } catch (error) {
    console.error('Failed to fetch channel statistics');
    console.error(error);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ episodes }),
  };
};
