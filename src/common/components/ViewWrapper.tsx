import { Box, useTheme } from '@mui/material';
import React from 'react';

export const ViewWrapper: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box padding={theme.spacing(1)} height="inherit" sx={{ overflowY: 'auto' }}>
      <Box style={{ height: 'inherit', padding: theme.spacing(1), boxSizing: 'border-box' }}>
        <Box height="100%" display="flex" flexDirection="column">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
