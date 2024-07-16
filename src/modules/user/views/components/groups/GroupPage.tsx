import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Divider, Grid, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import AddGroupDialog from './Dialog/AddGroupDialog';
import AddMembersDialog from './Dialog/AddMembersDialog';
import { GroupsDetails } from './GroupsDetails';
import { GroupsGrid } from './GroupsGrid';
import { Routes } from 'src/routes';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';

export const GroupPage: React.FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  return (
    <Stack height={'100%'}>
      <CommonHeader headerTitle="Groups" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Group Management' }, { name: 'Groups', href: Routes.user.groups }]} />} />
      <Divider />
      <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px' }}>
        <Grid item xs={6}>
          <GroupsGrid root={root} />
        </Grid>
        <Grid item xs={6}>
          <GroupsDetails root={root} />
        </Grid>
      </Grid>
      <AddGroupDialog root={root} />
      <AddMembersDialog root={root} />
    </Stack>
  );
});
