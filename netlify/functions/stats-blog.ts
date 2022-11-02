import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignorePiTags: true,
});

export const handler: Handler = async () => {
  let posts = 0;

  try {
    const res = await fetch('https://www.jason.af/feed.xml');

    if (!res.ok) {
      console.error(`Failed to fetch channel statistics: ${res.status}`);
      return;
    }

    const xml = await res.text();
    const data = parser.parse(xml);

    posts = data.feed.entry.length;
  } catch (error) {
    console.error('Failed to fetch channel statistics');
    console.error(error);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ posts }),
  };
};
