import { Stack, Typography } from '@mui/material';
import React from 'react';

export const CommonSectionHeader: React.FC<{ headerTitle: string }> = ({ headerTitle, children }) => {
  return (
    <Stack justifyContent="space-between" alignItems="center" my={2} mx={3} direction="row">
      <Typography variant="h5">{headerTitle}</Typography>
      {children}
    </Stack>
  );
};
