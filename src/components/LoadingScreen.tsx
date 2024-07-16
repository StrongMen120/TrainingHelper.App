import { Box, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NProgress from 'nprogress';
import type { FC } from 'react';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: 'default',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    padding: '3',
  },
}));

const LoadingScreen: FC = () => {
  const classes = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LoadingScreen;
