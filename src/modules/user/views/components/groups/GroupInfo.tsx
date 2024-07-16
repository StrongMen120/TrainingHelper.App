import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Divider, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import GroupVM from 'src/modules/user/view-model/group';
import { GroupDetailsInfo } from './GroupDetailsInfo';
import { GroupMembersInfo } from './GroupMembersInfo';

export const GroupInfo: React.FC<{ group: Instance<typeof GroupVM>; hasPermission: boolean }> = observer(({ group, hasPermission }) => {
  return (
    <Grid>
      <GroupDetailsInfo group={group} hasPermission={hasPermission} />
      <Divider />
      <GroupMembersInfo group={group} hasPermission={hasPermission} />
    </Grid>
  );
});
