import React from 'react';
import { SEO } from '../components/seo.js';
import { Layout } from '../components/layout.js';
import { Block } from '../components/block.js';
import { Intro } from '../components/intro.js';

export default function Success() {
  return [
    <SEO
      title="Please check your email."
      description="You’re almost there — please check your email to finish signing up!"
    />,
    <Layout>
      <Block color="yellow">
        <Intro headline="Please check your email.">
          <p>
            Please confirm your email by clicking the link that was just emailed
            to the address you entered. This helps protect the list from spam.
          </p>
          <p>
            <strong>
              To make sure emails go to your primary inbox, add
              jason@lengstorf.com to your address list.
            </strong>{' '}
            You can do this quickly by sending a quick email to say hi — I read
            everything I get!
          </p>
        </Intro>
      </Block>
    </Layout>,
  ];
}
