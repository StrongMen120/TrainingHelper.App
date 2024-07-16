import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { Auth0Login } from 'src/modules/authentication/auth0-login';
import GuestGuard from 'src/common/guard/GuestGuard';

type Platform = 'Amplify' | 'Auth0' | 'Firebase' | 'JWT';

const platformIcons: { [key in Platform]: string } = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg',
};

const Login: NestedNextPage = () => {
  const { platform }: { platform: Platform } = useAuth();
  return (
    <>
      <Head>
        <title>Login | Personal Trainer</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100'),
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mb: 4,
              p: 2,
              '& > img': {
                height: 32,
                width: 'auto',
                flexGrow: 0,
                flexShrink: 0,
              },
            }}
          >
            <Typography color="textSecondary" variant="caption">
              The app authenticates via {platform}
            </Typography>
            <img alt="Auth platform" src={platformIcons[platform]} />
          </Box>
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === 'Auth0' && <Auth0Login />}
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
