// This page is only for Auth0. If you use some other Auth Provider, you can (should) delete this.
// The role of this page is to handle the "authorize" callback.

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'src/hooks/useAuth';
import { useMounted } from 'src/common/hooks/use-mounted';

const accountDeactivatedRedirectPage = '/403';

const Authorize = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { handleRedirectCallback } = useAuth();
  useEffect(() => {
    if (router.query.code !== undefined && router.query.state !== undefined) {
      handleRedirectCallback()
        .then((appState?: { returnUrl?: string }) => {
          if (isMounted()) {
            const returnUrl = appState?.returnUrl || '/dashboard';
            router.push(returnUrl).catch(console.error);
          }
        })
        .catch((err: any) => {
          console.error(err);
          if (isMounted()) {
            router.push('/authentication/login').catch(console.error);
          }
        });
    }
    if (router.query.error === undefined) return;
    router.push({ pathname: accountDeactivatedRedirectPage, query: router.query });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return null;
};

export default Authorize;
