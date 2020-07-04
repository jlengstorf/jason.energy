import React from 'react';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { Bio } from '../components/bio';
import { Teaching } from '../components/teaching';
import { Hero } from '../components/hero';
import { Form } from '../components/form';
import { Connect } from '../components/connect';
import { Writing } from '../components/writing';

export default function Home() {
  return [
    <SEO />,
    <Layout>
      <Block color="yellow">
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
