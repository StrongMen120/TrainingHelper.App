import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const AuthorizationRequired: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error: Authorization Required</title>
      </Head>
    </>
  );
};

export default AuthorizationRequired;
