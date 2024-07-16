import { Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { Group } from './Group';

export const CommonHeader: React.FC<CommonHeaderProps> = ({ headerTitle, breadcrumbs, rightActionCorner }) => {
  return (
    <Group justifyContent="space-between" alignItems="center" p={1} px={2}>
      <Stack>
        {breadcrumbs}
        <Typography variant="h3">{headerTitle}</Typography>
      </Stack>
      {rightActionCorner}
    </Group>
  );
};

export interface CommonHeaderProps {
  headerTitle: string;
  breadcrumbs: ReactNode;
  rightActionCorner?: ReactNode;
}
