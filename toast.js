import path from 'path';
import { fetchMdxFromDisk, processMdx } from '@toastdotdev/mdx';
import cloudinary from 'rehype-local-image-to-cloudinary';
import numberedFootnotes from 'remark-numbered-footnotes';
import identifyFootnoteContainers from 'rehype-identity-footnote-containers';
import upload from 'rehype-local-image-to-cloudinary/upload.js';
import getImageUrl from 'rehype-local-image-to-cloudinary/build-url.js';

export const sourceData = async ({ setDataForSlug }) => {
  const files = await fetchMdxFromDisk({ directory: './content' });

  const allPostMeta = await Promise.all(
    files.map(async ({ filename, file: content }) => {
      const { content: compiledMdx, data } = await processMdx(content, {
        filepath: filename,
        remarkPlugins: [numberedFootnotes],
        rehypePlugins: [
          [
            cloudinary,
            {
              baseDir: path.dirname(filename),
              uploadFolder: 'jason.af',
            },
          ],
          identifyFootnoteContainers,
        ],
      });

      let cloudinaryUrl =
        'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_1600,h_900,c_fill/jason.af/og-image.jpg';
      let thumbnailUrl =
        'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_500,h_250,c_fill/jason.af/og-image.jpg';
      if (data.exports.meta.image) {
        const cloudinaryName = await upload({
          imagePath: path.join(path.dirname(filename), data.exports.meta.image),
          uploadFolder: 'jason.af',
        });

        cloudinaryUrl = getImageUrl({
          fileName: cloudinaryName,
          uploadFolder: 'jason.af',
          transformations: 'f_auto,q_auto,w_1600,h_900,c_fill',
        });

        thumbnailUrl = getImageUrl({
          fileName: cloudinaryName,
          uploadFolder: 'jason.af',
          transformations: 'f_auto,q_auto,w_500,h_250,c_fill',
        });
      }

      await setDataForSlug(`/${data.exports.meta.slug}`, {
        component: {
          mode: 'source',
          value: compiledMdx,
        },
        data: { ...data.exports.meta, image: cloudinaryUrl, type: 'post' },
      });

      return {
        ...data.exports.meta,
        image: cloudinaryUrl,
        thumb: thumbnailUrl,
        type: 'post',
      };
    }),
  );

  const posts = allPostMeta.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();

    return db - da;
  });

  await setDataForSlug('/posts', {
    data: { posts },
  });

  return;
};
