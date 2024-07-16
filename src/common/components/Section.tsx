import { Divider, Paper, Stack } from '@mui/material';
import React, { ComponentProps, ReactNode } from 'react';

export const Section: React.FC<SectionProps> = ({ children, header, paperProps }) => {
  return (
    <Paper elevation={5} {...paperProps}>
      <Stack width="100%">{header}</Stack>
      <Divider />
      {children}
    </Paper>
  );
};

export type SectionProps = {
  header: ReactNode;
  paperProps?: ComponentProps<typeof Paper>;
};
