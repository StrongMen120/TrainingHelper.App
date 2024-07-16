import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UserDetailsHeader } from 'src/modules/user/views/components/users/UserDetailsHeader';
import { UserInfo } from './UserInfo';
import { ViewWrapper } from 'src/common/components/ViewWrapper';

export const UsersDetails: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  return (
    <Box sx={{ height: '100%', width: '100%', margin: '2px' }}>
      {root.currentUser ? (
        <ViewWrapper>
          <UserDetailsHeader user={root.currentUser} />
          <Divider />
          <UserInfo root={root} user={root.currentUser} />
        </ViewWrapper>
      ) : null}
    </Box>
  );
});
