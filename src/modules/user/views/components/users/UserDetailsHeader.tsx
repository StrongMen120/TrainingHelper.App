import { Chip, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import UserVM from '../../../view-model/user';

export const UserDetailsHeader: React.FC<{ user: Instance<typeof UserVM> }> = observer(({ user }) => {
  return (
    <Stack justifyContent="space-between" spacing={1} my={3} direction="row">
      <Stack justifyContent="space-between">
        <Typography variant="h4">Users : {user.firstName + ' ' + user.secondName}</Typography>
        <Stack alignItems="center" spacing={0.5} direction="row">
          <Typography variant="body2">user_id: </Typography>
          <Chip label={user.id} size="small" sx={{ fontSize: 12 }} />
        </Stack>
      </Stack>
    </Stack>
  );
});
