export default async (_request, context) => {
  console.log('Waddup from an Edge Function!');

  const AMAZON_TLDS = {
    US: 'amazon.com',
    UK: 'amazon.co.uk',
    CA: 'amazon.ca',
    JP: 'amazon.co.jp',
    DE: 'amazon.de',
    IN: 'amazon.in',
  };

  const countryCode = context.geo?.country?.code || 'US';
  const amazonTLD = AMAZON_TLDS[countryCode];

  console.log({ amazonTLD });

  const response = await context.next();
  const text = await response.text();

  response.headers.set('Content-Type', 'application/json');

  return new Response(text.replace(/amazon.com/gi, amazonTLD), response);
};
