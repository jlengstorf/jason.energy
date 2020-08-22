import React from 'react';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Intro } from '../components/intro.js';

export default function Success() {
  return [
    <SEO
      title="Email confirmed."
      description="Your email has been confirmed."
    />,
    <Layout>
      <Block color="yellow">
        <Intro headline="Consider yourself booped, friend.">
          <p>
            Your email is confirmed! Today is a great day. You’re now part of a
            community of creators and lifelong learners! For even more
            connection, you may want to{' '}
            <a href="https://discord.gg/partycorgi">
              join the Party Corgi Discord
            </a>
            .
          </p>
          <p>
            <a href="/">&larr; back to the home page</a>
          </p>
        </Intro>
      </Block>
    </Layout>,
  ];
}
