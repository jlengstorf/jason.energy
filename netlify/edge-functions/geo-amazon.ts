import { Context } from 'https://edge.netlify.com';
import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

type CountryMap = {
  code: string;
  tld: string;
};

const AMAZON_LOCALES: CountryMap[] = [
  { code: 'AU', tld: 'amazon.com.au' },
  { code: 'BR', tld: 'amazon.com.br' },
  { code: 'CA', tld: 'amazon.ca' },
  { code: 'EG', tld: 'amazon.eg' },
  { code: 'FR', tld: 'amazon.fr' },
  { code: 'DE', tld: 'amazon.de' },
  { code: 'IN', tld: 'amazon.in' },
  { code: 'IT', tld: 'amazon.it' },
  { code: 'JP', tld: 'amazon.co.jp' },
  { code: 'MX', tld: 'amazon.com.mx' },
  { code: 'NL', tld: 'amazon.nl' },
  { code: 'PL', tld: 'amazon.pl' },
  { code: 'SG', tld: 'amazon.sg' },
  { code: 'SA', tld: 'amazon.sa' },
  { code: 'ES', tld: 'amazon.es' },
  { code: 'SE', tld: 'amazon.se' },
  { code: 'TR', tld: 'amazon.com.tr' },
  { code: 'AE', tld: 'amazon.ae' },
  { code: 'GB', tld: 'amazon.co.uk' },
  { code: 'US', tld: 'amazon.com' },
];

export default async (_request: Request, context: Context) => {
  const countryCode = context.geo?.country?.code || 'US';
  const amazonTLD =
    AMAZON_LOCALES.find(({ code }) => code === countryCode)?.tld ||
    'amazon.com';

  const response = await context.next();

  return new HTMLRewriter()
    .on('a', {
      element(element) {
        const href = element.getAttribute('href');
        if (href?.includes('amazon.com')) {
          element.setAttribute('href', href.replace('amazon.com', amazonTLD));
        }
      },
    })
    .transform(response);
};
