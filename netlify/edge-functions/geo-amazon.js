import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

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
  const amazonTLD = AMAZON_TLDS[countryCode] || 'US';

  console.log({ amazonTLD, countryCode });

  const response = await context.next();

  response.headers.set('X-Booped', 'yup');

  return new HTMLRewriter()
    .on('a', {
      element(element) {
        const href = element.getAttribute('href');
        if (href.includes('amazon.com')) {
          element.setAttribute(
            'href',
            href.replace('amazon.com', 'amazon.co.uk'),
          );
        }
      },
    })
    .transform(response);
};
