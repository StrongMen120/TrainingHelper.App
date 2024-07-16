import { Instance } from 'mobx-state-tree';
import React, { FC, useEffect } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Box, Divider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { UserDetailsHeader } from '../users/UserDetailsHeader';
import { UserInfo } from '../users/UserInfo';

export const ProfileDetails: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  return (
    <Box sx={{ height: '100%', width: '60%', margin: '5% 20% 2px 20%' }}>
      <ViewWrapper>
        <UserDetailsHeader user={root.loginUser!} />
        <Divider />
        <UserInfo user={root.loginUser!} root={root} showGroupRoles={false} />
      </ViewWrapper>
    </Box>
  );
});
