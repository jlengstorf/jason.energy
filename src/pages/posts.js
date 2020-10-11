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
      title="Please check your email."
      description="You’re almost there — please check your email to finish signing up!"
    />,
    <Layout>
      <Block color="yellow">
        <Intro headline="I write stuff."></Intro>
        Wanna read it?
      </Block>
      <Block color="white">
        <section id="previews">
          <PostPreviews posts={posts} />
        </section>
      </Block>
    </Layout>,
  ];
}
