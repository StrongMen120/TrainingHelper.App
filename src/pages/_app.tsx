import { CacheProvider, EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import nProgress from 'nprogress';
import { ReactElement } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RuntimeConfigContextProvider } from 'src/common/context/RuntimeConfigContext';
import { Settings, SettingsConsumer } from 'src/contexts/SettingsContext';
import { setYupLocale } from '../common/utils/yup-locale';
import { createEmotionCache } from 'src/common/utils/create-emotion-cache';
import { AuthConsumer, AuthProvider } from 'src/context/KeyCloakContext';

type EnhancedAppProps = AppProps & {
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactElement };
  emotionCache: EmotionCache;
};

setYupLocale();

const clientSideEmotionCache = createEmotionCache();

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: EnhancedAppProps) {
  const withLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {},
    },
  });
  return (
    <CacheProvider value={emotionCache}>
      <RuntimeConfigContextProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <SettingsConsumer>
              {({ settings }) => (
                <PrimeReactProvider>
                  <AuthConsumer>{(auth) => (!auth.isInitialized ? <></> : withLayout(<Component {...pageProps} />))}</AuthConsumer>
                </PrimeReactProvider>
              )}
            </SettingsConsumer>
          </QueryClientProvider>
        </AuthProvider>
      </RuntimeConfigContextProvider>
    </CacheProvider>
  );
}

export default App;
