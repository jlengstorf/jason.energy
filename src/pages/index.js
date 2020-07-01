import React from 'react';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { Bio } from '../components/bio';
import { Teaching } from '../components/teaching';

export default function Home() {
  return [
    <SEO />,
    <Layout>
      <Block id="bio">
        <Bio />
      </Block>
      <Block id="teaching" color="blue">
        <Teaching />
      </Block>
    </Layout>,
  ];
}
