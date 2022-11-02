import { Context } from 'netlify:edge';
import {
  HTMLRewriter,
  Element,
} from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const apiUrl = new URL('https://ef-playground.netlify.app/');
apiUrl.pathname = '/api/stats/all';

export default async function (_request: Request, context: Context) {
  const response = await context.next();
  const stats = await fetch(apiUrl.toString()).then((res) => res.json());

  return new HTMLRewriter()
    .on('[data-enrich="true"]', {
      element(element: Element) {
        const site = element.getAttribute('data-site');

        if (site && stats[site] && stats[site].count > 0) {
          const data = stats[site];
          const formatted = formatter.format(data.count);

          element.append(
            `<span class="count">${formatted} ${data.label}</span>`,
            {
              html: true,
            },
          );
        }
      },
    })
    .transform(response);
}
