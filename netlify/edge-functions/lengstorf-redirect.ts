import { Context } from 'https://edge.netlify.com';
import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (
    !url.searchParams.has('from') ||
    url.searchParams.get('from') !== 'lengstorf.com'
  ) {
    return;
  }

  /*
   * If we’re here, it’s because this request is a redirect from lengstorf.com,
   * likely due to visiting a page that I’ve taken down from that site.
   *
   * To make the redirect less jarring, let’s add a note letting people know
   * that they were trying to read a really old post that I wouldn’t recommend
   * anymore.
   */
  const response = await context.next();

  return new HTMLRewriter()
    .on('.heading', {
      element(element) {
        element.prepend(
          `
            <div class="post-aside" style="margin-bottom: 3rem;">
              <div class="post-aside-icon">
                <img src="https://res.cloudinary.com/jlengstorf/image/upload/w_80,f_auto,q_auto/v1593991250/jason.af/light-mode.png" alt="light bulb" style="width: 100%;">
              </div>
              <div class="post-aside-content" style="text-align: left;">
                <p>Hi, friend! You’ve been redirected here because you followed a link to a post that is <em>very</em> old and that I don’t consider relevant anymore. You can find my more recent writing below!</p>
              </div>
            </div>
          `,
          { html: true },
        );
      },
    })
    .transform(response);
};
