import { capitalize } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';

const UserInactive: NextPage = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>Error: 403</title>
      </Head>
    </>
  );
};

export default UserInactive;
