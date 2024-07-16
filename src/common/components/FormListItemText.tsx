import { ListItemText } from '@mui/material';
import React, { ComponentProps } from 'react';

export const FormListItemText: React.FC<ComponentProps<typeof ListItemText>> = (props) => (
  <ListItemText
    {...props}
    disableTypography
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      my: 0,
    }}
  />
);
