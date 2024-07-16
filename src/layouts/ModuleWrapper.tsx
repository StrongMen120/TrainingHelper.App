import { Box, Theme, useTheme } from '@mui/material';
import React from 'react';

export const ModuleWrapper: React.FC<{ noInnerPadding?: boolean }> = ({ children, noInnerPadding }) => {
  const theme = useTheme<Theme>();
  return (
    <Box padding={theme.spacing(0.5)} height="inherit" minWidth={0}>
      <Box style={{ height: 'inherit', padding: noInnerPadding ? 0 : theme.spacing(2), boxSizing: 'border-box' }}>
        <Box height="100%" display="flex" flexDirection="column">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
