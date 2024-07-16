import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Divider, Grid, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UsersDetails } from './UserDetails';
import { UsersGrid } from './UsersGrid';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { Routes } from 'src/routes';

export const UsersPage: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  return (
    <Stack height={'100%'}>
      <CommonHeader headerTitle="Users" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Admin' }, { name: 'Users', href: Routes.user.users }]} />} />
      <Divider />
      <Grid container spacing={2} sx={{ margin: '2px', height: '100%', width: '100%' }}>
        <Grid item xs={4}>
          <UsersGrid root={root} />
        </Grid>
        <Grid item xs={8}>
          <UsersDetails root={root} />
        </Grid>
      </Grid>
    </Stack>
  );
});
