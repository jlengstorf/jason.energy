import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

const AMAZON_LOCALES = {
  AU: 'amazon.com.au',
  BR: 'amazon.com.br',
  CA: 'amazon.ca',
  EG: 'amazon.eg',
  FR: 'amazon.fr',
  DE: 'amazon.de',
  IN: 'amazon.in',
  IT: 'amazon.it',
  JP: 'amazon.co.jp',
  MX: 'amazon.com.mx',
  NL: 'amazon.nl',
  PL: 'amazon.pl',
  SG: 'amazon.sg',
  SA: 'amazon.sa',
  ES: 'amazon.es',
  SE: 'amazon.se',
  TR: 'amazon.com.tr',
  AE: 'amazon.ae',
  GB: 'amazon.co.uk',
  US: 'amazon.com',
};

export default async (_request, context) => {
  const countryCode = context.geo?.country?.code || 'US';
  const amazonTLD = AMAZON_LOCALES[countryCode] || 'amazon.com';

  const response = await context.next();

  return new HTMLRewriter()
    .on('a', {
      element(element) {
        const href = element.getAttribute('href');
        if (href.includes('amazon.com')) {
          element.setAttribute('href', href.replace('amazon.com', amazonTLD));
        }
      },
    })
    .transform(response);
};
