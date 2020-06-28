/** @jsx h */
import { h } from 'preact';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { Bio } from '../components/bio';

export default function Home() {
  return (
    <Layout>
      <Block>
        <h1>Hi!</h1>
      </Block>
      <Block color="blue">
        <Bio />
      </Block>
      <Block color="pink">
        <h2>Eventually this will be content.</h2>
        <p>Text will look like this on a colored background!</p>
      </Block>
    </Layout>
  );
}
