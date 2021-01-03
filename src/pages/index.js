import { h } from 'preact';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Bio } from '../components/bio.js';
import { Teaching } from '../components/teaching.js';
import { Hero } from '../components/hero.js';
import { Form } from '../components/form.js';
import { Connect } from '../components/connect.js';
import { Writing } from '../components/writing.js';

export default function Home() {
  const addBoop = () => {};

  return [
    <SEO />,
    <Layout>
      <Block color="yellow" onClick={addBoop}>
        <Hero />
      </Block>
      <Block id="bio">
        <Bio />
      </Block>
      <Block id="teaching" color="blue">
        <Teaching />
      </Block>
      <Block id="writing">
        <Writing />
      </Block>
      <Block id="newsletter" color="yellow">
        <Form />
      </Block>
      <Block id="connect" color="pink">
        <Connect />
      </Block>
    </Layout>,
  ];
}
