import { Stack } from '@mui/material';
import React from 'react';

export const PageContentWrapper: React.FC = ({ children }) => (
  <Stack sx={{ bgcolor: (theme) => theme.palette.neutral?.[50], overflowY: 'auto' }} height="100%">
    {children}
  </Stack>
);
