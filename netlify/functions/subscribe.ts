import fetch from 'node-fetch';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const formId = process.env.CK_FORM_ID;
  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const params = new URLSearchParams(event.body);
  const firstName = params.get('firstName');
  const email = params.get('email');

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_API_KEY,
        first_name: firstName,
        email,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });

    return {
      statusCode: 301,
      headers: {
        Location: '/success/',
      },
      // body is unused in 3xx codes, but required in all function responses
      body: 'redirecting...',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
