const fs = require('fs').promises;
const path = require('path');
const vm = require('vm');
const globby = require('globby');
const mdx = require('@mdx-js/mdx');
const cloudinary = require('rehype-local-image-to-cloudinary');
const numberedFootnotes = require('remark-numbered-footnotes');
const identifyFootnoteContainers = require('rehype-identity-footnote-containers');
const { transformComponentForNode } = require('toast/src/transforms');
const upload = require('rehype-local-image-to-cloudinary/upload');
const getImageUrl = require('rehype-local-image-to-cloudinary/build-url');

exports.sourceData = async ({ createPage, withCache }) => {
  const files = await globby('./content/posts', {
    expandDirectories: { extensions: ['mdx'] },
  });

  const postPromises = files.map(async filename => {
    const file = await fs.readFile(filename, 'utf-8');

    let compiled;
    try {
      compiled = await mdx(file, {
        remarkPlugins: [
          numberedFootnotes,
        ],
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
    } catch (error) {
      console.error(error);
      throw error;
    }

    const component = await transformComponentForNode(compiled);
    const context = { exports: {}, require };

    vm.createContext(context);

    const script = new vm.Script(component.code);
    script.runInNewContext(context);

    const { meta } = context.exports || {};

    if (!meta.slug) {
      console.error(`no slug found in ${filename}`);
      throw new Error(`no slug found in ${filename}`);
    }

    const cloudinaryName = await upload({
      imagePath: path.join(path.dirname(filename), meta.image),
      uploadFolder: 'jason.af',
    });

    const cloudinaryUrl = getImageUrl({
      fileName: cloudinaryName,
      uploadFolder: 'jason.af',
      transformations: 'f_auto,q_auto,w_1600,h_900,c_fill',
    });

    const thumbnailUrl = getImageUrl({
      fileName: cloudinaryName,
      uploadFolder: 'jason.af',
      transformations: 'f_auto,q_auto,w_500,h_250,c_fill',
    });

    await createPage({
      module: `/** @jsx mdx */
      import { mdx } from '@mdx-js/preact';
      ${compiled}`,
      slug: meta.slug,
      data: { ...meta, image: cloudinaryUrl, type: 'post' },
    });

    return { ...meta, image: cloudinaryUrl, thumb: thumbnailUrl, type: 'post' };
  });

  return Promise.all([withCache('mdx-posts', Promise.all(postPromises))]);
};

exports.prepData = async ({ cacheDir, publicDir }) => {
  await fs.mkdir(path.resolve(publicDir, 'src/pages'), { recursive: true });

  const posts = require(path.resolve(cacheDir, 'mdx-posts.json'));

  const sortedPosts = posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();

    return db - da;
  });

  await fs.writeFile(
    path.resolve(publicDir, 'src/pages/posts.json'),
    JSON.stringify({ posts: sortedPosts }),
  );
};
