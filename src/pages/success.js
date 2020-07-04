import React from 'react';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';
import { Block } from '../components/block';
import { Intro } from '../components/intro';

export default function Success() {
  return [
    <SEO />,
    <Layout>
      <Block color="yellow">
        <Intro headline="Please check your email.">
          <p>
            Please confirm your email by clicking the link that was just emailed
            to the address you entered. This helps protect the list from spam.{' '}
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
