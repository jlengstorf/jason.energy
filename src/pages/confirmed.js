import React from 'react';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { Intro } from '../components/intro';
import { Link } from 'gatsby';

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
            <Link to="/">&larr; back to the home page</Link>
          </p>
        </Intro>
      </Block>
    </Layout>,
  ];
}
