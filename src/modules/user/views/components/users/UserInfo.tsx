import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Divider, Grid } from '@mui/material';
import UserVM from 'src/modules/user/view-model/user';
import { observer } from 'mobx-react-lite';
import { UserGroupRolesInfo } from './UserGroupRolesInfo';
import { UserDetailsInfo } from './UserDetailsInfo';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

export const UserInfo: React.FC<{ user: Instance<typeof UserVM>; root: Instance<typeof UsersRoot>; showGroupRoles?: boolean }> = observer(
  ({ user, root, showGroupRoles = true }) => {
    return (
      <Grid>
        <UserDetailsInfo user={user} root={root} />
        <Divider />
        {showGroupRoles ? <UserGroupRolesInfo root={root} /> : <></>}
      </Grid>
    );
  }
);
