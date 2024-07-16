import { ListItem, Typography, Stack, ListItemProps, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import React, { ReactNode } from 'react';
import { FormListItemText } from './FormListItemText';

export const FormListItem: React.FC<PropertyListItemProps> = ({ label, value, listItemStyles }) => {
  const primary = (
    <Typography sx={{ minWidth: 250, marginRight: 2 }} variant="subtitle2">
      {label}
    </Typography>
  );

  const secondary = (
    <Stack justifyContent={'center'} flex={1}>
      {typeof value === 'string' ? (
        <Typography color="textSecondary" variant="body2">
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );

  return (
    <ListItem divider sx={{ px: 3, py: 1.5, ...listItemStyles }}>
      <FormListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export type PropertyListItemProps = {
  label: string;
  value: string | ReactNode;
  listItemStyles?: SxProps<Theme>;
};
