import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { SnackbarProvider } from 'notistack';
import nProgress from 'nprogress';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RuntimeConfigContextProvider } from 'src/common/context/RuntimeConfigContext';
import { Settings, SettingsConsumer } from 'src/contexts/SettingsContext';
import { DashboardLayout } from 'src/layouts/DashboardLayout';
import { createTrainingHelperTheme } from 'src/theme';
import { createEmotionCache } from '../common/utils/create-emotion-cache';
import { setYupLocale } from '../common/utils/yup-locale';
import { SplashScreen } from '../components/SplashScreen';
import { AuthConsumer, AuthProvider } from '../context/Auth0Context';

type EnhancedAppProps = AppProps & {
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactElement };
  emotionCache: EmotionCache;
};

setYupLocale();

const clientSideEmotionCache = createEmotionCache();

function createThemeFromSettings(settings: Settings) {
  return createTrainingHelperTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    mode: settings.theme ?? 'light',
  });
}
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider theme={createThemeFromSettings(settings)}>
                    <CssBaseline />
                    <SnackbarProvider dense maxSnack={3}>
                      <AuthConsumer>{(auth) => (!auth.isInitialized ? <SplashScreen /> : withLayout(<Component {...pageProps} />))}</AuthConsumer>
                    </SnackbarProvider>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </QueryClientProvider>
          </AuthProvider>
        </LocalizationProvider>
      </RuntimeConfigContextProvider>
    </CacheProvider>
  );
}

export default App;
