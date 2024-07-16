import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { capitalize } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';

const UserInactive: NextPage = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push('/');
  };
  const error = router.query.error ? capitalize(router.query.error?.toString()).replaceAll('_', ' ') : 'Account problem';
  const errorDescription = router.query.error_description ? capitalize(router.query.error_description?.toString()) : 'There is problem with your account';

  return (
    <>
      <Head>
        <title>Error: {error}</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
            403: {error}
          </Typography>
          <Typography align="center" color="textSecondary" sx={{ mt: 1.5 }} variant="subtitle2">
            {errorDescription}
          </Typography>
          <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
            Contact administrators to resolve this problem
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button component="a" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserInactive;
