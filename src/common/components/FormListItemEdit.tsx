import { ListItem, Typography, Stack, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import React from 'react';
import { FormListItemText } from './FormListItemText';

export const FormListItemEdit: React.FC<FormListItemProps> = ({ label, children, listItemStyles }) => {
  const primary = (
    <Typography sx={{ minWidth: 250, marginRight: 2 }} variant="subtitle2">
      {label}
    </Typography>
  );

  const secondary = (
    <Stack justifyContent={'center'} sx={{ width: '100%' }}>
      {children}
    </Stack>
  );

  return (
    <ListItem divider sx={{ px: 3, py: 0.554, height: 60, ...listItemStyles }}>
      <FormListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export type FormListItemProps = {
  label: string;
  listItemStyles?: SxProps<Theme>;
};
