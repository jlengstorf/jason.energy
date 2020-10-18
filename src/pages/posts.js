/** @jsx h */
import { h } from 'preact';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Intro } from '../components/intro.js';
import { PostPreviews } from '../components/post-previews.js';

export default function Posts({ posts }) {
  return [
    <SEO
      title={`${posts.length} posts about how Jason Lengstorf stopped being such a doofus`}
      description="Jason writes about building strong teams, healthier working lives, effective habits, & more. Learn actionable strategies written from real experience."
    />,
    <Layout>
      <Block color="yellow">
        <Intro headline="I write stuff." post>
          <p>Wanna read it?</p>
        </Intro>
      </Block>
      <Block color="white">
        <section id="previews">
          <PostPreviews posts={posts} />
        </section>
      </Block>
    </Layout>,
  ];
}
