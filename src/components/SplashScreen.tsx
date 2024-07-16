import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import type { FC } from 'react';
import { Loader } from './Loader';

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 2000,
    }}
  >
    <Loader
      sx={{
        marginTop: 2,
        height: 100,
        width: 100,
        '& path:nth-child(1)': {
          animation: `${bounce1} 1s ease-in-out infinite`,
        },
        // '& path:nth-child(3)': {
        //   animation: `${bounce3} 1s ease-in-out infinite`,
        // },
      }}
    />
  </Box>
);
